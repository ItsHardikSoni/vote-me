import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#6366F1',
          tabBarInactiveTintColor: '#6B7280',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#F1F5F9',
            height: 70,
            paddingBottom: 8,
            paddingTop: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
          headerShown: false,
          headerTransparent: false,
          headerBackground: () => (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor:
                    colorScheme === 'dark'
                      ? 'rgba(0, 0, 0, 0.5)'
                      : 'rgba(255, 255, 255, 0.8)',
                },
              ]}
            />
          ),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.tabIconContainer, focused && styles.activeTabIcon]}>
                <TabBarIcon name="home" color={color} />
              </View>
            ),
            tabBarButton: (props) => <HapticTab {...props} />,
          }}
        />
        <Tabs.Screen
          name="vote"
          options={{
            title: 'Vote',
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.tabIconContainer, focused && styles.activeTabIcon]}>
                <TabBarIcon name="checkbox-outline" color={color} />
              </View>
            ),
            tabBarButton: (props) => <HapticTab {...props} />,
          }}
        />
        <Tabs.Screen
          name="result"
          options={{
            title: 'Results',
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.tabIconContainer, focused && styles.activeTabIcon]}>
                <TabBarIcon name="podium-outline" color={color} />
              </View>
            ),
            tabBarButton: (props) => <HapticTab {...props} />,
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.tabIconContainer, focused && styles.activeTabIcon]}>
                <TabBarIcon name="person-outline" color={color} />
              </View>
            ),
            tabBarButton: (props) => <HapticTab {...props} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  activeTabIcon: {
    backgroundColor: '#EEF2FF',
  },
});
