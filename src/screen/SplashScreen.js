import React from 'react';
import {View, Text, Image, StatusBar, ActivityIndicator} from 'react-native';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        <Image
          source={require('../../assets/image/intro.png')}
          style={{
            width: 400,
            height: 400,
            resizeMode: 'contain',
            marginBottom: 20,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            color: '#0E2F4F',
            fontFamily: 'DMSans-Regular',
            fontWeight: 'bold',
          }}>
          --DPRD PROVINSI DKI JAKARTA--
        </Text>
        <Image
          source={require('../../assets/image/dprd.png')}
          style={{
            width: 70,
            height: 70,
            resizeMode: 'contain',
          }}
        />
        <ActivityIndicator style={{marginTop: 16}} color="#0E2F4F" />
      </View>
    </View>
  );
};

export default SplashScreen;
