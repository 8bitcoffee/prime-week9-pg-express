const pg = require('pg');

// pool represents the connection to the db
let pool = new pg.Pool({
    host: 'localhost', // db is on computer
    port: 5432, // default for postgres
    // ! This is the property you will change the most
    database: 'taaffeite', // name of the database
})

module.exports = pool;