import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

function PengajuanScreen({navigation}) {
  const [instansi, setInstansi] = useState('');
  const [pendaftar, setPendaftar] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [nomor, setNomor] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
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

      <View
        style={{
          backgroundColor: '#F6F6F6',
          width: 360,
          height: 490,
          alignSelf: 'center',
          borderRadius: 15,
          marginVertical: 10,
        }}>
        <View style={{marginHorizontal: 15, marginVertical: 20}}>
          <Text
            style={{
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'DMSans-Regular',
              fontSize: 20,
            }}>
            Formulir Pendaftaran
          </Text>

          <ScrollView>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#494949',
                  fontSize: 14,
                }}>
                Nama Instansi Daerah Asal
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#FFFF',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#E9E9E9',
                  height: 45,
                  paddingHorizontal: 10,
                }}
                value={instansi}
                onChangeText={setInstansi}></TextInput>
            </View>

            <View style={{marginTop: 20}}>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#494949',
                  fontSize: 14,
                }}>
                Atas Nama Pendaftar
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#FFFF',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#E9E9E9',
                  height: 45,
                  paddingHorizontal: 10,
                }}
                value={pendaftar}
                onChangeText={setPendaftar}></TextInput>
            </View>

            <View style={{marginTop: 20}}>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#494949',
                  fontSize: 14,
                }}>
                Jumlah Peserta
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#FFFF',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#E9E9E9',
                  height: 45,
                  paddingHorizontal: 10,
                }}
                value={jumlah}
                onChangeText={setJumlah}></TextInput>
            </View>

            <View style={{marginTop: 20}}>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#494949',
                  fontSize: 14,
                }}>
                Nomor Whatsapp Pendaftar
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#FFFF',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#E9E9E9',
                  height: 45,
                  paddingHorizontal: 10,
                }}
                value={nomor}
                onChangeText={text => {
                  // Filter hanya angka
                  const numericText = text.replace(/[^0-9]/g, '');
                  setNomor(numericText);
                }}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>

            <View
              style={{
                marginTop: 30,
                marginHorizontal: 5,
                flexDirection: 'row',
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Home')}
                  style={{
                    backgroundColor: '#0386D0',
                    alignItems: 'center',
                    width: 75,
                    height: 35,
                    justifyContent: 'center',
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'DMSans-Regular',
                      color: '#FFFF',
                      fontSize: 14,
                    }}>
                    Back
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('NextP2')}
                  style={{
                    backgroundColor: '#0386D0',
                    alignItems: 'center',
                    width: 75,
                    height: 35,
                    justifyContent: 'center',
                    borderRadius: 15,
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'DMSans-Regular',
                      color: '#FFFF',
                      fontSize: 14,
                    }}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default PengajuanScreen;
