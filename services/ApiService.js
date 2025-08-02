/**
 * ApiService.js
 *
 * Central API service for communicating with Node.js + MongoDB backend
 * Replaces Firebase integration with custom server endpoints
 *
 * Features:
 * - User registration and authentication
 * - Emergency SOS reporting
 * - Cleanliness reporting
 * - Volunteer management
 * - Real-time updates via WebSocket
 */

// API Configuration
const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api' // Development server
  : 'https://your-production-server.com/api'; // Production server

const WS_BASE_URL = __DEV__ ? 'ws://localhost:3000' : 'wss://your-production-server.com';

class ApiService {
  constructor() {
    this.authToken = null;
    this.websocket = null;
  }

  // Generic API request method
  async makeRequest(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication Methods
  async registerUser(userData) {
    try {
      const response = await this.makeRequest('/users/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      if (response.token) {
        this.authToken = response.token;
      }

      return response;
    } catch (error) {
      console.error('User registration failed:', error);
      throw error;
    }
  }

  async loginVolunteer(credentials) {
    try {
      const response = await this.makeRequest('/volunteers/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (response.token) {
        this.authToken = response.token;
      }

      return response;
    } catch (error) {
      console.error('Volunteer login failed:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.makeRequest('/auth/logout', {
        method: 'POST',
      });

      this.authToken = null;
      if (this.websocket) {
        this.websocket.close();
        this.websocket = null;
      }

      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  // Emergency SOS Methods
  async createSOSReport(sosData) {
    try {
      const formData = new FormData();

      // Add text data
      formData.append('description', sosData.description);
      formData.append('location', JSON.stringify(sosData.location));
      formData.append('urgencyLevel', sosData.urgencyLevel || 'medium');

      // Add image if present
      if (sosData.image) {
        formData.append('image', {
          uri: sosData.image.uri,
          type: sosData.image.type || 'image/jpeg',
          name: sosData.image.name || 'sos-image.jpg',
        });
      }

      const response = await this.makeRequest('/sos/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
        },
        body: formData,
      });

      return response;
    } catch (error) {
      console.error('SOS report creation failed:', error);
      throw error;
    }
  }

  async getSOSReports(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = `/sos/reports${queryParams ? `?${queryParams}` : ''}`;

      return await this.makeRequest(endpoint);
    } catch (error) {
      console.error('Failed to fetch SOS reports:', error);
      throw error;
    }
  }

  async updateSOSStatus(reportId, status, volunteerId = null) {
    try {
      return await this.makeRequest(`/sos/reports/${reportId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, volunteerId }),
      });
    } catch (error) {
      console.error('Failed to update SOS status:', error);
      throw error;
    }
  }

  // Cleanliness Reporting Methods
  async createCleanlinessReport(reportData) {
    try {
      const formData = new FormData();

      formData.append('description', reportData.description);
      formData.append('category', reportData.category);
      formData.append('location', JSON.stringify(reportData.location));
      formData.append('severity', reportData.severity || 'medium');

      if (reportData.image) {
        formData.append('image', {
          uri: reportData.image.uri,
          type: reportData.image.type || 'image/jpeg',
          name: reportData.image.name || 'cleanliness-report.jpg',
        });
      }

      return await this.makeRequest('/cleanliness/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
        },
        body: formData,
      });
    } catch (error) {
      console.error('Cleanliness report creation failed:', error);
      throw error;
    }
  }

  async getCleanlinessReports(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = `/cleanliness/reports${queryParams ? `?${queryParams}` : ''}`;

      return await this.makeRequest(endpoint);
    } catch (error) {
      console.error('Failed to fetch cleanliness reports:', error);
      throw error;
    }
  }

  // Vendor Management Methods
  async registerVendor(vendorData) {
    try {
      const formData = new FormData();

      formData.append('name', vendorData.name);
      formData.append('phone', vendorData.phone);
      formData.append('serviceType', vendorData.serviceType);
      formData.append('description', vendorData.description);
      formData.append('location', JSON.stringify(vendorData.location));

      if (vendorData.image) {
        formData.append('image', {
          uri: vendorData.image.uri,
          type: vendorData.image.type || 'image/jpeg',
          name: vendorData.image.name || 'vendor-logo.jpg',
        });
      }

      return await this.makeRequest('/vendors/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
        },
        body: formData,
      });
    } catch (error) {
      console.error('Vendor registration failed:', error);
      throw error;
    }
  }

  async getVendors(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = `/vendors${queryParams ? `?${queryParams}` : ''}`;

      return await this.makeRequest(endpoint);
    } catch (error) {
      console.error('Failed to fetch vendors:', error);
      throw error;
    }
  }

  // Real-time WebSocket Methods
  connectWebSocket() {
    try {
      if (this.websocket) {
        this.websocket.close();
      }

      this.websocket = new WebSocket(WS_BASE_URL);

      this.websocket.onopen = () => {
        console.log('WebSocket connected');
        if (this.authToken) {
          this.websocket.send(
            JSON.stringify({
              type: 'authenticate',
              token: this.authToken,
            }),
          );
        }
      };

      this.websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleWebSocketMessage(data);
        } catch (error) {
          console.error('WebSocket message parsing error:', error);
        }
      };

      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.websocket.onclose = () => {
        console.log('WebSocket disconnected');
        // Auto-reconnect after 5 seconds
        setTimeout(() => this.connectWebSocket(), 5000);
      };

      return this.websocket;
    } catch (error) {
      console.error('WebSocket connection failed:', error);
    }
  }

  handleWebSocketMessage(data) {
    // Handle different types of real-time messages
    switch (data.type) {
      case 'new_sos_report':
        // Handle new SOS report notification
        console.log('New SOS report:', data.payload);
        break;
      case 'volunteer_assigned':
        // Handle volunteer assignment notification
        console.log('Volunteer assigned:', data.payload);
        break;
      case 'report_status_updated':
        // Handle report status updates
        console.log('Report status updated:', data.payload);
        break;
      default:
        console.log('Unknown WebSocket message type:', data.type);
    }
  }

  // Emergency Video Call Methods (future implementation)
  async initiateVideoCall(callData) {
    try {
      return await this.makeRequest('/emergency/video-call', {
        method: 'POST',
        body: JSON.stringify(callData),
      });
    } catch (error) {
      console.error('Video call initiation failed:', error);
      throw error;
    }
  }

  // Health check method
  async checkServerHealth() {
    try {
      return await this.makeRequest('/health');
    } catch (error) {
      console.error('Server health check failed:', error);
      return { status: 'offline' };
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default ApiService;
