var express = require('express')
var router = express.Router()
var fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { resolve } = require('path');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const fileHelper = require('../helpers/fileHelper.js')

router.get('/fileName', (req,res) => {
    console.log("path",req.query.path)
    fs.readFile(req.query.path, (err,data) => {
        if (err) {
            throw err;
        }
        res.contentType("application/pdf");
        res.end(data, 'binary')
    })
})


router.get('/', async (req,res) => {
    const readFile = promisify(fs.readdir) //convert callback function to promise based using Node's promisify
    const readStat = promisify(fs.stat)

    var dir = 'C:/Users/Steve/Desktop/Code/Vuewer/server/static/'

    fileHelper.directoryToObj(dir, function(err, data){
        if(err)
            console.error(err);
        res.send(fileHelper.sortDirectoryObj(data))
        //res.send(data);
    });

    

})

module.exports = router;

