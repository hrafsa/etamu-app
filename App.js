// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import screen
import SplashScreen from './src/screen/SplashScreen';
import HomeScreen from './src/screen/HomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import NotifikasiScreen from './src/screen/NotifikasiScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import PengajuanScreen from './src/screen/PengajuanScreen';
import NextP2Screen from './src/screen/NextP2Screen';
import NextP31Screen from './src/screen/NextP31Screen';
import NextP32Screen from './src/screen/NextP32Screen';
import NextP41Screen from './src/screen/NextP41Screen';
import NextP42Screen from './src/screen/NextP42Screen';
import NextP51Screen from './src/screen/NextP51Screen';
import NextP52Screen from './src/screen/NextP52Screen';
import StsPengajuanScreen from './src/screen/StsPengajuanScreen';
import RiwayatScreen from './src/screen/RiwayatScreen';
import PanduanScreen from './src/screen/PanduanScreen';
import ForgotPassScreen from './src/screen/ForgotPassScrenn';
import EditProfileScreen from './src/screen/EditProfileScreen';
import UbahPassScreen from './src/screen/UbahPassScrenn';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          gestureEnabled: true, // Aktifkan gesture untuk swipe back
          animation: 'fade', // Animasi perpindahan screen dari kanan ke kiri
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notifikasi"
          component={NotifikasiScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pengajuan"
          component={PengajuanScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NextP2"
          component={NextP2Screen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NextP31"
          component={NextP31Screen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NextP32"
          component={NextP32Screen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NextP41"
          component={NextP41Screen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NextP42"
          component={NextP42Screen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NextP51"
          component={NextP51Screen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NextP52"
          component={NextP52Screen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StsPengajuan"
          component={StsPengajuanScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Panduan"
          component={PanduanScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Riwayat"
          component={RiwayatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LupaPassword"
          component={ForgotPassScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UbahPass"
          component={UbahPassScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
