CREATE DATABASE ProjectManager;

USE ProjectManager;

-- Creation of Users Table
CREATE TABLE Users(
	UserID INT AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Email VARCHAR(75) NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    PRIMARY KEY(UserID)
);

INSERT INTO Users(Username, Password, Email, FirstName, LastName)
VALUES('admin1', 'admin123', 'admin1@fake.com', 'Admin', ''),
	  ('ibaguio1', 'iTsuna10', 'Ronanzter@yahoo.com', 'Ian Rey', 'Baguio'),
      ('jdoe1', 'Test123', 'jdoe1@fake.com', 'John', 'Doe');
      
-- Creation of Project Table
CREATE TABLE Projects(
	ProjectID INT AUTO_INCREMENT,
    UserID INT NOT NULL,
    ProjectName VARCHAR(75) NOT NULL,
    StartDate DATE NOT NULL,
    TargetEndDate DATE NOT NULL,
    ActualEndDate DATE NULL,
    PRIMARY KEY(ProjectID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Creation of Tasks Table
CREATE TABLE Tasks(
	TaskID INT AUTO_INCREMENT,
    ProjectID INT NOT NULL,
    TaskName VARCHAR(75) NOT NULL,
    StartDate DATE NOT NULL,
    TargetEndDate DATE NOT NULL,
    ActualEndDate DATE NULL,
    PRIMARY KEY(TaskID),
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID)
);

-- Creation of Debugging Table
-- Use for debugging stored procedures
CREATE TABLE Debugging(
	DebugID INT AUTO_INCREMENT,
    Result VARCHAR(250),
    PRIMARY KEY(DebugID)
);