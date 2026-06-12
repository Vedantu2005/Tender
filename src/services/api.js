import { mockTenders, mockDashboardStats, mockKeywords } from './mockData';

// Utility to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getDashboardStats: async () => {
    await delay(600); // Network latency
    return mockDashboardStats;
  },
  
  getTenders: async (filters = {}) => {
    await delay(800);
    let results = [...mockTenders];
    const safeFilters = filters || {};
    
    // Apply filters if provided
    if (safeFilters.search) {
      const q = safeFilters.search.toLowerCase();
      results = results.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.id.toLowerCase().includes(q)
      );
    }
    if (safeFilters.category) {
      results = results.filter(t => t.category === safeFilters.category);
    }
    if (safeFilters.status) {
      results = results.filter(t => t.status === safeFilters.status);
    }
    
    return results;
  },

  getTenderById: async (id) => {
    await delay(500);
    const tender = mockTenders.find(t => t.id === id);
    if (!tender) throw new Error('Tender not found');
    return tender;
  },

  getKeywords: async () => {
    await delay(400);
    return mockKeywords;
  },
  
  addKeyword: async (keyword) => {
    await delay(500);
    const newKeyword = {
      id: Date.now(),
      ...keyword,
      count: 0,
      accuracy: 0
    };
    return newKeyword;
  },

  deleteKeyword: async (id) => {
    await delay(400);
    return true;
  }
};
