import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Play, Pause, RotateCcw, CircleCheck as CheckCircle, Clock, Target } from 'lucide-react-native';
import { getCurrentUser, createWorkoutSession, updateWorkoutSession, getWorkoutPlans } from '../lib/supabase';

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: number;
}

export default function WorkoutSessionScreen() {
  const router = useRouter();
  const { programId, characterName, programTitle } = useLocalSearchParams();
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [workoutStartTime] = useState(Date.now());
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      const { user: currentUser } = await getCurrentUser();
      setUser(currentUser);
      
      if (currentUser) {
        // Create a new workout session
        const { data: plans } = await getWorkoutPlans();
        const workoutPlan = plans?.find(p => p.character === characterName);
        
        if (workoutPlan) {
          const { data: session } = await createWorkoutSession({
            user_id: currentUser.id,
            workout_plan_id: workoutPlan.id,
            started_at: new Date().toISOString(),
            duration_minutes: 0,
            exercises_completed: 0,
            total_exercises: exercises.length,
          });
          
          if (session) {
            setCurrentSessionId(session.id);
          }
        }
      }
    } catch (error) {
      console.error('Error initializing session:', error);
    }
  };
  // Get workout based on character - using YOUR EXACT routines
  const getWorkoutByCharacter = (characterName: string) => {
    switch (characterName) {
      case 'Daniel Park':
        // Day 1 – Upper Body Power (Push Focus)
        return [
          { name: 'Pull-Ups', sets: '4', reps: 'Max reps', rest: 60 },
          { name: 'Push-Ups', sets: '4', reps: '15–20', rest: 45 },
          { name: 'Dips (Chair/Parallel Bar)', sets: '3', reps: '10–15', rest: 60 },
          { name: 'Explosive Push-Ups (Clap/Plyo)', sets: '3', reps: '8', rest: 60 },
        ];
      
      case 'Gun Park':
        // Elite Fighter Training
        return [
          { name: 'Combat Conditioning Circuit', sets: '4', reps: '30 sec each', rest: 90 },
          { name: 'Advanced Pull-Ups', sets: '5', reps: 'Max', rest: 60 },
          { name: 'Explosive Push-Ups', sets: '4', reps: '12-15', rest: 60 },
          { name: 'Combat Stance Training', sets: '3', reps: '45 sec', rest: 60 },
          { name: 'Elite Fighter Finisher', sets: '2', reps: 'Max effort', rest: 120 },
        ];
      
      case 'Saitama':
        // The legendary routine
        return [
          { name: '100 Push-ups', sets: '1', reps: '100', rest: 120 },
          { name: '100 Sit-ups', sets: '1', reps: '100', rest: 120 },
          { name: '100 Squats', sets: '1', reps: '100', rest: 120 },
          { name: '10km Run', sets: '1', reps: '10km', rest: 0 },
        ];
      
      case 'Baki Hanma':
        // DAY 1 – UPPER BODY DOMINANCE
        return [
          { name: 'Pull-Ups', sets: '5', reps: 'Max', rest: 60 },
          { name: 'Archer Push-Ups', sets: '4', reps: '10 each side', rest: 60 },
          { name: 'Dips (chairs or parallel bars)', sets: '3', reps: '12', rest: 45 },
          { name: 'Wide Push-Ups', sets: '3', reps: '15', rest: 45 },
          { name: 'Isometric Pull-Up Hold', sets: '2', reps: '20 sec', rest: 60 },
        ];
      
      case 'Goku':
        // DAY 1 – SAIYAN UPPER BODY STRENGTH
        return [
          { name: 'Pull-Ups', sets: '4', reps: 'Max', rest: 60 },
          { name: 'Diamond Push-Ups', sets: '4', reps: '15–20', rest: 60 },
          { name: 'Explosive Push-Ups (Clap)', sets: '3', reps: '10', rest: 90 },
          { name: 'Isometric Hold (Top of Pull-Up)', sets: '3', reps: '10–15 sec', rest: 60 },
          { name: 'Arm Circles', sets: '2', reps: '45 sec', rest: 30 },
        ];
      
      case 'Sung Jinwoo':
        // Asta's workout - Day 1 – Upper Body Power (Push Focus)
        return [
          { name: 'Pull-Ups', sets: '4', reps: 'Max reps', rest: 60 },
          { name: 'Push-Ups', sets: '4', reps: '15–20', rest: 45 },
          { name: 'Dips (Chair/Parallel Bar)', sets: '3', reps: '10–15', rest: 60 },
          { name: 'Explosive Push-Ups (Clap/Plyo)', sets: '3', reps: '8', rest: 90 },
        ];
      
      default:
        return [
          { name: 'Pull-Ups', sets: '4', reps: 'Max', rest: 60 },
          { name: 'Push-Ups', sets: '4', reps: '15-20', rest: 45 },
          { name: 'Squats', sets: '3', reps: '20', rest: 45 },
        ];
    }
  };

  const [exercises] = useState(getWorkoutByCharacter(characterName as string));
  const currentExercise = exercises[currentExerciseIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, restTimer]);

  const startRestTimer = () => {
    if (currentExercise) {
      setRestTimer(currentExercise.rest);
      setIsResting(true);
      setIsTimerRunning(true);
    }
  };

  const completeExercise = () => {
    setCompletedExercises([...completedExercises, currentExerciseIndex]);
    
    if (currentExerciseIndex < exercises.length - 1) {
      startRestTimer();
    } else {
      // Workout completed
      const workoutDuration = Math.round((Date.now() - workoutStartTime) / 60000);
      
      // Update session in database
      if (currentSessionId && user) {
        updateWorkoutSession(currentSessionId, {
          completed_at: new Date().toISOString(),
          duration_minutes: workoutDuration,
          exercises_completed: exercises.length,
        });
      }
      
      Alert.alert(
        'Workout Complete! 🎉',
        `Great job! You completed the ${characterName} workout in ${workoutDuration} minutes.`,
        [
          { text: 'Finish', onPress: () => router.back() }
        ]
      );
    }
  };

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      
      // Update progress in database
      if (currentSessionId && user) {
        updateWorkoutSession(currentSessionId, {
          exercises_completed: completedExercises.length,
          duration_minutes: Math.round((Date.now() - workoutStartTime) / 60000),
        });
      }
      
      setIsResting(false);
      setIsTimerRunning(false);
    }
  };

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setIsResting(false);
      setIsTimerRunning(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCharacterColor = () => {
    switch (characterName) {
      case 'Daniel Park': return '#8b5cf6';
      case 'Gun Park': return '#ef4444';
      case 'Saitama': return '#00d4ff';
      case 'Baki Hanma': return '#ef4444';
      case 'Goku': return '#ff6b35';
      case 'Sung Jinwoo': return '#10b981';
      default: return '#ff6b35';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.characterName}>{characterName}</Text>
          <Text style={styles.programTitle}>{programTitle}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <Text style={styles.progressText}>
            Exercise {currentExerciseIndex + 1} of {exercises.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%`,
                  backgroundColor: getCharacterColor()
                }
              ]} 
            />
          </View>
        </View>

        {/* Current Exercise */}
        {currentExercise && (
          <View style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseName}>{currentExercise.name}</Text>
              {completedExercises.includes(currentExerciseIndex) && (
                <CheckCircle size={24} color="#10b981" />
              )}
            </View>
            
            <View style={styles.exerciseDetails}>
              <View style={styles.detailItem}>
                <Target size={20} color={getCharacterColor()} />
                <Text style={styles.detailText}>{currentExercise.sets} sets</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailText}>{currentExercise.reps} reps</Text>
              </View>
              <View style={styles.detailItem}>
                <Clock size={20} color="#00d4ff" />
                <Text style={styles.detailText}>{currentExercise.rest}s rest</Text>
              </View>
            </View>
          </View>
        )}

        {/* Rest Timer */}
        {isResting && (
          <View style={styles.restCard}>
            <Text style={styles.restTitle}>Rest Time</Text>
            <Text style={styles.restTimer}>{formatTime(restTimer)}</Text>
            <View style={styles.restControls}>
              <TouchableOpacity
                style={styles.timerButton}
                onPress={() => setIsTimerRunning(!isTimerRunning)}>
                {isTimerRunning ? (
                  <Pause size={24} color="#fff" />
                ) : (
                  <Play size={24} color="#fff" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.timerButton}
                onPress={() => {
                  setRestTimer(currentExercise?.rest || 60);
                  setIsTimerRunning(false);
                }}>
                <RotateCcw size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Exercise List */}
        <View style={styles.exerciseList}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>
          {exercises.map((exercise, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.exerciseListItem,
                index === currentExerciseIndex && styles.currentExerciseItem,
                completedExercises.includes(index) && styles.completedExerciseItem
              ]}
              onPress={() => setCurrentExerciseIndex(index)}>
              <View style={styles.exerciseNumber}>
                {completedExercises.includes(index) ? (
                  <CheckCircle size={20} color="#10b981" />
                ) : (
                  <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                )}
              </View>
              <View style={styles.exerciseInfo}>
                <Text style={[
                  styles.exerciseListName,
                  completedExercises.includes(index) && styles.completedText
                ]}>
                  {exercise.name}
                </Text>
                <Text style={styles.exerciseListDetails}>
                  {exercise.sets} sets × {exercise.reps}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity
          style={[styles.controlButton, currentExerciseIndex === 0 && styles.disabledButton]}
          onPress={previousExercise}
          disabled={currentExerciseIndex === 0}>
          <Text style={styles.controlButtonText}>Previous</Text>
        </TouchableOpacity>

        {!completedExercises.includes(currentExerciseIndex) ? (
          <TouchableOpacity
            style={[styles.completeButton, { backgroundColor: getCharacterColor() }]}
            onPress={completeExercise}>
            <Text style={styles.completeButtonText}>Complete Set</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.controlButton, currentExerciseIndex === exercises.length - 1 && styles.disabledButton]}
            onPress={nextExercise}
            disabled={currentExerciseIndex === exercises.length - 1}>
            <Text style={styles.controlButtonText}>Next Exercise</Text>
          </TouchableOpacity>
        )}
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 16,
    color: '#a0a0a0',
    fontWeight: '500',
  },
  programTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
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
  exerciseCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  exerciseDetails: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#a0a0a0',
    fontWeight: '500',
  },
  restCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  restTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  restTimer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 16,
  },
  restControls: {
    flexDirection: 'row',
    gap: 16,
  },
  timerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ff6b35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseList: {
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  exerciseListItem: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentExerciseItem: {
    borderWidth: 2,
    borderColor: '#ff6b35',
  },
  completedExerciseItem: {
    backgroundColor: '#1a2e1a',
    borderColor: '#10b981',
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2a2a3e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseListName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  completedText: {
    color: '#10b981',
  },
  exerciseListDetails: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1a2e',
    padding: 24,
    flexDirection: 'row',
    gap: 16,
  },
  controlButton: {
    flex: 1,
    backgroundColor: '#2a2a3e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  completeButton: {
    flex: 2,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});