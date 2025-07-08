const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_2ehByYpfvsQ1@ep-billowing-unit-a89jhzom-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'
});
module.exports = pool; 