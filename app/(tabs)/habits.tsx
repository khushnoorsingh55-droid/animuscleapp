import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Moon, Droplets, Target, Clock, CircleCheck as CheckCircle2, Circle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Habit {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  current: number;
  goal: number;
  unit: string;
  completed: boolean;
}

export default function HabitsScreen() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Sleep Quality',
      description: 'Rest like Goku after intense training',
      icon: Moon,
      color: '#8b5cf6',
      current: 7.5,
      goal: 8,
      unit: 'hours',
      completed: false,
    },
    {
      id: '2',
      name: 'Water Intake',
      description: 'Stay hydrated for peak performance',
      icon: Droplets,
      color: '#00d4ff',
      current: 6,
      goal: 8,
      unit: 'glasses',
      completed: false,
    },
    {
      id: '3',
      name: 'Meditation',
      description: 'Master your mind like Ultra Instinct',
      icon: Target,
      color: '#10b981',
      current: 15,
      goal: 20,
      unit: 'minutes',
      completed: false,
    },
    {
      id: '4',
      name: 'Training Time',
      description: 'Consistent effort creates heroes',
      icon: Clock,
      color: '#ff6b35',
      current: 45,
      goal: 60,
      unit: 'minutes',
      completed: false,
    },
  ]);

  const [weekProgress] = useState([
    { day: 'M', completed: 4, total: 4 },
    { day: 'T', completed: 3, total: 4 },
    { day: 'W', completed: 4, total: 4 },
    { day: 'T', completed: 2, total: 4 },
    { day: 'F', completed: 4, total: 4 },
    { day: 'S', completed: 3, total: 4 },
    { day: 'S', completed: 0, total: 4 },
  ]);

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, completed: !habit.completed }
        : habit
    ));
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getStreakColor = (completed: number, total: number) => {
    const percentage = (completed / total) * 100;
    if (percentage === 100) return '#10b981';
    if (percentage >= 75) return '#ff6b35';
    if (percentage >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const completedHabits = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Habits</Text>
        <Text style={styles.subtitle}>Build the discipline of champions</Text>
      </View>

      {/* Today's Progress */}
      <View style={styles.section}>
        <View style={styles.progressHeader}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <Text style={styles.progressText}>
            {completedHabits}/{totalHabits} completed
          </Text>
        </View>
        
        <View style={styles.overallProgress}>
          <LinearGradient
            colors={['#ff6b35', '#ff8c42']}
            style={[styles.progressGradient, { 
              width: `${(completedHabits / totalHabits) * 100}%` 
            }]} 
          />
        </View>
      </View>

      {/* Habits List */}
      <View style={styles.section}>
        {habits.map((habit) => {
          const IconComponent = habit.icon;
          const progress = getProgressPercentage(habit.current, habit.goal);
          
          return (
            <TouchableOpacity
              key={habit.id}
              style={[styles.habitCard, habit.completed && styles.habitCompleted]}
              onPress={() => toggleHabit(habit.id)}>
              
              <View style={styles.habitHeader}>
                <View style={[styles.habitIcon, { backgroundColor: habit.color + '20' }]}>
                  <IconComponent size={24} color={habit.color} />
                </View>
                
                <View style={styles.habitInfo}>
                  <Text style={[styles.habitName, habit.completed && styles.habitNameCompleted]}>
                    {habit.name}
                  </Text>
                  <Text style={styles.habitDescription}>{habit.description}</Text>
                </View>

                <View style={styles.habitStatus}>
                  {habit.completed ? (
                    <CheckCircle2 size={24} color="#10b981" />
                  ) : (
                    <Circle size={24} color="#666" />
                  )}
                </View>
              </View>

              <View style={styles.habitProgress}>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressValue}>
                    {habit.current}/{habit.goal} {habit.unit}
                  </Text>
                  <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
                </View>
                
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill,
                      { width: `${progress}%`, backgroundColor: habit.color }
                    ]} 
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Weekly Streak */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Streak</Text>
        <View style={styles.weekContainer}>
          {weekProgress.map((day, index) => (
            <View key={index} style={styles.dayColumn}>
              <Text style={styles.dayLabel}>{day.day}</Text>
              <View style={[
                styles.dayCircle,
                { backgroundColor: getStreakColor(day.completed, day.total) }
              ]}>
                <Text style={styles.dayScore}>
                  {day.completed}/{day.total}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Motivational Quotes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hero's Wisdom</Text>
        <View style={styles.quoteCard}>
          <Text style={styles.quote}>
            "The only way to truly control your power is to have a strong body and mind."
          </Text>
          <Text style={styles.quoteAuthor}>- Goku</Text>
        </View>
        
        <View style={styles.quoteCard}>
          <Text style={styles.quote}>
            "I became strong because I pushed myself to the limit every single day."
          </Text>
          <Text style={styles.quoteAuthor}>- Saitama</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Moon size={24} color="#8b5cf6" />
            <Text style={styles.actionText}>Log Sleep</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Droplets size={24} color="#00d4ff" />
            <Text style={styles.actionText}>Add Water</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Target size={24} color="#10b981" />
            <Text style={styles.actionText}>Meditate</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Clock size={24} color="#ff6b35" />
            <Text style={styles.actionText}>Start Timer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 16,
    color: '#ff6b35',
    fontWeight: '600',
  },
  overallProgress: {
    height: 8,
    backgroundColor: '#2a2a3e',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressGradient: {
    height: '100%',
    borderRadius: 4,
  },
  habitCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  habitCompleted: {
    backgroundColor: '#1a2e1a',
    borderWidth: 1,
    borderColor: '#10b98130',
  },
  habitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  habitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  habitNameCompleted: {
    color: '#10b981',
  },
  habitDescription: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  habitStatus: {
    marginLeft: 12,
  },
  habitProgress: {
    gap: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 16,
    color: '#a0a0a0',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2a2a3e',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 12,
    color: '#a0a0a0',
    marginBottom: 8,
    fontWeight: '600',
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayScore: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  quoteCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b35',
  },
  quote: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 8,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#ff6b35',
    fontWeight: '600',
    textAlign: 'right',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
});