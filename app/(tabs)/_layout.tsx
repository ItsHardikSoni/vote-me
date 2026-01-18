import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Ionicons } from '@expo/vector-icons';

// Correctly typed the name prop to ensure it's a valid Ionicons name.
function TabBarIcon({ name, color }: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <IconSymbol name={name} size={22} color={color} style={{ marginBottom: -3 }} />;
}

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // Used a valid solid-style icon name.
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
      <Tabs.Screen
        name="vote"
        options={{
          title: 'Vote',
          // Replaced with a valid checkbox icon.
          tabBarIcon: ({ color }) => <TabBarIcon name="checkbox-outline" color={color} />,
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
      <Tabs.Screen
        name="result"
        options={{
          title: 'Result',
          // Replaced with a valid podium icon.
          tabBarIcon: ({ color }) => <TabBarIcon name="podium-outline" color={color} />,
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          // Used a valid person outline icon.
          tabBarIcon: ({ color }) => <TabBarIcon name="person-outline" color={color} />,
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
    </Tabs>
  );
}
