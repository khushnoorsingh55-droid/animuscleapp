import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Flame, Target, Clock } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { getCurrentUser, getUserWorkoutSessions, WorkoutSession } from '../../lib/supabase';

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [recentSessions, setRecentSessions] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadUserData = async () => {
      try {
        const { user: currentUser } = await getCurrentUser();
        if (isMounted) {
          setUser(currentUser);
        }

        if (currentUser) {
          const { data: sessions } = await getUserWorkoutSessions(currentUser.id, 3);
          if (isMounted) {
            setRecentSessions(sessions || []);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUserData();

    return () => {
      isMounted = false;
    };
  }, []);
  const stats = [
    { icon: Trophy, label: 'Workouts', value: '24', color: '#ff6b35' },
    { icon: Flame, label: 'Streak', value: '7 days', color: '#00d4ff' },
    { icon: Target, label: 'Goal', value: '85%', color: '#10b981' },
    { icon: Clock, label: 'Avg Time', value: '45min', color: '#8b5cf6' },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    return `${diffDays - 1} days ago`;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.header}>
        <Text style={styles.greeting}>
          Welcome back, {user?.email?.split('@')[0] || 'Warrior'}!
        </Text>
        <Text style={styles.subtitle}>Ready to surpass your limits?</Text>
      </LinearGradient>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                <IconComponent size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        {recentSessions.length > 0 ? recentSessions.map((session, index) => (
          <TouchableOpacity key={index} style={styles.workoutCard}>
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutName}>
                {(session as any).workout_plans?.name || 'Workout Session'}
              </Text>
              <Text style={styles.workoutDetails}>
                {formatDate(session.started_at)} • {session.duration_minutes}min
              </Text>
            </View>
            <View style={[
              styles.intensityBadge,
              { backgroundColor: getIntensityColor('High') + '20' }
            ]}>
              <Text style={[styles.intensityText, { color: getIntensityColor('High') }]}>
                Completed
              </Text>
            </View>
          </TouchableOpacity>
        )) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No workouts yet. Start your first training!</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.quickStartButton}>
        <LinearGradient
          colors={['#ff6b35', '#ff8c42']}
          style={styles.quickStartGradient}>
          <Text style={styles.quickStartText}>Start Today's Workout</Text>
          <Target size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Login Button for Demo */}
      {!user && (
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => router.push('/login')}>
          <Text style={styles.loginButtonText}>Login to Save Progress</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

function getIntensityColor(intensity: string): string {
  switch (intensity) {
    case 'High': return '#ff6b35';
    case 'Extreme': return '#ef4444';
    case 'Medium': return '#10b981';
    default: return '#6b7280';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  workoutCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  workoutDetails: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  intensityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  intensityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  quickStartButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickStartGradient: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  quickStartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  emptyState: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
  },
});