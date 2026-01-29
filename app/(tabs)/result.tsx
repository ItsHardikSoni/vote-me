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

      
      <View style={styles.yourDistrictCard}>
        <ThemedText>Your District: Mumbai</ThemedText>
        <ThemedText style={{fontWeight: 'bold'}}>Leading Party</ThemedText>
        <ThemedText>Bharatiya Janata Party</ThemedText>
        <Ionicons name="trophy" size={24} color={Colors.light.primary} style={{position: 'absolute', right: 20, top: 20}}/>
      </View>
      
      <View style={styles.statesSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconContainer}>
            <Ionicons name="map-outline" size={20} color="#6366F1" />
          </View>
          <ThemedText style={styles.sectionTitle}>State-wise Summary</ThemedText>
        </View>

        <View style={styles.statesList}>
          {stateSummary.map(item => (
            <View key={item.id} style={styles.stateCard}>
              <View style={styles.stateInfo}>
                <View style={styles.stateIcon}>
                  <Ionicons name="business-outline" size={16} color="#6366F1" />
                </View>
                <ThemedText style={styles.stateName}>{item.state}</ThemedText>
              </View>
              <View style={styles.stateStatus}>
                <View style={styles.statusIndicator} />
                <ThemedText style={styles.stateLeader}>{item.leading}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
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
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
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
  yourDistrictCard: { backgroundColor: '#E3F2FD', borderRadius: 15, padding: 20, marginHorizontal: 20, marginBottom: 20},
  stateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6'
  },
  stateInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  stateIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  stateName: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  stateLeader: { fontSize: 14, fontWeight: '600', color: '#059669' },

  // States Section
  statesSection: {
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
  statesList: { gap: 12 },
  stateStatus: { flexDirection: 'row', alignItems: 'center' },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8
  }
});
