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

function ProfileScreen({navigation}) {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0]; // Nilai awal opacity 1

  const [user, setUser] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in ke tampilan normal
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleKeluar = () => {
    setModalVisible(true);
  };

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
        source={require('../../assets/image/profile_atas.png')}
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '28%',
        }}
        resizeMode="cover"
      />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{marginTop: 15, marginHorizontal: 10, flexDirection: 'row'}}>
          <Text
            style={{
              color: '#FFFF',
              fontFamily: 'DMSans-Regular',
              marginTop: 10,
              marginLeft: 10,
              fontSize: 20,
            }}>
            Edit Profile
          </Text>
        </View>

        <View
          style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 20}}>
          <View
            style={{
              marginTop: 5,
              backgroundColor: '#D6CBFC',
              marginLeft: 10,
              padding: 15,
              borderRadius: 40,
            }}>
            <Icon name="person" size={50} color="#FFFF" />
          </View>
          <Text
            style={{
              marginTop: 40,
              marginLeft: 10,
              fontFamily: 'DMSans-Regular',
              fontSize: 20,
              flex: 1,
            }}>
            Nama User
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={{
              alignSelf: 'flex-end',
              marginBottom: 20,
              marginRight: 10,
            }}>
            <Icon name="edit-square" size={40} color="#333333" />
          </TouchableOpacity>
        </View>

        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              marginTop: 30,
              marginHorizontal: 15,
              padding: 15,
              backgroundColor: '#FFFF',
              borderWidth: 1,
              borderColor: '#00000020',
            }}>
            <Text
              style={{
                color: '#000000',
                //fontWeight: 'bold',
                fontFamily: 'DMSans-Regular',
                fontSize: 20,
              }}>
              Data Pribadi
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: 'DMSans-Regular',
                fontSize: 15,
                marginTop: 20,
              }}>
              Nama Lengkap
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: 'DMSans-Regular',
                fontSize: 15,
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              Nama User
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: 'DMSans-Regular',
                fontSize: 15,
                marginTop: 10,
              }}>
              Nomor Whatsapp
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: 'DMSans-Regular',
                fontSize: 15,
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              081376559822
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: 'DMSans-Regular',
                fontSize: 15,
                marginTop: 10,
              }}>
              Email
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: 'DMSans-Regular',
                fontSize: 15,
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              user123@gmail.com
            </Text>

            <Text
              style={{
                color: '#000',
                fontFamily: 'DMSans-Regular',
                fontSize: 15,
                marginTop: 10,
                flex: 1,
              }}>
              Password
            </Text>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'DMSans-Regular',
                  fontSize: 15,
                  marginLeft: 10,
                  fontWeight: 'bold',
                  flex: 1,
                }}>
                {isPasswordVisible ? 'Pass_123' : '*****'}
              </Text>
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Icon
                  name={isPasswordVisible ? 'visibility-off' : 'visibility'}
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('UbahPass')}
              style={{flexDirection: 'row', marginTop: 15}}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'DMSans-Regular',
                  fontSize: 16,
                  flex: 1,
                }}>
                Ubah Password
              </Text>
              <Icon name="arrow-forward-ios" size={18} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 20}}>
            <Text style={{fontFamily: 'DMSans-Regular'}}>
              * Harap diingat email dan Password yang Anda buat untuk akun ini
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
            <Icon name="person" size={30} color="#469FD1" />
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

export default ProfileScreen;
