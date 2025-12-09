// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthProvider, useAuth} from './src/auth/AuthContext';
import {PengajuanProvider} from './src/pengajuan/PengajuanContext';

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

// Auth-only screens
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{gestureEnabled: true, animation: 'fade', headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="LupaPassword" component={ForgotPassScreen} />
    </Stack.Navigator>
  );
}

// App-only screens
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{gestureEnabled: true, animation: 'fade', headerShown: false}}>
      {/* You can keep Splash out of the app stack; it will be shown as a loader in RootNavigator */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifikasi" component={NotifikasiScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Pengajuan" component={PengajuanScreen} />
      <Stack.Screen name="NextP2" component={NextP2Screen} />
      <Stack.Screen name="NextP31" component={NextP31Screen} />
      <Stack.Screen name="NextP32" component={NextP32Screen} />
      <Stack.Screen name="NextP41" component={NextP41Screen} />
      <Stack.Screen name="NextP42" component={NextP42Screen} />
      <Stack.Screen name="NextP51" component={NextP51Screen} />
      <Stack.Screen name="NextP52" component={NextP52Screen} />
      <Stack.Screen name="StsPengajuan" component={StsPengajuanScreen} />
      <Stack.Screen name="Panduan" component={PanduanScreen} />
      <Stack.Screen name="Riwayat" component={RiwayatScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="UbahPass" component={UbahPassScreen} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const {isBootstrapping, userToken} = useAuth();

  // While restoring token/user show Splash
  if (isBootstrapping) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    );
  }

  // If authenticated, show the app; else show auth screens
  return userToken ? <AppStack /> : <AuthStack />;
}

function App() {
  return (
    <AuthProvider>
      <PengajuanProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PengajuanProvider>
    </AuthProvider>
  );
}

export default App;
