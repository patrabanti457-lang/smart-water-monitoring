// API service layer — all backend communication goes through here

const API_BASE = '/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE;
    this.isOnline = true;
  }

  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      this.isOnline = true;
      return await response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        this.isOnline = false;
      }
      throw error;
    }
  }

  // Health & Status
  async getHealth() {
    return this.request('/health');
  }

  // Current sensor readings
  async getCurrentReadings(deviceId = 'DRAIN_001') {
    return this.request(`/readings/current?device_id=${deviceId}`);
  }

  // Historical readings
  async getReadingsHistory(deviceId = 'DRAIN_001', hours = 24) {
    return this.request(`/readings/history?device_id=${deviceId}&hours=${hours}`);
  }

  // Alerts
  async getAlerts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/alerts${query ? '?' + query : ''}`);
  }

  async acknowledgeAlert(alertId) {
    return this.request(`/alerts/${alertId}/acknowledge`, { method: 'POST' });
  }

  // Device info
  async getDeviceStatus(deviceId = 'DRAIN_001') {
    return this.request(`/devices/${deviceId}/status`);
  }

  async getDevices() {
    return this.request('/devices');
  }

  // Analytics
  async getAnalyticsSummary(deviceId = 'DRAIN_001', period = '7d') {
    return this.request(`/analytics/summary?device_id=${deviceId}&period=${period}`);
  }

  async getDailySummary(deviceId = 'DRAIN_001', days = 7) {
    return this.request(`/analytics/daily?device_id=${deviceId}&days=${days}`);
  }

  // System
  async getSystemStatus() {
    return this.request('/system/status');
  }
}

export const api = new ApiService();

// Demo data generator — used when backend is unavailable
export function generateDemoReading(scenario = 'normal') {
  const jitter = (v, range = 3) => v + (Math.random() - 0.5) * range;
  const now = new Date().toISOString();

  const scenarios = {
    normal: { upstream: 25, downstream: 22, flow: 9.2, floatSwitch: false },
    high_water: { upstream: 72, downstream: 68, flow: 8.5, floatSwitch: false },
    possible_blockage: { upstream: 78, downstream: 30, flow: 0.8, floatSwitch: false },
    emergency: { upstream: 82, downstream: 78, flow: 5.5, floatSwitch: true },
    sensor_fault: { upstream: null, downstream: 22, flow: 9.0, floatSwitch: false },
  };

  const base = scenarios[scenario] || scenarios.normal;

  const upstream = base.upstream !== null ? Math.max(0, Math.min(100, jitter(base.upstream))) : null;
  const downstream = Math.max(0, Math.min(100, jitter(base.downstream)));
  const flow = Math.max(0, jitter(base.flow, 1));

  let status = 'NORMAL';
  if (base.floatSwitch) status = 'EMERGENCY';
  else if (upstream === null) status = 'SENSOR_FAULT';
  else if (upstream >= 60 && upstream - downstream >= 15 && flow < 2) status = 'POSSIBLE_BLOCKAGE';
  else if (upstream >= 60 || downstream >= 60) status = 'HIGH_WATER';

  return {
    device_id: 'DRAIN_001',
    timestamp: now,
    upstream_level: upstream !== null ? parseFloat(upstream.toFixed(1)) : null,
    downstream_level: parseFloat(downstream.toFixed(1)),
    flow_rate: parseFloat(flow.toFixed(1)),
    float_switch: base.floatSwitch,
    status,
    communication: 'demo',
  };
}

export function generateDemoHistory(count = 60, scenario = 'normal') {
  const history = [];
  const now = Date.now();
  for (let i = count - 1; i >= 0; i--) {
    const reading = generateDemoReading(scenario);
    reading.timestamp = new Date(now - i * 60000).toISOString();
    history.push(reading);
  }
  return history;
}
