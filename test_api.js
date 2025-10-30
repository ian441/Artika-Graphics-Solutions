const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE_URL = 'http://localhost:5000/api';

// Test function to check API endpoints
async function testAPI() {
  console.log('Testing API endpoints...\n');

  // Test 1: Health check
  try {
    console.log('1. Testing health check endpoint...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('Health check:', healthData);
  } catch (error) {
    console.log('Health check failed:', error.message);
  }

  // Test 2: Portfolio projects
  try {
    console.log('\n2. Testing portfolio projects endpoint...');
    const portfolioResponse = await fetch(`${API_BASE_URL}/portfolio`);
    const portfolioData = await portfolioResponse.json();
    console.log('Portfolio projects:', portfolioData);
  } catch (error) {
    console.log('Portfolio projects failed:', error.message);
  }

  // Test 3: Admin dashboard (will likely fail without auth)
  try {
    console.log('\n3. Testing admin dashboard endpoint...');
    const adminResponse = await fetch(`${API_BASE_URL}/admin/dashboard`);
    const adminData = await adminResponse.json();
    console.log('Admin dashboard:', adminData);
  } catch (error) {
    console.log('Admin dashboard failed:', error.message);
  }

  // Test 4: User registration
  try {
    console.log('\n4. Testing user registration...');
    const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword123'
      }),
    });
    const registerData = await registerResponse.json();
    console.log('User registration:', registerData);
  } catch (error) {
    console.log('User registration failed:', error.message);
  }

  // Test 5: User login
  try {
    console.log('\n5. Testing user login...');
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword123'
      }),
    });
    const loginData = await loginResponse.json();
    console.log('User login:', loginData);

    if (loginData.token) {
      console.log('\n6. Testing authenticated endpoints with token...');

      // Test admin dashboard with token
      try {
        const adminAuthResponse = await fetch(`${API_BASE_URL}/admin/dashboard`, {
          headers: {
            'Authorization': `Bearer ${loginData.token}`,
          },
        });
        const adminAuthData = await adminAuthResponse.json();
        console.log('Admin dashboard (authenticated):', adminAuthData);
      } catch (error) {
        console.log('Admin dashboard (authenticated) failed:', error.message);
      }

      // Test portfolio management
      try {
        const portfolioAuthResponse = await fetch(`${API_BASE_URL}/admin/portfolio`, {
          headers: {
            'Authorization': `Bearer ${loginData.token}`,
          },
        });
        const portfolioAuthData = await portfolioAuthResponse.json();
        console.log('Portfolio management (authenticated):', portfolioAuthData);
      } catch (error) {
        console.log('Portfolio management (authenticated) failed:', error.message);
      }
    }
  } catch (error) {
    console.log('User login failed:', error.message);
  }

  console.log('\nAPI testing completed.');
}

// Run the tests
testAPI().catch(console.error);
