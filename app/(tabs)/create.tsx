import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { Plus, Minus, Clock, Repeat } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number;
}

export default function CreateWorkoutScreen() {
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState({
    name: '',
    sets: 3,
    reps: '10-12',
    rest: 60,
  });

  const addExercise = () => {
    if (!currentExercise.name.trim()) {
      Alert.alert('Error', 'Please enter an exercise name');
      return;
    }

    const newExercise: Exercise = {
      id: Date.now().toString(),
      ...currentExercise,
    };

    setExercises([...exercises, newExercise]);
    setCurrentExercise({
      name: '',
      sets: 3,
      reps: '10-12',
      rest: 60,
    });
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const saveWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert('Error', 'Please enter a workout name');
      return;
    }
    if (exercises.length === 0) {
      Alert.alert('Error', 'Please add at least one exercise');
      return;
    }

    Alert.alert(
      'Success!', 
      `Workout "${workoutName}" saved with ${exercises.length} exercises`,
      [{ text: 'OK', onPress: () => {
        setWorkoutName('');
        setExercises([]);
      }}]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Workout</Text>
        <Text style={styles.subtitle}>Design your own training routine</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Workout Name</Text>
        <TextInput
          style={styles.nameInput}
          value={workoutName}
          onChangeText={setWorkoutName}
          placeholder="Enter workout name..."
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Exercise</Text>
        
        <View style={styles.exerciseForm}>
          <TextInput
            style={styles.exerciseInput}
            value={currentExercise.name}
            onChangeText={(text) => setCurrentExercise({...currentExercise, name: text})}
            placeholder="Exercise name (e.g., Push-ups)"
            placeholderTextColor="#666"
          />

          <View style={styles.formRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Sets</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => setCurrentExercise({
                    ...currentExercise, 
                    sets: Math.max(1, currentExercise.sets - 1)
                  })}>
                  <Minus size={16} color="#ff6b35" />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{currentExercise.sets}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => setCurrentExercise({
                    ...currentExercise, 
                    sets: currentExercise.sets + 1
                  })}>
                  <Plus size={16} color="#ff6b35" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Reps</Text>
              <TextInput
                style={styles.repsInput}
                value={currentExercise.reps}
                onChangeText={(text) => setCurrentExercise({...currentExercise, reps: text})}
                placeholder="8-12"
                placeholderTextColor="#666"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Rest (seconds)</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setCurrentExercise({
                  ...currentExercise, 
                  rest: Math.max(30, currentExercise.rest - 15)
                })}>
                <Minus size={16} color="#ff6b35" />
              </TouchableOpacity>
              <Text style={styles.counterValue}>{currentExercise.rest}s</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setCurrentExercise({
                  ...currentExercise, 
                  rest: currentExercise.rest + 15
                })}>
                <Plus size={16} color="#ff6b35" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addExercise}>
            <Text style={styles.addButtonText}>Add Exercise</Text>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {exercises.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercises ({exercises.length})</Text>
          {exercises.map((exercise, index) => (
            <View key={exercise.id} style={styles.exerciseCard}>
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseNumber}>{index + 1}</Text>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <View style={styles.exerciseDetails}>
                    <View style={styles.detailItem}>
                      <Repeat size={16} color="#ff6b35" />
                      <Text style={styles.detailText}>{exercise.sets} sets</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailText}>{exercise.reps} reps</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Clock size={16} color="#00d4ff" />
                      <Text style={styles.detailText}>{exercise.rest}s rest</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeExercise(exercise.id)}>
                  <Minus size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {exercises.length > 0 && (
        <TouchableOpacity style={styles.saveButton} onPress={saveWorkout}>
          <LinearGradient
            colors={['#ff6b35', '#ff8c42']}
            style={styles.saveGradient}>
            <Text style={styles.saveButtonText}>Save Workout</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
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
  nameInput: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  exerciseForm: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
  },
  exerciseInput: {
    backgroundColor: '#0f0f23',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f0f23',
    borderRadius: 12,
    padding: 4,
  },
  counterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
  },
  counterValue: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  repsInput: {
    backgroundColor: '#0f0f23',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#ff6b35',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  exerciseCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff6b35',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  exerciseDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  removeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ef444420',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  saveGradient: {
    padding: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});