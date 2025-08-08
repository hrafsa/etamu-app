import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  StatusBar,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  Animated,
} from 'react-native';

function NotifikasiScreen({navigation}) {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0]; // Nilai awal opacity 1

  const handleKeluar = () => {
    setModalVisible(true);
  };

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

  return (
    <Animated.View
      style={{flex: 1, backgroundColor: 'white', opacity: fadeAnim}}>
      <StatusBar backgroundColor="#3DB2FF" barStyle="white-content" />
      <Image
        source={require('../../assets/image/coba.png')}
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '47%',
        }}
        resizeMode="cover"
      />
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            marginTop: 5,
            flexDirection: 'row',
          }}>
          <Icon name="navigate-before" size={30} color="#FFFF" />
          <Text
            style={{
              color: '#FFFF',
              fontFamily: 'DMSans-Regular',
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: 6,
              fontSize: 16,
            }}>
            Kembali
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 5,
          }}>
          <Text
            style={{
              color: '#FFFF',
              fontFamily: 'DMSans-Regular',
              fontSize: 24,
            }}>
            Notifikasi
          </Text>
          <Text
            style={{
              color: '#FFFF',
              fontFamily: 'DMSans-Regular',
              fontSize: 14,
              marginTop: 5,
            }}>
            Ayo lihat pemberitahuan baru
          </Text>
        </View>

        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              marginTop: 45,
              backgroundColor: '#FFFF',
              padding: 10,
              borderColor: '#00000020',
              borderBottomWidth: 5,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderRadius: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 2,
              }}>
              <Icon name="description" size={20} color="#000" />
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: 5,
                  fontFamily: 'DMSans-Regular',
                  fontSize: 14,
                  fontWeight: '700',
                }}>
                Pengajuan Anda Diterima
              </Text>
            </View>
            <Text
              style={{
                marginLeft: 20,
                marginTop: 3,
                fontFamily: 'DMSans-Regular',
                fontSize: 12,
              }}>
              Pengajuan Anda untuk bertemu Bagian Perencanaan dan Keuangan telah
              diterima.
            </Text>
          </View>

          <View
            style={{
              marginTop: 20,
              backgroundColor: '#FFFF',
              padding: 10,
              borderColor: '#00000020',
              borderBottomWidth: 5,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderRadius: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 2,
              }}>
              <Icon name="description" size={20} color="#000" />
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: 5,
                  fontFamily: 'DMSans-Regular',
                  fontSize: 14,
                  fontWeight: '700',
                }}>
                Pengajuan Anda Sedang Diproses
              </Text>
            </View>
            <Text
              style={{
                marginLeft: 20,
                marginTop: 3,
                fontFamily: 'DMSans-Regular',
                fontSize: 12,
              }}>
              Pengajuan Anda untuk bertemu Dewan Komisi A sedang diproses.
            </Text>
          </View>

          <View
            style={{
              marginTop: 20,
              backgroundColor: '#FFFF',
              padding: 10,
              borderColor: '#00000020',
              borderBottomWidth: 5,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderRadius: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 2,
              }}>
              <Icon name="description" size={20} color="#000" />
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: 5,
                  fontFamily: 'DMSans-Regular',
                  fontSize: 14,
                  fontWeight: '700',
                }}>
                Pengajuan Anda Ditolak
              </Text>
            </View>
            <Text
              style={{
                marginLeft: 20,
                marginTop: 3,
                fontFamily: 'DMSans-Regular',
                fontSize: 12,
              }}>
              Pengajuan Anda untuk bertemu Badan Anggaran telah ditolak.
            </Text>
          </View>
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
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{marginLeft: 3}}>
            <Icon name="home" size={30} color="#8E91A0" />
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
            <Icon name="notifications" size={30} color="#469FD1" />
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
        <Modal transparent={true} visible={successModalVisible}>
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

export default NotifikasiScreen;
