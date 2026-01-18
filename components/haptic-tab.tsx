
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';

export function HapticTab(props: PressableProps) {
  return (
    <Pressable
      {...props}
      onPress={(e) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        props.onPress?.(e);
      }}
    />
  );
}
