const supabase = require('../config/supabase');

const getAssets = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      category, 
      status, 
      condition,
      assigned_to 
    } = req.query;
    
    let query = supabase
      .from('assets')
      .select(`
        id, name, description, category, status, serial_number, 
        purchase_price, purchase_date, warranty_date, location, 
        condition, created_at, updated_at,
        assigned_user:users!assigned_to(id, name, email)
      `, { count: 'exact' });

    // Apply filters
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,serial_number.ilike.%${search}%`);
    }
    if (category) {
      query = query.eq('category', category);
    }
    if (status) {
      query = query.eq('status', status);
    }
    if (condition) {
      query = query.eq('condition', condition);
    }
    if (assigned_to) {
      query = query.eq('assigned_to', assigned_to);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    // Order by created_at desc
    query = query.order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      data: {
        assets: data,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const getAsset = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('assets')
      .select(`
        *, 
        assigned_user:users!assigned_to(id, name, email, department)
      `)
      .eq('id', req.params.id)
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const createAsset = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      status = 'Available',
      serial_number,
      purchase_price,
      purchase_date,
      warranty_date,
      location,
      condition = 'Excellent'
    } = req.body;

    // Check if serial number already exists
    if (serial_number) {
      const { data: existingAsset } = await supabase
        .from('assets')
        .select('id')
        .eq('serial_number', serial_number)
        .single();

      if (existingAsset) {
        return res.status(400).json({
          success: false,
          error: 'Asset with this serial number already exists'
        });
      }
    }

    // Create asset
    const { data, error } = await supabase
      .from('assets')
      .insert([{
        name,
        description,
        category,
        status,
        serial_number,
        purchase_price: purchase_price ? parseFloat(purchase_price) : null,
        purchase_date,
        warranty_date,
        location,
        condition
      }])
      .select(`
        *, 
        assigned_user:users!assigned_to(id, name, email, department)
      `)
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const updateAsset = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      status,
      serial_number,
      purchase_price,
      purchase_date,
      warranty_date,
      location,
      condition
    } = req.body;

    // Check if serial number already exists for another asset
    if (serial_number) {
      const { data: existingAsset } = await supabase
        .from('assets')
        .select('id')
        .eq('serial_number', serial_number)
        .neq('id', req.params.id)
        .single();

      if (existingAsset) {
        return res.status(400).json({
          success: false,
          error: 'Asset with this serial number already exists'
        });
      }
    }

    // Update asset
    const updateData = {};
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (category) updateData.category = category;
    if (status) updateData.status = status;
    if (serial_number !== undefined) updateData.serial_number = serial_number;
    if (purchase_price !== undefined) updateData.purchase_price = purchase_price ? parseFloat(purchase_price) : null;
    if (purchase_date !== undefined) updateData.purchase_date = purchase_date;
    if (warranty_date !== undefined) updateData.warranty_date = warranty_date;
    if (location !== undefined) updateData.location = location;
    if (condition) updateData.condition = condition;
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('assets')
      .update(updateData)
      .eq('id', req.params.id)
      .select(`
        *, 
        assigned_user:users!assigned_to(id, name, email, department)
      `)
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found or could not be updated'
      });
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const deleteAsset = async (req, res) => {
  try {
    // Check if asset exists
    const { data: asset } = await supabase
      .from('assets')
      .select('id')
      .eq('id', req.params.id)
      .single();

    if (!asset) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    // Delete asset
    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const assignAsset = async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if asset exists
    const { data: asset } = await supabase
      .from('assets')
      .select('id, status')
      .eq('id', req.params.id)
      .single();

    if (!asset) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    // Check if user exists
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Update asset assignment
    const { data, error } = await supabase
      .from('assets')
      .update({
        assigned_to: userId,
        status: 'Assigned',
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .select(`
        *, 
        assigned_user:users!assigned_to(id, name, email, department)
      `)
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const unassignAsset = async (req, res) => {
  try {
    // Check if asset exists
    const { data: asset } = await supabase
      .from('assets')
      .select('id')
      .eq('id', req.params.id)
      .single();

    if (!asset) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    // Update asset assignment
    const { data, error } = await supabase
      .from('assets')
      .update({
        assigned_to: null,
        status: 'Available',
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .select(`
        *, 
        assigned_user:users!assigned_to(id, name, email, department)
      `)
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const getAssetStats = async (req, res) => {
  try {
    // Get total count
    const { count: totalAssets } = await supabase
      .from('assets')
      .select('*', { count: 'exact', head: true });

    // Get status breakdown
    const { data: statusData } = await supabase
      .from('assets')
      .select('status')
      .not('status', 'is', null);

    // Get category breakdown
    const { data: categoryData } = await supabase
      .from('assets')
      .select('category')
      .not('category', 'is', null);

    // Process the data
    const statusStats = {};
    const categoryStats = {};

    statusData?.forEach(asset => {
      statusStats[asset.status] = (statusStats[asset.status] || 0) + 1;
    });

    categoryData?.forEach(asset => {
      categoryStats[asset.category] = (categoryStats[asset.category] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: {
        total: totalAssets || 0,
        byStatus: statusStats,
        byCategory: categoryStats
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const uploadImages = async (req, res) => {
  try {
    const files = req.files;
    
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded'
      });
    }

    // For now, just return the file paths
    const filePaths = files.map(file => `/uploads/${file.filename}`);

    res.status(200).json({
      success: true,
      data: {
        files: filePaths
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
  assignAsset,
  unassignAsset,
  getAssetStats,
  uploadImages
};
