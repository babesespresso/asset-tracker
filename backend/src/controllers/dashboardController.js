const supabase = require('../config/supabase');

const getStats = async (req, res) => {
  try {
    // Get user stats
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    const { count: activeUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    // Get asset stats
    const { count: totalAssets } = await supabase
      .from('assets')
      .select('*', { count: 'exact', head: true });

    const { count: assignedAssets } = await supabase
      .from('assets')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Assigned');

    const { count: availableAssets } = await supabase
      .from('assets')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Available');

    const { count: maintenanceAssets } = await supabase
      .from('assets')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Maintenance');

    // Get recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { count: recentUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString());

    // Get recent assets (last 7 days)
    const { count: recentAssets } = await supabase
      .from('assets')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString());

    res.status(200).json({
      success: true,
      data: {
        users: {
          total: totalUsers || 0,
          active: activeUsers || 0,
          recent: recentUsers || 0
        },
        assets: {
          total: totalAssets || 0,
          assigned: assignedAssets || 0,
          available: availableAssets || 0,
          maintenance: maintenanceAssets || 0,
          recent: recentAssets || 0
        }
      }
    });
  } catch (error) {
    console.log('Dashboard stats error:', error);
    // Return default stats if tables don't exist yet
    res.status(200).json({
      success: true,
      data: {
        users: {
          total: 0,
          active: 0,
          recent: 0
        },
        assets: {
          total: 0,
          assigned: 0,
          available: 0,
          maintenance: 0,
          recent: 0
        }
      }
    });
  }
};

module.exports = {
  getStats
};
