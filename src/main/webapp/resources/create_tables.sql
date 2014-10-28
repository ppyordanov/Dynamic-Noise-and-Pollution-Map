-- using SQL-92 standard , valid for: MySQL / SQL Server / Oracle / MS Access

-- validated by: http://developer.mimer.com/validator/parser92

--DROP TABLE DEVICE;
--DROP TABLE DATA_READING;
--DROP TABLE ROUTE;
--DROP TABLE SYS_USER;


-- decimal has been used in order to store exact numeric data

CREATE TABLE DEVICE(

  deviceID INT NOT NULL,
  title VARCHAR(100) NOT NULL, -- variance, better than CHAR
  description VARCHAR(250), -- great variance
  kit_version DECIMAL(2,1), -- 1 digit before the decimal, 1 after
  mac_address CHAR(12) NOT NULL, -- values do not vary, fixed length

  PRIMARY KEY (deviceID)

);

CREATE TABLE DATA_READING(

  readingID INT NOT NULL,
  deviceID INT,
  routeID INT,

  timestamp TIMESTAMP NOT NULL,
  latitude DECIMAL(9,6) NOT NULL, -- best for storing coordinate bounds /3 numbers before decimal point, 6 after/
  longitude DECIMAL(9,6) NOT NULL,
  noise DECIMAL(10,1), -- can be null if server requiests are not successful
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

CREATE TABLE ROUTE(

  routeID INT NOT NULL,

  PRIMARY KEY(routeID)

);


--CREATE TABLE SYS_USER();
