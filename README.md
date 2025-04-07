COMP3200 3rd Year Project: Learn Access
======================================

***An interactive E-Learning platform designed to teach developers how to program accessible web pages in React, This application could also be used in a more general manor in order to provide learning resources for any React concept, skill or topic.***

**Author:** *Tyler Ward*

#Prerequisits:#
1. Node js version 22.+
2. Web browser such as Chrome or Firefox
3. If not using the existing database, create a PostgreSQL database through the Neon Cloud platform and copy the connection details into both .env files, if not keep the existing information. Then run the provided SQL script in the learn-access-db project

#To run application:#
1. Add .env files with required information
2. Run npm install in both the learn-access-api and leanr-access-app projects
3. Run npx playwright install in the learn-access-api project
4. Start learn-access-api using command "node server.js"
5. Build the learn-access-app project by running "npm run build"
6. Start the app server by running "npm run start"
