const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase');
const { createTables } = require('./createTables');

const setupSupabase = async () => {
  try {
    console.log('Setting up Supabase tables and data...');
    
    // First, create tables
    await createTables();

    // Check if admin user exists
    const { data: existingAdmin } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@example.com')
      .single();

    if (!existingAdmin) {
      // Create admin user if doesn't exist
      const hashedPassword = await bcrypt.hash('password123', 12);
      
      const { error: userError } = await supabase
        .from('users')
        .insert([
          {
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin',
            department: 'IT',
            is_active: true,
            last_login: new Date().toISOString()
          },
          {
            name: 'John Manager',
            email: 'john@example.com',
            password: hashedPassword,
            role: 'manager',
            department: 'Operations',
            is_active: true,
            last_login: new Date(Date.now() - 86400000).toISOString()
          },
          {
            name: 'Jane User',
            email: 'jane@example.com',
            password: hashedPassword,
            role: 'user',
            department: 'Sales',
            is_active: true,
            last_login: new Date(Date.now() - 172800000).toISOString()
          }
        ]);

      if (userError) {
        console.log('Users might already exist or error creating users:', userError);
      } else {
        console.log('Sample users created successfully');
      }
    }

    // Check if assets exist
    const { data: existingAssets } = await supabase
      .from('assets')
      .select('*')
      .limit(1);

    if (!existingAssets || existingAssets.length === 0) {
      const { error: assetError } = await supabase
        .from('assets')
        .insert([
          {
            name: 'MacBook Pro 16"',
            description: 'Latest MacBook Pro with M3 chip',
            category: 'Laptop',
            status: 'Available',
            serial_number: 'MBP16-001',
            purchase_price: 2999.99,
            purchase_date: '2024-01-15',
            warranty_date: '2027-01-15',
            assigned_to: null,
            location: 'Warehouse',
            condition: 'Excellent'
          },
          {
            name: 'Dell Monitor 27"',
            description: '4K UltraSharp monitor',
            category: 'Monitor',
            status: 'Assigned',
            serial_number: 'DELL27-002',
            purchase_price: 599.99,
            purchase_date: '2024-02-10',
            warranty_date: '2027-02-10',
            assigned_to: null,
            location: 'John Manager Office',
            condition: 'Excellent'
          },
          {
            name: 'iPhone 15 Pro',
            description: 'Latest iPhone model',
            category: 'Phone',
            status: 'Maintenance',
            serial_number: 'IP15-003',
            purchase_price: 1199.99,
            purchase_date: '2024-03-05',
            warranty_date: '2025-03-05',
            assigned_to: null,
            location: 'IT Department',
            condition: 'Good'
          }
        ]);

      if (assetError) {
        console.log('Assets might already exist or error creating assets:', assetError);
      } else {
        console.log('Sample assets created successfully');
      }
    }

    console.log('Supabase setup completed');
  } catch (error) {
    console.log('Error during Supabase setup:', error);
  }
};

module.exports = { setupSupabase };
