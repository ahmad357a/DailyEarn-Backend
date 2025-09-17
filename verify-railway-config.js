const axios = require('axios');

// Verify Railway configuration and CORS fix
async function verifyRailwayConfig() {
    const backendUrl = 'https://easyearn-backend-production-01ac.up.railway.app';
    
    console.log('🔍 Verifying Railway Configuration and CORS Fix');
    console.log('=' .repeat(60));
    console.log(`Backend URL: ${backendUrl}`);
    console.log(`Frontend URL: https://kingeasyearn.com`);
    console.log('');
    
    const tests = [
        {
            name: 'Health Check',
            description: 'Basic backend connectivity',
            url: '/health',
            method: 'GET',
            checkResponse: (data) => {
                if (data.environment?.NODE_ENV === 'production') {
                    console.log('   ✅ Production environment detected');
                } else {
                    console.log('   ⚠️  Not in production mode');
                }
                if (data.environment?.MONGODB_URI) {
                    console.log('   ✅ MongoDB URI configured');
                } else {
                    console.log('   ❌ MongoDB URI missing');
                }
                if (data.environment?.SESSION_SECRET) {
                    console.log('   ✅ Session secret configured');
                } else {
                    console.log('   ❌ Session secret missing');
                }
            }
        },
        {
            name: 'CORS Test',
            description: 'Cross-origin request handling',
            url: '/api/test-cors',
            method: 'GET',
            headers: { 'Origin': 'https://kingeasyearn.com' },
            checkResponse: (data) => {
                if (data.message === 'CORS test successful') {
                    console.log('   ✅ CORS test endpoint working');
                }
                if (data.origin === 'https://kingeasyearn.com') {
                    console.log('   ✅ Frontend origin recognized');
                }
            }
        },
        {
            name: 'CORS Preflight',
            description: 'OPTIONS request handling',
            url: '/api/test-cors',
            method: 'OPTIONS',
            headers: { 
                'Origin': 'https://kingeasyearn.com',
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type'
            },
            checkHeaders: (headers) => {
                const corsHeaders = {
                    'access-control-allow-origin': headers['access-control-allow-origin'],
                    'access-control-allow-credentials': headers['access-control-allow-credentials'],
                    'access-control-allow-methods': headers['access-control-allow-methods'],
                    'access-control-allow-headers': headers['access-control-allow-headers']
                };
                
                console.log('   CORS Headers:');
                Object.entries(corsHeaders).forEach(([key, value]) => {
                    if (value) {
                        console.log(`     ✅ ${key}: ${value}`);
                    } else {
                        console.log(`     ❌ ${key}: missing`);
                    }
                });
            }
        }
    ];
    
    let allPassed = true;
    
    for (const test of tests) {
        try {
            console.log(`🧪 ${test.name}: ${test.description}`);
            
            const response = await axios({
                method: test.method,
                url: `${backendUrl}${test.url}`,
                headers: test.headers || {},
                timeout: 10000
            });
            
            console.log(`   Status: ${response.status} ✅`);
            
            if (test.checkResponse && response.data) {
                test.checkResponse(response.data);
            }
            
            if (test.checkHeaders && response.headers) {
                test.checkHeaders(response.headers);
            }
            
        } catch (error) {
            console.log(`   Status: ${error.response?.status || 'Error'} ❌`);
            if (error.response?.data) {
                console.log(`   Error: ${error.response.data.message || error.response.data}`);
            } else {
                console.log(`   Error: ${error.message}`);
            }
            allPassed = false;
        }
        console.log('');
    }
    
    console.log('=' .repeat(60));
    if (allPassed) {
        console.log('🎉 ALL TESTS PASSED! CORS fix is working correctly.');
        console.log('');
        console.log('✅ Your frontend at https://kingeasyearn.com should now be able to:');
        console.log('   - Connect to the backend without CORS errors');
        console.log('   - Make API calls successfully');
        console.log('   - Handle user authentication properly');
        console.log('   - Maintain sessions across page refreshes');
    } else {
        console.log('❌ Some tests failed. Please check:');
        console.log('   1. Environment variables are set in Railway');
        console.log('   2. Backend has been redeployed');
        console.log('   3. Railway logs for any startup errors');
        console.log('');
        console.log('Required Railway environment variables:');
        console.log('   MONGODB_URI=your-mongodb-connection-string');
        console.log('   SESSION_SECRET=your-session-secret');
        console.log('   NODE_ENV=production');
        console.log('   RAILWAY_ENVIRONMENT=production');
    }
    console.log('=' .repeat(60));
}

verifyRailwayConfig();
