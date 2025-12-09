import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {usePengajuan} from '../pengajuan/PengajuanContext';

function NextP2Screen({navigation}) {
  const {categories, fetchCategories, setField, form, loadingCategories} = usePengajuan();
  const [selected, setSelected] = useState(form.kategori ? String(form.kategori) : '');
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch sekali setiap kali screen ini DIFOCUS-kan
  useFocusEffect(
    useCallback(() => {
      fetchCategories({force: true});
    }, [fetchCategories])
  );

  const handleNext = () => {
    if (!selected) {
      setModalVisible(true);
      return;
    }
    const cat = categories.find(c => String(c.id) === selected);
    if (!cat) {
      setModalVisible(true);
      return;
    }
    setField('kategori', cat.id);
    setField('kategori_name', cat.name);
    // Gunakan ID untuk routing, pass categoryId agar screen berikut bisa fetch sub-kategori sendiri
    if (Number(cat.id) === 1) {
      navigation.navigate('NextP31', {categoryId: cat.id});
    } else {
      navigation.navigate('NextP32', {categoryId: cat.id});
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

      <View
        style={{
          backgroundColor: '#F6F6F6',
          width: 360,
          height: 260,
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
            Pilih Bertemu Dengan
          </Text>
        </View>

        <View>
          {loadingCategories ? (
            <Text style={{textAlign:'center', marginVertical:10}}>Memuat kategori...</Text>
          ) : categories.length === 0 ? (
            <Text style={{textAlign:'center', marginVertical:10}}>Tidak ada kategori.</Text>
          ) : (
            categories.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.option}
                onPress={() => setSelected(String(option.id))}>
                <View
                  style={[
                    styles.radio,
                    selected === String(option.id) && styles.radioSelected,
                  ]}
                />
                <Text style={styles.label}>{option.name}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View
          style={{marginTop: 15, marginHorizontal: 25, flexDirection: 'row'}}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Pengajuan')}
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
              onPress={handleNext}
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

          {/* Modal untuk menampilkan blm dipilih*/}
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
                  Pilihlah
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    marginBottom: 3,
                  }}>
                  Silahkan pilih salah satu opsi berikut
                </Text>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    backgroundColor: '#007BFF',
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                  }}
                  onPress={() => setModalVisible(false)}>
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
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    backgroundColor: '#FFFF',
    borderColor: '#D8D8D8',
    borderRadius: 35,
    height: 45,
  },
  radio: {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#C2C2C2',
    marginRight: 10,
  },
  radioSelected: {backgroundColor: '#109045'},
  label: {fontFamily: 'DMSans-Regular', fontSize: 15, color: '#494949'},
});

export default NextP2Screen;
