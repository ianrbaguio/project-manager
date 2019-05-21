USE ProjectManager;

-- References: https://stackoverflow.com/questions/19905900/mysql-transaction-roll-back-on-any-exception
-- CREATION OF AddProject PROCEDURE
DROP PROCEDURE AddProject;
DELIMITER $$
CREATE PROCEDURE AddProject(IN $UserID INT,
							IN $ProjectName VARCHAR(75),
                            IN $StartDate DATE,
                            IN $TargetEndDate DATE)
BEGIN

	DECLARE $ReturnCode INT DEFAULT 1;
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
    
    IF $UserID IS NULL OR $UserID = 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'AddProject - Required Parameter: $UserID';
	ELSEIF $ProjectName IS NULL THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'AddProject - Required Parameter: $ProjectName';
	ELSEIF $StartDate IS NULL THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'AddProject - Required Parameter: $StartDate';
	ELSEIF $TargetEndDate IS NULL THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'AddProject - Required Parameter: $TargetEndDate';
	ELSE
		BEGIN
			INSERT INTO Projects(UserID, ProjectName, StartDate, TargetEndDate)
            VALUES($UserID, $ProjectName, $StartDate, $TargetEndDate);
            
            IF `_rollback` THEN
				BEGIN
					ROLLBACK;
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'AddProject - INSERT Error';
                END;
			ELSE
				BEGIN
					COMMIT;
                    SET $ReturnCode = 0;
                END;
			END IF;
        END;
	END IF;
    SELECT $ReturnCode;
END $$

-- CREATION OF AddTask PROCEDURE
DROP PROCEDURE AddTask;
DELIMITER $$
CREATE PROCEDURE AddTask($ProjectID INT,
						 $TaskName VARCHAR(75),
                         $StartDate DATE,
                         $TargetEndDate DATE)
BEGIN

	DECLARE $ReturnCode INT DEFAULT 1;
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
    
    IF $ProjectID IS NULL OR $ProjectID = 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'AddTask - Required Parameter: $ProjectID';
	ELSEIF $TaskName IS NULL THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'AddTask - Required Parameter: $TaskName';
	ELSEIF $StartDate IS NULL THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'AddTask - Required Parameter: $StartDate';
	ELSEIF $TargetEndDate IS NULL THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'AddTask - Required Parameter: $TargetEndDate';
	ELSE
		BEGIN
			INSERT INTO Tasks(ProjectID, TaskName, StartDate, TargetEndDate)
            VALUES($ProjectID, $TaskName, $StartDate, $TargetEndDate);
            
            IF `_rollback` THEN
				BEGIN
					ROLLBACK;
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'AddTask - INSERT Error';
                END;
			ELSE
				BEGIN
					COMMIT;
                    SET $ReturnCode = 0;
                END;
            END IF;
        
        END;
    END IF;
    
	SELECT $ReturnCode;
END $$

-- CREATION OF GetProjects Procedure
DROP PROCEDURE GetProjects;
DELIMITER $$
CREATE PROCEDURE GetProjects($UserID INT)
BEGIN
	DECLARE $ReturnCode INT DEFAULT 1;
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
    
    IF $UserID IS NULL OR $UserID = 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'GetProjects - Required Parameter: $ReturnCode';
	ELSE
		BEGIN
			SELECT ProjectID, 
				   UserID, 
                   ProjectName, 
                   StartDate, 
                   TargetEndDate, 
                   ActualEndDate 
			FROM Projects
            WHERE UserID = $UserID; 
            
            IF `_rollback` THEN
				BEGIN
					ROLLBACK;
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'GetProjects - SELECT Error';
                END;
			ELSE
				BEGIN
					COMMIT;
                    SET $ReturnCode = 0;
                END;
			END IF;
        END;
    END IF;
END $$


DELIMITER ;


