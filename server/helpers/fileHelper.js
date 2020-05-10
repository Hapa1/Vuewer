var fs = require('fs');
const path = require('path');



const sortFileArray = (dirObj) => { //readdir returns files out of order so we need to sort the directory
    dirObj.sort( (a,b) => {

        var aVal = (a.type == 'file' ? 0 : 1) //begin sorting by file type
        var bVal = (b.type == 'file' ? 0 : 1)
        
        if (aVal < bVal){
            return -1
        } 
        if (aVal > bVal){
            return 1
        } 

        if (aVal == bVal){ //if file types are the same, compare name
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            return 0;
        }
    })

    for (let i = dirObj.length-1; i >= 0; i--){ //iterate through the list of files in reverse to find folders and call sortDirectoryObj on each
        if(dirObj[i-1]){
        
           if (dirObj[i].type == 'file') break;
           sortFileArray(dirObj[i].children)
        }
    }

    return dirObj
}

const directoryToObj = function(dir, done) { //convert a directory to a JS object, taken from Stack Overflow
    
    var results = [];

    fs.readdir(dir, function(err, list) { //return list of all files/folders in current directory
        if (err) {
            return done(err);
        }

        var pending = list.length; 
        console.log(pending)
        if (!pending) { //return empty string if directory is empty
            return done(null, []); 
        }

        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) { //callback function to get type of file
                if (stat && stat.isDirectory()) {
                    directoryToObj(file, function(err, res) { //recursively call to get add children files 
                        results.push({ //push a folder object
                            name: path.basename(file),
                            path: dir + path.basename(file),
                            type: 'folder',
                            children: res
                        });
                        if (pending === 1){ //
                            done(null,results);
                        } else {
                            --pending;
                        }
                    });
                }
                else {
                    if (path.extname(file)=='.pdf') { //only read .pdf files
                        results.push({ //push a file object
                            type: 'file',
                            path: dir + '/' + path.basename(file),
                            name: path.basename(file)
                        });
                    }
                    if (pending === 1){
                        done(null,results);
                    } else {
                        --pending;
                    }
                }
            });
        });
    });
}


    
module.exports = { directoryToObj, sortFileArray}