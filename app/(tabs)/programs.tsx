import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Zap, Shield, Target, Swords, Crown, Flame } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ProgramsScreen() {
  const router = useRouter();

  const programs = [
    {
      id: 1,
      character: 'Daniel Park',
      title: 'Body Transformation',
      description: 'From weak to unstoppable fighter - complete makeover program',
      difficulty: 'Advanced',
      duration: '16-24 weeks',
      icon: Crown,
      colors: ['#8b5cf6', '#7c3aed'],
      workouts: 50,
      focus: 'Complete Makeover',
      routine: [
        'Day 1 – Upper Body Power (Push Focus)',
        '• Pull-Ups – 4 sets × Max reps',
        '• Push-Ups – 4 × 15–20',
        '• Dips (Chair/Parallel Bar) – 3 × 10–15',
        '• Explosive Push-Ups (Clap/Plyo) – 3 × 8',
        'Rest: 30–60 sec between sets'
      ]
    },
    {
      id: 2,
      character: 'Gun Park',
      title: 'Elite Fighter Training',
      description: 'Advanced combat conditioning for peak performance',
      difficulty: 'Elite',
      duration: '12-20 weeks',
      icon: Flame,
      colors: ['#ef4444', '#dc2626'],
      workouts: 55,
      focus: 'Combat Elite',
      routine: [
        'Elite Fighter Training Program',
        '• Combat Conditioning Circuit – 4 × 30 sec each',
        '• Advanced Pull-Ups – 5 × Max',
        '• Explosive Push-Ups – 4 × 12-15',
        '• Combat Stance Training – 3 × 45 sec',
        '• Elite Fighter Finisher – 2 × Max effort'
      ]
    },
    {
      id: 3,
      character: 'Saitama',
      title: 'One Punch Routine',
      description: '100 push-ups, 100 sit-ups, 100 squats, 10km run',
      difficulty: 'Hero',
      duration: '12+ weeks',
      icon: Target,
      colors: ['#00d4ff', '#0ea5e9'],
      workouts: 30,
      focus: 'Endurance & Strength',
      routine: [
        'Daily Routine (Every Day):',
        '• 100 Push-ups',
        '• 100 Sit-ups',
        '• 100 Squats',
        '• 10km Run',
        '',
        'Rules:',
        '• No air conditioning in summer',
        '• No heating in winter',
        '• Eat 3 meals a day (banana for breakfast)',
        '• Never skip a day, no matter what',
        '',
        'Mental Training:',
        '• Stay determined even when it gets tough',
        '• Push through when you want to quit',
        '• Consistency is the key to breaking limits'
      ]
    },
    {
      id: 4,
      character: 'Baki Hanma',
      title: 'Underground Fighter',
      description: 'Combat-focused strength and agility training',
      difficulty: 'Extreme',
      duration: '10-16 weeks',
      icon: Shield,
      colors: ['#ef4444', '#dc2626'],
      workouts: 60,
      focus: 'Combat Training',
      routine: [
        'DAY 1 – UPPER BODY DOMINANCE',
        '• Pull-Ups – 5 × Max',
        '• Archer Push-Ups – 4 × 10 each side',
        '• Dips (chairs or parallel bars) – 3 × 12',
        '• Wide Push-Ups – 3 × 15',
        '• Isometric Pull-Up Hold – 2 × 20 sec',
        '',
        'DAY 2 – BAKI CORE BLASTER',
        '• Hanging Leg Raises – 4 × 12',
        '• V-Ups – 3 × 15',
        '• Dragon Flags – 3 × 5',
        '• L-Sit Hold (floor or bars) – 3 × 20 sec',
        '• Plank with Shoulder Taps – 3 × 30 sec',
        '',
        'DAY 3 – RAW POWER (PULL FOCUS)',
        '• Chin-Ups – 5 × Max',
        '• Australian Rows – 3 × 12',
        '• Negative Pull-Ups – 3 × 6 (slow 5 sec)',
        '• Towel Rows (grip strength) – 3 × 10',
        '• Dead Hangs – 2 × 30 sec',
        '',
        'DAY 4 – LEGS OF A FIGHTER',
        '• Pistol Squats – 3 × 6 each leg',
        '• Jump Squats – 4 × 15',
        '• Wall Sit – 3 × 1 min',
        '• Calf Raises (slow) – 4 × 25',
        '• Sprint-in-Place – 3 × 30 sec',
        '',
        'DAY 5 – EXPLOSIVE HANMA MODE',
        '• Clap Push-Ups – 4 × 10',
        '• Jump Lunges – 3 × 12 each leg',
        '• Pull-Up Bar Muscle-Ups – 3 × 5',
        '• Broad Jumps – 3 × 6',
        '• Burpees – 3 × 15',
        '',
        'DAY 6 – FULL BODY CONTROL CIRCUIT',
        '(3 rounds – 30 sec rest between exercises)',
        '• Pull-Ups × Max',
        '• Push-Ups × 20',
        '• Squats × 25',
        '• Hanging Knee Raises × 15',
        '• Burpees × 10',
        '• L-Sit Hold × 20 sec',
        '• Plank × 1 min',
        '',
        'BAKI TRAINING PRINCIPLES:',
        '• Control every rep: 3 sec down, 1 sec up',
        '• Do static holds for muscle awareness',
        '• Eat high-protein meals, recover well',
        '• Visualize every move – mind-muscle control',
        '• Add reps, reduce rest weekly – progressive overload'
      ]
    },
    {
      id: 5,
      character: 'Goku',
      title: 'Saiyan Training',
      description: 'Master the art of movement and power like a Super Saiyan',
      difficulty: 'Legendary',
      duration: '8-12 weeks',
      icon: Zap,
      colors: ['#ff6b35', '#ff8c42'],
      workouts: 45,
      focus: 'Full Body Power',
      routine: [
        'DAY 1 – SAIYAN UPPER BODY STRENGTH',
        '• Pull-Ups – 4 × Max',
        '• Diamond Push-Ups – 4 × 15–20',
        '• Explosive Push-Ups (Clap) – 3 × 10',
        '• Isometric Hold (Top of Pull-Up) – 3 × 10–15 sec',
        '• Arm Circles – 2 × 45 sec',
        '',
        'DAY 2 – CORE OF A SUPER SAIYAN',
        '• Hanging Leg Raises – 4 × 10–15',
        '• Plank to Elbow Taps – 3 × 20',
        '• V-Ups – 3 × 15',
        '• Dragon Flags (or negatives) – 3 × 5',
        '• Plank Hold – 1 min',
        '',
        'DAY 3 – SPEED & POWER (EXPLOSIVE DAY)',
        '• Jump Squats – 4 × 12',
        '• Plyo Push-Ups – 4 × 10',
        '• Broad Jumps – 3 × 6',
        '• Burpees – 3 × 12',
        '• Mountain Climbers (Fast) – 3 × 30 sec',
        '',
        'DAY 4 – LOWER BODY STRENGTH',
        '• Bulgarian Split Squats – 3 × 10 each leg',
        '• Wall Sit – 3 × 45 sec',
        '• Calf Raises (slow) – 4 × 20',
        '• Step-Ups (stairs) – 3 × 12 each leg',
        '• Jump Lunges – 2 × 12',
        '',
        'DAY 5 – WARRIOR PULL DAY',
        '• Chin-Ups – 4 × Max',
        '• Australian Rows – 3 × 10–12',
        '• Negative Pull-Ups (slow) – 3 × 5',
        '• Towel Rows on Pull-Up Bar – 3 × 10',
        '• Superman Hold – 2 × 30 sec',
        '',
        'DAY 6 – FULL BODY COMBAT CIRCUIT',
        '(3 Rounds – 30 sec rest between exercises)',
        '• Pull-Ups × Max',
        '• Push-Ups × 20',
        '• Squats × 25',
        '• Hanging Leg Raises × 10',
        '• Burpees × 10',
        '• Plank Hold × 45 sec',
        '',
        'TIPS FOR MAX GROWTH:',
        '• Warm-Up: 2 min dynamic moves',
        '• Progressive Overload: Add reps/sets weekly',
        '• Recovery: Sleep 7–9 hrs, high-protein meals',
        '• Optional: Add weighted vest (gravity suit!)'
      ]
    },
    {
      id: 6,
      character: 'Sung Jinwoo',
      title: 'Shadow Monarch',
      description: 'Level up your power systematically like the Shadow Monarch',
      difficulty: 'S-Rank',
      duration: '20+ weeks',
      icon: Swords,
      colors: ['#10b981', '#059669'],
      workouts: 75,
      focus: 'Progressive Power',
      routine: [
        'Asta\'s Magic Knight Training',
        'Day 1 – Upper Body Power (Push Focus)',
        '• Pull-Ups – 4 sets × Max reps',
        '• Push-Ups – 4 × 15–20',
        '• Dips (Chair/Parallel Bar) – 3 × 10–15',
        '• Explosive Push-Ups (Clap/Plyo) – 3 × 8',
        'Rest: 30–60 sec between sets'
      ]
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Training Programs</Text>
        <Text style={styles.subtitle}>Choose your anime mentor</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.programsContainer}
        decelerationRate="fast"
        snapToInterval={width - 32}
        snapToAlignment="start">
        {programs.map((program) => {
          const IconComponent = program.icon;
          return (
            <View key={program.id} style={styles.programCard}>
              <LinearGradient
                colors={[program.colors[0], program.colors[1]]}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <IconComponent size={32} color="#fff" />
                  </View>
                  <View style={styles.difficultyBadge}>
                    <Text style={styles.difficultyText}>{program.difficulty}</Text>
                  </View>
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.characterName}>{program.character}</Text>
                  <Text style={styles.programTitle}>{program.title}</Text>
                  <Text style={styles.programDescription}>{program.description}</Text>
                  
                  <View style={styles.programStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{program.workouts}</Text>
                      <Text style={styles.statLabel}>Workouts</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{program.duration}</Text>
                      <Text style={styles.statLabel}>Duration</Text>
                    </View>
                  </View>

                  <View style={styles.focusBadge}>
                    <Text style={styles.focusText}>{program.focus}</Text>
                  </View>

                  {/* Workout Preview */}
                  <ScrollView style={styles.routinePreview} showsVerticalScrollIndicator={false}>
                    <Text style={styles.routineTitle}>Workout Preview:</Text>
                    {program.routine.slice(0, 8).map((line, index) => (
                      <Text key={index} style={[
                        styles.routineLine,
                        line.startsWith('•') && styles.routineExercise,
                        line.includes('DAY') && styles.routineDay,
                        line === '' && styles.routineSpace
                      ]}>
                        {line}
                      </Text>
                    ))}
                    {program.routine.length > 8 && (
                      <Text style={styles.routineMore}>...and {program.routine.length - 8} more</Text>
                    )}
                  </ScrollView>
                </View>

                <TouchableOpacity 
                  style={styles.startButton}
                  onPress={() => router.push({
                    pathname: '/workout-session',
                    params: { 
                      programId: program.id,
                      characterName: program.character,
                      programTitle: program.title
                    }
                  })}>
                  <Text style={styles.startButtonText}>Start Training</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.comingSoon}>
        <Text style={styles.comingSoonTitle}>More Characters Coming Soon!</Text>
        <Text style={styles.comingSoonText}>Vegeta, All Might, Tanjiro, and more...</Text>
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
  programsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 16,
  },
  programCard: {
    width: width - 64,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 20,
    minHeight: 500,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  difficultyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    flex: 1,
  },
  characterName: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginBottom: 4,
  },
  programTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  programDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
    marginBottom: 24,
  },
  programStats: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  focusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  focusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  routinePreview: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 12,
    maxHeight: 120,
    marginBottom: 16,
  },
  routineTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  routineLine: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 2,
  },
  routineExercise: {
    color: 'rgba(255, 255, 255, 0.9)',
    paddingLeft: 8,
  },
  routineDay: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 4,
  },
  routineSpace: {
    height: 4,
  },
  routineMore: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
  },
  startButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  comingSoon: {
    padding: 24,
    alignItems: 'center',
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'center',
  },
});