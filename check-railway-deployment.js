const axios = require('axios');

// Check Railway deployment status
async function checkRailwayDeployment() {
    const backendUrl = 'https://easyearn-backend-production-01ac.up.railway.app';
    
    console.log('🔍 Checking Railway Deployment Status');
    console.log(`Backend URL: ${backendUrl}`);
    console.log('');
    
    const tests = [
        {
            name: 'Health Check',
            url: '/health',
            method: 'GET'
        },
        {
            name: 'CORS Test',
            url: '/api/test-cors',
            method: 'GET'
        },
        {
            name: 'Root Endpoint',
            url: '/',
            method: 'GET'
        }
    ];
    
    for (const test of tests) {
        try {
            console.log(`Testing ${test.name}...`);
            const response = await axios({
                method: test.method,
                url: `${backendUrl}${test.url}`,
                timeout: 10000,
                headers: {
                    'Origin': 'https://kingeasyearn.com'
                }
            });
            
            console.log(`✅ ${test.name}: ${response.status}`);
            if (test.name === 'Health Check') {
                console.log('   Environment:', response.data.environment?.NODE_ENV || 'not set');
                console.log('   MongoDB:', response.data.environment?.MONGODB_URI ? 'Set' : 'NOT SET');
                console.log('   Session Secret:', response.data.environment?.SESSION_SECRET ? 'Set' : 'NOT SET');
            }
            
        } catch (error) {
            console.log(`❌ ${test.name}: ${error.response?.status || error.code || 'Error'}`);
            if (error.response?.data) {
                console.log('   Error:', error.response.data.message || error.response.data);
            } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
                console.log('   Issue: Server not reachable');
            } else if (error.code === 'ETIMEDOUT') {
                console.log('   Issue: Request timeout');
            }
        }
        console.log('');
    }
    
    console.log('📋 Diagnosis:');
    console.log('If all tests fail with 502 errors, the issue is likely:');
    console.log('1. Missing environment variables (MONGODB_URI, SESSION_SECRET)');
    console.log('2. Application crashing on startup');
    console.log('3. Port configuration issues');
    console.log('');
    console.log('To fix:');
    console.log('1. Set environment variables in Railway dashboard');
    console.log('2. Check Railway logs for startup errors');
    console.log('3. Redeploy the application');
}

checkRailwayDeployment();
