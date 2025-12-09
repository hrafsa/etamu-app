import React, {useState, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
  BackHandler,
  RefreshControl,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {useAuth} from '../auth/AuthContext';
import api from '../api/client';

function HomeScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false); // logout modal
  const [exitModalVisible, setExitModalVisible] = useState(false); // exit app modal for hardware back
  const [ketVisible, setKetVisible] = useState(false);
  const [ketVisible2, setKetVisible2] = useState(false);
  const [ketVisible3, setKetVisible3] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0]; // Nilai awal opacity 1

  const {logout, user} = useAuth();

  // State untuk daftar kunjungan yang disetujui (hanya yang akan datang)
  const [visits, setVisits] = useState([]);
  const [loadingVisits, setLoadingVisits] = useState(false);
  const [visitsError, setVisitsError] = useState('');
  const [selectedVisit, setSelectedVisit] = useState(null);
  // pagination state
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const parsePengajuanList = resData => {
    // Bentuk backend: { status, message, data: { current_page, data: [ ... ] } }
    if (Array.isArray(resData)) return { items: resData, currentPage: 1, lastPage: 1 };
    if (resData?.data && Array.isArray(resData.data)) {
      return { items: resData.data, currentPage: 1, lastPage: 1 };
    }
    const pg = resData?.data;
    if (pg && typeof pg === 'object') {
      const items = Array.isArray(pg.data) ? pg.data : [];
      const currentPage = typeof pg.current_page === 'number' ? pg.current_page : 1;
      const lastPageVal = typeof pg.last_page === 'number' ? pg.last_page : 1;
      return { items, currentPage, lastPage: lastPageVal };
    }
    return { items: [], currentPage: 1, lastPage: 1 };
  };

  const toDateTime = (tanggal, waktu) => {
    if (!tanggal) return null;
    const t = waktu && /^\d{2}:\d{2}/.test(waktu) ? waktu : '23:59';
    // Parse sebagai waktu lokal
    const dt = new Date(`${tanggal}T${t}:00`);
    return isNaN(dt.getTime()) ? null : dt;
  };

  const formatDateID = (tanggal) => {
    try {
      const d = new Date(`${tanggal}T00:00:00`);
      return d.toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
    } catch (_) { return tanggal; }
  };

  const fetchApproved = useCallback(async (targetPage = 1, append = false) => {
    if (append) setLoadingMore(true); else setLoadingVisits(true);
    setVisitsError('');
    try {
      const res = await api.get('/pengajuan', { params: { status: 'disetujui', page: targetPage } });
      const { items, currentPage, lastPage: lp } = parsePengajuanList(res.data);
      const mapped = items.map(item => ({
        nomor_pengajuan: item.nomor_pengajuan,
        nama_instansi: item.nama_instansi,
        atas_nama: item.atas_nama,
        jumlah_peserta: item.jumlah_peserta,
        phone: item.phone,
        email: item.email,
        kategori_nama: item.kategori?.name || item.kategori?.nama || '',
        sub_kategori_nama: item.sub_kategori?.name || item.sub_kategori?.nama || '',
        tanggal_kunjungan: item.tanggal_kunjungan,
        waktu_kunjungan: item.waktu_kunjungan,
        tujuan: item.tujuan,
        dokumen_url: item.dokumen_url,
        status: item.status,
        created_at: item.created_at,
      }));
      const now = new Date();
      const upcoming = mapped.filter(v => {
        const dt = toDateTime(v.tanggal_kunjungan, v.waktu_kunjungan);
        return dt && dt >= now;
      });
      setPage(currentPage);
      setLastPage(lp);
      setVisits(prev => {
        const combined = append ? [...prev, ...upcoming] : upcoming;
        // sort ascending by datetime
        return combined.sort((a,b) => {
          const da = toDateTime(a.tanggal_kunjungan, a.waktu_kunjungan)?.getTime() || 0;
          const db = toDateTime(b.tanggal_kunjungan, b.waktu_kunjungan)?.getTime() || 0;
          return da - db;
        });
      });
    } catch (e) {
      if (!append) setVisits([]);
      setVisitsError(e?.message || 'Gagal memuat daftar kunjungan');
    } finally {
      if (append) setLoadingMore(false); else setLoadingVisits(false);
    }
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in ke tampilan normal
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const onRefresh = () => {
    setRefreshing(true);

    // Animasi fade ke putih penuh lalu kembali normal dengan durasi lebih panjang
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0, // Layar menjadi putih penuh
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1, // Kembali normal
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start(() => setRefreshing(false)); // Pastikan refresh berhenti setelah animasi

    // Refresh data kunjungan juga
    fetchApproved(1, false);
    setPage(1);
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        // Show exit app confirmation (do NOT logout)
        setExitModalVisible(true);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      // Muat data kunjungan saat screen difokuskan
      fetchApproved(1, false);
      setPage(1);

      return () => backHandler.remove();
    }, [fetchApproved])
  );

  const handleKeluar = () => {
    // Explicit logout via bottom nav button
    setModalVisible(true);
  };

  const onConfirmLogout = async () => {
    setModalVisible(false);
    try {
      await logout();
    } catch (e) {
      // ignore
    }
  };

  const handleKeterangan = () => {
    setKetVisible(true);
  };

  const handleKeterangan2 = () => {
    setKetVisible2(true);
  };

  const handleKeterangan3 = () => {
    setKetVisible3(true);
  };

  const openVisitDetail = (v) => setSelectedVisit(v);
  const closeVisitDetail = () => setSelectedVisit(null);

  const loadMore = () => {
    if (loadingMore) return;
    const nextPage = page + 1;
    if (nextPage <= lastPage) {
      fetchApproved(nextPage, true);
    }
  };

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
      </View>

      <ScrollView
        style={{marginHorizontal: 20}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text
          style={{
            color: '#000000',
            fontWeight: 'bold',
            fontFamily: 'DMSans-Regular',
            fontSize: 18,
            marginTop: 10,
          }}>
          {`Hello ${user?.name || 'User'},`}
        </Text>
        <Text
          style={{
            color: '#8F92A1',
            fontFamily: 'DMSans-Regular',
            fontSize: 16,
            marginTop: 5,
          }}>
          Selamat Datang di E-Tamu....
        </Text>

        <Text
          style={{
            color: '#000000',
            fontFamily: 'DMSans-Regular',
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 20,
          }}>
          Dashboard
        </Text>

        {/* Kartu menu dashboard (tetap seperti sebelumnya) */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFF',
            alignSelf: 'center',
            width: 330,
            height: 150,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderRadius: 5,
            marginTop: 10,
            flexDirection: 'row',
            borderColor: '#00000020',
            borderBottomWidth: 5,
          }}>
          <View
            style={{
              //flex: 1,
              alignItems: 'center',
              alignSelf: 'center',
              marginRight: 15,
              marginLeft: 11,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Pengajuan')}>
              <Image
                source={require('../../assets/image/exam.png')}
                style={{
                  width: 55,
                  height: 55,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'DMSans-Regular',
                fontSize: 14,
              }}>
              Pengajuan
            </Text>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'DMSans-Regular',
                fontSize: 14,
              }}>
              Surat
            </Text>
          </View>
          <View
            style={{
              //flex: 1,
              alignItems: 'center',
              alignSelf: 'center',
              marginRight: 15,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('StsPengajuan')}>
              <Image
                source={require('../../assets/image/status.png')}
                style={{
                  width: 58,
                  height: 58,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'DMSans-Regular',
                fontSize: 14,
              }}>
              Status
            </Text>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'DMSans-Regular',
                fontSize: 14,
              }}>
              Pengajuan
            </Text>
          </View>
          <View
            style={{
              //flex: 1,
              alignItems: 'center',
              alignSelf: 'center',
              marginRight: 15,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Panduan')}>
              <Image
                source={require('../../assets/image/panduan.png')}
                style={{
                  width: 55,
                  height: 55,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'DMSans-Regular',
                fontSize: 14,
              }}>
              Panduan
            </Text>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'DMSans-Regular',
                fontSize: 14,
              }}>
              Pengajuan
            </Text>
          </View>
          <View
            style={{
              //flex: 1,
              alignItems: 'center',
              alignSelf: 'center',
              marginRight: 15,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Riwayat')}>
              <Image
                source={require('../../assets/image/folder.png')}
                style={{
                  width: 55,
                  height: 55,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'DMSans-Regular',
                fontSize: 14,
              }}>
              Riwayat
            </Text>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'DMSans-Regular',
                fontSize: 14,
              }}></Text>
          </View>
        </View>

        {/* List Kunjungan (Dynamic) */}
        <View>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'DMSans-Regular',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 30,
            }}>
            List Kunjungan
          </Text>
        </View>

        {loadingVisits ? (
          <Text style={{textAlign:'center', marginTop: 15}}>Memuat kunjungan...</Text>
        ) : visitsError ? (
          <Text style={{color:'#C32A2A', marginTop: 15, textAlign:'center'}}>{visitsError}</Text>
        ) : visits.length === 0 ? (
          <Text style={{textAlign:'center', marginTop: 15}}>Belum ada kunjungan disetujui yang akan datang.</Text>
        ) : (
          <>
            {visits.map((v) => (
              <View key={v.nomor_pengajuan} style={{flexDirection: 'column', flex: 1}}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#97D9E4',
                    marginTop: 20,
                    alignContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontFamily: 'DMSans-Regular',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    {`Kunjungan Bertemu ${v.sub_kategori_nama || v.kategori_nama || '-'}`}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    borderColor: '#00000020',
                    borderBottomWidth: 6,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                  }}>
                  <TouchableOpacity
                    onPress={() => openVisitDetail(v)}
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFF',
                      alignContent: 'center',
                      padding: 12,
                      borderBottomLeftRadius: 15,
                      borderBottomRightRadius: 15,
                    }}>
                    <Text
                      style={{
                        color: '#000000',
                        fontFamily: 'DMSans-Regular',
                        fontSize: 12,
                      }}>
                      {`Tanggal Kunjungan: ${formatDateID(v.tanggal_kunjungan)}`}
                    </Text>
                    <Text
                      style={{
                        color: '#000000',
                        fontFamily: 'DMSans-Regular',
                        fontSize: 12,
                        marginTop: 7,
                      }}>
                      {`Jam Kunjungan : ${v.waktu_kunjungan || '-' } WIB`}
                    </Text>
                    <Text
                      style={{
                        color: '#000000',
                        fontFamily: 'DMSans-Regular',
                        fontSize: 12,
                        marginTop: 7,
                      }}>
                      {`Bertemu dengan ${v.sub_kategori_nama || v.kategori_nama || '-'}, ${v.tujuan || ''}`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {page < lastPage && (
              <View style={{marginTop: 16, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={loadMore}
                  disabled={loadingMore}
                  style={{
                    backgroundColor: '#0386D0',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 8,
                    opacity: loadingMore ? 0.7 : 1,
                  }}
                >
                  {loadingMore ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={{color:'#FFF', fontFamily:'DMSans-Regular'}}>Muat lagi</Text>
                  )}
                </TouchableOpacity>
                <Text style={{marginTop:6, color:'#666'}}>{`Halaman ${page} dari ${lastPage}`}</Text>
              </View>
            )}
          </>
        )}

        <View style={{marginTop: 10, marginBottom: 10}}>
          <Text style={{color: '#FFFF'}}>--DPRD DKI JAKARTA--</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFF',
          padding: 5,
          borderTopColor: '#00000020',
          borderBottomWidth: 15,
          borderBottomColor: '#469FD1',
          borderTopWidth: 2,
        }}>
        <View style={{marginBottom: 5, marginRight: 20}}>
          <TouchableOpacity style={{marginLeft: 3}}>
            <Icon name="home" size={30} color="#469FD1" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'DMSans-Regular',
              color: '#000',
            }}>
            Home
          </Text>
        </View>

        <View style={{marginBottom: 5, marginLeft: 20, marginRight: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifikasi')}
            style={{marginLeft: 15}}>
            <Icon name="notifications" size={30} color="#8E91A0" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'DMSans-Regular',
              color: '#000',
            }}>
            Notifikasi
          </Text>
        </View>

        <View style={{marginBottom: 5, marginLeft: 20, marginRight: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{marginLeft: 5}}>
            <Icon name="person" size={30} color="#8E91A0" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'DMSans-Regular',
              color: '#000',
            }}>
            Profile
          </Text>
        </View>

        <View style={{marginBottom: 5, marginLeft: 20}}>
          <TouchableOpacity onPress={handleKeluar} style={{marginLeft: 5}}>
            <Icon name="exit-to-app" size={30} color="#8E91A0" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'DMSans-Regular',
              color: '#000',
            }}>
            Keluar
          </Text>
        </View>

        {/* Logout Confirmation Modal (explicit Keluar button) */}
        <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
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
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Konfirmasi</Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                Apakah Anda yakin ingin keluar dari akun anda?
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{
                    padding: 10,
                    backgroundColor: '#C32A2A',
                    borderRadius: 5,
                    marginRight: 10,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Tidak
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onConfirmLogout}
                  style={{
                    padding: 10,
                    backgroundColor: '#007bff',
                    borderRadius: 5,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>Ya</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Exit App Confirmation Modal (hardware back) */}
        <Modal transparent={true} visible={exitModalVisible} onRequestClose={() => setExitModalVisible(false)}>
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
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Konfirmasi</Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                Apakah Anda yakin ingin keluar dari aplikasi?
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <TouchableOpacity
                  onPress={() => setExitModalVisible(false)}
                  style={{
                    padding: 10,
                    backgroundColor: '#C32A2A',
                    borderRadius: 5,
                    marginRight: 10,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Tidak
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setExitModalVisible(false);
                    BackHandler.exitApp();
                  }}
                  style={{
                    padding: 10,
                    backgroundColor: '#007bff',
                    borderRadius: 5,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>Ya</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Detail Kunjungan Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={!!selectedVisit}
          onRequestClose={closeVisitDetail}
        >
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
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center'}}>Keterangan</Text>
              <View style={{borderTopWidth: 1, borderBottomWidth: 1, marginVertical: 10, borderColor: '#B1B1B1'}}>
                <Text style={styles.modalKeterangan}>
                  <Text style={{fontWeight: 'bold'}}>Nomor Pengajuan : </Text>
                  {selectedVisit?.nomor_pengajuan || '-'}
                </Text>
                <Text style={styles.modalKeterangan2}>
                  <Text style={{fontWeight: 'bold'}}>Nama Instansi : </Text>
                  {selectedVisit?.nama_instansi || '-'}
                </Text>
                <Text style={styles.modalKeterangan2}>
                  <Text style={{fontWeight: 'bold'}}>Nama Pendaftar : </Text>
                  {selectedVisit?.atas_nama || '-'}
                </Text>
                <Text style={styles.modalKeterangan2}>
                  <Text style={{fontWeight: 'bold'}}>Jumlah Peserta : </Text>
                  {selectedVisit?.jumlah_peserta || '-'} Orang
                </Text>
                <Text style={styles.modalKeterangan2}>
                  <Text style={{fontWeight: 'bold'}}>Nomor WA : </Text>
                  {selectedVisit?.phone || '-'}
                </Text>
                <Text style={styles.modalKeterangan2}>
                  <Text style={{fontWeight: 'bold'}}>Email Address : </Text>
                  {selectedVisit?.email || '-'}
                </Text>
                <Text style={styles.modalKeterangan2}>
                  <Text style={{fontWeight: 'bold'}}>Bertemu Dengan : </Text>
                  {selectedVisit?.sub_kategori_nama || selectedVisit?.kategori_nama || '-'}
                </Text>
                <Text style={styles.modalKeterangan2}>
                  <Text style={{fontWeight: 'bold'}}>Tanggal Kunjungan : </Text>
                  {formatDateID(selectedVisit?.tanggal_kunjungan)}
                </Text>
                <Text style={styles.modalKeterangan2}>
                  <Text style={{fontWeight: 'bold'}}>Jam Kunjungan : </Text>
                  {selectedVisit?.waktu_kunjungan || '-'} WIB
                </Text>
                <Text style={styles.modalKeterangan3}>
                  <Text style={{fontWeight: 'bold'}}>Keterangan : </Text>
                  {selectedVisit?.tujuan || '-'}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={closeVisitDetail} style={{padding: 10, backgroundColor: '#007BFF', borderRadius: 5, marginRight: 10}}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>Oke</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Animated.View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  modalKeterangan: {
    fontSize: 14,
    textAlign: 'left',
    marginTop: 15,
  },
  modalKeterangan2: {
    fontSize: 14,
    textAlign: 'left',
    marginTop: 3,
  },
  modalKeterangan3: {
    fontSize: 14,
    textAlign: 'left',
    marginTop: 3,
    marginBottom: 15,
  },
});
