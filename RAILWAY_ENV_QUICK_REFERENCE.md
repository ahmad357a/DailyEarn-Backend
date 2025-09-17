# Railway Environment Variables - Quick Reference

## 🚨 CRITICAL - Set These First

These are **REQUIRED** for the backend to start:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
SESSION_SECRET=your-super-secret-session-key-here
NODE_ENV=production
RAILWAY_ENVIRONMENT=production
```

## 📋 Complete Environment Variables List

### Required (Backend won't start without these)
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
SESSION_SECRET=your-super-secret-session-key-here
SESSION_NAME=easyearn.sid
SESSION_MAX_AGE=604800000
NODE_ENV=production
RAILWAY_ENVIRONMENT=production
```

### Optional (Add these for full functionality)
```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
CLIENT_ID=your-google-client-id
CLIENT_SECRET=your-google-client-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
ADMIN_EMAIL=your-admin-email@gmail.com
```

## 🔧 How to Set in Railway

1. Go to your Railway project dashboard
2. Click on your backend service
3. Go to the "Variables" tab
4. Click "New Variable"
5. Add each variable with its value
6. Click "Deploy" to redeploy with new variables

## ✅ Verification

After setting variables and redeploying, run:

```bash
cd EasyEarn-Backend
node verify-railway-config.js
```

This will test:
- Backend connectivity
- Environment variable detection
- CORS configuration
- Cross-origin request handling

## 🚨 Common Issues

### Backend returns 502 error
- **Cause**: Missing MONGODB_URI or SESSION_SECRET
- **Fix**: Set required environment variables

### CORS errors persist
- **Cause**: Backend not responding (502 error)
- **Fix**: Fix backend deployment first

### Environment shows as development
- **Cause**: NODE_ENV not set to production
- **Fix**: Set NODE_ENV=production in Railway

## 📞 Quick Test

Test if backend is working:
```bash
curl https://easyearn-backend-production-01ac.up.railway.app/health
```

Should return JSON with environment info, not 502 error.
