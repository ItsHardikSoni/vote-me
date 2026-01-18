import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

const nationalResults = [
  { id: '1', name: 'Bharatiya Janata Party', votes: '12,46,162', percentage: '36.7%', color: '#FFA500', logo: require('@/assets/images/react-logo.png') },
  { id: '2', name: 'Indian National Congress', votes: '9,87,684', percentage: '29.1%', color: '#1976D2', logo: require('@/assets/images/react-logo.png') },
  { id: '3', name: 'Aam Aadmi Party', votes: '4,57,168', percentage: '13.5%', color: '#4CAF50', logo: require('@/assets/images/react-logo.png') },
  { id: '4', name: 'Trinamool Congress', votes: '3,46,084', percentage: '10.2%', color: '#008080', logo: require('@/assets/images/react-logo.png') },
];

const districtWinners = [
  { id: '1', district: 'Mumbai', party: 'Bharatiya Janata Party', votes: '45,678' },
  { id: '2', district: 'Delhi', party: 'Aam Aadmi Party', votes: '56,789' },
  { id: '3', district: 'Bangalore', party: 'Indian National Congress', votes: '43,210' },
  { id: '4', district: 'Kolkata', party: 'Trinamool Congress', votes: '54,321' },
  { id: '5', district: 'Chennai', party: 'Indian National Congress', votes: '38,976' },
];

const stateSummary = [
  { id: '1', state: 'Maharashtra', leading: 'BJP Leading' },
  { id: '2', state: 'Delhi', leading: 'AAP Leading' },
  { id: '3', state: 'West Bengal', leading: 'TMC Leading' },
];

export default function ResultScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <Ionicons name="analytics-outline" size={24} color={Colors.light.text} />
        <ThemedText style={styles.headerTitle}>Live Results</ThemedText>
      </ThemedView>
      <ThemedText style={styles.subtitle}>General Elections 2026</ThemedText>

      <View style={styles.liveUpdatesCard}>
        <Ionicons name="pulse-outline" size={24} color="#fff" />
        <View style={{ marginLeft: 15 }}>
          <ThemedText style={styles.liveUpdatesTitle}>Live Updates</ThemedText>
          <ThemedText style={styles.liveUpdatesSubtitle}>Updates every 5 seconds</ThemedText>
        </View>
        <ThemedText style={styles.liveUpdatesTime}>02:46 PM</ThemedText>
      </View>

      <View style={styles.totalVotesCard}>
        <ThemedText style={styles.totalVotesLabel}>Total Votes Counted</ThemedText>
        <ThemedText style={styles.totalVotesCount}>33,95,895</ThemedText>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="trophy-outline" size={20} color={Colors.light.primary} />
          <ThemedText style={styles.sectionTitle}>National Results</ThemedText>
        </View>
        {nationalResults.map((item, index) => (
            <View key={item.id} style={styles.partyCard}>
              <View style={styles.partyInfo}>
                <Text style={styles.rank}>{index + 1}</Text>
                <Image source={item.logo} style={styles.partyLogo} />
                <View>
                  <ThemedText style={styles.partyName}>{item.name}</ThemedText>
                  <ThemedText style={styles.partyVotes}>{item.votes} votes</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.partyPercentage}>{item.percentage}</ThemedText>
              <View style={styles.progressBar}><View style={[styles.progress, { width: item.percentage, backgroundColor: item.color }]} />
              </View>
            </View>
          ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="location-outline" size={20} color={Colors.light.primary} />
          <ThemedText style={styles.sectionTitle}>District-wise Winners</ThemedText>
        </View>
        {districtWinners.map(item => (
          <View key={item.id} style={styles.districtCard}>
            <View>
              <ThemedText style={styles.districtName}>{item.district}</ThemedText>
              <ThemedText style={styles.districtParty}>{item.party}</ThemedText>
            </View>
            <ThemedText style={styles.districtVotes}>{item.votes} votes</ThemedText>
          </View>
        ))}
      </View>
      
      <View style={styles.yourDistrictCard}>
        <ThemedText>Your District: Mumbai</ThemedText>
        <ThemedText style={{fontWeight: 'bold'}}>Leading Party</ThemedText>
        <ThemedText>Bharatiya Janata Party</ThemedText>
        <Ionicons name="trophy" size={24} color={Colors.light.primary} style={{position: 'absolute', right: 20, top: 20}}/>
      </View>
      
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>State-wise Summary</ThemedText>
        {stateSummary.map(item => (
            <View key={item.id} style={styles.stateCard}>
                <ThemedText style={styles.stateName}>{item.state}</ThemedText>
                <ThemedText style={styles.stateLeader}>{item.leading}</ThemedText>
            </View>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginLeft: 10 },
  subtitle: { fontSize: 16, color: Colors.light.icon, paddingHorizontal: 20, marginBottom: 20 },
  liveUpdatesCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#00C48C', borderRadius: 15, padding: 20, marginHorizontal: 20, marginBottom: 20 },
  liveUpdatesTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  liveUpdatesSubtitle: { color: '#fff', fontSize: 12 },
  liveUpdatesTime: { color: '#fff', fontSize: 14, marginLeft: 'auto' },
  totalVotesCard: { backgroundColor: '#fff', borderRadius: 15, padding: 20, marginHorizontal: 20, marginBottom: 20, alignItems: 'center' },
  totalVotesLabel: { color: Colors.light.icon, fontSize: 14 },
  totalVotesCount: { fontSize: 32, fontWeight: 'bold', color: Colors.light.text, marginTop: 5 },
  section: { backgroundColor: '#fff', borderRadius: 15, padding: 20, marginHorizontal: 20, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  partyCard: { marginBottom: 15 },
  partyInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  rank: { marginRight: 15, fontWeight: 'bold', color: Colors.light.icon },
  partyLogo: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  partyName: { fontWeight: 'bold' },
  partyVotes: { fontSize: 12, color: Colors.light.icon },
  partyPercentage: { position: 'absolute', right: 0, top: 5, fontWeight: 'bold', fontSize: 16 },
  progressBar: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, marginTop: 5 },
  progress: { height: 8, borderRadius: 4 },
  districtCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 10, padding: 15, marginBottom: 10 },
  districtName: { fontWeight: 'bold' },
  districtParty: { fontSize: 12, color: Colors.light.icon },
  districtVotes: { fontWeight: 'bold' },
  yourDistrictCard: { backgroundColor: '#E3F2FD', borderRadius: 15, padding: 20, marginHorizontal: 20, marginBottom: 20},
  stateCard: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 10, padding: 15, marginBottom: 10},
  stateName: {fontWeight: 'bold'},
  stateLeader: {fontWeight: 'bold', color: Colors.light.primary}
});
