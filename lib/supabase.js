import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://yutjejrcyqyvfrpnpapq.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1dGplanJjeXF5dmZycG5wYXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0Mjc4MTYsImV4cCI6MjA4OTAwMzgxNn0.pV4L1TNVefQ1E8YuA_jdH0OfdhmZj7jdmzstp3uzInY"

export const supabase = createClient(supabaseUrl, supabaseKey)