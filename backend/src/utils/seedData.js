const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Asset = require('../models/Asset');
const Setting = require('../models/Setting');

dotenv.config({ path: './backend/.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Asset.deleteMany();
    await Setting.deleteMany();

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@assettracker.com',
      password: await bcrypt.hash('admin123', 12),
      role: 'admin',
      department: 'IT',
      permissions: ['assets.read', 'assets.write', 'assets.delete', 'users.read', 'users.write', 'users.delete', 'reports.read', 'reports.write', 'settings.read', 'settings.write']
    });

    const managerUser = await User.create({
      name: 'Manager User',
      email: 'manager@assettracker.com',
      password: await bcrypt.hash('manager123', 12),
      role: 'manager',
      department: 'Operations',
      permissions: ['assets.read', 'assets.write', 'users.read', 'users.write', 'reports.read', 'reports.write']
    });

    const regularUser = await User.create({
      name: 'Regular User',
      email: 'user@assettracker.com',
      password: await bcrypt.hash('user123', 12),
      role: 'user',
      department: 'Sales',
      permissions: ['assets.read', 'reports.read']
    });

    const assets = [
      {
        name: 'MacBook Pro 16"',
        type: 'laptop',
        category: 'IT Equipment',
        description: 'High-performance laptop for development',
        serialNumber: 'MBP2024001',
        model: 'MacBook Pro 16-inch 2023',
        manufacturer: 'Apple',
        purchaseDate: new Date('2024-01-15'),
        purchasePrice: 2499,
        currentValue: 2200,
        warrantyExpiry: new Date('2027-01-15'),
        status: 'active',
        condition: 'excellent',
        location: 'Office Floor 3',
        assignedTo: adminUser._id,
        assignedDate: new Date('2024-01-20'),
        department: 'IT',
        tags: ['laptop', 'development', 'apple'],
        createdBy: adminUser._id
      },
      {
        name: 'Dell XPS 15',
        type: 'laptop',
        category: 'IT Equipment',
        description: 'Windows laptop for general use',
        serialNumber: 'DELL2024002',
        model: 'XPS 15 9520',
        manufacturer: 'Dell',
        purchaseDate: new Date('2024-02-10'),
        purchasePrice: 1899,
        currentValue: 1700,
        warrantyExpiry: new Date('2026-02-10'),
        status: 'active',
        condition: 'good',
        location: 'Office Floor 2',
        assignedTo: managerUser._id,
        assignedDate: new Date('2024-02-15'),
        department: 'Operations',
        tags: ['laptop', 'windows', 'dell'],
        createdBy: adminUser._id
      },
      {
        name: 'iPhone 15 Pro',
        type: 'mobile',
        category: 'IT Equipment',
        description: 'Company mobile phone',
        serialNumber: 'IPHONE2024003',
        model: 'iPhone 15 Pro 256GB',
        manufacturer: 'Apple',
        purchaseDate: new Date('2024-03-05'),
        purchasePrice: 1199,
        currentValue: 1000,
        warrantyExpiry: new Date('2026-03-05'),
        status: 'active',
        condition: 'excellent',
        location: 'Office Floor 1',
        assignedTo: regularUser._id,
        assignedDate: new Date('2024-03-10'),
        department: 'Sales',
        tags: ['mobile', 'iphone', 'phone'],
        createdBy: adminUser._id
      },
      {
        name: 'HP LaserJet Pro',
        type: 'printer',
        category: 'Office Equipment',
        description: 'Network printer for office use',
        serialNumber: 'HP2024004',
        model: 'LaserJet Pro M404dn',
        manufacturer: 'HP',
        purchaseDate: new Date('2024-01-20'),
        purchasePrice: 399,
        currentValue: 350,
        warrantyExpiry: new Date('2026-01-20'),
        status: 'active',
        condition: 'good',
        location: 'Office Floor 2',
        department: 'Operations',
        tags: ['printer', 'hp', 'network'],
        createdBy: adminUser._id
      },
      {
        name: 'Dell Monitor 27"',
        type: 'hardware',
        category: 'IT Equipment',
        description: '27-inch 4K monitor',
        serialNumber: 'DELL2024005',
        model: 'UltraSharp U2720Q',
        manufacturer: 'Dell',
        purchaseDate: new Date('2024-02-25'),
        purchasePrice: 599,
        currentValue: 550,
        warrantyExpiry: new Date('2027-02-25'),
        status: 'active',
        condition: 'excellent',
        location: 'Office Floor 3',
        assignedTo: adminUser._id,
        assignedDate: new Date('2024-02-28'),
        department: 'IT',
        tags: ['monitor', '4k', 'dell'],
        createdBy: adminUser._id
      }
    ];

    await Asset.insertMany(assets);

    const settings = [
      {
        key: 'company_name',
        value: 'Asset Tracker Inc.',
        type: 'string',
        description: 'Company name displayed in the application',
        category: 'general',
        isPublic: true,
        updatedBy: adminUser._id
      },
      {
        key: 'default_page_size',
        value: 10,
        type: 'number',
        description: 'Default number of items per page',
        category: 'general',
        isPublic: true,
        updatedBy: adminUser._id
      },
      {
        key: 'enable_notifications',
        value: true,
        type: 'boolean',
        description: 'Enable email notifications',
        category: 'notifications',
        isPublic: false,
        updatedBy: adminUser._id
      },
      {
        key: 'maintenance_reminder_days',
        value: 30,
        type: 'number',
        description: 'Days before maintenance due date to send reminder',
        category: 'notifications',
        isPublic: false,
        updatedBy: adminUser._id
      }
    ];

    await Setting.insertMany(settings);

    console.log('Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error
