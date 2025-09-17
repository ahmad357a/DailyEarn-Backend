const axios = require('axios');

// Test CORS configuration for production
async function testCorsProduction() {
    const backendUrl = 'https://easyearn-backend-production-01ac.up.railway.app';
    const frontendOrigin = 'https://kingeasyearn.com';
    
    console.log('🧪 Testing CORS Configuration for Production');
    console.log(`Backend: ${backendUrl}`);
    console.log(`Frontend: ${frontendOrigin}`);
    console.log('');
    
    try {
        // Test 1: Health check
        console.log('1. Testing health check...');
        const healthResponse = await axios.get(`${backendUrl}/health`, {
            headers: {
                'Origin': frontendOrigin
            }
        });
        console.log('✅ Health check successful:', healthResponse.status);
        console.log('   Response:', healthResponse.data);
        
        // Test 2: CORS test endpoint
        console.log('\n2. Testing CORS endpoint...');
        const corsResponse = await axios.get(`${backendUrl}/api/test-cors`, {
            headers: {
                'Origin': frontendOrigin
            }
        });
        console.log('✅ CORS test successful:', corsResponse.status);
        console.log('   Response:', corsResponse.data);
        
        // Test 3: Check CORS headers
        console.log('\n3. Checking CORS headers...');
        const optionsResponse = await axios.options(`${backendUrl}/api/test-cors`, {
            headers: {
                'Origin': frontendOrigin,
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        });
        
        console.log('✅ OPTIONS request successful:', optionsResponse.status);
        console.log('   CORS Headers:');
        Object.keys(optionsResponse.headers).forEach(header => {
            if (header.toLowerCase().includes('access-control')) {
                console.log(`     ${header}: ${optionsResponse.headers[header]}`);
            }
        });
        
        console.log('\n🎉 All CORS tests passed!');
        
    } catch (error) {
        console.error('❌ CORS test failed:');
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Headers:', error.response.headers);
            console.error('   Data:', error.response.data);
        } else if (error.request) {
            console.error('   Network error:', error.message);
            console.error('   This might be a server connectivity issue');
        } else {
            console.error('   Error:', error.message);
        }
    }
}

testCorsProduction();
