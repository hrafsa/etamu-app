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
} from 'react-native';

function HomeScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [ketVisible, setKetVisible] = useState(false);
  const [ketVisible2, setKetVisible2] = useState(false);
  const [ketVisible3, setKetVisible3] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
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
        setModalVisible(true);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Hapus event listener saat screen tidak aktif
    }, []),
  );

  const handleKeluar = () => {
    setModalVisible(true);
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
          Hello (Nama User),
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
        <View style={{flexDirection: 'column', flex: 1}}>
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
              Kunjungan Bertemu Dewan Komisi E
            </Text>
          </View>

          {/* Modal Keterangan */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={ketVisible}
            onRequestClose={() => setKetVisible(false)}>
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
                  //alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Keterangan
                </Text>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    marginVertical: 10,
                    borderColor: '#B1B1B1',
                  }}>
                  <Text style={styles.modalKeterangan}>
                    <Text style={{fontWeight: 'bold'}}>Nama Instansi : </Text>
                    DPRD Kota Tanggerang
                  </Text>
                  <Text style={styles.modalKeterangan2}>
                    <Text style={{fontWeight: 'bold'}}>Nama Pendafatar : </Text>
                    Budi
                  </Text>
                  <Text style={styles.modalKeterangan2}>
                    <Text style={{fontWeight: 'bold'}}>Jumlah Peserta : </Text>5
                    Orang
                  </Text>
                  <Text style={styles.modalKeterangan2}>
                    <Text style={{fontWeight: 'bold'}}>Nomor WA : </Text>
                    08123456789
                  </Text>
                  <Text style={styles.modalKeterangan2}>
                    <Text style={{fontWeight: 'bold'}}>Bertemu Dengan : </Text>
                    Dewan Komisi E
                  </Text>
                  <Text style={styles.modalKeterangan2}>
                    <Text style={{fontWeight: 'bold'}}>
                      Tanggal Kunjungan :{' '}
                    </Text>
                    16 Januari 2025
                  </Text>
                  <Text style={styles.modalKeterangan2}>
                    <Text style={{fontWeight: 'bold'}}>Jam Kunjungan : </Text>
                    08.00 WIB
                  </Text>
                  <Text style={styles.modalKeterangan3}>
                    <Text style={{fontWeight: 'bold'}}>Keterangan : </Text>
                    Bertemu dengan Dewan Komisi E di ruangan A, untuk berdiskusi
                    masalah perihal masalah yang ada
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => setKetVisible(false)}
                    style={{
                      padding: 10,
                      backgroundColor: '#007BFF',
                      borderRadius: 5,
                      marginRight: 10,
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Oke
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

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
              onPress={handleKeterangan}
              style={{
                flex: 1,
                backgroundColor: '#FFFF',
                alignContent: 'center',
                //elevation: 5,
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
                Tanggal Kunjungan: 16 Januari 2025
              </Text>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'DMSans-Regular',
                  fontSize: 12,
                  marginTop: 7,
                }}>
                Jam Kunjungan : 08.00 WIB
              </Text>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'DMSans-Regular',
                  fontSize: 12,
                  marginTop: 7,
                }}>
                Bertemu dengan Dewan Komisi E di ruangan A, untuk berdiskusi
                perihal .....
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'column', flex: 1}}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#97D9E4',
              marginTop: 30,
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
              Kunjungan Bertemu Bagian Umum
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
              onPress={handleKeterangan2}
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
                Tanggal Kunjungan: 3 Februari 2025
              </Text>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'DMSans-Regular',
                  fontSize: 12,
                  marginTop: 7,
                }}>
                Jam Kunjungan : 10.00 WIB
              </Text>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'DMSans-Regular',
                  fontSize: 12,
                  marginTop: 7,
                }}>
                Bertemu dengan Bagian Umum di ruang Bagian Umum, membicarakan
                mengenai perihal .....
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal Keterangan 2 */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={ketVisible2}
          onRequestClose={() => setKetVisible2(false)}>
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
                //alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                Keterangan
              </Text>
              <View
                style={{
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  borderColor: '#B1B1B1',
                }}>
                <Text style={styles.modalKeterangan}>
                  <Text style={{fontWeight: 'bold'}}>Nama Instansi : </Text>
                  DPRD Kota Semarang
                </Text>
                <Text style={styles.modalKeterangan2}>
                  <Text style={{fontWeight: 'bold'}}>Nama Pendafatar : </Text>
                  Melisa
                </Text>
                <Text style={styles.modalKeterangan2}>
                  <Text style={{fontWeight: 'bold'}}>Jumlah Peserta : </Text>7
                  Orang
                </Text>
                <Text style={styles.modalKeterangan2}>
                  <Text style={{fontWeight: 'bold'}}>Nomor WA : </Text>
                  08123576890
                </Text>
                <Text style={styles.modalKeterangan2}>
                  <Text style={{fontWeight: 'bold'}}>Bertemu Dengan : </Text>
                  Bagian Umum
                </Text>
                <Text style={styles.modalKeterangan2}>
                  <Text style={{fontWeight: 'bold'}}>Tanggal Kunjungan : </Text>
                  3 Februari 2025
                </Text>
                <Text style={styles.modalKeterangan2}>
                  <Text style={{fontWeight: 'bold'}}>Jam Kunjungan : </Text>
                  10.00 WIB
                </Text>
                <Text style={styles.modalKeterangan3}>
                  <Text style={{fontWeight: 'bold'}}>Keterangan : </Text>
                  Bertemu dengan Bagian Umum di ruang Bagian Umum, membicarakan
                  mengenai perihal masalah yang ada
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setKetVisible2(false)}
                  style={{
                    padding: 10,
                    backgroundColor: '#007BFF',
                    borderRadius: 5,
                    marginRight: 10,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>Oke</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{flexDirection: 'column', flex: 1}}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#97D9E4',
              marginTop: 30,
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
              Kunjungan Bertemu Pimpinan Dewan
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
              onPress={handleKeterangan3}
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
                Tanggal Kunjungan: 17 Februari 2025
              </Text>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'DMSans-Regular',
                  fontSize: 12,
                  marginTop: 7,
                }}>
                Jam Kunjungan : 13.30 WIB
              </Text>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'DMSans-Regular',
                  fontSize: 12,
                  marginTop: 7,
                }}>
                Bertemu dengan Pimpinan Dewan di ruang rapat dewan, berdiskusi
                mengenai hal .....
              </Text>
            </TouchableOpacity>
          </View>

          {/* Modal Keterangan 3 */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={ketVisible3}
            onRequestClose={() => setKetVisible3(false)}>
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
                  //alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  Keterangan
                </Text>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    marginVertical: 10,
                    borderColor: '#B1B1B1',
                  }}>
                  <Text style={styles.modalKeterangan}>
                    <Text style={{fontWeight: 'bold'}}>Nama Instansi : </Text>
                    DPRD Kota Jambi
                  </Text>
                  <Text style={styles.modalKeterangan2}>
                    <Text style={{fontWeight: 'bold'}}>Nama Pendafatar : </Text>
                    Anto
                  </Text>
                  <Text style={styles.modalKeterangan2}>
                    <Text style={{fontWeight: 'bold'}}>Jumlah Peserta : </Text>3
                    Orang
                  </Text>
                  <Text style={styles.modalKeterangan2}>
                    <Text style={{fontWeight: 'bold'}}>Nomor WA : </Text>
                    08139987009
                  </Text>
                  <Text style={styles.modalKeterangan2}>
                    <Text style={{fontWeight: 'bold'}}>Bertemu Dengan : </Text>
                    Pimpinan Dewan
                  </Text>
                  <Text style={styles.modalKeterangan2}>
                    <Text style={{fontWeight: 'bold'}}>
                      Tanggal Kunjungan :{' '}
                    </Text>
                    17 Februari 2025
                  </Text>
                  <Text style={styles.modalKeterangan2}>
                    <Text style={{fontWeight: 'bold'}}>Jam Kunjungan : </Text>
                    13.30 WIB
                  </Text>
                  <Text style={styles.modalKeterangan3}>
                    <Text style={{fontWeight: 'bold'}}>Keterangan : </Text>
                    Bertemu dengan Pimpinan Dewan di ruang rapat dewan, untuk
                    berdiskusi mengenai hal yang berkaitan dengan masalah yang
                    ada
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => setKetVisible3(false)}
                    style={{
                      padding: 10,
                      backgroundColor: '#007BFF',
                      borderRadius: 5,
                      marginRight: 10,
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Oke
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
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

        {/* Modal Konfirmasi */}
        <Modal transparent={true} visible={modalVisible}>
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
                Apakah Anda yakin ingin keluar dari E-Tamu?
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
                  onPress={() => {
                    setModalVisible(false);
                    setSuccessModalVisible(true);
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

        {/* Modal Sukses */}
        <Modal
          // animationType="fade"
          transparent={true}
          visible={successModalVisible}>
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
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Sampai Jumpa
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                Anda telah keluar dari aplikasi E-Tamu, Sampai Jumpa...
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSuccessModalVisible(false);
                  navigation.navigate('Login');
                }}
                style={{
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: '#007bff',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Oke</Text>
              </TouchableOpacity>
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
