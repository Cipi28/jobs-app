# Jobs App - Project Knowledge Document

## Project Overview
A job search platform built with React + Vite frontend and Laravel/Lumen backend (to be migrated to Supabase).

### Current Tech Stack
- **Frontend**: React 18.3.1 + Vite
- **UI Library**: Chakra UI + Tailwind CSS + DaisyUI
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Backend**: Laravel Lumen (PHP) - TO BE MIGRATED
- **Database**: PostgreSQL
- **Authentication**: JWT (Tymon/JWT-Auth)

## Database Schema Analysis

### Users Table
```sql
- id (primary key)
- first_name (string)
- last_name (string) 
- email (unique, string)
- password (hashed)
- city (string, nullable)
- created_at, updated_at, deleted_at (soft deletes)
```

### Companies Table
```sql
- id (primary key)
- name (string)
- description (longText)
- url (string)
- location (string)
- logo_image (longText - URL)
- domain (integer)
- created_at, updated_at, deleted_at (soft deletes)
```

### Jobs Table
```sql
- id (primary key)
- name (string)
- description (longText)
- work_mode (jsonb) - contains type field
- location (string)
- experience_level (integer)
- aptitudes (jsonb, nullable) - array of skills
- job_image (longText, nullable)
- company_id (foreign key to companies)
- created_at, updated_at, deleted_at (soft deletes)
```

## Current API Endpoints

### Authentication
- `POST /api/v1/login` - User login
- `POST /api/v1/register` - User registration

### Companies
- `GET /api/v1/companies` - List all companies (with job count)
- `GET /api/v1/companies/{id}` - Get company details
- `GET /api/v1/companies/{id}/jobs` - Get jobs by company

### Jobs
- `GET /api/v1/jobs` - List all jobs
- `GET /api/v1/jobs/{id}` - Get job details with company info

## Frontend Structure

### Key Components
1. **AppHeader** - Navigation with user authentication state
2. **Home** - Landing page with company cards and search
3. **Login/Register** - Authentication forms
4. **CompanyDetails** - Company profile with job listings
5. **JobDetails** - Individual job view with application
6. **JobsSearchPage** - Advanced job search with filters
7. **ProfilePage** - User profile management
8. **CompanyCard** - Company display component
9. **JobCard** - Job listing component
10. **Footer** - Site footer

### Routing Structure
```
/ - Home page
/login - Login page
/register - Registration page
/company/:companyId - Company details
/job/:jobId - Job details
/jobs - Job search page
/profile - User profile
```

### Current API Configuration
```javascript
API_BASE_URL: 'http://localhost:8000/api/v1'
// Will be changed to Supabase URL
```

## Authentication Flow
1. User logs in via `/login` endpoint
2. Backend returns JWT token + user data
3. Frontend stores in localStorage:
   - `user`: JSON object with user info
   - `token`: JWT token for API calls
4. Token used in Authorization header for protected routes

## Key Features to Migrate

### User Management
- Registration with email/password
- Login with JWT tokens
- Profile management
- Password reset (planned)

### Job Search & Filtering
- Keyword search in job titles/descriptions
- Location-based filtering
- Department/category filtering
- Work mode filtering (remote, hybrid, onsite)
- Experience level filtering
- Salary range filtering (planned)
- Pagination support needed

### Company Features
- Company profiles with logos
- Company job listings
- Company following (planned)
- Star ratings display

### Job Features
- Job listings with rich descriptions
- Job applications (planned)
- Job favorites/bookmarking (planned)
- Real-time job alerts (planned)

## UI/UX Patterns
- Mobile-responsive design
- Red color scheme (#red.400, #red.500)
- Card-based layouts
- Modal/drawer navigation on mobile
- Infinite scroll or pagination for listings
- Search with real-time filtering

## External Integrations
- Font Awesome icons
- Pexels stock photos for placeholders
- Social login buttons (Google, Apple, Facebook) - UI only

## Performance Requirements
- Fast search across thousands of jobs
- Efficient pagination
- Image optimization for company logos
- Real-time updates for new jobs

## Security Requirements
- Row Level Security for user data
- Protected routes requiring authentication
- Input validation and sanitization
- CORS configuration for frontend

## Deployment
- Frontend: Currently configured for GitHub Pages/Azure Static Web Apps
- Backend: Will be Supabase hosted
- Database: Will be Supabase PostgreSQL

## Migration Priorities
1. Database schema recreation with RLS
2. Authentication system migration
3. Core CRUD operations
4. Advanced search functionality
5. File upload for logos/resumes
6. Real-time features
7. Performance optimization

## Known Issues to Address
- Duplicate button text in Register component
- Missing error handling in some API calls
- Hardcoded API URLs need environment variables
- Mobile navigation improvements needed
- Search performance optimization required

## Future Enhancements
- Email notifications
- Advanced job recommendations
- Company analytics dashboard
- Resume parsing
- Video interviews
- Payment integration for job postings
- Multi-language support