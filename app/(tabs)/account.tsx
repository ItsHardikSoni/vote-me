// @ts-ignore - React 19 compatibility issue with TypeScript
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase, User } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      const phoneNumber = await AsyncStorage.getItem('loggedInUserPhone');
      
      if (!phoneNumber) {
        Alert.alert('Error', 'No user session found. Please login again.');
        router.replace('/login');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('phone_number', phoneNumber)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error', 'Failed to load user data. Please try again.');
        return;
      }

      if (!data) {
        Alert.alert('Error', 'User not found. Please login again.');
        router.replace('/login');
        return;
      }

      setUserData(data);
    } catch (error) {
      console.error('Unexpected error:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

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
          onPress: async () => {
            // Clear stored user data
            await AsyncStorage.removeItem('loggedInUserPhone');
            // Navigate to login screen
            router.replace('/login');
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#6366F1" />
        <ThemedText style={styles.loadingText}>Loading your profile...</ThemedText>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ThemedText style={styles.errorText}>No user data found</ThemedText>
        <TouchableOpacity style={styles.retryButton} onPress={fetchUserData}>
          <ThemedText style={styles.retryButtonText}>Retry</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="person-circle-outline" size={28} color="#6366F1" />
          </View>
          <View>
            <ThemedText style={styles.headerTitle}>My Account</ThemedText>
            <ThemedText style={styles.headerSubtitle}>Voter Profile</ThemedText>
          </View>
        </View>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} style={styles.avatar} />
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <ThemedText style={styles.name}>{userData.full_name}</ThemedText>
            <View style={styles.epicContainer}>
              <Ionicons name="card-outline" size={14} color="#6B7280" />
              <ThemedText style={styles.epic}>EPIC: {userData.epic_number}</ThemedText>
            </View>
            <View style={styles.detailsContainer}>
              <Ionicons name="male-female-outline" size={14} color="#6B7280" />
              <ThemedText style={styles.details}>{userData.gender} • {userData.age} years</ThemedText>
            </View>
          </View>
        </View>
      </View>

      {/* Personal Information */}
      <View style={styles.infoSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="person-outline" size={20} color="#6366F1" />
          </View>
          <ThemedText style={styles.sectionTitle}>Personal Information</ThemedText>
        </View>

        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="person-outline" size={18} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>Full Name</ThemedText>
              <ThemedText style={styles.infoValue}>{userData.full_name}</ThemedText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="card-outline" size={18} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>EPIC Number</ThemedText>
              <ThemedText style={styles.infoValue}>{userData.epic_number}</ThemedText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="people-outline" size={18} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>Father&apos;s Name</ThemedText>
              <ThemedText style={styles.infoValue}>{userData.father_name}</ThemedText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="calendar-outline" size={18} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>Date of Birth</ThemedText>
              <ThemedText style={styles.infoValue}>{new Date(userData.date_of_birth).toLocaleDateString()}</ThemedText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="calendar-outline" size={18} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>Age</ThemedText>
              <ThemedText style={styles.infoValue}>{userData.age} years</ThemedText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="male-female-outline" size={18} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>Gender</ThemedText>
              <ThemedText style={styles.infoValue}>{userData.gender}</ThemedText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="call-outline" size={18} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>Phone Number</ThemedText>
              <ThemedText style={styles.infoValue}>{userData.phone_number}</ThemedText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="mail-outline" size={18} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>Email</ThemedText>
              <ThemedText style={styles.infoValue}>{userData.email}</ThemedText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="id-card-outline" size={18} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>Aadhar Number</ThemedText>
              <ThemedText style={styles.infoValue}>{userData.aadhar_number}</ThemedText>
            </View>
          </View>
        </View>
      </View>

      {/* Location Information */}
      <View style={styles.locationSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="location-outline" size={20} color="#6366F1" />
          </View>
          <ThemedText style={styles.sectionTitle}>Location Details</ThemedText>
        </View>

        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="business-outline" size={18} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>State</ThemedText>
              <ThemedText style={styles.infoValue}>{userData.state}</ThemedText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="map-outline" size={18} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>District</ThemedText>
              <ThemedText style={styles.infoValue}>{userData.district}</ThemedText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="pin-outline" size={18} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>Pincode</ThemedText>
              <ThemedText style={styles.infoValue}>{userData.pincode}</ThemedText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="home-outline" size={18} color="#6B7280" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>Address</ThemedText>
              <ThemedText style={styles.infoValue}>{userData.address}</ThemedText>
            </View>
          </View>
        </View>
      </View>

      {/* Logout Section */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#1F2937' },
  headerSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 2 },

  // Profile Card
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3
  },
  profileHeader: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: { position: 'relative', marginRight: 16 },
  avatar: { width: 64, height: 64, borderRadius: 32, borderWidth: 3, borderColor: '#E5E7EB' },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2
  },
  profileInfo: { flex: 1 },
  name: { fontSize: 22, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  epicContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  epic: { fontSize: 14, color: '#6B7280', marginLeft: 6, fontWeight: '500' },
  detailsContainer: { flexDirection: 'row', alignItems: 'center' },
  details: { fontSize: 14, color: '#6B7280', marginLeft: 6 },

  // Information Sections
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3
  },
  locationSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937' },

  // Information Items
  infoList: { gap: 16 },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 14, color: '#6B7280', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5 },
  infoValue: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginTop: 2 },

  // Logout Section
  logoutSection: { paddingHorizontal: 20, paddingBottom: 40 },
  logoutButton: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FECACA'
  },
  logoutButtonText: { color: '#DC2626', fontSize: 16, fontWeight: '600', marginLeft: 4 },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280'
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    marginBottom: 16
  },
  retryButton: {
    backgroundColor: '#6366F1',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
