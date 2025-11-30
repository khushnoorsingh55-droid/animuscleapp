/*
  # AniMuscle Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text)
      - `full_name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `workout_plans`
      - `id` (uuid, primary key)
      - `name` (text)
      - `character` (text)
      - `description` (text)
      - `difficulty` (text)
      - `duration` (text)
      - `created_at` (timestamp)
    
    - `workout_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `workout_plan_id` (uuid, references workout_plans)
      - `started_at` (timestamp)
      - `completed_at` (timestamp)
      - `duration_minutes` (integer)
      - `exercises_completed` (integer)
      - `total_exercises` (integer)
    
    - `user_habits`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `habit_name` (text)
      - `target_value` (numeric)
      - `current_value` (numeric)
      - `unit` (text)
      - `date` (date)
      - `completed` (boolean)
    
    - `nutrition_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `meal_name` (text)
      - `calories` (integer)
      - `protein` (numeric)
      - `carbs` (numeric)
      - `fat` (numeric)
      - `logged_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create workout_plans table
CREATE TABLE IF NOT EXISTS workout_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  character text NOT NULL,
  description text,
  difficulty text DEFAULT 'Beginner',
  duration text DEFAULT '4-6 weeks',
  created_at timestamptz DEFAULT now()
);

-- Create workout_sessions table
CREATE TABLE IF NOT EXISTS workout_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  workout_plan_id uuid REFERENCES workout_plans(id),
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  duration_minutes integer DEFAULT 0,
  exercises_completed integer DEFAULT 0,
  total_exercises integer DEFAULT 0
);

-- Create user_habits table
CREATE TABLE IF NOT EXISTS user_habits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  habit_name text NOT NULL,
  target_value numeric DEFAULT 0,
  current_value numeric DEFAULT 0,
  unit text DEFAULT '',
  date date DEFAULT CURRENT_DATE,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create nutrition_logs table
CREATE TABLE IF NOT EXISTS nutrition_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  meal_name text NOT NULL,
  calories integer DEFAULT 0,
  protein numeric DEFAULT 0,
  carbs numeric DEFAULT 0,
  fat numeric DEFAULT 0,
  logged_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Workout plans policies (public read, admin write)
CREATE POLICY "Anyone can view workout plans"
  ON workout_plans
  FOR SELECT
  TO authenticated
  USING (true);

-- Workout sessions policies
CREATE POLICY "Users can view own workout sessions"
  ON workout_sessions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own workout sessions"
  ON workout_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own workout sessions"
  ON workout_sessions
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- User habits policies
CREATE POLICY "Users can manage own habits"
  ON user_habits
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Nutrition logs policies
CREATE POLICY "Users can manage own nutrition logs"
  ON nutrition_logs
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Insert default workout plans
INSERT INTO workout_plans (name, character, description, difficulty, duration) VALUES
  ('Body Transformation', 'Daniel Park', 'From weak to unstoppable fighter - complete makeover program', 'Advanced', '16-24 weeks'),
  ('Elite Fighter Training', 'Gun Park', 'Advanced combat conditioning for peak performance', 'Elite', '12-20 weeks'),
  ('One Punch Routine', 'Saitama', '100 push-ups, 100 sit-ups, 100 squats, 10km run', 'Hero', '12+ weeks'),
  ('Underground Fighter', 'Baki Hanma', 'Combat-focused strength and agility training', 'Extreme', '10-16 weeks'),
  ('Saiyan Training', 'Goku', 'Master the art of movement and power like a Super Saiyan', 'Legendary', '8-12 weeks'),
  ('Shadow Monarch', 'Sung Jinwoo', 'Level up your power systematically like the Shadow Monarch', 'S-Rank', '20+ weeks');

-- Function to handle user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, username, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();