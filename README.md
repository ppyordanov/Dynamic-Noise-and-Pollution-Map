Dynamic-Noise-and-Pollution-Map
===============================

/DEVELOPMENT BRANCH/

Fourth year University of Glasgow Computer Science project

Project Supervisors: 

  Dr. Iadh Ounis - Iadh.Ounis@glasgow.ac.uk
  
  Mr. Richard Mccreadie - Richard.Mccreadie@glasgow.ac.uk
  
  
A dynamically generated University of Glasgow noise and pollution campus map via the innovative Smart Citizen Kit developed in Barcelona, Spain by FabLab.


/CONFIGURATION INSTRUCTIONS/

 - install JDK 1.6+
 - install Apache Maven
 - clone this repository
 - import project directory in a supported IDE
 - DB setup (the project is currently running using a NoSQL database) - MongoDB

    - install MongoDB
    - start ```>mongo``` and ```>mongod``` instances from command line
        - create database ```use ugmap```
    - check validity ```db```


 - open a terminal window from the root directory (containing pom.xml)

    - ```mvn validate``` validate project
    - ```mvn clean compile``` compile source code
    - ```mvn jetty:run``` run the mobile webapp on a localhost server via the jetty servlet
  
  _The app is running on port 8080 and can be accessed at: http://localhost:8080/_
