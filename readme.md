Overview of this project

===========================================================

This project follows MVC architecture -

The database could be found in Models folder  
The controller functions(add ,delete and update) could be found in Controller section 

Packages/Libraries used
1) express-to run this project on individual system by creating an independent server at localhost:3000
2) fs-to read and manupulate database
3) object-sizeof - to ensure the size of databse and individual key objects and prevent database to exceed  memory limits 

===========================================================

To run this project on any local machine-\
1)download this code.\
2)run npm install to automatically install all libraries.\
3)npm start to start the application on your local computer.

===========================================================\

Steps to interact after running this application-

1) Create any js file (A sample file have been created in form of user.js).File can be created at any location.
2) Once application is running at localhost.We just need to send API requests to interact with application.
Sample API requests are already explained in that file.Once we run this file in parallel to application,data is automatically saved into database.

IMPORTANT:
1)While sending request to add a key-object pair ,if time to live need to be explained ,kindly add that in seconds so that database may adjust according to that.

===========================================================\

Algorithm of this code\
ADD 
1) Get data from req body \
1.1)if(key is present and not expired) return message key is already present\
else update key

READ
1) get key from parameters\
1.1)if key is present and not expired ,update it.\
 else delete it and show key is expired.

DELETE

1)if(key is present) delete it\
  else key is not present

===========================================================


