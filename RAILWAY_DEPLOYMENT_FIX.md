# Railway Deployment Fix for CORS Issues

## Problem
The backend is returning 502 errors, indicating the application is not responding properly on Railway.

## Root Cause
The backend application is likely crashing on startup due to missing environment variables or configuration issues.

## Solution

### 1. Environment Variables Required
Set these environment variables in your Railway project:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
SESSION_SECRET=your-super-secret-session-key-here
SESSION_MAX_AGE=604800000
NODE_ENV=production
RAILWAY_ENVIRONMENT=production
```

### 2. Optional Environment Variables
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_ID=your-google-client-id
CLIENT_SECRET=your-google-client-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 3. CORS Configuration Fixed
The CORS configuration has been updated to:
- Properly detect production environment
- Include `https://kingeasyearn.com` in allowed origins
- Use correct cookie settings for cross-domain requests

### 4. Deployment Steps

1. **Set Environment Variables in Railway:**
   - Go to your Railway project dashboard
   - Navigate to Variables tab
   - Add all required environment variables

2. **Redeploy the Application:**
   - Trigger a new deployment
   - Or push changes to trigger auto-deployment

3. **Verify Deployment:**
   - Check Railway logs for any startup errors
   - Test the health endpoint: `https://easyearn-backend-production-01ac.up.railway.app/health`
   - Test CORS: `https://easyearn-backend-production-01ac.up.railway.app/api/test-cors`

### 5. Testing CORS Fix

Run the test script to verify CORS is working:
```bash
node test-cors-production.js
```

### 6. Expected Results

After fixing the deployment:
- Backend should return 200 status for health checks
- CORS headers should be properly set for `https://kingeasyearn.com`
- Frontend should be able to make API calls without CORS errors

## Current Status
- ✅ CORS configuration updated
- ✅ Production environment detection fixed
- ✅ Allowed origins include `https://kingeasyearn.com`
- ❌ Backend deployment needs environment variables
- ❌ Railway 502 error needs to be resolved

## Next Steps
1. Set environment variables in Railway
2. Redeploy the backend
3. Test CORS functionality
4. Verify frontend connectivity
