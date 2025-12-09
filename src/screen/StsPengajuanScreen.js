import React, {useState, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  BackHandler,
  RefreshControl,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import api from '../api/client';

const STATUS_OPTIONS = [
  {label: 'Pending', value: 'pending'},
  {label: 'Diterima', value: 'disetujui'},
  {label: 'Ditolak', value: 'ditolak'},
];

function StsPengajuanScreen({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0]; // Nilai awal opacity 1

  // Filter status (default pending)
  const [statusFilter, setStatusFilter] = useState('pending');

  // Data & pagination
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Modal status per item
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in ke tampilan normal
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const parsePaginated = (root) => {
    // Expecting { status, message, data: { current_page, last_page, data: [...] } }
    if (Array.isArray(root)) return {data: root, current: 1, last: 1};
    if (Array.isArray(root?.data)) return {data: root.data, current: 1, last: 1};
    const pg = root?.data;
    return {
      data: Array.isArray(pg?.data) ? pg.data : [],
      current: typeof pg?.current_page === 'number' ? pg.current_page : 1,
      last: typeof pg?.last_page === 'number' ? pg.last_page : 1,
    };
  };

  const formatDateID = (tanggal) => {
    try {
      const d = new Date(`${tanggal}T00:00:00`);
      return d.toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
    } catch (_) { return tanggal; }
  };

  const fetchList = useCallback(async (targetPage = 1, append = false) => {
    if (append) setLoadingMore(true); else setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.get('/pengajuan', { params: { status: statusFilter, page: targetPage } });
      const {data, current, last} = parsePaginated(res.data);
      const mapped = data.map((it, idx) => ({
        key: `${it.nomor_pengajuan || idx}-${it.created_at || ''}`,
        nomor_pengajuan: it.nomor_pengajuan,
        nama_instansi: it.nama_instansi,
        atas_nama: it.atas_nama,
        jumlah_peserta: it.jumlah_peserta,
        phone: it.phone,
        email: it.email,
        kategori_nama: it.kategori?.name || it.kategori?.nama || '',
        sub_kategori_nama: it.sub_kategori?.name || it.sub_kategori?.nama || '',
        tanggal_kunjungan: it.tanggal_kunjungan,
        waktu_kunjungan: it.waktu_kunjungan,
        tujuan: it.tujuan,
        status: it.status,
      }));
      setPage(current);
      setLastPage(last);
      setItems(prev => append ? [...prev, ...mapped] : mapped);
    } catch (e) {
      if (!append) setItems([]);
      setErrorMsg(e?.message || 'Gagal memuat data pengajuan');
    } finally {
      if (append) setLoadingMore(false); else setLoading(false);
    }
  }, [statusFilter]);

  const onRefresh = () => {
    setRefreshing(true);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 350, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 650, useNativeDriver: true }),
    ]).start(() => setRefreshing(false));
    fetchList(1, false);
    setPage(1);
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        navigation.navigate('Home');
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      // Load first page on focus
      fetchList(1, false);
      setPage(1);
      return () => backHandler.remove();
    }, [fetchList])
  );

  const applyFilter = () => {
    // Reset to first page with new status
    fetchList(1, false);
    setPage(1);
  };

  const loadMore = () => {
    if (loadingMore) return;
    const nextPage = page + 1;
    if (nextPage <= lastPage) fetchList(nextPage, true);
  };

  const openStatusModal = (item) => setSelectedItem(item);
  const closeStatusModal = () => setSelectedItem(null);

  const renderStatusPill = (st) => {
    if (st === 'pending') return {bg:'#A6A6A6', icon:'hourglass-empty', label:'Pending'};
    if (st === 'disetujui') return {bg:'#1CA31C', icon:'done', label:'Diterima'};
    if (st === 'ditolak') return {bg:'#C32A2A', icon:'close', label:'Ditolak'};
    return {bg:'#A6A6A6', icon:'info', label: st || 'Status'};
  };

  const renderStatusModalContent = (st) => {
    if (st === 'pending') {
      return {
        icon: <Icon name="hourglass-empty" size={45} color="#FFA500" />,
        title: 'Pengajuan Sedang Diproses',
        desc: 'Mohon tunggu, pengajuan Anda sedang dalam tahap proses verifikasi.',
      };
    }
    if (st === 'disetujui') {
      return {
        icon: <Icon name="check-circle" size={45} color="#1CA31C" />,
        title: 'Pengajuan Disetujui',
        desc: 'Selamat! Pengajuan Anda telah disetujui.',
      };
    }
    if (st === 'ditolak') {
      return {
        icon: <Icon name="cancel" size={45} color="#C32A2A" />,
        title: 'Pengajuan Ditolak',
        desc: 'Mohon maaf, pengajuan Anda ditolak.',
      };
    }
    return { icon: <Icon name="info" size={45} color="#888" />, title: 'Status', desc: st || '' };
  };

  return (
    <Animated.View style={{flex: 1, backgroundColor: 'white', opacity: fadeAnim}}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={{marginTop: 15, marginHorizontal: 10, flexDirection: 'row'}}>
        <Image source={require('../../assets/image/dprd.png')} style={{width: 70, height: 60}} />
        <Text style={{ color: '#000', fontFamily: 'ADLaMDisplay-Regular', marginTop: 10, fontSize: 24, fontWeight: 'bold' }}>E-Tamu</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginTop: 10, alignItems: 'flex-end', marginLeft: 180 }}>
          <Icon name="navigate-before" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={{backgroundColor: '#F6F6F6', alignSelf: 'center', width: 350, borderWidth: 1, borderColor: '#D8D8D8', borderTopLeftRadius: 10, borderTopRightRadius: 10, marginVertical: 10}}>
          <View style={{marginHorizontal: 15, marginVertical: 15}}>
            <Text style={{color: '#000000', fontWeight: 'bold', fontFamily: 'DMSans-Regular', fontSize: 20}}>Daftar Pengajuan</Text>
          </View>

          {/* Filter Status (match Riwayat styling) */}
          <View style={{flexDirection: 'row', marginHorizontal: 15, marginBottom: 10}}>
            <Dropdown
              style={{ width: 140, height: 36, backgroundColor: 'white', borderRadius: 5, padding: 5, borderWidth: 1, borderColor: '#B1B1B1' }}
              placeholderStyle={{fontSize: 12, marginLeft: 3}}
              selectedTextStyle={{fontSize: 12, marginLeft: 3}}
              data={STATUS_OPTIONS}
              labelField="label"
              valueField="value"
              placeholder="Status"
              value={statusFilter}
              onChange={item => setStatusFilter(item.value)}
              renderLeftIcon={() => (<View><Icon name="format-line-spacing" size={15} color="#000" /></View>)}
              renderItem={(item) => (
                <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text style={{flex: 1, fontSize: 12}}>{item.label}</Text>
                  {item.value === statusFilter && (<Icon name="check" size={16} color="#000" />)}
                </View>
              )}
            />
            <TouchableOpacity onPress={applyFilter} style={{ marginLeft: 10, backgroundColor: '#97D9E4', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, justifyContent: 'center', flexDirection: 'row' }}>
              <View style={{marginTop: 1}}><Icon name="filter-list" size={16} color="#000" /></View>
              <Text style={{marginLeft: 6}}>Filter</Text>
            </TouchableOpacity>
          </View>

          {/* List */}
          {loading && items.length === 0 ? (
            <Text style={{textAlign:'center', marginBottom: 12}}>Memuat pengajuan...</Text>
          ) : errorMsg ? (
            <Text style={{textAlign:'center', color:'#C32A2A', marginBottom:12}}>{errorMsg}</Text>
          ) : items.length === 0 ? (
            <Text style={{textAlign:'center', marginBottom: 12}}>Tidak ada data.</Text>
          ) : (
            items.map((it, idx) => {
              const pill = renderStatusPill(it.status);
              return (
                <View key={it.key || idx} style={{borderTopWidth: 1, borderColor: '#D8D8D8'}}>
                  <View style={{ flexDirection: 'row', backgroundColor: '#FFFF', alignItems: 'flex-start' }}>
                    <View style={{ marginRight: 10, marginLeft: 10, alignItems: 'center', marginTop: 10 }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'DMSans-Regular' }}>{idx + 1}.</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <View style={{ backgroundColor: '#97D9E4', borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#D8D8D8', padding: 10, alignItems: 'center' }}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', color: '#000', textAlign: 'center'}}>
                          {`Kunjungan Bertemu ${it.sub_kategori_nama || it.kategori_nama || '-'}`}
                        </Text>
                      </View>
                      <View style={{borderLeftWidth: 1, borderColor: '#D8D8D8'}}>
                        <Text style={{ fontSize: 12, marginTop: 7, marginLeft: 5, fontFamily: 'DMSans-Regular' }}>Tanggal Kunjungan: {formatDateID(it.tanggal_kunjungan)}</Text>
                        <Text style={{ fontSize: 12, marginTop: 7, marginLeft: 5, fontFamily: 'DMSans-Regular' }}>Jam Kunjungan: {it.waktu_kunjungan || '-'} WIB</Text>
                        <Text style={{ fontSize: 12, marginTop: 7, marginLeft: 5, fontFamily: 'DMSans-Regular', marginBottom: 10 }}>
                          {`Bertemu dengan ${it.sub_kategori_nama || it.kategori_nama || '-'}, ${it.tujuan || ''}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ borderTopWidth: 1, borderColor: '#D8D8D8', padding: 10, backgroundColor: '#FFFF', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'DMSans-Regular', fontWeight: 'bold', fontSize: 13 }}>Lihat Status :</Text>
                    <TouchableOpacity onPress={() => openStatusModal(it)} style={{ flexDirection: 'row', marginLeft: 5, backgroundColor: pill.bg, padding: 2, borderRadius: 5, alignItems: 'center' }}>
                      <View style={{marginLeft: 3}}>
                        <Icon name={pill.icon} size={18} color="#FFFF" />
                      </View>
                      <Text style={{ fontFamily: 'DMSans-Regular', color: '#FFFF', marginRight: 7, marginLeft: 2, fontSize: 12 }}>{pill.label}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}

          {/* Load more */}
          {page < lastPage && (
            <View style={{alignItems: 'center', marginVertical: 12}}>
              <TouchableOpacity onPress={loadMore} disabled={loadingMore} style={{ backgroundColor: '#0386D0', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, opacity: loadingMore ? 0.7 : 1 }}>
                {loadingMore ? <ActivityIndicator color="#FFF" /> : <Text style={{color:'#FFF', fontFamily:'DMSans-Regular'}}>Muat lagi</Text>}
              </TouchableOpacity>
              <Text style={{marginTop:6, color:'#666'}}>{`Halaman ${page} dari ${lastPage}`}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Status Modal */}
      <Modal animationType="fade" transparent={true} visible={!!selectedItem} onRequestClose={closeStatusModal}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 300, backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
            {renderStatusModalContent(selectedItem?.status).icon}
            <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>
              {renderStatusModalContent(selectedItem?.status).title}
            </Text>
            <Text style={{ fontSize: 14, textAlign: 'center', marginVertical: 10 }}>
              {renderStatusModalContent(selectedItem?.status).desc}
            </Text>
            <TouchableOpacity onPress={closeStatusModal} style={{ marginTop: 10, padding: 10, backgroundColor: '#A6A6A6', borderRadius: 5 }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}

export default StsPengajuanScreen;
