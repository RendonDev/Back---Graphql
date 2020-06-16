const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const usuario = process.env.MONGODB_USER || 'conciliarepusr';
const password = process.env.MONGODB_PASS || 'Lb16nJ5blK0E';
const host = process.env.MONGODB_HOST || '172.29.50.97';
const port = process.env.MONGODB_PORT || '27019';
const database = process.env.MONGODB_DATABASE || 'conciliarep';

//archivo de conexion
const conexion = () => MongoClient.connect(
    `mongodb://${usuario}:${password}@${host}:${port}/${database}`,
    { useNewUrlParser: true , useUnifiedTopology: true}
).then(client => client.db('conciliarep'));  

module.exports = {
    conexion,
    ObjectId
  };                            

