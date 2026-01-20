import React from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';

const results = {
  partyWise: [
    { id: '1', name: 'Party A', votes: 120345, logo: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Party B', votes: 98765, logo: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Party C', votes: 75432, logo: 'https://via.placeholder.com/50' },
  ],
  districtWinners: [
    { id: '1', district: 'District A', winner: 'Party A' },
    { id: '2', district: 'District B', winner: 'Party B' },
    { id: '3', district: 'District C', winner: 'Party A' },
  ],
  stateWinners: [
    { id: '1', state: 'State X', winner: 'Party A' },
    { id: '2', state: 'State Y', winner: 'Party B' },
  ],
};

const renderPartyResult = ({ item, index }: { item: { id: string, logo: string, name: string, votes: number }, index: number }) => (
  <View style={styles.partyCard}>
    <Text style={styles.rank}>{index + 1}</Text>
    <Image source={{ uri: item.logo }} style={styles.partyLogo} />
    <ThemedText style={styles.partyName}>{item.name}</ThemedText>
    <ThemedText style={styles.voteCount}>{item.votes.toLocaleString()}</ThemedText>
  </View>
);

export default function ResultScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText style={styles.title}>Live Election Results</ThemedText>
        <View style={styles.liveIndicator}>
          <Ionicons name="ellipse" size={12} color="#4CAF50" />
          <ThemedText style={styles.liveText}>Live Updates</ThemedText>
        </View>

        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>Party-wise Vote Count</ThemedText>
          <FlatList
            data={results.partyWise.sort((a, b) => b.votes - a.votes)}
            renderItem={renderPartyResult}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>District-wise Winners</ThemedText>
          {results.districtWinners.map((item) => (
            <View key={item.id} style={styles.winnerRow}>
              <ThemedText style={styles.locationName}>{item.district}</ThemedText>
              <ThemedText style={styles.winnerName}>{item.winner}</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>State-wise Winners</ThemedText>
          {results.stateWinners.map((item) => (
            <View key={item.id} style={styles.winnerRow}>
              <ThemedText style={styles.locationName}>{item.state}</ThemedText>
              <ThemedText style={styles.winnerName}>{item.winner}</ThemedText>
            </View>
          ))}
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  liveText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  partyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 15,
    color: '#ccc',
  },
  partyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  partyName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  voteCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  winnerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  locationName: {
    fontSize: 16,
    color: '#000',
  },
  winnerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});