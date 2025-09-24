import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';

function RegisterScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [phone, setPhone] = useState('');
  const [fixpassword, setFixpassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleRegister = () => {
    if (email && password && user && phone && fixpassword) {
      setModalVisible(true);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={{flex: 1}}>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 28,
            fontFamily: 'DMSans-Regular',
            fontWeight: 'semi-bold',
            marginTop: 30,
            marginBottom: 10,
          }}>
          Register
        </Text>

        <Text style={{textAlign: 'center', fontSize: 14, flex: 1}}>
          Silahkan buat akun anda dengan mengisi form berikut
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
            marginHorizontal: 100,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={{
                flex: 1,
                color: '#A6A6A6',
                fontFamily: 'DMSans-Regular',
                fontWeight: 'semi-bold',
                fontSize: 18,
                textdecoration: 'underline',
              }}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                flex: 1,
                color: '#036BB9',
                fontFamily: 'DMSans-Regular',
                fontWeight: 'semi-bold',
                fontSize: 18,
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              paddingVertical: 12,
              width: 40,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderColor: '#CFCFCF',
            }}>
            <Icon name="person" size={25} color="#A6A6A6" />
          </View>
          <TextInput
            value={user}
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderRightWidth: 1,
              borderColor: '#CFCFCF',
            }}
            placeholder="Nama Lengkap"
            onChangeText={Text => setUser(Text)}
            secureTextEntry={false}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 30,
            marginTop: 12,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              paddingVertical: 12,
              width: 40,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderColor: '#CFCFCF',
            }}>
            <Icon name="phone" size={25} color="#A6A6A6" />
          </View>
          <TextInput
            value={phone}
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderRightWidth: 1,
              borderColor: '#CFCFCF',
            }}
            placeholder="Nomor Telephone WA"
            onChangeText={text => {
              // Filter hanya angka
              const numericText = text.replace(/[^0-9]/g, '');
              setPhone(numericText);
            }}
            keyboardType="phone-pad"
            maxLength={15}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 30,
            marginTop: 12,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              paddingVertical: 12,
              width: 40,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderColor: '#CFCFCF',
            }}>
            <Icon name="mail" size={25} color="#A6A6A6" />
          </View>
          <TextInput
            value={email}
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderRightWidth: 1,
              borderColor: '#CFCFCF',
            }}
            placeholder="Email Address"
            onChangeText={Text => setEmail(Text)}
            secureTextEntry={false}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 30,
            marginTop: 12,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              paddingVertical: 12,
              width: 40,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderColor: '#CFCFCF',
            }}>
            <Icon name="lock" size={25} color="#A6A6A6" />
          </View>
          <TextInput
            value={password}
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderRightWidth: 1,
              borderColor: '#CFCFCF',
            }}
            placeholder="Password"
            onChangeText={Text => setPassword(Text)}
            secureTextEntry={true}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 30,
            marginTop: 12,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              paddingVertical: 12,
              width: 40,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderColor: '#CFCFCF',
            }}>
            <Icon name="lock-clock" size={25} color="#A6A6A6" />
          </View>
          <TextInput
            value={fixpassword}
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderRightWidth: 1,
              borderColor: '#CFCFCF',
            }}
            placeholder="Confirm Password"
            onChangeText={Text => setFixpassword(Text)}
            secureTextEntry={true}
          />
        </View>

        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={handleRegister}
            style={{
              flex: 1,
              backgroundColor:
                email && password && user && phone && fixpassword
                  ? '#0386D0'
                  : '#ccc',
              marginHorizontal: 30,
              marginTop: 20,
              paddingVertical: 15,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontFamily: 'DMSans-Regular',
                fontWeight: 'semi-bold',
                fontSize: 18,
              }}>
              Register
            </Text>
          </TouchableOpacity>

          {/* Modal untuk menampilkan notifikasi register berhasil */}
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
                  Register Berhasil
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    marginBottom: 3,
                  }}>
                  Silahkan lakukan login dengan email dan password yang sudah
                  dibuat
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    backgroundColor: '#007BFF',
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                  }}
                  onPress={() => navigation.navigate('Login')}>
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

          <View
            style={{
              flex: 1,
            }}>
            <Image
              source={require('../../assets/image/image_1.png')}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default RegisterScreen;
