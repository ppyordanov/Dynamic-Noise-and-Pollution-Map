-- using SQL-92 standard , valid for: MySQL / SQL Server / Oracle / MS Access

-- validated by: http://developer.mimer.com/validator/parser92

-- DROP TABLE DEVICE;
-- DROP TABLE DATA_READING;
-- DROP TABLE ROUTE;
-- DROP TABLE SYS_USER;


-- decimal has been used in order to store exact numeric data

CREATE TABLE DEVICE(

  deviceID INT AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL, -- variance, better than CHAR
  description VARCHAR(150), -- great variance
  kitVersion DECIMAL(2,1), -- 1 digit before the decimal, 1 after
  macAddress CHAR(12) NOT NULL, -- values do not vary, fixed length

  PRIMARY KEY (deviceID)

);

CREATE TABLE ROUTE(


  routeID INT AUTO_INCREMENT,
  deviceID INT,

  PRIMARY KEY(routeID),

  CONSTRAINT fk_route_device FOREIGN KEY (deviceID)
    REFERENCES DEVICE (deviceID)
    ON DELETE CASCADE


);

CREATE TABLE DATA_READING(

  readingID INT AUTO_INCREMENT,
  deviceID INT,
  routeID INT,

  timestamp TIMESTAMP NOT NULL,
  latitude DECIMAL(9,6) NOT NULL, -- best for storing coordinate bounds /3 numbers before decimal point, 6 after/
  longitude DECIMAL(9,6) NOT NULL,
  noise DECIMAL(10,1), -- can be null if server requests are not successful
  co DECIMAL(10,1),
  no2 DECIMAL(10,1),
  battery DECIMAL(5,2), -- 0-100% 2 digits after decimal point captures sensor accuracy

  PRIMARY KEY(readingID),

  CONSTRAINT fk_device FOREIGN KEY (deviceID)
    REFERENCES DEVICE (deviceID)
    ON DELETE CASCADE,

  CONSTRAINT fk_route FOREIGN KEY (routeID)
    REFERENCES ROUTE (routeID)
    ON DELETE CASCADE

);


-- CREATE TABLE SYS_USER();
