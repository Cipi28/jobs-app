// API configuration
export const API_BASE_URL = 'http://localhost:8000/api/v1';

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  COMPANIES: '/companies',
  JOBS: '/jobs',
  COMPANY_JOBS: (companyId) => `/companies/${companyId}/jobs`,
  COMPANY_DETAILS: (companyId) => `/companies/${companyId}`,
  JOB_DETAILS: (jobId) => `/jobs/${jobId}`,
};

// Helper function to create full API URLs
export const createApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;