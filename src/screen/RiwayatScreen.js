import React, {useState, useEffect, useCallback, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  RefreshControl,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import api from '../api/client';

const MONTHS = [
  {label: 'Bulan', value: ''},
  {label: 'Januari', value: '1'},
  {label: 'Februari', value: '2'},
  {label: 'Maret', value: '3'},
  {label: 'April', value: '4'},
  {label: 'Mei', value: '5'},
  {label: 'Juni', value: '6'},
  {label: 'Juli', value: '7'},
  {label: 'Agustus', value: '8'},
  {label: 'September', value: '9'},
  {label: 'Oktober', value: '10'},
  {label: 'November', value: '11'},
  {label: 'Desember', value: '12'},
];

function RiwayatScreen({navigation}) {
  const [bulan, setBulan] = useState('');
  const [tahun, setTahun] = useState('');
  const [yearsOptions, setYearsOptions] = useState([]);
  const [yearsLoading, setYearsLoading] = useState(false);
  const [yearsError, setYearsError] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];

  // Data & pagination for history
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const bulanRef = useRef(bulan);
  const tahunRef = useRef(tahun);
  useEffect(() => {
    bulanRef.current = bulan;
  }, [bulan]);
  useEffect(() => {
    tahunRef.current = tahun;
  }, [tahun]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const resetFilters = () => {
    setBulan('');
    setTahun('');
  };

  const renderItem = item => (
    <View
      style={{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{flex: 1, fontSize: 12}}>{item.label}</Text>
      {item.value === bulan && <Icon name="check" size={15} color="#000" />}
    </View>
  );

  const renderYearItem = item => (
    <View
      style={{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{flex: 1, fontSize: 12}}>{item.label}</Text>
      {item.value === tahun && <Icon name="check" size={15} color="#000" />}
    </View>
  );

  const formatDateID = tanggal => {
    try {
      const d = new Date(`${tanggal}T00:00:00`);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch (_) {
      return tanggal;
    }
  };

  const parsePaginated = root => {
    if (Array.isArray(root)) return {data: root, current: 1, last: 1};
    if (Array.isArray(root?.data))
      return {data: root.data, current: 1, last: 1};
    const pg = root?.data;
    return {
      data: Array.isArray(pg?.data) ? pg.data : [],
      current: typeof pg?.current_page === 'number' ? pg.current_page : 1,
      last: typeof pg?.last_page === 'number' ? pg.last_page : 1,
    };
  };

  const fetchYears = useCallback(async () => {
    setYearsLoading(true);
    setYearsError('');
    try {
      const res = await api.get('/pengajuan/years');
      const arr = Array.isArray(res?.data?.data) ? res.data.data : [];
      const opts = [
        {label: 'Tahun', value: ''},
        ...arr.map(y => ({label: String(y), value: String(y)})),
      ];
      setYearsOptions(opts);
      // Keep default '' selection unless user chooses a year
    } catch (e) {
      setYearsOptions([{label: 'Tahun', value: ''}]);
      setYearsError(e?.message || 'Gagal memuat tahun');
    } finally {
      setYearsLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async (targetPage = 1, append = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    setErrorMsg('');
    try {
      const params = {status: 'disetujui', page: targetPage};
      if (bulanRef.current) params.bulan = bulanRef.current;
      if (tahunRef.current) params.tahun = tahunRef.current;
      const res = await api.get('/pengajuan', {params});
      const {data, current, last} = parsePaginated(res.data);
      const mapped = data.map((it, idx) => ({
        key: `${it.nomor_pengajuan || idx}-${it.created_at || ''}`,
        nomor_pengajuan: it.nomor_pengajuan,
        kategori_nama: it.kategori?.name || it.kategori?.nama || '',
        sub_kategori_nama: it.sub_kategori?.name || it.sub_kategori?.nama || '',
        tanggal_kunjungan: it.tanggal_kunjungan,
        waktu_kunjungan: it.waktu_kunjungan,
        tujuan: it.tujuan,
      }));
      setPage(current);
      setLastPage(last);
      setItems(prev => (append ? [...prev, ...mapped] : mapped));
    } catch (e) {
      if (!append) setItems([]);
      setErrorMsg(e?.message || 'Gagal memuat riwayat');
    } finally {
      if (append) setLoadingMore(false);
      else setLoading(false);
    }
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start(() => setRefreshing(false));
    fetchYears();
    fetchHistory(1, false);
    setPage(1);
  };

  useFocusEffect(
    useCallback(() => {
      fetchYears();
      fetchHistory(1, false);
      setPage(1);
      return undefined;
    }, []),
  );

  const handleFilterPress = () => {
    // Apply current filters, tahun/bulan may be '' (ignored in params)
    fetchHistory(1, false);
    setPage(1);
    setModalVisible(true);
  };

  const loadMore = () => {
    if (loadingMore) return;
    const nextPage = page + 1;
    if (nextPage <= lastPage) fetchHistory(nextPage, true);
  };

  // Auto-apply filter whenever bulan/tahun changes (without re-calling years API)
  useEffect(() => {
    if (tahun !== null) {
      fetchHistory(1, false);
      setPage(1);
    }
  }, [bulan, tahun]);

  return (
    <Animated.View
      style={{flex: 1, backgroundColor: 'white', opacity: fadeAnim}}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={{marginTop: 15, marginHorizontal: 10, flexDirection: 'row'}}>
        <Image
          source={require('../../assets/image/dprd.png')}
          style={{width: 70, height: 60}}
        />
        <Text
          style={{
            color: '#000000',
            fontFamily: 'ADLaMDisplay-Regular',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 10,
            fontSize: 24,
            fontWeight: 'bold',
          }}>
          E-Tamu
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{marginTop: 10, alignItems: 'flex-end', marginLeft: 180}}>
          <Icon name="navigate-before" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{marginHorizontal: 20, marginTop: 10, flexDirection: 'row'}}>
          <Text
            style={{
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'DMSans-Regular',
              fontSize: 20,
              flex: 1,
            }}>
            Riwayat Kunjungan
          </Text>
        </View>

        <View
          style={{marginHorizontal: 20, marginBottom: 5, flexDirection: 'row'}}>
          <Dropdown
            style={{
              marginTop: 10,
              marginBottom: 5,
              width: 115,
              height: 30,
              backgroundColor: 'white',
              borderRadius: 5,
              padding: 5,
              borderWidth: 1,
              borderColor: '#B1B1B1',
            }}
            placeholderStyle={{fontSize: 12, marginLeft: 3}}
            selectedTextStyle={{fontSize: 12, marginLeft: 3}}
            data={MONTHS}
            labelField="label"
            valueField="value"
            placeholder="Bulan"
            value={bulan}
            onChange={item => setBulan(item.value)}
            renderLeftIcon={() => (
              <Icon name="calendar-today" size={15} color="#000" />
            )}
            renderItem={renderItem}
          />

          <Dropdown
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 5,
              width: 100,
              height: 30,
              backgroundColor: 'white',
              borderRadius: 5,
              padding: 5,
              borderWidth: 1,
              borderColor: '#B1B1B1',
            }}
            placeholderStyle={{fontSize: 12, marginLeft: 3}}
            selectedTextStyle={{fontSize: 12, marginLeft: 3}}
            data={yearsOptions}
            labelField="label"
            valueField="value"
            placeholder={
              yearsLoading ? 'Memuat...' : yearsError ? 'Gagal memuat' : 'Tahun'
            }
            value={tahun}
            onChange={item => setTahun(item.value)}
            renderLeftIcon={() => (
              <Icon name="date-range" size={15} color="#000" />
            )}
            renderItem={renderYearItem}
          />

          <TouchableOpacity
            onPress={handleFilterPress}
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 5,
              backgroundColor: '#97D9E4',
              padding: 5,
              borderRadius: 5,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Icon name="filter-list" size={15} color="#000" />
            <Text style={{marginLeft: 3}}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Daftar Riwayat */}
        <View
          style={{
            backgroundColor: '#F6F6F6',
            alignSelf: 'center',
            borderWidth: 1,
            width: 350,
            borderColor: '#D8D8D8',
          }}>
          {loading && items.length === 0 ? (
            <Text style={{textAlign: 'center', marginVertical: 10}}>
              Memuat riwayat...
            </Text>
          ) : errorMsg ? (
            <Text
              style={{
                textAlign: 'center',
                marginVertical: 10,
                color: '#C32A2A',
              }}>
              {errorMsg}
            </Text>
          ) : items.length === 0 ? (
            <Text style={{textAlign: 'center', marginVertical: 10}}>
              Tidak ada data.
            </Text>
          ) : (
            items.map((it, idx) => (
              <View
                key={it.key || idx}
                style={{
                  borderTopWidth: idx === 0 ? 0 : 1,
                  borderColor: '#D8D8D8',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#FFFF',
                    alignItems: 'flex-start',
                  }}>
                  <View
                    style={{
                      marginRight: 10,
                      marginLeft: 10,
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'DMSans-Regular',
                      }}>
                      {idx + 1}.
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        backgroundColor: '#97D9E4',
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderColor: '#D8D8D8',
                        padding: 10,
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        {`Kunjungan Bertemu ${
                          it.sub_kategori_nama || it.kategori_nama || '-'
                        }`}
                      </Text>
                    </View>

                    <View style={{borderLeftWidth: 1, borderColor: '#D8D8D8'}}>
                      <Text
                        style={{
                          fontSize: 12,
                          marginTop: 7,
                          marginLeft: 5,
                          fontFamily: 'DMSans-Regular',
                        }}>
                        Tanggal Kunjungan: {formatDateID(it.tanggal_kunjungan)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          marginTop: 7,
                          marginLeft: 5,
                          fontFamily: 'DMSans-Regular',
                        }}>
                        Jam Kunjungan: {it.waktu_kunjungan || '-'} WIB
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          marginTop: 7,
                          marginLeft: 5,
                          fontFamily: 'DMSans-Regular',
                          marginBottom: 10,
                        }}>
                        {`Bertemu dengan ${
                          it.sub_kategori_nama || it.kategori_nama || '-'
                        }, ${it.tujuan || ''}`}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}

          {page < lastPage && (
            <View style={{alignItems: 'center', marginVertical: 12}}>
              <TouchableOpacity
                onPress={loadMore}
                disabled={loadingMore}
                style={{
                  backgroundColor: '#0386D0',
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 8,
                  opacity: loadingMore ? 0.7 : 1,
                }}>
                {loadingMore ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={{color: '#FFF', fontFamily: 'DMSans-Regular'}}>
                    Muat lagi
                  </Text>
                )}
              </TouchableOpacity>
              <Text
                style={{
                  marginTop: 6,
                  color: '#666',
                }}>{`Halaman ${page} dari ${lastPage}`}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal Konfirmasi */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              width: 300,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Filter Berhasil
            </Text>
            <Text style={{marginTop: 10, fontSize: 14, textAlign: 'center'}}>
              Data telah difilter
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: '#97D9E4',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}
              onPress={() => setModalVisible(false)}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>Oke</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Belum Dipilih */}
      <Modal
        visible={modalVisible2}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible2(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              width: 300,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Mohon dipilih
            </Text>
            <Text style={{marginTop: 10, fontSize: 14, textAlign: 'center'}}>
              Silahkan pilih terlebih dahulu tahun riwayat kunjungan.
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: '#97D9E4',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}
              onPress={() => setModalVisible2(false)}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>Oke</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}

export default RiwayatScreen;
