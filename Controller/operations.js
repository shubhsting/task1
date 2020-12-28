let fs = require("fs");

let path = require("path");

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
        //check size of key/json object 
        if (key.length > 32 || sizeof(data[key] > 1040)) {
            res.json({
                message: "Size of key/value not in range",
            })
            return;
        }
        else
            file[key] = data[key];
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
        res.json({
            message: "found key",
            data: matched
        })
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