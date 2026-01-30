import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://jwtdporejyjbqwzhrqsv.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3dGRwb3JlanlqYnF3emhycXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMjY5NjksImV4cCI6MjA3MTgwMjk2OX0.b0kiG1y63fFAHTPJG4yI9nlfKZahQNAO4Ws5zMWQaQc';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);


// Database Types
export interface User {
  id?: string
  full_name: string
  epic_number: string
  age: number
  date_of_birth: string
  father_name: string
  gender: string
  phone_number: string
  email: string
  aadhar_number: string
  state: string
  district: string
  pincode: string
  address: string
  password_hash: string
  created_at?: string
  updated_at?: string
}

export interface State {
  id?: number
  name: string
  districts: string[]
}

export interface District {
  id?: number
  name: string
  state_id: number
}
