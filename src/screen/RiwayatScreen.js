import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  RefreshControl,
  Animated,
} from 'react-native';

const data = [
  {label: 'Januari', value: '1'},
  {label: 'Februari', value: '2'},
  {label: 'Maret', value: '3'},
  {label: 'April', value: '4'},
  {label: 'Mei', value: '5'},
  {label: 'Juni', value: '6'},
  {label: 'Juli', value: '7'},
  {label: 'Agustus', value: '8'},
  {label: 'September', value: '9'},
  {label: 'Oktober', value: '10'},
  {label: 'November', value: '11'},
  {label: 'Desember', value: '12'},
];

const data2 = [
  {label: '2024', value: '1'},
  {label: '2025', value: '2'},
  {label: '2026', value: '3'},
];

function RiwayatScreen({navigation}) {
  const [bulan, setBulan] = useState(null);
  const [tahun, setTahun] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0]; // Nilai awal opacity 1

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in ke tampilan normal
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);

    // Animasi fade ke putih penuh lalu kembali normal dengan durasi lebih panjang
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0, // Layar menjadi putih penuh
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1, // Kembali normal
        duration: 650,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setRefreshing(false); // Pastikan refresh berhenti setelah animasi
      resetFilters(); // Reset filter setelah refresh selesai
    });
  };

  const resetFilters = () => {
    setBulan(null);
    setTahun(null);
  };
  const renderItem = item => {
    return (
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{flex: 1, fontSize: 12}}>{item.label}</Text>
        {item.value === bulan && (
          <View>
            <Icon name="format-line-spacing" size={15} color="#000" />
          </View>
        )}
      </View>
    );
  };

  const renderItem2 = item => {
    return (
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{flex: 1, fontSize: 12}}>{item.label}</Text>
        {item.value === tahun && (
          <View>
            <Icon name="format-line-spacing" size={15} color="#000" />
          </View>
        )}
      </View>
    );
  };

  const handleFilterPress = () => {
    if (!tahun) {
      setModalVisible2(true);
      return;
    }
    setModalVisible(true);
  };

  return (
    <Animated.View
      style={{flex: 1, backgroundColor: 'white', opacity: fadeAnim}}>
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

        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            marginTop: 10,
            alignItems: 'flex-end',
            marginLeft: 180,
          }}>
          <Icon name="navigate-before" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 10,
            //marginBottom: 5,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'DMSans-Regular',
              fontSize: 20,
              flex: 1,
            }}>
            Riwayat Kunjungan
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 5,
            flexDirection: 'row',
          }}>
          <Dropdown
            style={{
              marginTop: 10,
              marginBottom: 5,
              width: 115,
              height: 30,
              backgroundColor: 'white',
              borderRadius: 5,
              padding: 5,
              borderWidth: 1,
              borderColor: '#B1B1B1',
            }}
            placeholderStyle={{fontSize: 12, marginLeft: 3}}
            selectedTextStyle={{fontSize: 12, marginLeft: 3}}
            inputSearchStyle={{height: 40, fontSize: 12}}
            data={data}
            search
            labelField="label"
            valueField="value"
            placeholder="Bulan"
            searchPlaceholder="Search..."
            value={bulan}
            onChange={item => {
              setBulan(item.value);
            }}
            renderLeftIcon={() => (
              <View>
                <Icon name="format-line-spacing" size={15} color="#000" />
              </View>
            )}
            renderItem={renderItem}
          />

          <Dropdown
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 5,
              width: 90,
              height: 30,
              backgroundColor: 'white',
              borderRadius: 5,
              padding: 5,
              borderWidth: 1,
              borderColor: '#B1B1B1',
            }}
            placeholderStyle={{fontSize: 12, marginLeft: 3}}
            selectedTextStyle={{fontSize: 12, marginLeft: 3}}
            inputSearchStyle={{height: 40, fontSize: 12}}
            data={data2}
            search
            labelField="label"
            valueField="value"
            placeholder="Tahun"
            searchPlaceholder="Search..."
            value={tahun}
            onChange={item => {
              setTahun(item.value);
            }}
            renderLeftIcon={() => (
              <View>
                <Icon name="format-line-spacing" size={15} color="#000" />
              </View>
            )}
            renderItem={renderItem2}
          />

          <TouchableOpacity
            onPress={handleFilterPress}
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 5,
              backgroundColor: '#97D9E4',
              padding: 5,
              borderRadius: 5,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View style={{marginTop: 1}}>
              <Icon name="format-line-spacing" size={15} color="#000" />
            </View>
            <Text style={{marginLeft: 3}}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Konfirmasi */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}>
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
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Filter Berhasil
              </Text>
              <Text style={{marginTop: 10, fontSize: 14, textAlign: 'center'}}>
                Data telah difilter
              </Text>
              <Text
                style={{fontSize: 14, textAlign: 'center', fontWeight: 'bold'}}>
                (fitur ini sedang dikembangkan)
              </Text>

              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: '#97D9E4',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 5,
                }}
                onPress={() => setModalVisible(false)}>
                <Text style={{color: '#000', fontWeight: 'bold'}}>Oke</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Belum Dipilih */}
        <Modal
          visible={modalVisible2}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible2(false)}>
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
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Mohon dipilih
              </Text>
              <Text style={{marginTop: 10, fontSize: 14, textAlign: 'center'}}>
                Silahkan pilih terlebih dahulu tahun riwayat kunjungan.
              </Text>

              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: '#97D9E4',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 5,
                }}
                onPress={() => setModalVisible2(false)}>
                <Text style={{color: '#000', fontWeight: 'bold'}}>Oke</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View
          style={{
            backgroundColor: '#F6F6F6',
            alignSelf: 'center',
            borderWidth: 1,
            width: 350,
            borderColor: '#D8D8D8',
          }}>
          {/* Riwayat 1 */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FFFF',
              alignItems: 'flex-start',
              borderColor: '#D8D8D8',
            }}>
            <View
              style={{
                marginRight: 10,
                marginLeft: 10,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'DMSans-Regular',
                }}>
                1.
              </Text>
            </View>
            <View style={{flex: 1}}>
              <View
                style={{
                  backgroundColor: '#97D9E4',
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderColor: '#D8D8D8',
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#000'}}>
                  Kunjungan Bertemu Dewan Komisi C
                </Text>
              </View>

              <View style={{borderLeftWidth: 1, borderColor: '#D8D8D8'}}>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                    fontFamily: 'DMSans-Regular',
                  }}>
                  Tanggal Kunjungan: 9 Desember 2024
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                    fontFamily: 'DMSans-Regular',
                  }}>
                  Jam Kunjungan: 09.00 WIB
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                    fontFamily: 'DMSans-Regular',
                    marginBottom: 10,
                  }}>
                  Bertemu dengan Dewan Komisi C di ruangan B, untuk berdiskusi
                  masalah C dan .....
                </Text>
              </View>
            </View>
          </View>

          {/* Riwayat 2 */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FFFF',
              alignItems: 'flex-start',
              borderColor: '#D8D8D8',
              borderTopWidth: 1,
            }}>
            <View
              style={{
                marginRight: 10,
                marginLeft: 10,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'DMSans-Regular',
                }}>
                2.
              </Text>
            </View>
            <View style={{flex: 1}}>
              <View
                style={{
                  backgroundColor: '#97D9E4',
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderColor: '#D8D8D8',
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#000'}}>
                  Kunjungan Bertemu Bagian Umum
                </Text>
              </View>

              <View style={{borderLeftWidth: 1, borderColor: '#D8D8D8'}}>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                    fontFamily: 'DMSans-Regular',
                  }}>
                  Tanggal Kunjungan: 13 Januari 2025
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                    fontFamily: 'DMSans-Regular',
                  }}>
                  Jam Kunjungan: 09.00 WIB
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                    fontFamily: 'DMSans-Regular',
                    marginBottom: 10,
                  }}>
                  Bertemu dengan Bagian Umum di ruangan Bagian Umum, untuk
                  berdiskusi dan .....
                </Text>
              </View>
            </View>
          </View>

          {/* Riwayat 3 */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FFFF',
              alignItems: 'flex-start',
              borderColor: '#D8D8D8',
              borderTopWidth: 1,
            }}>
            <View
              style={{
                marginRight: 10,
                marginLeft: 10,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'DMSans-Regular',
                }}>
                3.
              </Text>
            </View>
            <View style={{flex: 1}}>
              <View
                style={{
                  backgroundColor: '#97D9E4',
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderColor: '#D8D8D8',
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: '#000'}}>
                  Kunjungan Bertemu Dewan Komisi D
                </Text>
              </View>

              <View style={{borderLeftWidth: 1, borderColor: '#D8D8D8'}}>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                    fontFamily: 'DMSans-Regular',
                  }}>
                  Tanggal Kunjungan: 20 Januari 2025
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                    fontFamily: 'DMSans-Regular',
                  }}>
                  Jam Kunjungan: 09.00 WIB
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 7,
                    marginLeft: 5,
                    fontFamily: 'DMSans-Regular',
                    marginBottom: 10,
                  }}>
                  Bertemu dengan Dewan Komisi D di ruangan D, untuk berdiskusi
                  masalah yang ada dan .....
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

export default RiwayatScreen;
