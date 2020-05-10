var express = require('express')
var router = express.Router()
var fs = require('fs');
const { sortFileArray, directoryToObj } = require('../helpers/fileHelper.js')
const { ROOT } = require('../config/config.js')

router.get('/fileName', (req,res) => {
    fs.readFile(req.query.path, (err,data) => {
        if (err) {
            throw err;
        }
        res.contentType("application/pdf");
        res.end(data, 'binary')
    })
})


router.get('/', async (req,res) => {

    var dir = ROOT

    directoryToObj(dir, function(err, data){
        if(err) {
            res.status(500).send("Error: path " + err.path + " not found")
        }
        else {
            res.send(sortFileArray(data))
        }
    });

    

})

module.exports = router;

