# blood-donor-db-system

Try it out at : http://blood-donor-system.herokuapp.com/ (Please allow up to 30s load, as Heroku free tier shuts down apps after period of inactivity) 

Requires node and yarn installed. 

Setup:
- run the following commands:

      npm i

      cd client

      yarn install

And you'd need to set the environment variable DATABASE_URL to a PostgreSQL database, initialized with database creation script in root folder (databaseScript.sql)

To run locally (from root directory):
- run the following commands:

      cd client

      yarn build

      cd ..

      npm start 
      
Upon launching the app, you will be asked to sign in based on a user type.
Here are sample id and passwords for each:

(id password)
            
Nurse:      200      a   

Admin:      1231238  dawdawdawda

Lab:        LAB54321 dkfiuj9ie4ju39



