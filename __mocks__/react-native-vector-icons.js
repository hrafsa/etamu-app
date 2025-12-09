import React from 'react';
import {Text} from 'react-native';

export default function Icon({name = 'mock-icon', size = 16, color = '#000'}) {
  return <Text>{`<Icon ${name} ${size} ${color}>`}</Text>;
}

