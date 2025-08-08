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
} from 'react-native';

function StsPengajuanScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0]; // Nilai awal opacity 1

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in ke tampilan normal
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

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
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        navigation.navigate('Home');
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Hapus event listener saat screen tidak aktif
    }, []),
  );

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
          style={{
            marginTop: 10,
            alignItems: 'flex-end',
            marginLeft: 180,
          }}>
          <Icon name="navigate-before" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            backgroundColor: '#F6F6F6',
            alignSelf: 'center',
            width: 350,
            borderWidth: 1,
            borderColor: '#D8D8D8',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginVertical: 10,
          }}>
          <View style={{marginHorizontal: 15, marginVertical: 15}}>
            <Text
              style={{
                color: '#000000',
                fontWeight: 'bold',
                fontFamily: 'DMSans-Regular',
                fontSize: 20,
              }}>
              Daftar Pengajuan
            </Text>
          </View>

          {/* Pengajuan 1 */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FFFF',
              alignItems: 'flex-start',
              borderColor: '#D8D8D8',
              borderTopWidth: 1,
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
                1.
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
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#000'}}>
                  Kunjungan Bertemu Dewan Komisi A
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
                  Tanggal Kunjungan: 3 Maret 2025
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                    fontFamily: 'DMSans-Regular',
                  }}>
                  Jam Kunjungan: 09.00 WIB
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                    fontFamily: 'DMSans-Regular',
                    marginBottom: 10,
                  }}>
                  Bertemu dengan Dewan Komisi A di ruangan B, untuk berdiskusi
                  masalah C dan .....
                </Text>
              </View>
            </View>
          </View>

          {/* Status 1 */}
          <View
            style={{
              borderTopWidth: 1,
              borderColor: '#D8D8D8',
              padding: 10,
              backgroundColor: '#FFFF',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'DMSans-Regular',
                fontWeight: 'bold',
                fontSize: 13,
              }}>
              Lihat Status :
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                flexDirection: 'row',
                marginLeft: 5,
                backgroundColor: '#A6A6A6',
                padding: 2,
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <View style={{marginLeft: 3}}>
                <Icon name="done" size={18} color="#FFFF" />
              </View>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#FFFF',
                  marginRight: 7,
                  marginLeft: 2,
                  fontSize: 12,
                }}>
                Pending
              </Text>
            </TouchableOpacity>
          </View>

          {/* MODAL POPUP 1*/}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
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
                <Icon name="hourglass-empty" size={45} color="#FFA500" />
                <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>
                  Pengajuan Sedang Diproses
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    marginVertical: 10,
                  }}>
                  Mohon tunggu, pengajuan Anda sedang dalam tahap proses
                  verifikasi.
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: '#A6A6A6',
                    borderRadius: 5,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Tutup
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Pengajuan 2 */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FFFF',
              alignItems: 'flex-start',
              borderColor: '#D8D8D8',
              borderTopWidth: 1,
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
                2.
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
                    textAlign: 'center',
                  }}>
                  Kunjungan Bertemu Bagian Perencanaan dan Keuangan
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
                  Tanggal Kunjungan: 26 Februari 2025
                </Text>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'DMSans-Regular',
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                  }}>
                  Jam Kunjungan : 10.00 WIB
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                    fontFamily: 'DMSans-Regular',
                    marginBottom: 10,
                  }}>
                  Bertemu dengan Bagian Perencanaan dan Keuangan pada ruangan
                  nya, untuk berdiskusi dan .....
                </Text>
              </View>
            </View>
          </View>

          {/* Status 2 */}
          <View
            style={{
              borderTopWidth: 1,
              borderColor: '#D8D8D8',
              padding: 10,
              backgroundColor: '#FFFF',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'DMSans-Regular',
                fontWeight: 'bold',
                fontSize: 13,
              }}>
              Lihat Status :
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible2(true)}
              style={{
                flexDirection: 'row',
                marginLeft: 5,
                backgroundColor: '#1CA31C',
                padding: 2,
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <View style={{marginLeft: 5}}>
                <Icon name="done-all" size={18} color="#FFFF" />
              </View>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#FFFF',
                  marginRight: 7,
                  marginLeft: 4,
                  fontSize: 12,
                }}>
                Diterima
              </Text>
            </TouchableOpacity>
          </View>

          {/* MODAL POPUP 2*/}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible2}
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
                <Icon name="check-circle-outline" size={50} color="#1CA31C" />
                <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>
                  Pengajuan Diterima
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    marginVertical: 10,
                  }}>
                  Silahkan datang dan berdiskusi pada tanggal dan jam yang sudah
                  ditentukan.
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible2(false)}
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: '#A6A6A6',
                    borderRadius: 5,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Tutup
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Pengajuan 3 */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FFFF',
              alignItems: 'flex-start',
              borderColor: '#D8D8D8',
              borderTopWidth: 1,
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
                3.
              </Text>
            </View>
            <View style={{flex: 1}}>
              <View
                style={{
                  backgroundColor: '#97D9E4',
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  // borderTopWidth: 1,
                  borderColor: '#D8D8D8',
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#000'}}>
                  Kunjungan Bertemu Badan Anggaran
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
                  Tanggal Kunjungan: 24 Februari 2025
                </Text>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'DMSans-Regular',
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                  }}>
                  Jam Kunjungan : 08.00 WIB
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                    fontFamily: 'DMSans-Regular',
                    marginBottom: 10,
                  }}>
                  Bertemu dengan Badan Anggaran di ruang rapat, untuk berdiskusi
                  masalah anggaran yang ada dan .....
                </Text>
              </View>
            </View>
          </View>

          {/* Status 3 */}
          <View
            style={{
              animationType: 'fade',
              borderTopWidth: 1,
              borderColor: '#D8D8D8',
              padding: 10,
              backgroundColor: '#FFFF',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'DMSans-Regular',
                fontWeight: 'bold',
                fontSize: 13,
              }}>
              Lihat Status :
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible3(true)}
              style={{
                flexDirection: 'row',
                marginLeft: 5,
                backgroundColor: '#C32A2A',
                padding: 2,
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <Icon name="priority-high" size={18} color="#FFFF" />
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#FFFF',
                  marginRight: 7,
                  fontSize: 12,
                }}>
                Ditolak
              </Text>
            </TouchableOpacity>
          </View>

          {/* MODAL POPUP 3*/}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible3}
            onRequestClose={() => setModalVisible3(false)}>
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
                <Icon name="highlight-remove" size={50} color="#C32A2A" />
                <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>
                  Pengajuan Ditolak
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    marginVertical: 10,
                  }}>
                  Mohon buat pengajuan kembali dengan data yang benar dan
                  lengkap, atau mungkin terdapat kesalahan pada surat yang Anda
                  kirim.
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible3(false)}
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: '#A6A6A6',
                    borderRadius: 5,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Tutup
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

export default StsPengajuanScreen;
