let fs = require("fs");

//to find path of destination file/database so that it may be edited/read
let path = require("path");

//to find size of json files
var sizeof = require('object-sizeof')

function createItem(req, res) {
    //req body is accompanied by kay value pair data 
    let data = req.body;

    //find url of file where the database is there
    let url = path.join(__dirname, "..", "Models", "dataModel.json");

    //read and parse file to edit and add new key value pairs 
    let file = fs.readFileSync(url);
    file = JSON.parse(file);

    //iterate over keys of received new key value pairs
    for (key in data) {
        //check size of key/json object 32 chars in key and 16 kb for value
        if (key.length > 32 || sizeof(data[key]) > 16 * 1024) {
            res.json({
                message: "Size of key/value not in range",
            })
            return;
        }
        //if key is already present
        else if (file[key]) {
            //if key is already present and expired ,update it
            if (file[key].time && file[key].time < Date.now()) {
                file[key] = data[key];
                if (file[key].time) {
                    file[key].time = Number(file[key].time) * 1000 + Date.now();
                }
            }
            else {
                res.json({
                    message: "Key is already present"
                })
                return;
            }
        }
        else {
            file[key] = data[key];
            //if time is associated with input key convert that into millisec and attach with date.now
            if (file[key].time) {
                file[key].time = Number(file[key].time) * 1000 + Date.now();
            }
        }
    }


    //before writing back the code check if the target file doesnot exceed 1 gb
    if (sizeof(file) > 1 * 1024 * 1024 * 1024) {
        res.json({
            message: "Size of file exceeds 1 GB!!Kindly delete some data"
        })
        return;
    }

    //stringify the updated database and write it again in target file
    file = JSON.stringify(file);
    fs.writeFileSync(url, file);
    //return success response 
    res.json({
        message: "Done data added",
        data: data
    })
}

function readItem(req, res) {

    //extract key from parameter of request
    let { key } = req.params;

    //find database path
    let url = path.join(__dirname, "..", "Models", "dataModel.json");

    //read and parse file
    let file = fs.readFileSync(url);
    file = JSON.parse(file);

    //find if key is present
    let matched = file[key];

    //return responses for either cases
    if (matched) {

        //if the specified time of that key is elapsed i.e key is not valid
        let exptime = matched.time;

        //if current time is greater than expire time than key is not valid
        if (exptime && exptime < Date.now()) {
            delete file[key];
            file = JSON.stringify(file);
            fs.writeFileSync(url, file);
            res.json({
                message: "Key expired"
            })
        }
        //if exptime is not attached with key it is directly returned
        else {
            res.json({
                message: "found key",
                data: matched
            })
        }
    }

    else {
        res.json({
            message: "Key Not found!!!"
        })
    }

}


function deleteItem(req, res) {

    //get key from req parameter
    let { key } = req.params;

    //find url of database
    let url = path.join(__dirname, "..", "Models", "dataModel.json");

    //read and parse file
    let file = fs.readFileSync(url);
    file = JSON.parse(file);


    //check if key is present or not and implement either cases
    if (file[key]) {
        //if key is present check expiry time
        let exptime = file[key].time;

        //if expiry time is less than current time than key is expired
        if (exptime && exptime < Date.now()) {
            delete file[key];
            res.json({
                message: "Key Expired"
            })
        }
        else {
            delete file[key];
            //write back modified database to original destination
            file = JSON.stringify(file);
            fs.writeFileSync(url, file);
            //response if key is found and deleted 
            res.json({
                message: "Key Deleted",
                data: file
            })
        }
    }
    else {

        file = JSON.stringify(file);
        fs.writeFileSync(url, file);
        res.json({
            message: "Key Not found",

        })
    }
}


module.exports.createItem = createItem;
module.exports.readItem = readItem;
module.exports.deleteItem = deleteItem;