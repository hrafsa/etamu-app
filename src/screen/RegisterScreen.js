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
  ActivityIndicator,
} from 'react-native';
import {useAuth} from '../auth/AuthContext';

function RegisterScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [phone, setPhone] = useState('');
  const [fixpassword, setFixpassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  // state untuk error per field sesuai key dari API (name, email, phone, password, password_confirmation)
  const [fieldErrors, setFieldErrors] = useState({});
  const {register, login} = useAuth();

  // Normalisasi nomor telepon: hanya digit, dan jika diawali "0" ubah ke "62"
  const normalizePhone = (value) => {
    const digits = (value || '').replace(/\D/g, '');
    if (digits.startsWith('0')) return `62${digits.slice(1)}`;
    if (digits.startsWith('+62')) return digits.replace(/^\+/, '');
    return digits;
  };

  const handleRegister = async () => {
    if (!email || !password || !user || !phone || !fixpassword) return;
    // Reset error global & field
    setErrorMsg('');
    setFieldErrors({});

    setSubmitting(true);
    try {
      const payload = {
        name: user,
        email: email,
        phone: normalizePhone(phone),
        password: password,
        password_confirmation: fixpassword,
      };
      const res = await register(payload);
      if (!res?.token) {
        try {
          await login({email, password});
        } catch (e) {
          // ignore
        }
      }
      setModalVisible(true);
    } catch (e) {
      const apiErrors = e?.data?.errors;
      if (apiErrors && typeof apiErrors === 'object') {
        const parsed = {};
        Object.entries(apiErrors).forEach(([k, v]) => {
          if (Array.isArray(v)) parsed[k] = v[0];
          else if (typeof v === 'string') parsed[k] = v;
        });
        // Jika pesan mismatch hanya ada di password, duplikasi ke konfirmasi
        if (parsed.password && /confirmation/i.test(parsed.password) && !parsed.password_confirmation) {
          parsed.password_confirmation = parsed.password;
        }
        setFieldErrors(parsed);
        setErrorMsg(e?.data?.message || e?.message || 'Registrasi gagal');
      } else {
        const message = e?.message || e?.data?.message || 'Registrasi gagal, periksa data Anda.';
        setErrorMsg(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Helper untuk styling border: jika ada error field => merah
  const inputBorder = hasError => ({
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: hasError ? '#C32A2A' : '#CFCFCF',
    backgroundColor: '#FFFFFF',
    flex: 1,
  });

  const iconBoxStyle = hasError => ({
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
    borderColor: hasError ? '#C32A2A' : '#CFCFCF',
  });

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

        {/* NAME */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          <View style={iconBoxStyle(!!fieldErrors.name)}>
            <Icon name="person" size={25} color={fieldErrors.name ? '#C32A2A' : '#A6A6A6'} />
          </View>
          <TextInput
            value={user}
            style={inputBorder(!!fieldErrors.name)}
            placeholder="Nama Lengkap"
            onChangeText={Text => {
              setUser(Text);
              if (fieldErrors.name) setFieldErrors(prev => ({...prev, name: undefined}));
            }}
            secureTextEntry={false}
          />
        </View>
        {!!fieldErrors.name && (
          <Text style={{color: '#C32A2A', marginHorizontal: 30, marginTop: 4, fontSize: 12}}>
            {fieldErrors.name}
          </Text>
        )}

        {/* PHONE */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 30,
            marginTop: 12,
          }}>
          <View style={iconBoxStyle(!!fieldErrors.phone)}>
            <Icon name="phone" size={25} color={fieldErrors.phone ? '#C32A2A' : '#A6A6A6'} />
          </View>
          <TextInput
            value={phone}
            style={inputBorder(!!fieldErrors.phone)}
            placeholder="Nomor Telephone WA"
            onChangeText={text => {
              const normalized = normalizePhone(text);
              setPhone(normalized);
              if (fieldErrors.phone) setFieldErrors(prev => ({...prev, phone: undefined}));
            }}
            keyboardType="phone-pad"
            maxLength={15}
          />
        </View>
        {!!fieldErrors.phone && (
          <Text style={{color: '#C32A2A', marginHorizontal: 30, marginTop: 4, fontSize: 12}}>
            {fieldErrors.phone}
          </Text>
        )}

        {/* EMAIL */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 30,
            marginTop: 12,
          }}>
          <View style={iconBoxStyle(!!fieldErrors.email)}>
            <Icon name="mail" size={25} color={fieldErrors.email ? '#C32A2A' : '#A6A6A6'} />
          </View>
          <TextInput
            value={email}
            style={inputBorder(!!fieldErrors.email)}
            placeholder="Email Address"
            onChangeText={Text => {
              setEmail(Text);
              if (fieldErrors.email) setFieldErrors(prev => ({...prev, email: undefined}));
            }}
            secureTextEntry={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        {!!fieldErrors.email && (
          <Text style={{color: '#C32A2A', marginHorizontal: 30, marginTop: 4, fontSize: 12}}>
            {fieldErrors.email}
          </Text>
        )}

        {/* PASSWORD */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 30,
            marginTop: 12,
          }}>
          <View style={iconBoxStyle(!!fieldErrors.password)}>
            <Icon name="lock" size={25} color={fieldErrors.password ? '#C32A2A' : '#A6A6A6'} />
          </View>
          <TextInput
            value={password}
            style={inputBorder(!!fieldErrors.password)}
            placeholder="Password"
            onChangeText={Text => {
              setPassword(Text);
              setFieldErrors(prev => {
                const next = {...prev};
                if (next.password) next.password = undefined;
                if (Text === fixpassword && next.password_confirmation) next.password_confirmation = undefined;
                return next;
              });
            }}
            secureTextEntry={true}
          />
        </View>
        {!!fieldErrors.password && (
          <Text style={{color: '#C32A2A', marginHorizontal: 30, marginTop: 4, fontSize: 12}}>
            {fieldErrors.password}
          </Text>
        )}

        {/* CONFIRM PASSWORD */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 30,
            marginTop: 12,
          }}>
            <View style={iconBoxStyle(!!fieldErrors.password_confirmation)}>
              <Icon name="lock-clock" size={25} color={fieldErrors.password_confirmation ? '#C32A2A' : '#A6A6A6'} />
            </View>
            <TextInput
              value={fixpassword}
              style={inputBorder(!!fieldErrors.password_confirmation)}
              placeholder="Confirm Password"
              onChangeText={Text => {
                setFixpassword(Text);
                setFieldErrors(prev => {
                  const next = {...prev};
                  if (next.password_confirmation) next.password_confirmation = undefined;
                  if (password === Text && next.password) next.password = undefined; // jika backend taruh mismatch di password
                  return next;
                });
              }}
              secureTextEntry={true}
            />
        </View>
        {!!fieldErrors.password_confirmation && (
          <Text style={{color: '#C32A2A', marginHorizontal: 30, marginTop: 4, fontSize: 12}}>
            {fieldErrors.password_confirmation}
          </Text>
        )}

        {/* Pesan error umum (misal Validation failed) */}


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
              opacity: submitting ? 0.8 : 1,
            }}
            disabled={!(email && password && user && phone && fixpassword) || submitting}>
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
                Register
              </Text>
            )}
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
