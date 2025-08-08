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
  TextInput,
} from 'react-native';

function UbahPassScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleBerhasil = () => {
    setModalVisible(true);
  };

  const [password, setPassword] = useState('');
  const [newpassword, setNewpassword] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <StatusBar backgroundColor="#0386D0" barStyle="white-content" />

      <View style={{marginTop: 15, marginHorizontal: 10, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{
            marginTop: 5,
            marginHorizontal: 5,
            flexDirection: 'row',
          }}>
          <Icon name="navigate-before" size={30} color="#000" />
          <Text
            style={{
              color: '#000',
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

      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          marginHorizontal: 20,
        }}>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 10,
            marginLeft: 10,
            fontFamily: 'DMSans-Regular',
            fontSize: 26,
            //fontWeight: 'bold',
            flex: 1,
          }}>
          Ubah Password
        </Text>
      </View>

      <View style={{marginHorizontal: 10, marginLeft: 35, marginTop: 10}}>
        <Text
          style={{
            fontFamily: 'DMSans-Regular',
            marginTop: 5,
            textAlign: 'center',
            fontSize: 15,
          }}>
          Silahkan ubah sesuai dengan keinginan Anda
        </Text>
      </View>
      <ScrollView style={{marginHorizontal: 20}}>
        <View
          style={{
            marginTop: 20,
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
            Password
          </Text>
          <Text
            style={{
              color: '#000',
              fontFamily: 'DMSans-Regular',
              fontSize: 15,
              marginTop: 20,
            }}>
            Password Baru
          </Text>
          <TextInput
            style={{
              marginTop: 5,
              backgroundColor: '#FFFF',
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#B1B1B1',
              height: 45,
              paddingHorizontal: 10,
            }}
            placeholder="Silahkan masukkan password yang baru"
            value={password}
            onChangeText={setPassword}></TextInput>
          <Text
            style={{
              color: '#000',
              fontFamily: 'DMSans-Regular',
              fontSize: 15,
              marginTop: 20,
            }}>
            Konfirmasi Password Baru
          </Text>
          <TextInput
            style={{
              marginTop: 5,
              backgroundColor: '#FFFF',
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#B1B1B1',
              height: 45,
              paddingHorizontal: 10,
            }}
            placeholder="Silahkan masukkan kembali password"
            value={newpassword}
            onChangeText={setNewpassword}></TextInput>
        </View>

        <TouchableOpacity
          onPress={handleBerhasil}
          style={{
            backgroundColor: password && newpassword ? '#0386D0' : '#ccc',
            marginHorizontal: 30,
            marginTop: 30,
            paddingVertical: 15,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          disabled={!password || !newpassword}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'DMSans-Regular',
              fontWeight: 'semi-bold',
              fontSize: 18,
            }}>
            Kirim
          </Text>
        </TouchableOpacity>

        {/* Modal untuk menampilkan notifikasi perubahan telah dikirim*/}
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
                backgroundColor: '#FFF',
                width: 300,
                padding: 20,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>
                Password Telah Diubah
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  marginBottom: 3,
                }}>
                Password Anda sudah berhasil diubah dengan yang baru
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: '#007BFF',
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}
                onPress={() => navigation.navigate('Profile')}>
                <Text
                  style={{
                    color: '#FFF',
                    fontWeight: 'bold',
                    fontFamily: 'DMSans-Regular',
                  }}>
                  Oke
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Image
          source={require('../../assets/image/cloud.png')}
          style={{
            top: 15,
            alignSelf: 'center',
            width: '90%',
            height: '90%',
            //flex: 1,
          }}
        />
      </ScrollView>
    </View>
  );
}

export default UbahPassScreen;
