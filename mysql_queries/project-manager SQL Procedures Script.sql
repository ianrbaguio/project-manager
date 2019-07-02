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


-- CREATION OF RemoveProject PROCEDURE
DROP PROCEDURE RemoveProject;
DELIMITER $$
CREATE PROCEDURE RemoveProject($ProjectID INT,
							   $UserID INT)
BEGIN
	DECLARE $ReturnCode INT DEFAULT 1;
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTIOn SET `_rollback` = 1;
    
    IF $ProjectID IS NULL OR $ProjectID = 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'RemoveProject - Required Parameter: $ProjectID';
	ELSEIF $UserID IS NULL OR $UserID = 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'RemoveProject - Required Parameter: $UserID';
	ELSE
		BEGIN
			DELETE FROM Projects
            WHERE ProjectID = $ProjectID AND UserID = $UserID;
            
            IF `_rollback` THEN
				BEGIN
					ROLLBACK;
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'RemoveProject - DELETE Error';
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
                   DATE_FORMAT(StartDate, '%M %d, %Y') AS StartDate, 
                   DATE_FORMAT(TargetEndDate, '%M %d, %Y') AS TargetEndDate,  
                   IFNULL(DATE_FORMAT(ActualEndDate, '%M %d, %Y'), '') AS ActualEndDate
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

-- CREATION OF GetTasks PROCEDURE
DROP PROCEDURE GetTasks;
DELIMITER $$
CREATE PROCEDURE GetTasks($ProjectID INT)
BEGIN
	DECLARE $ReturnCode INT DEFAULT 1;
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
    
    
    IF $ProjectID IS NULL OR $ProjectID = 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'GetTasks - Required Parameter: $ProjectID';
	ELSE
		BEGIN
			SELECT TaskID,
				   ProjectID,
                   TaskName,
                   DATE_FORMAT(StartDate, '%M %d, %Y') AS StartDate,
                   DATE_FORMAT(TargetEndDate, '%M %d, %Y') AS TargetEndDate,
                   IFNULL(DATE_FORMAT(ActualEndDate, '%M %d, %Y'), '') AS ActualEndDate
			FROM Tasks
            WHERE ProjectID = $ProjectID;
            
            IF `_rollback` THEN
				BEGIN
					ROLLBACK;
					SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'GetTasks - SELECT Error';
                END;
			ELSE
				BEGIN
					COMMIT;
                    SET $ReturnCode = 0;
                END;
			END IF;
        END;
    END IF;
END $$;

-- CREATION OF GetProject Procedure
DROP PROCEDURE GetProject;
DELIMITER $$
CREATE PROCEDURE GetProject($ProjectID INT,
							$UserID INT)
BEGIN
	DECLARE $ReturnCode INT DEFAULT 1;
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
    
    IF $ProjectID IS NULL OR $ProjectID = 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'GetProject - Required Parameter: $ProjectID';
	ELSEIF $UserID IS NULL OR $UserID = 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'GetProject - Required Parameter: $UserID';
	ELSE
		BEGIN
			SELECT ProjectID,
				ProjectName,
                StartDate,
                TargetEndDate,
                ActualEndDate
			FROM Projects
            WHERE ProjectID = $ProjectID AND UserID = $UserID;
            
            IF `_rollback` THEN
				BEGIN
					ROLLBACK;
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'GetProject - SELECT Error';
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

-- CREATION OF CompleteTask Procedure
DROP PROCEDURE CompleteTask;
DELIMITER $$
CREATE PROCEDURE CompleteTask($TaskID INT)
BEGIN
	DECLARE $ReturnCode INT DEFAULT 1;
    DECLARE $TotalProjectTaskCount INT;
    DECLARE $CurrentCompleteTaskCount INT;
    DECLARE $ProjectID INT;
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
    
    IF $TaskID IS NULL OR $TaskID = 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'CompleteTask - Required Parameter: $TaskID';
    ELSE
		BEGIN
			-- SET ActualEndDate on the complete task
			UPDATE Tasks
            SET ActualEndDate = curdate()
            WHERE TaskID = $TaskID;
            
            -- Get Tasks ProjectID
            SELECT ProjectID INTO $ProjectID
            FROM Tasks
            WHERE TaskID = $TaskID;
            
            -- Get the total number of project's tasks
            SELECT COUNT(TaskID) INTO $TotalProjectTaskCount 
            FROM Projects
            INNER JOIN Tasks ON Projects.ProjectID = Tasks.ProjectID
            WHERE Projects.ProjectID = $ProjectID;
            
            -- Get the total number of project's completed tasks
            SELECT COUNT(TaskID) INTO $CurrentCompleteTaskCount 
            FROM Projects
            INNER JOIN Tasks ON Projects.ProjectID = Tasks.ProjectID
            WHERE Projects.ProjectID = $ProjectID AND Tasks.ActualEndDate IS NOT NULL;
            
            INSERT INTO Debugging(Result)
            VALUES(CONCAT('TotalProjectTaskCount: ', $TotalProjectTaskCount));
            
            INSERT INTO Debugging(Result)
            VALUES(CONCAT('CurrentCompleteTaskCount: ', $CurrentCompleteTaskCount));
            
            -- all tasks completed, set project's actual end date
            IF $CurrentCompleteTaskCount = $TotalProjectTaskCount THEN
				UPDATE Projects
                SET ActualEndDate = curdate()
                WHERE ProjectID = $ProjectID;
            END IF;
            
            IF `_rollback` THEN
				BEGIN
					ROLLBACK;
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'CompleteTask - Update Error';
                END;
            ELSE
				BEGIN
					COMMIT;
                    SET $ReturnCode = 0;
                END;
			END IF;
        END;
    END IF;
    
END $$;

DELIMITER ;
