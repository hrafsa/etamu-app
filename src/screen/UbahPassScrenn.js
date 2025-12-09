import React, {useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import {useAuth} from '../auth/AuthContext';

function UbahPassScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const {changePassword} = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({}); // { current_password?, password?, password_confirmation? }

  const handleBerhasil = () => {
    setModalVisible(true);
  };

  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [newpassword, setNewpassword] = useState('');

  const canSubmit = currentPassword && password && newpassword;

  const onSubmit = async () => {
    setErrorMsg('');
    setFieldErrors({});
    if (!canSubmit) {
      return;
    }

    setSubmitting(true);
    try {
      await changePassword({
        current_password: currentPassword,
        password: password,
        password_confirmation: newpassword,
      });
      handleBerhasil();
      // Reset fields after success
      setCurrentPassword('');
      setPassword('');
      setNewpassword('');
    } catch (e) {
      // Prefer field-level errors if present
      const apiErrors = e?.data?.errors;
      if (apiErrors && typeof apiErrors === 'object') {
        // Map only relevant fields; pick first message
        const mapped = {};
        if (apiErrors.current_password?.length) {
          mapped.current_password = apiErrors.current_password[0];
        }
        if (apiErrors.password?.length) {
          mapped.password = apiErrors.password[0];
        }
        if (apiErrors.password_confirmation?.length) {
          mapped.password_confirmation = apiErrors.password_confirmation[0];
        }
        setFieldErrors(mapped);
      } else {
        const msg = e?.message || e?.data?.message || 'Gagal mengubah password';
        setErrorMsg(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

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

          {/* Password Lama */}
          <Text
            style={{
              color: '#000',
              fontFamily: 'DMSans-Regular',
              fontSize: 15,
              marginTop: 20,
            }}>
            Password Lama
          </Text>
          <TextInput
            style={{
              marginTop: 5,
              backgroundColor: '#FFFF',
              borderRadius: 15,
              borderWidth: 1,
              borderColor: fieldErrors.current_password ? '#C32A2A' : '#B1B1B1',
              height: 45,
              paddingHorizontal: 10,
            }}
            placeholder="Masukkan password lama"
            value={currentPassword}
            onChangeText={(v) => {
              setCurrentPassword(v);
              if (fieldErrors.current_password) {
                setFieldErrors(prev => ({...prev, current_password: undefined}));
              }
            }}
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
          />
          {fieldErrors.current_password ? (
            <Text style={{color: '#C32A2A', fontSize: 12, marginTop: 4}}>{fieldErrors.current_password}</Text>
          ) : null}

          {/* Password Baru */}
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
              borderColor: fieldErrors.password ? '#C32A2A' : '#B1B1B1',
              height: 45,
              paddingHorizontal: 10,
            }}
            placeholder="Silahkan masukkan password yang baru"
            value={password}
            onChangeText={(v) => {
              setPassword(v);
              if (fieldErrors.password) {
                setFieldErrors(prev => ({...prev, password: undefined}));
              }
            }}
            autoCapitalize="none"
            textContentType="newPassword"
            secureTextEntry
          />
          {fieldErrors.password ? (
            <Text style={{color: '#C32A2A', fontSize: 12, marginTop: 4}}>{fieldErrors.password}</Text>
          ) : null}

          {/* Konfirmasi Password Baru */}
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
              borderColor: fieldErrors.password_confirmation ? '#C32A2A' : '#B1B1B1',
              height: 45,
              paddingHorizontal: 10,
            }}
            placeholder="Silahkan masukkan kembali password"
            value={newpassword}
            onChangeText={(v) => {
              setNewpassword(v);
              if (fieldErrors.password_confirmation) {
                setFieldErrors(prev => ({...prev, password_confirmation: undefined}));
              }
            }}
            autoCapitalize="none"
            textContentType="newPassword"
            secureTextEntry
          />
          {fieldErrors.password_confirmation ? (
            <Text style={{color: '#C32A2A', fontSize: 12, marginTop: 4}}>{fieldErrors.password_confirmation}</Text>
          ) : null}

          {/* General error for non-validation issues */}
          {errorMsg ? (
            <Text style={{color: 'red', marginTop: 12}}>{errorMsg}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          onPress={onSubmit}
          style={{
            backgroundColor: canSubmit ? '#0386D0' : '#ccc',
            marginHorizontal: 30,
            marginTop: 30,
            paddingVertical: 15,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 8,
          }}
          disabled={!canSubmit || submitting}>
          {submitting ? (
            <ActivityIndicator color="#FFFFFF" style={{marginRight: 8}} />
          ) : null}
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'DMSans-Regular',
              fontWeight: 'semi-bold',
              fontSize: 18,
            }}>
            {submitting ? 'Menyimpan...' : 'Simpan'}
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
