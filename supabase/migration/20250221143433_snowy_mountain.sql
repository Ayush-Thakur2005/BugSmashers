/*
  # Initial Schema Setup

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `email` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `health_assessments`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, foreign key)
      - `cardiovascular_risk` (text)
      - `respiratory_risk` (text)
      - `general_risk` (text)
      - `lifestyle_risk` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `assessment_responses`
      - `id` (uuid, primary key)
      - `assessment_id` (uuid, foreign key)
      - `question_id` (text)
      - `response` (text)
      - `risk_score` (numeric)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create health assessments table
CREATE TABLE IF NOT EXISTS health_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  cardiovascular_risk text NOT NULL,
  respiratory_risk text NOT NULL,
  general_risk text NOT NULL,
  lifestyle_risk text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create assessment responses table
CREATE TABLE IF NOT EXISTS assessment_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES health_assessments(id) ON DELETE CASCADE,
  question_id text NOT NULL,
  response text NOT NULL,
  risk_score numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;

-- Create policies
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

CREATE POLICY "Users can view own assessments"
  ON health_assessments
  FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can create own assessments"
  ON health_assessments
  FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can view own responses"
  ON assessment_responses
  FOR SELECT
  TO authenticated
  USING (
    assessment_id IN (
      SELECT id FROM health_assessments 
      WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own responses"
  ON assessment_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    assessment_id IN (
      SELECT id FROM health_assessments 
      WHERE profile_id = auth.uid()
    )
  );
