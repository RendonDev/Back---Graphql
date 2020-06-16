require('dotenv').config()
const pgPromise = require('pg-promise');

var host     = process.env.POSTGRES_HOST || '172.29.50.97';
var port     = process.env.POSTGRES_PORT || 5440;
var database = process.env.POSTGRES_DB       || 'conciliacion';
var user     = process.env.POSTGRES_USER     || 'conciliacionusr';
var password = process.env.POSTGRES_PASSWORD || 'S5mj317MmI$g';

const pgp = pgPromise({});

const config = {    
    host: host,
    port: port,
    database: database,
    user: user,
    password: password
}

const db = pgp(config);

exports.db = db;
