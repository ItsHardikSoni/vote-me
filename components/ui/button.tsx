import React from 'react';
import { Button as RNButton, ButtonProps, StyleSheet } from 'react-native';

export function Button(props: ButtonProps) {
  return <RNButton {...props} />;
}
