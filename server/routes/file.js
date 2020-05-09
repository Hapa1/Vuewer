var express = require('express')
var router = express.Router()
var fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { resolve } = require('path');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

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

    var diretoryTreeToObj = function(dir, done) {
        var results = [];
    
        fs.readdir(dir, function(err, list) {
            if (err)
                return done(err);
    
            var pending = list.length;
            console.log("Pending",pending)
            if (!pending)
                return done(null, {name: path.basename(dir), type: 'folder', children: results});
    
            list.forEach(function(file) {
                file = path.resolve(dir, file);
                fs.stat(file, function(err, stat) {
                    if (stat && stat.isDirectory()) {
                        diretoryTreeToObj(file, function(err, res) {
                            results.push({
                                itemKey: Math.floor(Math.random() * 100),
                                name: path.basename(file),
                                path: dir + path.basename(file),
                                type: 'folder',
                                children: res
                            });
                            if (!--pending)
                                done(null, results);
                        });
                    }
                    else {
                        results.push({
                            itemKey: Math.floor(Math.random() * 100),
                            type: 'file',
                            path: dir + '/' + path.basename(file),
                            name: path.basename(file)
                        });
                        if (!--pending)
                            done(null, results);
                    }
                });
            });
        });
    };

    diretoryTreeToObj(dir, function(err, data){
        if(err)
            console.error(err);

        res.send(data);
    });
})

module.exports = router;

