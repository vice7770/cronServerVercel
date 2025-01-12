const initializeDb = async (pool) => {
    pool.on('connect', () => {
        console.log('Connected to PostgreSQL');
    });

    pool.on('error', (err) => {
        console.error('Error connecting to PostgreSQL', err);
    });
    
    return pool;
};

export default initializeDb;