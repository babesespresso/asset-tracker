const { Pool } = require('pg');

let pool;

const connectDB = async () => {
  if (pool) return pool;

  // Use Supabase direct connection string format
  const connectionString = `postgresql://postgres.${process.env.SUPABASE_PROJECT_REF}:${process.env.SUPABASE_DB_PASSWORD}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`;

  pool = new Pool({
    connectionString: process.env.DATABASE_URL || connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await pool.query('SELECT NOW()');
    console.log('PostgreSQL Connected to Supabase');
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    // Don't exit process, just log the error
    return null;
  }
};

module.exports = connectDB;
