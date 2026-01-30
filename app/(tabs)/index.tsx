// @ts-ignore - React 19 compatibility issue with TypeScript
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

const upcomingElections = [
  { id: '1', name: 'Maharashtra Assembly Election', date: '20 November 2024' },
  { id: '2', name: 'Local Body Elections', date: '5 December 2024' },
];

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 44, seconds: 24 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.countdownContainer}>
      <View style={styles.timeBox}>
        <Text style={styles.timeValue}>{String(timeLeft.hours).padStart(2, '0')}</Text>
        <Text style={styles.timeLabel}>Hours</Text>
      </View>
      <Text style={styles.timeSeparator}>:</Text>
      <View style={styles.timeBox}>
        <Text style={styles.timeValue}>{String(timeLeft.minutes).padStart(2, '0')}</Text>
        <Text style={styles.timeLabel}>Minutes</Text>
      </View>
      <Text style={styles.timeSeparator}>:</Text>
      <View style={styles.timeBox}>
        <Text style={styles.timeValue}>{String(timeLeft.seconds).padStart(2, '0')}</Text>
        <Text style={styles.timeLabel}>Seconds</Text>
      </View>
    </View>
  );
};

const HomeScreenHeader = () => {
  const router = useRouter();

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <ThemedText style={styles.headerTitle}>Hi, Shubham 👋</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Welcome to SecureVote</ThemedText>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} style={styles.profileIcon} />
          <View style={styles.onlineIndicator} />
        </TouchableOpacity>
      </View>

      <View style={styles.liveCard}>
        <View style={styles.liveHeader}>
          <View style={styles.liveIconContainer}>
            <Ionicons name="analytics-outline" size={24} color="#10B981" />
          </View>
          <View style={styles.liveTextContainer}>
            <ThemedText style={styles.liveTitle}>Live Vote Count</ThemedText>
            <ThemedText style={styles.liveSubtitle}>Real-time election data</ThemedText>
          </View>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <ThemedText style={styles.liveBadgeText}>Live</ThemedText>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <ThemedText style={styles.statLabel}>Total Votes</ThemedText>
            <ThemedText style={styles.statValue}>28,47,784</ThemedText>
            <ThemedText style={styles.statSubtext}>State-wide</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statLabel}>Your Constituency</ThemedText>
            <ThemedText style={styles.statValue}>14,546</ThemedText>
            <ThemedText style={styles.statSubtext}>Mumbai North</ThemedText>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <ThemedText style={styles.progressLabel}>Voter Turnout</ThemedText>
            <ThemedText style={styles.progressPercentage}>58.4%</ThemedText>
          </View>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <View style={styles.updateInfo}>
          <Ionicons name="sync-circle-outline" size={16} color="#6366F1" />
          <ThemedText style={styles.updateText}>Updates every 5 seconds • Official EC Data</ThemedText>
        </View>
      </View>

      <View style={styles.electionCard}>
        <View style={styles.electionHeader}>
          <View style={styles.electionIconContainer}>
            <Ionicons name="shield-checkmark-outline" size={28} color="#6366F1" />
          </View>
          <View style={styles.electionTextContainer}>
            <ThemedText style={styles.electionTitle}>Maharashtra Assembly Election</ThemedText>
            <ThemedText style={styles.electionSubtitle}>Phase 1 • 288 constituencies</ThemedText>
          </View>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <ThemedText style={styles.liveBadgeText}>Active</ThemedText>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={18} color="#6B7280" />
          <ThemedText style={styles.locationText}>Your constituency: Mumbai North</ThemedText>
        </View>

        <View style={styles.countdownSection}>
          <ThemedText style={styles.countdownLabel}>Voting ends in</ThemedText>
          <Countdown />
        </View>

        <TouchableOpacity style={styles.voteButton} onPress={() => router.push('/(tabs)/vote')}>
          <View style={styles.voteButtonContent}>
            <Ionicons name="finger-print-outline" size={20} color="#fff" />
            <ThemedText style={styles.voteButtonText}>Cast Your Vote</ThemedText>
            <Ionicons name="chevron-forward-outline" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>Upcoming Elections</ThemedText>
        <TouchableOpacity style={styles.seeAllButton}>
          <ThemedText style={styles.seeAllText}>See All</ThemedText>
          <Ionicons name="chevron-forward-outline" size={16} color="#6366F1" />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default function HomeScreen() {
  return (
    <FlatList
      style={styles.container}
      data={upcomingElections}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.upcomingCard}>
          <View style={styles.upcomingIconContainer}>
            <Ionicons name="calendar-outline" size={24} color="#6366F1" />
          </View>
          <View style={styles.upcomingContent}>
            <ThemedText style={styles.upcomingTitle}>{item.name}</ThemedText>
            <View style={styles.upcomingMeta}>
              <Ionicons name="time-outline" size={16} color="#6B7280" />
              <ThemedText style={styles.upcomingDate}>{item.date}</ThemedText>
            </View>
            <View style={styles.upcomingBadge}>
              <Ionicons name="alarm-outline" size={12} color="#F59E0B" />
              <ThemedText style={styles.upcomingBadgeText}>Upcoming</ThemedText>
            </View>
          </View>
        </View>
      )}
      ListHeaderComponent={HomeScreenHeader}
    />
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
  headerLeft: { flex: 1 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#1F2937', lineHeight: 32 },
  headerSubtitle: { fontSize: 16, color: '#6B7280', marginTop: 4 },
  profileButton: { position: 'relative' },
  profileIcon: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: '#E5E7EB' },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#fff'
  },

  // Live Card Styles
  liveCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  liveHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  liveIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  liveTextContainer: { flex: 1, marginLeft: 12 },
  liveTitle: { fontSize: 18, fontWeight: '600', color: '#065F46' },
  liveSubtitle: { fontSize: 14, color: '#047857', marginTop: 2 },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6
  },
  liveBadgeText: { color: '#065F46', fontSize: 12, fontWeight: '600' },

  // Stats Grid
  statsGrid: { flexDirection: 'column', marginBottom: 20, gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1
  },
  statLabel: { fontSize: 12, color: '#6B7280', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5 },
  statValue: { fontSize: 24, fontWeight: '700', color: '#1F2937', marginTop: 4 },
  statSubtext: { fontSize: 14, color: '#6366F1', fontWeight: '500', marginTop: 2 },

  // Progress Section
  progressSection: { marginBottom: 20 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  progressLabel: { fontSize: 14, color: '#374151', fontWeight: '500' },
  progressPercentage: { fontSize: 14, color: '#10B981', fontWeight: '600' },
  progressBar: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4 },
  progressFill: { height: 8, width: '58.4%', backgroundColor: '#10B981', borderRadius: 4 },

  // Update Info
  updateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 12
  },
  updateText: { fontSize: 12, color: '#6366F1', marginLeft: 8, fontWeight: '500' },

  // Election Card Styles
  electionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3
  },
  electionHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  electionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0
  },
  electionTextContainer: { flex: 1, marginLeft: 12, marginRight: 12 },
  electionTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937', lineHeight: 22, flexWrap: 'wrap' },
  electionSubtitle: { fontSize: 13, color: '#6B7280', marginTop: 2 },

  // Location and Countdown
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  locationText: { fontSize: 14, color: '#6B7280', marginLeft: 8, fontWeight: '500' },
  countdownSection: { alignItems: 'center', marginBottom: 20 },
  countdownLabel: { fontSize: 14, color: '#6B7280', marginBottom: 12, fontWeight: '500' },
  countdownContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  timeBox: { alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 12, padding: 12, minWidth: 70 },
  timeValue: { fontSize: 24, fontWeight: '700', color: '#1F2937' },
  timeLabel: { fontSize: 12, color: '#6B7280', fontWeight: '500', marginTop: 4 },
  timeSeparator: { fontSize: 24, fontWeight: '700', color: '#D1D5DB', marginHorizontal: 8, textAlign: 'center' },

  // Vote Button
  voteButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  voteButtonContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  voteButtonText: { color: '#fff', fontSize: 16, fontWeight: '600', marginHorizontal: 8 },

  // Section Header
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937' },
  seeAllButton: { flexDirection: 'row', alignItems: 'center' },
  seeAllText: { fontSize: 14, color: '#6366F1', fontWeight: '600', marginRight: 4 },

  // Upcoming Elections
  upcomingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2
  },
  upcomingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0
  },
  upcomingContent: { flex: 1, marginLeft: 16, marginRight: 12 },
  upcomingTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937', lineHeight: 22, flexWrap: 'wrap' },
  upcomingMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  upcomingDate: { fontSize: 14, color: '#6B7280', marginLeft: 6, fontWeight: '500' },
  upcomingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
    alignSelf: 'flex-start'
  },
  upcomingBadgeText: { color: '#D97706', fontSize: 11, fontWeight: '600', marginLeft: 4 },
});
