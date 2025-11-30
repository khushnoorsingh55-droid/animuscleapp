import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types
export interface Profile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  character: string;
  description?: string;
  difficulty: string;
  duration: string;
  created_at: string;
}

export interface WorkoutSession {
  id: string;
  user_id: string;
  workout_plan_id: string;
  started_at: string;
  completed_at?: string;
  duration_minutes: number;
  exercises_completed: number;
  total_exercises: number;
}

export interface UserHabit {
  id: string;
  user_id: string;
  habit_name: string;
  target_value: number;
  current_value: number;
  unit: string;
  date: string;
  completed: boolean;
  created_at: string;
}

export interface NutritionLog {
  id: string;
  user_id: string;
  meal_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  logged_at: string;
}

// Auth helpers
export const signUp = async (email: string, password: string, userData?: { username?: string; full_name?: string }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: undefined, // Disable email confirmation for now
      },
    });
    
    console.log('Supabase signUp response:', { data, error });
    return { data, error };
  } catch (err) {
    console.error('SignUp error:', err);
    return { data: null, error: err };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    console.log('Supabase signIn response:', { data, error });
    return { data, error };
  } catch (err) {
    console.error('SignIn error:', err);
    return { data: null, error: err };
  }
}
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Database helpers
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};

export const getWorkoutPlans = async () => {
  const { data, error } = await supabase
    .from('workout_plans')
    .select('*')
    .order('created_at', { ascending: true });
  return { data, error };
};

export const createWorkoutSession = async (session: Omit<WorkoutSession, 'id'>) => {
  const { data, error } = await supabase
    .from('workout_sessions')
    .insert(session)
    .select()
    .single();
  return { data, error };
};

export const updateWorkoutSession = async (sessionId: string, updates: Partial<WorkoutSession>) => {
  const { data, error } = await supabase
    .from('workout_sessions')
    .update(updates)
    .eq('id', sessionId)
    .select()
    .single();
  return { data, error };
};

export const getUserWorkoutSessions = async (userId: string, limit = 10) => {
  const { data, error } = await supabase
    .from('workout_sessions')
    .select(`
      *,
      workout_plans (
        name,
        character
      )
    `)
    .eq('user_id', userId)
    .order('started_at', { ascending: false })
    .limit(limit);
  return { data, error };
};

export const getUserHabits = async (userId: string, date?: string) => {
  let query = supabase
    .from('user_habits')
    .select('*')
    .eq('user_id', userId);
  
  if (date) {
    query = query.eq('date', date);
  }
  
  const { data, error } = await query.order('created_at', { ascending: true });
  return { data, error };
};

export const updateHabit = async (habitId: string, updates: Partial<UserHabit>) => {
  const { data, error } = await supabase
    .from('user_habits')
    .update(updates)
    .eq('id', habitId)
    .select()
    .single();
  return { data, error };
};

export const createHabit = async (habit: Omit<UserHabit, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('user_habits')
    .insert(habit)
    .select()
    .single();
  return { data, error };
};

export const getNutritionLogs = async (userId: string, date?: string) => {
  let query = supabase
    .from('nutrition_logs')
    .select('*')
    .eq('user_id', userId);
  
  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    query = query
      .gte('logged_at', startOfDay.toISOString())
      .lte('logged_at', endOfDay.toISOString());
  }
  
  const { data, error } = await query.order('logged_at', { ascending: false });
  return { data, error };
};

export const createNutritionLog = async (log: Omit<NutritionLog, 'id'>) => {
  const { data, error } = await supabase
    .from('nutrition_logs')
    .insert(log)
    .select()
    .single();
  return { data, error };
};