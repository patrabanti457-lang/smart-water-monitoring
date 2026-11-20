// Design tokens — single source of truth for the DrainWatch design system

export const colors = {
  navy: {
    950: '#080D19',
    900: '#0B1020',
    800: '#111A2E',
    700: '#151F35',
    600: '#1C2942',
    500: '#27344D',
  },
  cobalt: {
    DEFAULT: '#2563EB',
    light: '#3B82F6',
    dark: '#1D4ED8',
  },
  alert: {
    red: '#EF4444',
    redDark: '#DC2626',
  },
  text: {
    primary: '#F8FAFC',
    secondary: '#94A3B8',
    muted: '#64748B',
  },
  status: {
    normal: '#22C55E',
    warning: '#F59E0B',
    critical: '#EF4444',
    info: '#3B82F6',
    offline: '#64748B',
  },
};

export const statusConfig = {
  NORMAL: {
    label: 'Normal',
    color: colors.status.normal,
    bg: 'rgba(34, 197, 94, 0.1)',
    border: 'rgba(34, 197, 94, 0.3)',
    description: 'All readings within normal range.',
  },
  HIGH_WATER: {
    label: 'High Water Level',
    color: colors.status.warning,
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.3)',
    description: 'Water level at or above configured threshold.',
  },
  POSSIBLE_BLOCKAGE: {
    label: 'Possible Blockage',
    color: colors.alert.red,
    bg: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.3)',
    description: 'Upstream high, downstream low, flow reduced. Physical inspection required.',
  },
  EMERGENCY: {
    label: 'Emergency — Float Switch',
    color: colors.alert.red,
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.4)',
    description: 'Float switch activated indicating critical water level.',
  },
  SENSOR_FAULT: {
    label: 'Sensor Error',
    color: colors.status.warning,
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.3)',
    description: 'One or more sensors returned invalid readings.',
  },
  LOW_FLOW: {
    label: 'Low Flow',
    color: colors.status.warning,
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.3)',
    description: 'Water flow rate below expected levels.',
  },
  OFFLINE: {
    label: 'Device Offline',
    color: colors.status.offline,
    bg: 'rgba(100, 116, 139, 0.1)',
    border: 'rgba(100, 116, 139, 0.3)',
    description: 'No data received from device.',
  },
};

export const chartColors = {
  upstream: '#2563EB',
  downstream: '#F59E0B',
  flow: '#3B82F6',
  threshold: '#EF4444',
  grid: '#1C2942',
  text: '#64748B',
};
