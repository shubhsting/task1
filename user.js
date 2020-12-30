const axios = require("axios");


//sample api request to add an element
axios.post('http://localhost:3000/add', {
    body: {
        key: 12345,
        time: 100
    }
})
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })


//sample api request to get a key from keyname specified in url in place of key-name
axios.get('http://localhost:3000/read/key-name', {
})
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })


//sample api request to delete a key from keyname specified in url in place of key-name
axios.delete('http://localhost:3000/delete/key-name', {

})
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })