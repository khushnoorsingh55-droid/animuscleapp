import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Lock, Eye, EyeOff, Dumbbell } from 'lucide-react-native';
import { signUp, signIn } from '../lib/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await signIn(email, password);
        if (error) {
          console.error('Login error:', error);
          const errorMessage = (error as any)?.message || 'Failed to login. Please try again.';
          Alert.alert('Login Error', errorMessage);
          setLoading(false);
        } else {
          console.log('Login successful:', data);
          Alert.alert('Success!', 'You have been logged in successfully!', [
            { text: 'Continue', onPress: () => router.replace('/(tabs)') }
          ]);
        }
      } else {
        if (password.length < 6) {
          Alert.alert('Error', 'Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        const { data, error } = await signUp(email, password, {
          full_name: email.split('@')[0],
        });
        if (error) {
          console.error('Signup error:', error);
          const errorMessage = (error as any)?.message || 'Failed to create account. Please try again.';
          Alert.alert('Registration Error', errorMessage);
          setLoading(false);
        } else {
          console.log('Signup successful:', data);
          Alert.alert('Account Created!', 'Your account has been created successfully!', [
            { text: 'Continue', onPress: () => router.replace('/(tabs)') }
          ]);
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    Alert.alert(
      'Guest Mode',
      'Continue as guest? You can create an account later to save your progress.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: () => router.replace('/(tabs)')
        }
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#0f0f23', '#1a1a2e', '#16213e']}
      style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Dumbbell size={48} color="#ff6b35" />
        </View>
        <Text style={styles.appName}>AniMuscle</Text>
        <Text style={styles.tagline}>Train like your favorite anime heroes</Text>
      </View>

      {/* Auth Form */}
      <View style={styles.formContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, isLogin && styles.activeTab]}
            onPress={() => setIsLogin(true)}>
            <Text style={[styles.tabText, isLogin && styles.activeTabText]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, !isLogin && styles.activeTab]}
            onPress={() => setIsLogin(false)}>
            <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <User size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Lock size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={20} color="#666" />
              ) : (
                <Eye size={20} color="#666" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
          <LinearGradient
            colors={['#ff6b35', '#ff8c42']}
            style={styles.authGradient}>
            <Text style={[styles.authButtonText, loading && { opacity: 0.7 }]}>
              {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
        </TouchableOpacity>

        {isLogin && (
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Character Quotes */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quote}>
          "The only way to truly control your power is to have discipline."
        </Text>
        <Text style={styles.quoteAuthor}>- Goku</Text>
      </View>

      {/* Features Preview */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>What awaits you:</Text>
        <View style={styles.featuresList}>
          <Text style={styles.featureItem}>🥊 Train with Goku, Saitama, Baki & more</Text>
          <Text style={styles.featureItem}>📊 Track your progress & habits</Text>
          <Text style={styles.featureItem}>🍎 Nutrition planning & BMI calculator</Text>
          <Text style={styles.featureItem}>💪 Custom workout creation</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#0f0f23',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#ff6b35',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f0f23',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    paddingVertical: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  authButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  authGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  authButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  guestButton: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#2a2a3e',
    borderRadius: 12,
    marginBottom: 16,
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  forgotPassword: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#ff6b35',
    fontWeight: '500',
  },
  quoteContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b35',
  },
  quote: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#ff6b35',
    fontWeight: '600',
    textAlign: 'right',
  },
  featuresContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#a0a0a0',
    lineHeight: 20,
  },
});