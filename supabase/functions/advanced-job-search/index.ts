import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

interface SearchFilters {
  keywords?: string
  location?: string
  department?: string
  workType?: string
  experienceLevel?: number
  page?: number
  pageSize?: number
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { searchParams } = new URL(req.url)
    const filters: SearchFilters = {
      keywords: searchParams.get('keywords') || '',
      location: searchParams.get('location') || '',
      department: searchParams.get('department') || '',
      workType: searchParams.get('workType') || '',
      experienceLevel: searchParams.get('experienceLevel') ? parseInt(searchParams.get('experienceLevel')!) : undefined,
      page: parseInt(searchParams.get('page') || '1'),
      pageSize: parseInt(searchParams.get('pageSize') || '20')
    }

    const from = ((filters.page || 1) - 1) * (filters.pageSize || 20)
    const to = from + (filters.pageSize || 20) - 1

    let query = supabaseClient
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

    // Apply filters
    if (filters.keywords) {
      query = query.textSearch('search_vector', filters.keywords, {
        type: 'websearch',
        config: 'english'
      })
    }

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }

    if (filters.workType) {
      query = query.contains('work_mode', { type: filters.workType })
    }

    if (filters.experienceLevel) {
      query = query.gte('experience_level', filters.experienceLevel)
    }

    // Apply pagination and ordering
    const { data: jobs, error, count } = await query
      .range(from, to)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    const totalPages = Math.ceil((count || 0) / (filters.pageSize || 20))

    return new Response(
      JSON.stringify({
        jobs: jobs || [],
        pagination: {
          currentPage: filters.page || 1,
          pageSize: filters.pageSize || 20,
          totalCount: count || 0,
          totalPages,
          hasNextPage: (filters.page || 1) < totalPages,
          hasPrevPage: (filters.page || 1) > 1,
          from: from + 1,
          to: Math.min(to + 1, count || 0)
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})