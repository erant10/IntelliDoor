var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Admin' });
});

/* GET testQuery */
router.get('/testQuery', function(req, res, next) {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;

  // Create connection to database
    var config =
        {
            userName: 'intelidoor',
            password: 'IOT1234!@#$',
            server: 'intelidoor.database.windows.net',
            // If you are on Azure SQL Database, you need these next options.
            options: {encrypt: true, database: 'inteliDoorDB'}
        }
    var connection = new Connection(config);

    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function(err)
        {
            if (err)
            {
                console.log(err)
            }
            else
            {
                queryDatabase()
                res.send('done')
            }
        }
    );

    function queryDatabase()
    { console.log('Reading rows from the Table...');

        // Read all rows from table
        request = new Request(
            "SELECT * FROM inteliDoorDB.dbo.Product",
            function(err, rowCount, rows)
            {
                console.log(rowCount + ' row(s) returned');
                process.exit();
            }
        );

        request.on('row', function(columns) {
            columns.forEach(function(column) {
                console.log("%s\t%s", column.metadata.colName, column.value);
            });
        });
        connection.execSql(request);
    }
});

/* GET testInsert*/
router.get('/testInsert', function(req,res,next) {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request
    var TYPES = require('tedious').TYPES;

    var config = {
        userName: 'intelidoor',
        password: 'IOT1234!@#$',
        server: 'intelidoor.database.windows.net',
        // If you are on Azure SQL Database, you need these next options.
        options: {encrypt: true, database: 'inteliDoorDB'}
    };
    var connection = new Connection(config);
    connection.on('debug', function(eror) { console.log('debug:', eror);});
    connection.on('connect', function (err) {
        // If no error, then good to proceed.
        console.log("Connected");
        request = new Request("INSERT inteliDoorDB.dbo.Product (Name, ProductNumber, StandardCost, ListPrice, SellStartDate) OUTPUT INSERTED.Name VALUES (@Name, @Number, @Cost, @Price, CURRENT_TIMESTAMP);", function (err) {
            if (err) {
                console.log(err);
            }
        });
        request.addParameter('Name', TYPES.NVarChar, 'SQL Server Express 2014');
        request.addParameter('Number', TYPES.NVarChar, 'SQLEXPRESS2014');
        request.addParameter('Cost', TYPES.Int, 11);
        request.addParameter('Price', TYPES.Int, 11);
        request.on('row', function (columns) {
            columns.forEach(function (column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    console.log("Product id of inserted item is " + column.value);
                }
            });
        });
        connection.execSql(request);
        console.log("Error: ", err);
        res.send('done');

    });


});

module.exports = router;
