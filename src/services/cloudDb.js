// Cloud Database & Production Synchronization Engine for Al-Asas Platform

const CLOUD_CONFIG_KEY = 'alasas_cloud_config';

// Default resilient cloud storage configuration
// Uses a cloud REST database endpoint that works in any Production environment worldwide
const DEFAULT_CLOUD_CONFIG = {
  enabled: true,
  provider: 'firebase_rest', // 'firebase_rest' | 'custom_rest' | 'jsonbin'
  // Default public read / authenticated cloud endpoint
  apiUrl: 'https://alasas-platform-default-rtdb.firebaseio.com/alasas_production_data.json',
  apiKey: '',
  syncIntervalSeconds: 45,
  lastSyncTime: null,
  syncStatus: 'idle' // 'idle' | 'syncing' | 'online' | 'error' | 'offline'
};

export const getCloudConfig = () => {
  try {
    const stored = localStorage.getItem(CLOUD_CONFIG_KEY);
    return stored ? { ...DEFAULT_CLOUD_CONFIG, ...JSON.parse(stored) } : DEFAULT_CLOUD_CONFIG;
  } catch (e) {
    return DEFAULT_CLOUD_CONFIG;
  }
};

export const saveCloudConfig = (config) => {
  try {
    const updated = { ...getCloudConfig(), ...config };
    localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return DEFAULT_CLOUD_CONFIG;
  }
};

// Global cloud sync state listeners
const cloudListeners = new Set();
export const subscribeCloudStatus = (callback) => {
  cloudListeners.add(callback);
  return () => cloudListeners.delete(callback);
};

const notifyCloudStatus = (status, extra = {}) => {
  cloudListeners.forEach(cb => {
    try {
      cb({ status, ...extra, timestamp: Date.now() });
    } catch (e) {}
  });
};

/**
 * Fetch latest production dataset from Cloud Database
 * Bypasses all browser and CDN caches with cache-busting headers
 */
export const fetchCloudDataset = async () => {
  const config = getCloudConfig();
  if (!config.enabled || !config.apiUrl) {
    return null;
  }

  notifyCloudStatus('syncing');

  try {
    const cacheBuster = `_t=${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const separator = config.apiUrl.includes('?') ? '&' : '?';
    const fetchUrl = `${config.apiUrl}${separator}${cacheBuster}`;

    const headers = {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache'
    };

    if (config.apiKey) {
      headers['Authorization'] = `Bearer ${config.apiKey}`;
      headers['X-Master-Key'] = config.apiKey;
    }

    const res = await fetch(fetchUrl, {
      method: 'GET',
      headers,
      cache: 'no-store'
    });

    if (!res.ok) {
      notifyCloudStatus('error', { message: `HTTP ${res.status}: ${res.statusText}` });
      return null;
    }

    const rawData = await res.json();
    if (!rawData) {
      notifyCloudStatus('online', { message: 'قاعدة البيانات السحابية فارغة، بانتظار نشر البيانات' });
      return null;
    }

    // Support JSONBin structure (where data is in record) or direct JSON
    const data = rawData.record ? rawData.record : rawData;

    saveCloudConfig({ lastSyncTime: Date.now(), syncStatus: 'online' });
    notifyCloudStatus('online', { lastSyncTime: Date.now() });

    return data;
  } catch (err) {
    console.warn('[CloudSync] Cloud fetch error (using local cache):', err.message);
    notifyCloudStatus('offline', { message: err.message });
    return null;
  }
};

/**
 * Save complete production dataset to Cloud Database
 * Pushes Admin changes to the world
 */
export const pushCloudDataset = async (fullData) => {
  const config = getCloudConfig();
  if (!config.enabled || !config.apiUrl) {
    return { success: false, message: 'المزامنة السحابية غير مفعلة' };
  }

  notifyCloudStatus('syncing');

  try {
    const payload = {
      ...fullData,
      lastUpdated: Date.now(),
      version: (fullData.version || 0) + 1
    };

    const separator = config.apiUrl.includes('?') ? '&' : '?';
    const pushUrl = `${config.apiUrl}${separator}_t=${Date.now()}`;

    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };

    if (config.apiKey) {
      headers['Authorization'] = `Bearer ${config.apiKey}`;
      headers['X-Master-Key'] = config.apiKey;
    }

    // Default method is PUT for Firebase REST or Custom REST to replace root object
    const method = 'PUT';

    const res = await fetch(pushUrl, {
      method,
      headers,
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      notifyCloudStatus('error', { message: `خطأ في الخادم السحابي (${res.status}): ${errText}` });
      return { success: false, message: `فشل الحفظ في السحابة (${res.status})` };
    }

    saveCloudConfig({ lastSyncTime: Date.now(), syncStatus: 'online' });
    notifyCloudStatus('online', { lastSyncTime: Date.now(), message: 'تمت المزامنة بنجاح' });

    return { success: true, lastUpdated: payload.lastUpdated };
  } catch (err) {
    console.error('[CloudSync] Cloud push error:', err);
    notifyCloudStatus('error', { message: err.message });
    return { success: false, message: err.message };
  }
};
