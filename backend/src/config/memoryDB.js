// Simple in-memory database for development
let database = {
  users: [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj5B89bqR4zq', // password123
      role: 'admin',
      department: 'IT',
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'John Manager',
      email: 'john@example.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj5B89bqR4zq', // password123
      role: 'manager',
      department: 'Operations',
      isActive: true,
      lastLogin: new Date(Date.now() - 86400000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Jane User',
      email: 'jane@example.com',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj5B89bqR4zq', // password123
      role: 'user',
      department: 'Sales',
      isActive: true,
      lastLogin: new Date(Date.now() - 172800000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  assets: [
    {
      id: '1',
      name: 'MacBook Pro 16"',
      description: 'Latest MacBook Pro with M3 chip',
      category: 'Laptop',
      status: 'Available',
      serialNumber: 'MBP16-001',
      purchasePrice: 2999.99,
      purchaseDate: '2024-01-15',
      warranty: '2027-01-15',
      assignedTo: null,
      location: 'Warehouse',
      condition: 'Excellent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Dell Monitor 27"',
      description: '4K UltraSharp monitor',
      category: 'Monitor',
      status: 'Assigned',
      serialNumber: 'DELL27-002',
      purchasePrice: 599.99,
      purchaseDate: '2024-02-10',
      warranty: '2027-02-10',
      assignedTo: '2',
      location: 'John Manager Office',
      condition: 'Excellent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone model',
      category: 'Phone',
      status: 'Maintenance',
      serialNumber: 'IP15-003',
      purchasePrice: 1199.99,
      purchaseDate: '2024-03-05',
      warranty: '2025-03-05',
      assignedTo: '3',
      location: 'IT Department',
      condition: 'Good',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  reports: [],
  settings: [],
  auditLogs: []
};

let nextId = {
  users: 4,
  assets: 4,
  reports: 1,
  settings: 1,
  auditLogs: 1
};

const memoryDB = {
  // Users
  findUser: (query) => {
    return database.users.find(user => {
      if (query.id) return user.id === query.id;
      if (query.email) return user.email === query.email;
      return false;
    });
  },

  findUsers: (query = {}) => {
    let users = database.users;
    
    if (query.search) {
      const search = query.search.toLowerCase();
      users = users.filter(user => 
        user.name.toLowerCase().includes(search) || 
        user.email.toLowerCase().includes(search)
      );
    }
    
    if (query.role) {
      users = users.filter(user => user.role === query.role);
    }
    
    if (query.isActive !== undefined) {
      users = users.filter(user => user.isActive === (query.isActive === 'true'));
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: users.slice(startIndex, endIndex),
      total: users.length,
      page,
      limit,
      pages: Math.ceil(users.length / limit)
    };
  },

  createUser: (userData) => {
    const user = {
      id: nextId.users.toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    database.users.push(user);
    nextId.users++;
    return user;
  },

  updateUser: (id, userData) => {
    const index = database.users.findIndex(user => user.id === id);
    if (index !== -1) {
      database.users[index] = {
        ...database.users[index],
        ...userData,
        updatedAt: new Date().toISOString()
      };
      return database.users[index];
    }
    return null;
  },

  deleteUser: (id) => {
    const index = database.users.findIndex(user => user.id === id);
    if (index !== -1) {
      database.users.splice(index, 1);
      return true;
    }
    return false;
  },

  // Assets
  findAsset: (id) => {
    return database.assets.find(asset => asset.id === id);
  },

  findAssets: (query = {}) => {
    let assets = database.assets;
    
    if (query.search) {
      const search = query.search.toLowerCase();
      assets = assets.filter(asset => 
        asset.name.toLowerCase().includes(search) || 
        asset.serialNumber.toLowerCase().includes(search)
      );
    }
    
    if (query.category) {
      assets = assets.filter(asset => asset.category === query.category);
    }
    
    if (query.status) {
      assets = assets.filter(asset => asset.status === query.status);
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: assets.slice(startIndex, endIndex),
      total: assets.length,
      page,
      limit,
      pages: Math.ceil(assets.length / limit)
    };
  },

  createAsset: (assetData) => {
    const asset = {
      id: nextId.assets.toString(),
      ...assetData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    database.assets.push(asset);
    nextId.assets++;
    return asset;
  },

  updateAsset: (id, assetData) => {
    const index = database.assets.findIndex(asset => asset.id === id);
    if (index !== -1) {
      database.assets[index] = {
        ...database.assets[index],
        ...assetData,
        updatedAt: new Date().toISOString()
      };
      return database.assets[index];
    }
    return null;
  },

  deleteAsset: (id) => {
    const index = database.assets.findIndex(asset => asset.id === id);
    if (index !== -1) {
      database.assets.splice(index, 1);
      return true;
    }
    return false;
  },

  getAssetStats: () => {
    const total = database.assets.length;
    const available = database.assets.filter(a => a.status === 'Available').length;
    const assigned = database.assets.filter(a => a.status === 'Assigned').length;
    const maintenance = database.assets.filter(a => a.status === 'Maintenance').length;
    
    return {
      total,
      available,
      assigned,
      maintenance
    };
  },

  // Dashboard stats
  getDashboardStats: () => {
    return {
      totalUsers: database.users.length,
      totalAssets: database.assets.length,
      activeUsers: database.users.filter(u => u.isActive).length,
      availableAssets: database.assets.filter(a => a.status === 'Available').length
    };
  }
};

module.exports = memoryDB;
