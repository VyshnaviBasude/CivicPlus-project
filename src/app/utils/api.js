import axios from 'axios';

let token = null;
let tokenFetched = false; 

// Function to get the token from the auth API
const getAuthToken = async () => {
  try {
    const response = await axios.post(
      "https://interview.civicplus.com/707e3553-aa6f-4299-b8d4-a1f2e99bce6a/api/auth ",
      {
        clientId: "5b7a474b-3d3a-47f5-902e-92e00f589317", 
        clientSecret:"tcoaccenocraznf8uxkqx5jkqufaysj3wzpkudvznncx" , 
      }
    );
    token = response.data.access_token;    
    tokenFetched = true;
  } catch (error) {
    console.error('Error fetching auth token:', error);
    tokenFetched = false; 
  }
};

// Create an Axios instance
const api = axios.create({
  baseURL: "https://interview.civicplus.com/707e3553-aa6f-4299-b8d4-a1f2e99bce6a",
  headers: {
    'Content-Type': 'application/json'
  } 
});

// Interceptor to add the token dynamically to the request headers
api.interceptors.request.use(
  async (config) => {
   
    if (!tokenFetched) {
      await getAuthToken(); // Fetch the token once
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;