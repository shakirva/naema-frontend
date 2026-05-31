const { Pool } = require('pg');
const p = new Pool({ connectionString: 'postgres://medusa:medusapassword@localhost:5432/medusa-v2' });
p.query("UPDATE stock_location SET name='Kuwait Warehouse' WHERE name='European Warehouse' RETURNING *")
  .then(r => {
    console.log('Updated Warehouse:', r.rows);
    return p.query("UPDATE stock_location_address SET city='Kuwait City', country_code='KW' WHERE id IN (SELECT address_id FROM stock_location WHERE name='Kuwait Warehouse') RETURNING *");
  })
  .then(r => {
    console.log('Updated Address:', r.rows);
    p.end();
  })
  .catch(e => {
    console.error(e);
    p.end();
  });
