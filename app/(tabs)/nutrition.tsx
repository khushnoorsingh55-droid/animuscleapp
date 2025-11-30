import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { Apple, Target, TrendingUp, Plus, Calculator } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function NutritionScreen() {
  const [dailyGoals] = useState({
    calories: 2800,
    protein: 150,
    carbs: 350,
    fat: 85,
  });

  const [currentIntake] = useState({
    calories: 1850,
    protein: 95,
    carbs: 220,
    fat: 55,
  });

  const [waterIntake, setWaterIntake] = useState(6);
  const waterGoal = 8;

  // BMI Calculator state
  const [showCalculator, setShowCalculator] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'>('moderate');
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const [calculatorResults, setCalculatorResults] = useState<any>(null);

  const macros = [
    { 
      name: 'Calories', 
      current: currentIntake.calories, 
      goal: dailyGoals.calories, 
      unit: 'kcal',
      color: '#ff6b35' 
    },
    { 
      name: 'Protein', 
      current: currentIntake.protein, 
      goal: dailyGoals.protein, 
      unit: 'g',
      color: '#00d4ff' 
    },
    { 
      name: 'Carbs', 
      current: currentIntake.carbs, 
      goal: dailyGoals.carbs, 
      unit: 'g',
      color: '#10b981' 
    },
    { 
      name: 'Fat', 
      current: currentIntake.fat, 
      goal: dailyGoals.fat, 
      unit: 'g',
      color: '#8b5cf6' 
    },
  ];

  const mealPlan = [
    {
      time: 'Breakfast',
      meal: 'Goku\'s Power Bowl',
      description: 'Oatmeal with banana, berries, protein powder',
      calories: 520,
      protein: 35,
    },
    {
      time: 'Pre-Workout',
      meal: 'Saitama\'s Energy Snack',
      description: 'Banana with almond butter',
      calories: 280,
      protein: 8,
    },
    {
      time: 'Post-Workout',
      meal: 'Baki\'s Recovery Shake',
      description: 'Whey protein with milk and berries',
      calories: 350,
      protein: 40,
    },
    {
      time: 'Lunch',
      meal: 'Warrior\'s Feast',
      description: 'Grilled chicken, rice, vegetables',
      calories: 700,
      protein: 45,
    },
  ];

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const calculateBMI = () => {
    const heightM = parseFloat(height) / 100;
    const weightKg = parseFloat(weight);
    const ageNum = parseInt(age);

    if (!heightM || !weightKg || !ageNum) {
      alert('Please fill in all fields');
      return;
    }

    // BMI Calculation
    const bmi = weightKg / (heightM * heightM);
    
    // BMR Calculation (Mifflin-St Jeor Equation)
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * parseFloat(height) - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * parseFloat(height) - 5 * ageNum - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const maintenanceCalories = bmr * activityMultipliers[activityLevel];
    
    // Goal adjustments
    let targetCalories = maintenanceCalories;
    if (goal === 'lose') {
      targetCalories = maintenanceCalories - 500; // 1 lb per week
    } else if (goal === 'gain') {
      targetCalories = maintenanceCalories + 500; // 1 lb per week
    }

    // Macronutrient calculations
    const protein = weightKg * 2; // 2g per kg body weight
    const fat = (targetCalories * 0.25) / 9; // 25% of calories from fat
    const carbs = (targetCalories - (protein * 4) - (fat * 9)) / 4; // Remaining calories from carbs

    // BMI Category
    let bmiCategory = '';
    let bmiColor = '';
    if (bmi < 18.5) {
      bmiCategory = 'Underweight';
      bmiColor = '#00d4ff';
    } else if (bmi < 25) {
      bmiCategory = 'Normal';
      bmiColor = '#10b981';
    } else if (bmi < 30) {
      bmiCategory = 'Overweight';
      bmiColor = '#f59e0b';
    } else {
      bmiCategory = 'Obese';
      bmiColor = '#ef4444';
    }

    setCalculatorResults({
      bmi: bmi.toFixed(1),
      bmiCategory,
      bmiColor,
      bmr: Math.round(bmr),
      maintenanceCalories: Math.round(maintenanceCalories),
      targetCalories: Math.round(targetCalories),
      protein: Math.round(protein),
      fat: Math.round(fat),
      carbs: Math.round(carbs)
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrition Plan</Text>
        <Text style={styles.subtitle}>Fuel your anime transformation</Text>
      </View>

      {/* Macros Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Goals</Text>
        <View style={styles.macrosGrid}>
          {macros.map((macro, index) => (
            <View key={index} style={styles.macroCard}>
              <Text style={styles.macroName}>{macro.name}</Text>
              <View style={styles.macroProgress}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${getProgressPercentage(macro.current, macro.goal)}%`,
                        backgroundColor: macro.color 
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.macroValue}>
                  {macro.current}/{macro.goal} {macro.unit}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Water Intake */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hydration</Text>
        <View style={styles.waterCard}>
          <View style={styles.waterHeader}>
            <Text style={styles.waterTitle}>Water Intake</Text>
            <Text style={styles.waterCount}>{waterIntake}/{waterGoal} glasses</Text>
          </View>
          <View style={styles.waterGlasses}>
            {Array.from({ length: waterGoal }, (_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.waterGlass,
                  i < waterIntake && styles.waterGlassFilled
                ]}
                onPress={() => setWaterIntake(i + 1)}>
                <Text style={[
                  styles.waterIcon,
                  i < waterIntake && styles.waterIconFilled
                ]}>💧</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Meal Plan */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Meal Plan</Text>
        {mealPlan.map((meal, index) => (
          <TouchableOpacity key={index} style={styles.mealCard}>
            <View style={styles.mealInfo}>
              <Text style={styles.mealTime}>{meal.time}</Text>
              <Text style={styles.mealName}>{meal.meal}</Text>
              <Text style={styles.mealDescription}>{meal.description}</Text>
            </View>
            <View style={styles.mealStats}>
              <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
              <Text style={styles.mealProtein}>{meal.protein}g protein</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Add Food */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.calculatorButton}
          onPress={() => setShowCalculator(!showCalculator)}>
          <LinearGradient
            colors={['#8b5cf6', '#7c3aed']}
            style={styles.calculatorGradient}>
            <Calculator size={24} color="#fff" />
            <Text style={styles.calculatorButtonText}>
              {showCalculator ? 'Hide Calculator' : 'BMI & Calorie Calculator'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {showCalculator && (
          <View style={styles.calculatorCard}>
            <Text style={styles.calculatorTitle}>BMI & Nutrition Calculator</Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Height (cm)</Text>
                <TextInput
                  style={styles.input}
                  value={height}
                  onChangeText={setHeight}
                  placeholder="175"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Weight (kg)</Text>
                <TextInput
                  style={styles.input}
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="70"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Age</Text>
                <TextInput
                  style={styles.input}
                  value={age}
                  onChangeText={setAge}
                  placeholder="25"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Gender</Text>
                <View style={styles.genderButtons}>
                  <TouchableOpacity
                    style={[styles.genderButton, gender === 'male' && styles.genderButtonActive]}
                    onPress={() => setGender('male')}>
                    <Text style={[styles.genderButtonText, gender === 'male' && styles.genderButtonTextActive]}>
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.genderButton, gender === 'female' && styles.genderButtonActive]}
                    onPress={() => setGender('female')}>
                    <Text style={[styles.genderButtonText, gender === 'female' && styles.genderButtonTextActive]}>
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Activity Level</Text>
              <View style={styles.activityButtons}>
                {[
                  { key: 'sedentary', label: 'Sedentary' },
                  { key: 'light', label: 'Light' },
                  { key: 'moderate', label: 'Moderate' },
                  { key: 'active', label: 'Active' },
                  { key: 'very_active', label: 'Very Active' }
                ].map((activity) => (
                  <TouchableOpacity
                    key={activity.key}
                    style={[
                      styles.activityButton,
                      activityLevel === activity.key && styles.activityButtonActive
                    ]}
                    onPress={() => setActivityLevel(activity.key as any)}>
                    <Text style={[
                      styles.activityButtonText,
                      activityLevel === activity.key && styles.activityButtonTextActive
                    ]}>
                      {activity.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Goal</Text>
              <View style={styles.goalButtons}>
                {[
                  { key: 'lose', label: 'Lose Weight' },
                  { key: 'maintain', label: 'Maintain' },
                  { key: 'gain', label: 'Gain Weight' }
                ].map((goalOption) => (
                  <TouchableOpacity
                    key={goalOption.key}
                    style={[
                      styles.goalButton,
                      goal === goalOption.key && styles.goalButtonActive
                    ]}
                    onPress={() => setGoal(goalOption.key as any)}>
                    <Text style={[
                      styles.goalButtonText,
                      goal === goalOption.key && styles.goalButtonTextActive
                    ]}>
                      {goalOption.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.calculateButton} onPress={calculateBMI}>
              <Text style={styles.calculateButtonText}>Calculate</Text>
            </TouchableOpacity>

            {calculatorResults && (
              <View style={styles.resultsGrid}>
                <View style={styles.resultCard}>
                  <Text style={styles.inputLabel}>BMI</Text>
                  <Text style={styles.resultValue}>{calculatorResults.bmi}</Text>
                  <Text style={[styles.resultCategory, { color: calculatorResults.bmiColor }]}>
                    {calculatorResults.bmiCategory}
                  </Text>
                </View>
                <View style={styles.resultCard}>
                  <Text style={styles.inputLabel}>BMR</Text>
                  <Text style={styles.resultValue}>{calculatorResults.bmr}</Text>
                  <Text style={styles.resultLabel}>calories/day</Text>
                </View>
                <View style={styles.resultCard}>
                  <Text style={styles.inputLabel}>Target Calories</Text>
                  <Text style={styles.resultValue}>{calculatorResults.targetCalories}</Text>
                  <Text style={styles.resultLabel}>per day</Text>
                </View>
                <View style={styles.resultCard}>
                  <Text style={styles.inputLabel}>Protein</Text>
                  <Text style={styles.resultValue}>{calculatorResults.protein}g</Text>
                  <Text style={styles.resultLabel}>per day</Text>
                </View>
                <View style={styles.resultCard}>
                  <Text style={styles.inputLabel}>Carbs</Text>
                  <Text style={styles.resultValue}>{calculatorResults.carbs}g</Text>
                  <Text style={styles.resultLabel}>per day</Text>
                </View>
                <View style={styles.resultCard}>
                  <Text style={styles.inputLabel}>Fat</Text>
                  <Text style={styles.resultValue}>{calculatorResults.fat}g</Text>
                  <Text style={styles.resultLabel}>per day</Text>
                </View>
              </View>
            )}
          </View>
        )}

        <TouchableOpacity style={styles.addFoodButton}>
          <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.addFoodGradient}>
            <Plus size={24} color="#fff" />
            <Text style={styles.addFoodText}>Log Food</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Nutrition Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Anime Warrior Tips</Text>
        <View style={styles.tipsContainer}>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>🥩 Goku's Protein Power</Text>
            <Text style={styles.tipText}>Eat protein within 30 minutes post-workout for maximum muscle growth</Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>🍌 Saitama's Simple Rule</Text>
            <Text style={styles.tipText}>Eat clean, whole foods 80% of the time. Consistency beats perfection</Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>💪 Baki's Fight Fuel</Text>
            <Text style={styles.tipText}>Time your carbs around workouts for explosive energy</Text>
          </View>
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
  macrosGrid: {
    gap: 12,
  },
  macroCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
  },
  macroName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  macroProgress: {
    gap: 8,
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
  macroValue: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'right',
  },
  waterCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
  },
  waterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  waterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  waterCount: {
    fontSize: 16,
    color: '#00d4ff',
    fontWeight: '600',
  },
  waterGlasses: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  waterGlass: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#2a2a3e',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waterGlassFilled: {
    backgroundColor: '#00d4ff20',
  },
  waterIcon: {
    fontSize: 20,
    opacity: 0.3,
  },
  waterIconFilled: {
    opacity: 1,
  },
  mealCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealInfo: {
    flex: 1,
  },
  mealTime: {
    fontSize: 12,
    color: '#ff6b35',
    fontWeight: '600',
    marginBottom: 4,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  mealDescription: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  mealStats: {
    alignItems: 'flex-end',
  },
  mealCalories: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  mealProtein: {
    fontSize: 12,
    color: '#00d4ff',
  },
  addFoodButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  addFoodGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  addFoodText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  calculatorButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  calculatorGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  calculatorButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  calculatorCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  calculatorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
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
  input: {
    backgroundColor: '#0f0f23',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#0f0f23',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: '#8b5cf6',
  },
  genderButtonText: {
    fontSize: 14,
    color: '#a0a0a0',
    fontWeight: '600',
  },
  genderButtonTextActive: {
    color: '#fff',
  },
  activityButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activityButton: {
    backgroundColor: '#0f0f23',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  activityButtonActive: {
    backgroundColor: '#8b5cf6',
  },
  activityButtonText: {
    fontSize: 12,
    color: '#a0a0a0',
    fontWeight: '600',
  },
  activityButtonTextActive: {
    color: '#fff',
  },
  goalButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  goalButton: {
    flex: 1,
    backgroundColor: '#0f0f23',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  goalButtonActive: {
    backgroundColor: '#8b5cf6',
  },
  goalButtonText: {
    fontSize: 14,
    color: '#a0a0a0',
    fontWeight: '600',
  },
  goalButtonTextActive: {
    color: '#fff',
  },
  calculateButton: {
    backgroundColor: '#ff6b35',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  resultCard: {
    backgroundColor: '#0f0f23',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    minWidth: 140,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  resultLabel: {
    fontSize: 12,
    color: '#a0a0a0',
    marginTop: 4,
  },
  resultCategory: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  tipsContainer: {
    gap: 12,
  },
  tipCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#a0a0a0',
    lineHeight: 20,
  },
});