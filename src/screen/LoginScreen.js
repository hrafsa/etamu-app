import React, {useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {useAuth} from '../auth/AuthContext';

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible2, setModalVisible2] = useState(false);
  const [successModalVisible2, setSuccessModalVisible2] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const {login} = useAuth();

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        setModalVisible2(true);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Hapus event listener saat screen tidak aktif
    }, []),
  );

  async function handleLogin() {
    if (!email || !password) {
      return;
    }
    setErrorMsg('');
    setSubmitting(true);
    try {
      await login({email, password});
      // Auth stack will switch to AppStack automatically
    } catch (e) {
      const message = e?.message || e?.data?.message || 'Login gagal, periksa kredensial Anda.';
      setErrorMsg(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View>
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
          Login
        </Text>

        <Text style={{textAlign: 'center', fontSize: 14, flex: 1}}>
          Silahkan masukkan email dan password anda
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
                color: '#036BB9',
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
                color: '#A6A6A6',
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
            flexDirection: 'row',
            marginHorizontal: 30,
            marginTop: 30,
            flex: 1,
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
            onChangeText={text => setEmail(text)}
            secureTextEntry={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />
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
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        {!!errorMsg && (
          <Text style={{color: '#C32A2A', marginHorizontal: 30, marginTop: 10}}>{errorMsg}</Text>
        )}
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              flex: 1,
              backgroundColor: email && password ? '#0386D0' : '#ccc',
              marginHorizontal: 30,
              marginTop: 40,
              paddingVertical: 15,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: submitting ? 0.8 : 1,
            }}
            disabled={!email || !password || submitting}>
            {submitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'DMSans-Regular',
                  fontWeight: 'semi-bold',
                  fontSize: 18,
                }}>
                Login
              </Text>
            )}
          </TouchableOpacity>

          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LupaPassword')}>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'right',
                  marginTop: 20,
                  marginHorizontal: 30,
                  color: '#0386D0',
                  fontFamily: 'DMSans-Regular',
                  fontWeight: 'semi-bold',
                  fontSize: 14,
                }}>
                Lupa Password?
              </Text>
            </TouchableOpacity>
          </View>


          <View
            style={{
              flex: 1,
            }}>
            <Image
              source={require('../../assets/image/bawah.png')}
              style={{
                position: 'absolute',
                top: 0,
                width: 530,
                height: 400,
                alignSelf: 'center',
              }}
            />
          </View>
        </View>

        {/* Modal Konfirmasi */}
        <Modal transparent={true} visible={modalVisible2}>
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
                  onPress={() => setModalVisible2(false)}
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
                    setModalVisible2(false);
                    setSuccessModalVisible2(true);
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
        <Modal transparent={true} visible={successModalVisible2}>
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
                  setSuccessModalVisible2(false);
                  BackHandler.exitApp();
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
    </ScrollView>
  );
}

export default LoginScreen;
