import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native';

function PanduanScreen({navigation}) {
  const handlePress = async () => {
    const url =
      'https://drive.google.com/uc?export=download&id=1HF5oLX_IOVbd3po81UyRpHt-qPCRTDlC';

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'URL tidak dapat dibuka');
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

      <View
        style={{
          alignSelf: 'center',
        }}>
        <View style={{marginHorizontal: 15, marginVertical: 15}}>
          <Text
            style={{
              color: '#000000',
              fontWeight: 'bold',
              fontFamily: 'DMSans-Regular',
              fontSize: 20,
            }}>
            Panduan Penggunaan Aplikasi E-Tamu
          </Text>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'DMSans-Regular',
              fontSize: 14,
              marginTop: 10,
            }}>
            Silahkan download atau lihat dari file berikut:{' '}
          </Text>
          <TouchableOpacity style={{marginTop: 15}} onPress={handlePress}>
            <View style={{marginHorizontal: 35}}>
              <Image
                source={require('../../assets/image/pdf.png')}
                style={{width: 50, height: 60}}
              />
            </View>
            <Text
              style={{
                color: '#0000FF',
                fontFamily: 'DMSans-Regular',
                fontSize: 14,
                marginTop: 5,
              }}>
              Panduan Penggunaan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default PanduanScreen;
