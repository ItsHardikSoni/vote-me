import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

const user = {
  name: 'John Doe',
  epic: 'ABC1234567',
  age: 35,
  dob: '1989-01-01',
  fatherName: 'Richard Doe',
  gender: 'Male',
  state: 'Example State',
  district: 'Example District',
  pincode: '123456',
  address: '123, Example Street, Example City',
};

export default function AccountScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={100} color={Colors.light.tint} />
          <ThemedText style={styles.name}>{user.name}</ThemedText>
          <ThemedText style={styles.epic}>{user.epic}</ThemedText>
        </View>

        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>User Information</ThemedText>
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Age</ThemedText>
            <ThemedText style={styles.infoValue}>{user.age}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Date of Birth</ThemedText>
            <ThemedText style={styles.infoValue}>{user.dob}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Father's Name</ThemedText>
            <ThemedText style={styles.infoValue}>{user.fatherName}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Gender</ThemedText>
            <ThemedText style={styles.infoValue}>{user.gender}</ThemedText>
          </View>
        </View>

        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>Location Details</ThemedText>
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>State</ThemedText>
            <ThemedText style={styles.infoValue}>{user.state}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>District</ThemedText>
            <ThemedText style={styles.infoValue}>{user.district}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Pincode</ThemedText>
            <ThemedText style={styles.infoValue}>{user.pincode}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.infoLabel}>Address</ThemedText>
            <ThemedText style={styles.infoValue}>{user.address}</ThemedText>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.light.text,
  },
  epic: {
    fontSize: 18,
    color: Colors.light.icon,
    marginTop: 5,
  },
  card: {
    backgroundColor: Colors.light.background,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.light.text,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: Colors.light.icon,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  logoutButton: {
    backgroundColor: '#E57373', // A soft red for logout
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
