const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: 'jazzy_ajax',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
});

pool.on('connect', () => {
    console.log('Postgres connected!');
});

pool.on('error', (error) => {
    console.log('Postgres error!', error);
});

// I'm just testing stuff. Pay no attention...
// pool.options.database = 'testy_McTest';

// console.log(pool.options);

module.exports = pool;