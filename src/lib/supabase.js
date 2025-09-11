import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rgicqozbjsluoxltqudp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnaWNxb3pianNsdW94bHRxdWRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTAzMDQsImV4cCI6MjA3MzE2NjMwNH0.lNJoRo53P3gKp6C2Mytyo7x6TKOOitfY449nyeDJE1c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Helper functions for common operations
export const jobsApi = {
  // Get all jobs with pagination
  async getJobs(page = 1, pageSize = 20) {
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, error, count } = await supabase
      .from('jobs')
      .select(`
        *,
        company:companies(
          id,
          name,
          logo_image,
          location
        )
      `, { count: 'exact' })
      .is('deleted_at', null)
      .range(from, to)
      .order('created_at', { ascending: false })

    if (error) throw error

    return {
      jobs: data || [],
      pagination: {
        currentPage: page,
        pageSize,
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
        hasNextPage: to < (count || 0) - 1,
        hasPrevPage: page > 1
      }
    }
  },

  // Advanced job search
  async searchJobs(filters = {}, page = 1, pageSize = 20) {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
      )
    })

    const { data, error } = await supabase.functions.invoke('advanced-job-search', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (error) throw error
    return data
  },

  // Get single job by ID
  async getJob(id) {
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        company:companies(*)
      `)
      .eq('id', id)
      .is('deleted_at', null)
      .single()

    if (error) throw error
    return data
  }
}

export const companiesApi = {
  // Get all companies with job count
  async getCompanies() {
    const { data, error } = await supabase
      .from('companies')
      .select(`
        *,
        jobs!inner(count)
      `)
      .is('deleted_at', null)

    if (error) throw error

    // Transform the data to include job count
    return data?.map(company => ({
      ...company,
      jobsNumber: company.jobs?.[0]?.count || 0
    })) || []
  },

  // Get single company by ID
  async getCompany(id) {
    const { data, error } = await supabase
      .from('companies')
      .select(`
        *,
        jobs!inner(count)
      `)
      .eq('id', id)
      .is('deleted_at', null)
      .single()

    if (error) throw error

    return {
      ...data,
      jobsNumber: data.jobs?.[0]?.count || 0
    }
  },

  // Get jobs by company ID
  async getCompanyJobs(companyId) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('company_id', companyId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }
}

export const authApi = {
  // Sign up with email and password
  async signUp(email, password, userData) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })

    if (error) throw error

    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          city: userData.city
        })

      if (profileError) throw profileError
    }

    return data
  },

  // Sign in with email and password
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user profile
  async getUserProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) throw error
    return data
  }
}