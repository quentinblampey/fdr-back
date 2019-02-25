const config = require('config');
const app = require('./app');
const server = require('./server').Server(app);
const connection = require('./db').Connection();

const connectionInfo = config.get('db');

connection.open(connectionInfo).catch((err) => { console.log(err); });
let exec = require('child_process').exec;
let command = 'mongoimport --db api --collection questions --file questionsPrenomSport.json --jsonArray';
exec(command);
server.start();
