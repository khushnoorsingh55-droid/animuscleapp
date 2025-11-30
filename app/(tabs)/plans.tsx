import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Crown, Flame, Target, Zap, Shield, Swords } from 'lucide-react-native';

interface WorkoutPlan {
  id: string;
  character: string;
  icon: any;
  colors: string[];
  days: {
    day: string;
    title: string;
    exercises: string[];
  }[];
}

export default function WorkoutPlansScreen() {
  const [selectedPlan, setSelectedPlan] = useState<string>('daniel');

  const workoutPlans: WorkoutPlan[] = [
    {
      id: 'daniel',
      character: 'DANIEL',
      icon: Crown,
      colors: ['#8b5cf6', '#7c3aed'],
      days: [
        {
          day: 'Day 1',
          title: 'Pull (Back + Biceps)',
          exercises: [
            '• Pull-Ups – Max',
            '• Australian Rows – 2 sets',
            '• Chin-Ups – 2 x 2',
            '(Rest 45–60 sec)'
          ]
        },
        {
          day: 'Day 2',
          title: 'Push (Triceps + Shoulders)',
          exercises: [
            '• Push-Ups – 10 reps',
            '• Pike Push-Ups – 10 reps',
            '• Diamond Push-Ups – 12 reps',
            '• Wall Handstand Hold – 30 sec',
            '(Rest 45–60 sec)'
          ]
        },
        {
          day: 'Day 3',
          title: 'Legs + Core',
          exercises: [
            '• Bodyweight Squats – 20 reps',
            '• Jump Squats – 15 reps',
            '• Wall Sit – 1 min',
            '• Leg Raises – 10 reps'
          ]
        },
        {
          day: 'Day 4',
          title: 'Pull (Strength)',
          exercises: [
            '• Weighted Pull-Ups – 5 reps',
            '• Dead Hangs – 3 sec',
            '• Archer Pull-Ups – 6 each side',
            '• Chin-Up Hold – 20 sec'
          ]
        },
        {
          day: 'Day 5',
          title: 'Full Body + Core',
          exercises: [
            '• Handstand Push-Ups – Max',
            '• Slow Push-Ups – Max',
            '• Pseudo Planche Push – 10',
            '• Dips – 15'
          ]
        },
        {
          day: 'Day 6',
          title: 'Full Body + Core',
          exercises: [
            '• Pull-Ups – Max',
            '• Push-Ups – Max',
            '• Jump Squats – 2 x 15',
            '• Knee to Elbow – 20'
          ]
        }
      ]
    },
    {
      id: 'gun',
      character: 'GUN PARK',
      icon: Flame,
      colors: ['#ef4444', '#dc2626'],
      days: [
        {
          day: 'Day 1',
          title: 'Upper Body Strength',
          exercises: [
            '• Pull-Ups – 3 x 5–10',
            '• Push-Ups – 3 x 10–20',
            '• Dips – 3 x 6–12'
          ]
        },
        {
          day: 'Day 2',
          title: 'Legs + Core',
          exercises: [
            '• Bodyweight Squats – 3 x 15–25',
            '• Wall Sit – 3 x 30–45 sec',
            '• Leg Raises – 3 x 10–15'
          ]
        },
        {
          day: 'Day 3',
          title: 'Pull Focus',
          exercises: [
            '• Close Push-Ups – 3 x 8–15',
            '• Dips – 3 x 6–12',
            '• Isometric Hang – 3 x 20–30 sec'
          ]
        },
        {
          day: 'Day 4',
          title: 'Core + Explosive',
          exercises: [
            '• Hanging Leg Raises – 3 x 10–15',
            '• Jump Squats – 3 x 12–20',
            '• Plank – 3 x 30–45 sec'
          ]
        },
        {
          day: 'Day 5',
          title: 'Core + Explosive',
          exercises: [
            '• Hanging Leg Raises – 3 x 10–15',
            '• Jump Squats – 3 x 12–20',
            '• Plank – 3 x 30–45 sec'
          ]
        },
        {
          day: 'Day 6',
          title: 'Full Body',
          exercises: [
            '• Pull-Ups – 3 x 5–10',
            '• Push-Ups – 3 x 10–20',
            '• Squats – 3 x 15–25'
          ]
        }
      ]
    },
    {
      id: 'saitama',
      character: 'SAITAMA',
      icon: Target,
      colors: ['#00d4ff', '#0ea5e9'],
      days: [
        {
          day: 'Day 1',
          title: 'Upper Body Push',
          exercises: [
            '• Diamond Push-Ups',
            '• Pike Push-Ups – 4 x 10–15',
            '• Wall Plank Hold – 3 x 30 sec',
            '• Dips – 3 x 10–15'
          ]
        },
        {
          day: 'Day 2',
          title: 'Upper Body Pull',
          exercises: [
            '• Pull-Ups – 4 x 6–12',
            '• Chin-Ups – 3 x 6–10',
            '• Inverted Rows – 3 x 8–12',
            '• Archer Pull-Ups – 2 x 5 each side'
          ]
        },
        {
          day: 'Day 3',
          title: 'Legs + Core',
          exercises: [
            '• Squats – 4 x 15–25',
            '• Jump Squats – 3 x 10–15',
            '• Hanging Leg Raises – 4 x 10–15',
            '• Wall Sit – 2 x 45 sec'
          ]
        },
        {
          day: 'Day 4',
          title: 'Explosive Power + Endurance',
          exercises: [
            '• Clap Push-Ups – 3 x 8–12',
            '• Burpees – 3 x 10–15',
            '• Jump Lunges – 3 x 10 each leg',
            '• Pull-Up Hold – 3 x 15–30 sec'
          ]
        },
        {
          day: 'Day 5',
          title: 'Core Focus',
          exercises: [
            '• Hanging Knee Raises – 3 x 15',
            '• Plank – 3 x 1 min',
            '• V-Ups – 3 x 15',
            '• Toe-to-Bar – 3 x 6–10'
          ]
        },
        {
          day: 'Day 6',
          title: 'Full Body Challenge',
          exercises: [
            '• Pull-Ups – 3 x Max',
            '• Push-Ups – 3 x Max',
            '• Squats – 3 x Max',
            '• Leg Raises – 3 x 15',
            '• Burpees – 2 x 20'
          ]
        }
      ]
    },
    {
      id: 'asta',
      character: 'ASTA',
      icon: Zap,
      colors: ['#ff6b35', '#ff8c42'],
      days: [
        {
          day: 'Day 1',
          title: 'Upper Body Strength',
          exercises: [
            '• Push-Ups – 5 x Max',
            '• Wide Push-Ups – 3 x 12',
            '• Pike Push-Ups – 3 x 10',
            '• Diamond Push-Ups – 3 x 8',
            '• Plank Hold – 3 x 1 min'
          ]
        },
        {
          day: 'Day 2',
          title: 'Lower Body Power',
          exercises: [
            '• Jump Squats – 5 x 12',
            '• Bulgarian Split Squats – 3 x 10 each leg',
            '• Wall Sit – 3 x 45 sec',
            '• Glute Bridges – 3 x 15',
            '• Calf Raises – 3 x 20'
          ]
        },
        {
          day: 'Day 3',
          title: 'Core & Anti-Magic Abs',
          exercises: [
            '• Hanging Knee Raises – 4 x 12',
            '• Plank to Push-Up – 3 x 10',
            '• Russian Twists – 3 x 30',
            '• V-Ups – 3 x 12',
            '• Hollow Body Hold – 3 x 30 sec'
          ]
        },
        {
          day: 'Day 4',
          title: 'Explosive Power + Cardio',
          exercises: [
            '• Burpees – 4 x 10',
            '• Broad Jumps – 4 x 8',
            '• Mountain Climbers – 4 x 30 sec',
            '• Sprint Intervals – 6 rounds: 20 sec sprint + 40 sec walk'
          ]
        },
        {
          day: 'Day 5',
          title: 'Full Body Conditioning (4 Rounds)',
          exercises: [
            '• Push-Ups – 15',
            '• Air Squats – 20',
            '• Sit-Ups – 15',
            '• Burpees – 10',
            '• Plank – 45 sec'
          ]
        },
        {
          day: 'Day 6',
          title: 'Mobility & Recovery',
          exercises: [
            '• Yoga Flow (Downward Dog, Cat-Cow, Pigeon, Hip Openers)',
            '• Box Breathing – 5 min',
            '• Optional Core: Planks, Leg Raises'
          ]
        }
      ]
    },
    {
      id: 'baki',
      character: 'BAKI',
      icon: Shield,
      colors: ['#ef4444', '#dc2626'],
      days: [
        {
          day: 'Day 1',
          title: 'Upper Body Dominance',
          exercises: [
            '• Pull-Ups – 5 x Max',
            '• Archer Push-Ups – 4 x 10 each side',
            '• Dips – 3 x 12',
            '• Wide Push-Ups – 3 x 15',
            '• Isometric Pull-Up Hold – 2 x 20 sec'
          ]
        },
        {
          day: 'Day 2',
          title: 'Core Blaster',
          exercises: [
            '• Hanging Leg Raises – 4 x 12',
            '• V-Ups – 3 x 15',
            '• Dragon Flags – 3 x 5',
            '• L-Sit Hold – 3 x 20 sec',
            '• Plank with Shoulder Taps – 3 x 30 sec'
          ]
        },
        {
          day: 'Day 3',
          title: 'Raw Power (Pull Focus)',
          exercises: [
            '• Chin-Ups – 5 x Max',
            '• Australian Rows – 3 x 12',
            '• Negative Pull-Ups – 3 x 6',
            '• Towel Rows – 3 x 10',
            '• Dead Hangs – 2 x 30 sec'
          ]
        },
        {
          day: 'Day 4',
          title: 'Legs of a Fighter',
          exercises: [
            '• Pistol Squats – 3 x 6 each leg',
            '• Jump Squats – 4 x 15',
            '• Wall Sit – 3 x 1 min',
            '• Calf Raises (slow) – 4 x 25',
            '• Sprint-in-Place – 3 x 30 sec'
          ]
        },
        {
          day: 'Day 5',
          title: 'Explosive Hanma Mode',
          exercises: [
            '• Clap Push-Ups – 4 x 10',
            '• Jump Lunges – 3 x 12 each leg',
            '• Muscle-Ups / Explosive Pull-Ups – 3 x 5',
            '• Broad Jumps – 3 x 6',
            '• Burpees – 3 x 15'
          ]
        },
        {
          day: 'Day 6',
          title: 'Full Body Circuit (3 Rounds)',
          exercises: [
            '• Pull-Ups – Max',
            '• Push-Ups – 20',
            '• Squats – 25',
            '• Hanging Knee Raises – 15',
            '• Burpees – 10',
            '• L-Sit Hold – 20 sec',
            '• Plank – 1 min'
          ]
        }
      ]
    }
  ];

  const selectedPlanData = workoutPlans.find(plan => plan.id === selectedPlan);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.header}>
        <Text style={styles.title}>Workout Plans</Text>
        <Text style={styles.subtitle}>Complete 6-day anime training programs</Text>
      </LinearGradient>

      {/* Character Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}>
        {workoutPlans.map((plan) => {
          const IconComponent = plan.icon;
          const isSelected = selectedPlan === plan.id;
          
          return (
            <TouchableOpacity
              key={plan.id}
              style={[styles.tab, isSelected && styles.activeTab]}
              onPress={() => setSelectedPlan(plan.id)}>
              {isSelected ? (
                <LinearGradient
                  colors={plan.colors}
                  style={styles.activeTabGradient}>
                  <IconComponent size={20} color="#fff" />
                  <Text style={styles.activeTabText}>{plan.character}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.inactiveTab}>
                  <IconComponent size={20} color="#666" />
                  <Text style={styles.inactiveTabText}>{plan.character}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Workout Plan Content */}
      {selectedPlanData && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Plan Header */}
          <LinearGradient
            colors={selectedPlanData.colors}
            style={styles.planHeader}>
            <View style={styles.planHeaderContent}>
              <Text style={styles.planHeaderLine}>━━━━━━━━━━━━━━━━━━━━</Text>
              <View style={styles.planTitleContainer}>
                <selectedPlanData.icon size={32} color="#fff" />
                <Text style={styles.planTitle}>{selectedPlanData.character} WORKOUT PLAN</Text>
              </View>
              <Text style={styles.planHeaderLine}>━━━━━━━━━━━━━━━━━━━━</Text>
            </View>
          </LinearGradient>

          {/* Days */}
          <View style={styles.daysContainer}>
            {selectedPlanData.days.map((day, index) => (
              <View key={index} style={styles.dayCard}>
                <View style={styles.dayHeader}>
                  <Text style={[styles.dayNumber, { color: selectedPlanData.colors[0] }]}>
                    {day.day}
                  </Text>
                  <Text style={styles.dayTitle}>{day.title}</Text>
                </View>
                
                <View style={styles.exercisesList}>
                  {day.exercises.map((exercise, exerciseIndex) => (
                    <Text 
                      key={exerciseIndex} 
                      style={[
                        styles.exerciseText,
                        exercise.startsWith('(') && styles.restText
                      ]}>
                      {exercise}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Training Tips */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>Training Tips</Text>
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>
                💪 <Text style={styles.tipBold}>Progressive Overload:</Text> Increase reps/sets weekly
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>
                🔥 <Text style={styles.tipBold}>Rest & Recovery:</Text> Sleep 7-9 hours, eat protein-rich meals
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>
                ⚡ <Text style={styles.tipBold}>Consistency:</Text> Train 6 days, rest 1 day per week
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
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
  tabsContainer: {
    maxHeight: 80,
  },
  tabsContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  tab: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  activeTab: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  activeTabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  inactiveTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a2e',
    gap: 8,
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  inactiveTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  content: {
    flex: 1,
  },
  planHeader: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  planHeaderContent: {
    padding: 24,
    alignItems: 'center',
  },
  planHeaderLine: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  planTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  daysContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  dayCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
  },
  dayHeader: {
    marginBottom: 16,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  exercisesList: {
    gap: 8,
  },
  exerciseText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  restText: {
    color: '#a0a0a0',
    fontStyle: 'italic',
    marginTop: 8,
  },
  tipsSection: {
    padding: 16,
    marginTop: 24,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  tipCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  tipText: {
    fontSize: 16,
    color: '#a0a0a0',
    lineHeight: 22,
  },
  tipBold: {
    fontWeight: 'bold',
    color: '#fff',
  },
});