import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Animated,
} from 'react-native';

function ForgotPassScreen({navigation, route}) {
  const [phone, setPhone] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0]; // State animasi

  const handleHideModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out (menghilang)
      duration: 300, // Durasi dalam ms
      useNativeDriver: true,
    }).start(() => setModalVisible(false)); // Sembunyikan modal setelah animasi selesai
  };

  const handleBerhasil = () => {
    if (phone) {
      setPhone(''); // Kosongkan inputan
      setModalVisible(true); // Tampilkan modal

      // Jalankan animasi fade-in
      Animated.timing(fadeAnim, {
        toValue: 1, // Opacity penuh (modal muncul)
        duration: 600, // Durasi animasi
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View
        style={{
          flex: 1,
          marginTop: 10,
          marginHorizontal: 10,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            flex: 1,
            marginTop: 5,
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

      <View style={{flex: 1}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 28,
            fontFamily: 'DMSans-Regular',
            fontWeight: 'semi-bold',
            marginTop: 20,
            marginBottom: 10,
          }}>
          Lupa Password
        </Text>

        <Text style={{textAlign: 'center', fontSize: 14}}>
          Silahkan masukkan nomor telephone WA anda untuk mendapatkan password
          anda
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 30,
            marginTop: 40,
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
            placeholder="Nomor Telepon WA"
            onChangeText={text => {
              // Filter hanya angka
              const numericText = text.replace(/[^0-9]/g, '');
              setPhone(numericText);
            }}
            keyboardType="phone-pad"
            maxLength={15}
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={handleBerhasil}
            style={{
              backgroundColor: phone ? '#0386D0' : '#ccc',
              marginHorizontal: 30,
              marginTop: 40,
              paddingVertical: 15,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled={!phone}>
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

          {/* Modal untuk menampilkan notifikasi password telah dikirim*/}
          <Modal transparent={true} visible={modalVisible}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}>
              <Animated.View
                style={{
                  backgroundColor: '#FFF',
                  width: 300,
                  padding: 20,
                  borderRadius: 10,
                  alignItems: 'center',
                  opacity: fadeAnim, // Gunakan animasi fade
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 10,
                  }}>
                  Password Telah Dikirim
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    marginBottom: 3,
                  }}>
                  Silahkan cek WA anda untuk melihat password anda yang sudah
                  dikirim
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    backgroundColor: '#007BFF',
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                  }}
                  onPress={handleHideModal}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontWeight: 'bold',
                      fontFamily: 'DMSans-Regular',
                    }}>
                    Oke
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Modal>

          <View style={{marginHorizontal: 10, marginVertical: 20}}>
            <Text style={{fontFamily: 'DMSans-Regular', fontSize: 13}}>
              * Harap masukkan nomor telephone WA anda dengan benar
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              //marginTop: 10,
            }}>
            <Image
              source={require('../../assets/image/bawah.png')}
              style={{
                position: 'absolute',
                top: 50,
                width: 550,
                height: 300,
                alignSelf: 'center',
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default ForgotPassScreen;
