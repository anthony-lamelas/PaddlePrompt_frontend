// API Configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:5000'
  },
  production: {
    // You'll replace this with your actual domain when you deploy
    baseURL: 'https://your-domain.com'
  }
} as const;

// Get the current environment - defaults to development for local testing
const getCurrentEnvironment = (): keyof typeof API_CONFIG => {
  // Simple check: if hostname is localhost, we're in development
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname === '';
  return isLocalhost ? 'development' : 'production';
};

// Get the API base URL for the current environment
export const getApiBaseUrl = (): string => {
  const env = getCurrentEnvironment();
  return API_CONFIG[env].baseURL;
};

// Helper function to make API calls
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const finalOptions = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(url, finalOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}; 