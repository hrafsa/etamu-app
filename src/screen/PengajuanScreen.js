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
import {usePengajuan} from '../pengajuan/PengajuanContext';

function PengajuanScreen({navigation}) {
  const {form, setField, submitErrors} = usePengajuan();
  const [attempted, setAttempted] = useState(false);

  // Normalisasi nomor WA seperti Register: hanya digit, 0xxxxx -> 62xxxxx
  const normalizePhone = (value) => {
    const digits = (value || '').replace(/\D/g, '');
    if (digits.startsWith('0')) return `62${digits.slice(1)}`;
    // '+62' akan menjadi '62' karena non-digit dihapus; baris berikut redundan tapi dibiarkan untuk konsistensi
    if (digits.startsWith('+62')) return digits.replace(/^\+/, '');
    return digits;
  };

  const goNext = () => {
    setAttempted(true);
    if (form.nama_instansi && form.atas_nama && form.jumlah_peserta && form.phone && form.email) {
      navigation.navigate('NextP2');
    }
  };

  const inputStyle = hasErr => ({
    backgroundColor: '#FFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: hasErr ? '#C32A2A' : '#E9E9E9',
    height: 45,
    paddingHorizontal: 10,
  });



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
          height: 570,
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
                style={inputStyle((attempted && !form.nama_instansi) || submitErrors.nama_instansi)}
                value={form.nama_instansi}
                onChangeText={v => setField('nama_instansi', v)} />
              {((attempted && !form.nama_instansi) || submitErrors.nama_instansi) && (
                <Text style={{color:'#C32A2A', fontSize:12, marginTop:4}}>{submitErrors.nama_instansi || 'Wajib diisi'}</Text>
              )}
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
                style={inputStyle((attempted && !form.atas_nama) || submitErrors.atas_nama)}
                value={form.atas_nama}
                onChangeText={v => setField('atas_nama', v)} />
              {((attempted && !form.atas_nama) || submitErrors.atas_nama) && (
                <Text style={{color:'#C32A2A', fontSize:12, marginTop:4}}>{submitErrors.atas_nama || 'Wajib diisi'}</Text>
              )}
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
                style={inputStyle((attempted && !form.jumlah_peserta) || submitErrors.jumlah_peserta)}
                value={String(form.jumlah_peserta)}
                onChangeText={v => setField('jumlah_peserta', v.replace(/[^0-9]/g,''))} />
              {((attempted && !form.jumlah_peserta) || submitErrors.jumlah_peserta) && (
                <Text style={{color:'#C32A2A', fontSize:12, marginTop:4}}>{submitErrors.jumlah_peserta || 'Wajib diisi'}</Text>
              )}
            </View>

            <View style={{marginTop: 20}}>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#494949',
                  fontSize: 14,
                }}>
                Nomor Whatsapp Instansi / Pendaftar
              </Text>
              <TextInput
                style={inputStyle((attempted && !form.phone) || submitErrors.phone)}
                value={form.phone}
                onChangeText={text => setField('phone', normalizePhone(text))}
                keyboardType="phone-pad"
                maxLength={15}
              />
              {((attempted && !form.phone) || submitErrors.phone) && (
                <Text style={{color:'#C32A2A', fontSize:12, marginTop:4}}>{submitErrors.phone || 'Wajib diisi'}</Text>
              )}
            </View>

            <View style={{marginTop: 20}}>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#494949',
                  fontSize: 14,
                }}>
                Email Instansi / Pendaftar
              </Text>
              <TextInput
                style={inputStyle((attempted && !form.email) || submitErrors.email)}
                value={form.email}
                onChangeText={v => setField('email', v)} />
              {((attempted && !form.email) || submitErrors.email) && (
                <Text style={{color:'#C32A2A', fontSize:12, marginTop:4}}>{submitErrors.email || 'Wajib diisi'}</Text>
              )}
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
                  onPress={goNext}
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
