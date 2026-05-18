const { Client } = require('pg');
(async () => {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'DB_adimin',
    password: 'DB_adimin123',
    database: 'learning_platform'
  });
  try {
    await client.connect();
    const res1 = await client.query("SELECT * FROM pg_sequences WHERE schemaname='public' ORDER BY sequencename;");
    console.log('seqs:', res1.rows);
    const res2 = await client.query('SELECT id, name FROM "Categories" ORDER BY id;');
    console.log('cats:', res2.rows);
  } catch (err) {
    console.error('ERR', err.message);
  } finally {
    await client.end();
  }
})();
