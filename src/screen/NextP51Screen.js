import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
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
//import React from 'react';

function NextP51Screen({navigation}) {
  const [isChecked, setIsChecked] = useState(false);
  const [file, setFile] = useState([]);
  const [inputText, setInputText] = useState('');
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleSubmit = () => {
    if (inputText && file.length > 0 && isChecked) {
      setModalVisible(true);
    } else {
      setModalVisible2(true);
    }
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setFile(res); // Menyimpan file pertama yang dipilih
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Pemilihan file dibatalkan');
      } else {
        console.log('Error saat memilih file:', err);
      }
    }
  };

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
      <ScrollView>
        <View
          style={{
            backgroundColor: '#F6F6F6',
            width: 360,
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
              Tujuan Bertamu dan Dokumen Surat Tugas atau Surat Pemberitahuan
            </Text>

            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#494949',
                  fontSize: 14,
                }}>
                Tulis Tujuan Bertamu
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#FFFF',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#E9E9E9',
                  height: 150,
                  paddingHorizontal: 10,
                  textAlignVertical: 'top',
                  textAlign: 'left',
                }}
                multiline={true}
                value={inputText}
                onChangeText={setInputText}></TextInput>
            </View>

            <View style={{marginTop: 20}}>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#494949',
                  fontSize: 14,
                }}>
                Silahkan input dokumen atau file
              </Text>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#C10000',
                  fontSize: 13,
                }}>
                (Format file pdf,jpg,png,jpeg dan maksimal 35mb)
              </Text>
              <View style={{marginTop: 10}}>
                <TouchableOpacity
                  onPress={pickDocument}
                  style={{
                    backgroundColor: '#FFFF',
                    borderWidth: 1,
                    borderColor: '#D8D8D8',
                    padding: 10,
                    borderRadius: 15,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#494949', fontSize: 16}}>
                    Pilih Dokumen
                  </Text>
                </TouchableOpacity>
                {file.length > 0 ? (
                  file.map((file, index) => (
                    <View
                      key={index}
                      style={{
                        marginTop: 5,
                        backgroundColor: '#FFFF',
                        padding: 10,
                        borderWidth: 1,
                        borderColor: '#D8D8D8',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'DMSans-Regular',
                          color: '#494949',
                          fontSize: 14,
                        }}>
                        Nama File: {file.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'DMSans-Regular',
                          color: '#494949',
                          fontSize: 14,
                        }}>
                        Tipe: {file.type}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'DMSans-Regular',
                          color: '#494949',
                          fontSize: 14,
                        }}>
                        Ukuran: {(file.size / (1024 * 1024)).toFixed(2)} mb
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text
                    style={{
                      fontFamily: 'DMSans-Regular',
                      color: '#000',
                      fontSize: 14,
                      backgroundColor: '#FFFF',
                      padding: 10,
                      marginTop: 5,
                      borderWidth: 1,
                      borderColor: '#D8D8D8',
                      textAlign: 'center',
                    }}>
                    Tidak ada file yang dipilih
                  </Text>
                )}
              </View>
            </View>

            <View
              style={{
                marginTop: 25,
              }}>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#C10000',
                  fontSize: 13,
                }}>
                Wajib Dokumen Surat Pemberitahuan / Surat Tugas
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 5}}>
              <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                {isChecked ? (
                  <Icon name="check-box" size={25} color="#A6A6A6" />
                ) : (
                  <Icon
                    name="check-box-outline-blank"
                    size={25}
                    color="#A6A6A6"
                  />
                )}
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#8A8A8A',
                  fontSize: 14,
                  marginTop: 3,
                  marginLeft: 5,
                  marginRight: 20,
                  textAlign: 'left',
                }}>
                Saya telah mengisi formulir dengan data yang sebenarnya. Jika
                terdapat kesalahan data admin bisa menghapus pengajuan bertamu
                saya.
              </Text>
            </View>

            <View
              style={{
                marginTop: 25,
                marginHorizontal: 5,
                flexDirection: 'row',
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('NextP41')}
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
                  onPress={handleSubmit}
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
                    Send
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Modal Konfirmasi */}
              <Modal
                //animationType="slide"
                transparent={true}
                visible={modalVisible}>
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
                      Konfirmasi
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: 'center',
                        marginVertical: 10,
                      }}>
                      Apakah Anda sudah yakin semua sudah diisi dengan benar?
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
                        <Text style={{color: 'white', fontWeight: 'bold'}}>
                          Ya
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

              {/* Modal Sukses */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={successModalVisible}>
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
                      Sukses
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: 'center',
                        marginVertical: 10,
                      }}>
                      Pengajuan berhasil dikirim, silahkan menunggu proses
                      verifikasi
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setSuccessModalVisible(false);
                        navigation.navigate('StsPengajuan');
                      }}
                      style={{
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: '#007bff',
                        borderRadius: 5,
                      }}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        Oke
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              {/* Modal untuk menampilkan blm dipilih*/}
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
                      Mohon Diperhatikan
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: 'center',
                        marginBottom: 3,
                      }}>
                      Silahkan lengkapi semua yang dibutuhkan pada form berikut
                    </Text>
                    <TouchableOpacity
                      style={{
                        marginTop: 10,
                        backgroundColor: '#007BFF',
                        paddingVertical: 8,
                        paddingHorizontal: 20,
                        borderRadius: 5,
                      }}
                      onPress={() => setModalVisible2(false)}>
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
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default NextP51Screen;
