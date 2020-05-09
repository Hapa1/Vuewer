var fs = require('fs');
const path = require('path');



const sortDirectoryObj = (dirObj) => {
    dirObj.sort( (a,b) => {
        console.log("Obj",a)
        if(a.type == 'folder'){
            sortDirectoryObj(a.children)
        }
        var aVal = (a.type == 'file' ? 0 : 1)
        var bVal = (b.type == 'file' ? 0 : 1)
        
        if (a.type < b.type){
            return -1
        } 
        if (a.type > b.type){
            return 1
        } 

        return 0
    })
    dirObj.sort((a,b) => {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
        return -1;
        }
        if (nameA > nameB) {
        return 1;
        }
    
        // names must be equal
        return 0;
    })
    return dirObj
}

const sort = (dirObj) => {
    dirObj.forEach((file) => {
        if(file.type == 'folder'){
            sortDirectoryObj()
            sort(file.children)
        }
    })
}

const directoryToObj = function(dir, done) {
    var results = [];

    fs.readdir(dir, function(err, list) {
        if (err) {
            return done(err);
        }
        var pending = list.length;

        if (!pending) { //return empty string if directory is empty
            return done(null, []); 
        }

        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    directoryToObj(file, function(err, res) {
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
                    if (path.extname(file)=='.pdf') {
                        results.push({
                            type: 'file',
                            path: dir + '/' + path.basename(file),
                            name: path.basename(file)
                        });
                    }
                    if (!--pending) {
                        done(null, results);
                    }
                }
            });
        });
    });
}


    
module.exports = { directoryToObj, sortDirectoryObj, sort }