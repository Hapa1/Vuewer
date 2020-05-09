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

    /*
    const getFiles = async (dir) => {
        try {
            var list = await readFile(dir);
        } catch (err) {
            console.log('Error', err);
        }
        return list
    }
    
    const getStat = async (dir) => {
        try {
            var stat = await readStat(dir);
        } catch (err) {
            console.log('Error', err);
        }
        return stat
    }

     

    async function getFiles(dir) {
        const subdirs = await readdir(dir);
        fileTree = []
        subdirs.forEach(async (file) => {
            filePath = dir + '/' + file;
            directory = (await stat(filePath)).isDirectory()
            if (directory){
                fileTree.push(
                    {
                        file,
                        filePath
                    }
                ) 
            }
           else {
                fileTree.push(
                    {
                        filePath,
                        file
                    }
                )
            }
        })
        return await fileTree
        
        const files = await Promise.all(subdirs.map(async (subdir) => {
            const res = resolve(dir, subdir);
            

            
            return (await stat(res)).isDirectory() ? getFiles(res) : 
            {
                res,
                name:"Ryan"
            };
        }));
        return files 
        
    }
    
    var x = (await getFiles('C:/Users/Steve/Desktop/Code/Vuewer/server/static/'))
    console.log(x)
    res.send(x)
    */
    /*
    const walk = async (dir) => {
        results = []
        var list = await getFiles(dir)
        list.forEach( async (file) => {
            file = path.join(dir,file);
            var stat = await getStat(file);
            if(stat && stat.isDirectory()){  
                results = results.concat(walk(file))
                console.log(results)
            } else { 
                results.push(file);
            }
        })
        return results
    }
    */
    

    //var y = await walk('C:/Users/Steve/Desktop/Code/Vuewer/server/static/')
    //console.log(y)

    //var y = await getStat('C:/Users/Steve/Desktop/Code/Vuewer/server/static/Resume.pdf')
    //console.log(x,y)
    

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
    /*
    var path = 'C:/Users/Steve/Desktop/Code/Vuewer/server/static/' + ''

    
    var all = []
    const getTree = (path) => {
        var files = []
        fs.readdir(path, (err,data) => {

            data.forEach((file) => {
                
                var fileName = file;
                var filePath = path + '/' + file;
    
                //var isFile = fs.statSync(filePath).isFile();
                //var isDirectory = fs.statSync(filePath).isDirectory();

                fs.stat(filePath, (err, stat) => {
                    if (err) {
                        console.log(err)
                    }
                    if (stat.isDirectory()) {
                        getTree(filePath)
                    }
                    else {
                        files.push({
                            fileName
                        })
                        
                    }
                })
                /*
                var fileType = "Unknown";
    
                //if(isFile){
                //    fileType = "file"
                //}
                if(isDirectory){
                    fileType = "directory"
                    getTree(filePath)
                }   
    
                files.push({
                    fileName,
                    fileType,
                    filePath
                })
                
            
            })

        })
    }
    

    function getTree(dir, done) {
        let results = [];

        fs.readdir(dir, function(err, list) {
            if (err) return done(err);

            var pending = list.length;

            if (!pending) return done(null, results);

            list.forEach(function(file){
                file = path.resolve(dir, file);

                fs.stat(file, function(err, stat){
                    // If directory, execute a recursive call
                    if (stat && stat.isDirectory()) {
                        // Add directory to array [comment if you need to remove the directories from the array]
                        results.push({
                            file,
                            type: "Directory",
                        });

                        getTree(file, function(err, res){
                            results = results.concat(res);
                            if (!--pending) done(null, results);
                        });
                    } else {
                        results.push({
                            file,
                            type: "File"
                        });

                        if (!--pending) done(null, results);
                    }
                });
            });
        });
    };
    
    getTree('C:/Users/Steve/Desktop/Code/Vuewer/server/static/', function(err,data){
        if(err){
            throw err;
        }
        res.send(data)
    });
    */
})

module.exports = router;

