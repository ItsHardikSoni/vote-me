
import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function AccountScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Navigate to login screen
            router.replace('/login');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Voter Details</ThemedText>
        <ThemedText style={styles.subtitle}>Your registered information</ThemedText>
      </ThemedView>

      <View style={styles.card}>
        <View style={styles.voterCard}>
          <View style={styles.avatar}>
            <IconSymbol name="person-circle-outline" size={48} color={Colors.light.primary} />
          </View>
          <View>
            <ThemedText style={styles.name}>Shubham Sharma</ThemedText>
            <ThemedText style={styles.epic}>EPIC: jk</ThemedText>
            <ThemedText style={styles.details}>Male  •  28 years</ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <IconSymbol name="person-outline" size={24} color={Colors.light.primary} />
          <ThemedText style={styles.cardTitle}>Personal Information</ThemedText>
        </View>
        <View style={styles.infoRow}>
          <ThemedText style={styles.infoLabel}>Full Name</ThemedText>
          <ThemedText style={styles.infoValue}>Shubham Sharma</ThemedText>
        </View>
        <View style={styles.infoRow}>
          <ThemedText style={styles.infoLabel}>Father&apos;s Name</ThemedText>
          <ThemedText style={styles.infoValue}>Rajesh Sharma</ThemedText>
        </View>
        <View style={styles.infoRow}>
          <ThemedText style={styles.infoLabel}>Age</ThemedText>
          <ThemedText style={styles.infoValue}>28 years</ThemedText>
        </View>
        <View style={styles.infoRow}>
          <ThemedText style={styles.infoLabel}>Gender</ThemedText>
          <ThemedText style={styles.infoValue}>Male</ThemedText>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <IconSymbol name="location-outline" size={24} color={Colors.light.primary} />
          <ThemedText style={styles.cardTitle}>Location Details</ThemedText>
        </View>
        <View style={styles.infoRow}>
          <ThemedText style={styles.infoLabel}>State</ThemedText>
          <ThemedText style={styles.infoValue}>Maharashtra</ThemedText>
        </View>
        <View style={styles.infoRow}>
          <ThemedText style={styles.infoLabel}>District</ThemedText>
          <ThemedText style={styles.infoValue}>Mumbai</ThemedText>
        </View>
        <View style={styles.infoRow}>
          <ThemedText style={styles.infoLabel}>Pincode</ThemedText>
          <ThemedText style={styles.infoValue}>400001</ThemedText>
        </View>
        <View style={styles.infoRow}>
          <ThemedText style={styles.infoLabel}>Address</ThemedText>
          <ThemedText style={styles.infoValue}>Flat 201 Shanti Nagar</ThemedText>
        </View>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <IconSymbol name="log-out-outline" size={20} color="#fff" />
          <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.icon,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  voterCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  epic: {
    fontSize: 14,
    color: Colors.light.icon,
    marginTop: 2,
  },
  details: {
    fontSize: 14,
    color: Colors.light.icon,
    marginTop: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  infoLabel: {
    fontSize: 16,
    color: Colors.light.icon,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  logoutContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
