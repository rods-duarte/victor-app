import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const db = new Pool({
    connectionString: `${process.env.DATABASE_URL}${process.env.DATABASE_NAME}`
});

db.query('SELECT NOW()', (err, res) => {
    res ? console.log('Database connected') : console.log(err);
})

export default db;