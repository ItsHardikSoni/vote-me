// @ts-ignore - React 19 compatibility issue with TypeScript
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';

const candidates = [
  { id: '1', name: 'Rajesh Kumar', party: 'Indian National Congress', icon: require('@/assets/images/react-logo.png') },
  { id: '2', name: 'Priya Sharma', party: 'Bharatiya Janata Party', icon: require('@/assets/images/react-logo.png') },
  { id: '3', name: 'Amit Patel', party: 'Aam Aadmi Party', icon: require('@/assets/images/react-logo.png') },
  { id: '4', name: 'Sunita Desai', party: 'Shiv Sena', icon: require('@/assets/images/react-logo.png') },
];

export default function VoteScreen() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  const [voterName, setVoterName] = useState<string>('');
  const [voterEpic, setVoterEpic] = useState<string>('');
  const router = useRouter();

  const loadVoterInfo = useCallback(async () => {
    try {
      const phoneNumber = await AsyncStorage.getItem('loggedInUserPhone');
      if (!phoneNumber) return;

      const { data, error } = await supabase
        .from('users')
        .select('full_name, epic_number')
        .eq('phone_number', phoneNumber)
        .maybeSingle();

      if (error) {
        console.error('Error fetching voter info:', error);
        return;
      }

      if (data) {
        setVoterName(data.full_name ?? '');
        setVoterEpic(data.epic_number ?? '');
      }
    } catch (e) {
      console.error('Unexpected error loading voter info:', e);
    }
  }, []);

  useEffect(() => {
    loadVoterInfo();
  }, [loadVoterInfo]);

  const handleVote = () => {
    if (selectedCandidate) {
      setVoted(true);
    }
  };

  const renderCandidateCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.candidateCard, selectedCandidate === item.id && styles.selectedCard]}
      onPress={() => setSelectedCandidate(item.id)}
    >
      <Image source={item.icon} style={styles.candidateIcon} />
      <View>
        <ThemedText style={styles.candidateName}>{item.name}</ThemedText>
        <ThemedText style={styles.candidateParty}>{item.party}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  if (voted) {
    return (
      <ThemedView style={styles.successContainer}>
        <View style={styles.successCard}>
          <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
          <ThemedText style={styles.successTitle}>You have already voted</ThemedText>
          <ThemedText style={styles.successMessage}>
            Thank you for participating in the democratic process. Your vote has been recorded securely.
          </ThemedText>
          <View style={styles.voterInfo}>
            <ThemedText>Voter: {voterName || '—'}</ThemedText>
            <ThemedText>EPIC: {voterEpic || '—'}</ThemedText>
          </View>
          <View style={styles.encryptionInfo}>
            <Ionicons name="shield-checkmark-outline" size={16} color={Colors.light.icon} />
            <ThemedText style={styles.encryptionText}>Your vote is encrypted and anonymous</ThemedText>
          </View>
          <TouchableOpacity style={styles.goBackButton} onPress={() => router.push('/(tabs)')}>
            <ThemedText style={styles.goBackButtonText}>Go Back</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="time-outline" size={20} color={Colors.light.primary} />
        <ThemedText style={styles.headerText}>Voting ends at 06:00 PM</ThemedText>
        <ThemedText style={styles.timer}>8h 45m left</ThemedText>
      </View>
      <ThemedText style={styles.title}>Cast Your Vote</ThemedText>
      <ThemedText style={styles.subtitle}>Select a candidate to vote for Mumbai North</ThemedText>
      <FlatList
        data={candidates}
        renderItem={renderCandidateCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={[styles.submitButton, !selectedCandidate && styles.disabledButton]} onPress={handleVote} disabled={!selectedCandidate}>
        <ThemedText style={styles.submitButtonText}>Submit Vote</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E3F2FD', padding: 20, borderRadius: 10, margin: 20},
  headerText: { flex: 1, marginLeft: 10, color: Colors.light.primary, fontWeight: 'bold' },
  timer: { color: Colors.light.primary, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.light.text, paddingHorizontal: 20 },
  subtitle: { fontSize: 16, color: Colors.light.icon, paddingHorizontal: 20, marginBottom: 20 },
  listContainer: { paddingHorizontal: 20 },
  candidateCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 15, padding: 15, marginBottom: 15, borderWidth: 2, borderColor: 'transparent' },
  selectedCard: { borderColor: Colors.light.primary },
  candidateIcon: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  candidateName: { fontSize: 18, fontWeight: 'bold', color: Colors.light.text },
  candidateParty: { fontSize: 14, color: Colors.light.icon },
  submitButton: { backgroundColor: Colors.light.primary, borderRadius: 15, paddingVertical: 18, alignItems: 'center', margin: 20 },
  disabledButton: { backgroundColor: '#B0C4DE' },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  successContainer: { flex: 1, backgroundColor: '#F0F4F8', justifyContent: 'center', alignItems: 'center', padding: 20 },
  successCard: { backgroundColor: '#fff', borderRadius: 20, padding: 30, alignItems: 'center', width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', elevation: 5 },
  successTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.light.text, marginVertical: 15 },
  successMessage: { fontSize: 16, color: Colors.light.icon, textAlign: 'center', marginBottom: 20 },
  voterInfo: { backgroundColor: '#E8F5E9', borderRadius: 10, padding: 15, marginBottom: 20, width: '100%' },
  encryptionInfo: { flexDirection: 'row', alignItems: 'center' },
  encryptionText: { marginLeft: 10, color: Colors.light.icon },
  goBackButton: { marginTop: 20, backgroundColor: Colors.light.primary, borderRadius: 15, paddingVertical: 15, paddingHorizontal: 30 },
  goBackButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
