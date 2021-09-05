var mysql = require('mysql2')

var serverInfo = require('./servers/gecor4935')
//var serverInfo = require('./servers/gs4935')

var pool = mysql.createPool({
    host: serverInfo.host,
    user: serverInfo.user,
    password: serverInfo.pass,
    database: serverInfo.database,
    multipleStatements: true,
})

pool.getConnection(function(error){
    if(error) throw error
})

pool.on('release', function(connection){
    console.log('Connection %d release', connection.threadId)
})

module.exports = pool.promise()