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
      <View style={styles.timeBox}><Text style={styles.timeText}>{String(timeLeft.hours).padStart(2, '0')}</Text><Text style={styles.timeLabel}>Hours</Text></View>
      <View style={styles.timeBox}><Text style={styles.timeText}>{String(timeLeft.minutes).padStart(2, '0')}</Text><Text style={styles.timeLabel}>Minutes</Text></View>
      <View style={styles.timeBox}><Text style={styles.timeText}>{String(timeLeft.seconds).padStart(2, '0')}</Text><Text style={styles.timeLabel}>Seconds</Text></View>
    </View>
  );
};

const HomeScreenHeader = () => {
  const router = useRouter();

  return (
    <>
      <View style={styles.header}>
        <View>
          <ThemedText style={styles.headerTitle}>Hi, Shubham 👋</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Welcome to SecureVote</ThemedText>
        </View>
        <TouchableOpacity>
          <Image source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.liveCard}>
        <View style={styles.liveHeader}>
          <Ionicons name="analytics-outline" size={20} color="#4CAF50" />
          <ThemedText style={styles.liveTitle}>Live Vote Count</ThemedText>
          <View style={styles.liveBadge}><ThemedText style={styles.liveBadgeText}>Live</ThemedText></View>
        </View>
        <View style={styles.voteCountContainer}>
          <ThemedText style={styles.voteCountLabel}>Total Votes Cast (State)</ThemedText>
          <ThemedText style={styles.voteCount}>28,47,784</ThemedText>
          <View style={styles.turnoutContainer}>
            <ThemedText style={styles.turnoutText}>Voter turnout</ThemedText>
            <ThemedText style={styles.turnoutPercentage}>58.4%</ThemedText>
          </View>
          <View style={styles.progressBar}><View style={styles.progress} /></View>
        </View>
        <View style={styles.constituencyContainer}>
          <ThemedText style={styles.constituencyLabel}>Votes in Your Constituency</ThemedText>
          <ThemedText style={styles.constituencyVotes}>14,546 <ThemedText style={styles.constituencySubtext}>votes</ThemedText></ThemedText>
          <ThemedText style={styles.constituencyName}>Mumbai North</ThemedText>
        </View>
        <View style={styles.updateInfo}>
          <Ionicons name="sync-circle-outline" size={16} color={Colors.light.primary} />
          <ThemedText style={styles.updateText}>Updates every 5 seconds • Data from Election Commission</ThemedText>
        </View>
      </View>

      <View style={styles.electionCard}>
        <View style={styles.electionHeader}>
          <ThemedText style={styles.electionTitle}>Maharashtra General Election 2024</ThemedText>
          <View style={styles.liveBadge}><ThemedText style={styles.liveBadgeText}>Live</ThemedText></View>
        </View>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color={Colors.light.icon} />
          <ThemedText style={styles.locationText}>Mumbai North</ThemedText>
        </View>
        <ThemedText style={styles.countdownLabel}>Voting ends in</ThemedText>
        <Countdown />
        <TouchableOpacity style={styles.voteButton} onPress={() => router.push('/(tabs)/vote')}>
          <ThemedText style={styles.voteButtonText}>Vote Now</ThemedText>
          <Ionicons name="chevron-forward-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ThemedText style={styles.sectionTitle}>Upcoming Elections</ThemedText>
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
          <View>
            <ThemedText style={styles.upcomingTitle}>{item.name}</ThemedText>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={16} color={Colors.light.icon} />
              <ThemedText style={styles.upcomingDate}>{item.date}</ThemedText>
            </View>
          </View>
          <View style={styles.upcomingBadge}><ThemedText style={styles.upcomingBadgeText}>Upcoming</ThemedText></View>
        </View>
      )}
      ListHeaderComponent={HomeScreenHeader}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.light.text },
  headerSubtitle: { fontSize: 16, color: Colors.light.icon },
  profileIcon: { width: 50, height: 50, borderRadius: 25 },
  liveCard: { backgroundColor: '#E8F5E9', borderRadius: 20, padding: 20, marginHorizontal: 20, marginBottom: 20 },
  liveHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  liveTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text, marginLeft: 8 },
  liveBadge: { backgroundColor: '#C8E6C9', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, marginLeft: 'auto' },
  liveBadgeText: { color: '#2E7D32', fontSize: 12, fontWeight: 'bold' },
  voteCountContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 15, marginBottom: 15 },
  voteCountLabel: { fontSize: 14, color: Colors.light.icon },
  voteCount: { fontSize: 32, fontWeight: 'bold', color: Colors.light.text, marginVertical: 5 },
  turnoutContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  turnoutText: { fontSize: 14, color: Colors.light.icon },
  turnoutPercentage: { fontSize: 14, color: '#4CAF50', fontWeight: 'bold' },
  progressBar: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, marginTop: 5 },
  progress: { height: 6, width: '58.4%', backgroundColor: '#4CAF50', borderRadius: 3 },
  constituencyContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 15, marginBottom: 15 },
  constituencyLabel: { fontSize: 14, color: Colors.light.icon },
  constituencyVotes: { fontSize: 24, fontWeight: 'bold', color: Colors.light.text, marginVertical: 2 },
  constituencySubtext: { fontSize: 16, fontWeight: 'normal', color: Colors.light.icon },
  constituencyName: { fontSize: 14, color: Colors.light.primary },
  updateInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E3F2FD', borderRadius: 10, padding: 10 },
  updateText: { fontSize: 12, color: Colors.light.primary, marginLeft: 8 },
  electionCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginHorizontal: 20, marginBottom: 20 },
  electionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  electionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  locationText: { fontSize: 14, color: Colors.light.icon, marginLeft: 8 },
  countdownLabel: { fontSize: 14, color: Colors.light.icon, marginBottom: 10, textAlign: 'center' },
  countdownContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  timeBox: { alignItems: 'center', backgroundColor: '#F0F4F8', borderRadius: 10, padding: 10, width: 70 },
  timeText: { fontSize: 24, fontWeight: 'bold', color: Colors.light.text },
  timeLabel: { fontSize: 12, color: Colors.light.icon },
  voteButton: { backgroundColor: Colors.light.primary, borderRadius: 15, paddingVertical: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  voteButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginRight: 8 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.light.text, marginHorizontal: 20, marginBottom: 15 },
  upcomingCard: { backgroundColor: '#fff', borderRadius: 15, padding: 20, marginHorizontal: 20, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  upcomingTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text },
  dateContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  upcomingDate: { fontSize: 14, color: Colors.light.icon, marginLeft: 8 },
  upcomingBadge: { backgroundColor: '#FFF3E0', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  upcomingBadgeText: { color: '#EF6C00', fontSize: 12, fontWeight: 'bold' },
});
