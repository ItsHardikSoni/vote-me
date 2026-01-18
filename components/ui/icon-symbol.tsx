
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';

type IconProps = {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  size?: number;
  style?: any;
};

export function IconSymbol({ name, color, size = 24, style }: IconProps) {
  return <Ionicons name={name} size={size} color={color} style={style} />;
}
