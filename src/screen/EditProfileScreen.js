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

function EditProfileScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleBerhasil = () => {
    setModalVisible(true);
  };

  const [user, setUser] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

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
            flex: 1,
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
          Edit Profile
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
      <ScrollView style={{marginHorizontal: 20, flex: 1}}>
        <View
          style={{
            flex: 1,
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
            placeholder="Silahkan masukkan nama lengkap"
            value={user}
            onChangeText={setUser}></TextInput>
          <Text
            style={{
              color: '#000',
              fontFamily: 'DMSans-Regular',
              fontSize: 15,
              marginTop: 20,
            }}>
            Nomor Whatsapp (jika ingin diganti)
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
            placeholder="Silahkan masukkan Nomor WA"
            value={phone}
            onChangeText={text => {
              // Filter hanya angka
              const numericText = text.replace(/[^0-9]/g, '');
              setPhone(numericText);
            }}
            keyboardType="phone-pad"
            maxLength={15}
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'DMSans-Regular',
              fontSize: 15,
              marginTop: 20,
            }}>
            Email Address (jika ingin diganti)
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
              marginBottom: 10,
            }}
            placeholder="Silahkan masukkan email baru"
            value={email}
            onChangeText={setEmail}></TextInput>
        </View>

        <TouchableOpacity
          onPress={handleBerhasil}
          style={{
            backgroundColor: user ? '#0386D0' : '#ccc',
            marginHorizontal: 30,
            marginTop: 30,
            paddingVertical: 15,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          disabled={!user}>
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
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
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
                Profile Telah Diubah
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  marginBottom: 3,
                }}>
                Profile Anda sudah berhasil diubah
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
            alignSelf: 'center',
            width: '80%',
            height: '55%',
            //flex: 1,
          }}
        />
      </ScrollView>
    </View>
  );
}

export default EditProfileScreen;
