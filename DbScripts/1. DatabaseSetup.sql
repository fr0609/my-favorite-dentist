CREATE DATABASE [MyFavoriteDentist]

GO

USE [MyFavoriteDentist]

GO

CREATE TABLE [dbo].[Patient] (
	[PatientId]	INT IDENTITY(1, 1)	NOT NULL,
	[Name]		NVARCHAR(200)		NOT NULL,
	[LastName]	NVARCHAR(200)		NOT NULL,
	[Age]		INT					NOT NULL,
	[Phone]		VARCHAR(50)			NOT NULL,
	[Email]		VARCHAR(320)		NOT NULL UNIQUE,
	[LastVisit]	DATETIME			NOT NULL,
	[NextVisit]	DATETIME			NOT NULL,
	CONSTRAINT [PK_Patient] PRIMARY KEY CLUSTERED ([PatientId] ASC)
)

CREATE TABLE [dbo].[Treatment] (
	[TreatmentId]	INT IDENTITY(1, 1)	NOT NULL,
	[StartDate]		DATETIME			NOT NULL,
	[EndDate]		DATETIME			NOT NULL,
	[Price]			MONEY				NOT NULL,
	[Detail]		NVARCHAR(MAX)		NOT NULL,
	[PatientId]		INT					NOT NULL,
	CONSTRAINT [PK_Treatment] PRIMARY KEY CLUSTERED ([TreatmentId] ASC),
	CONSTRAINT [FK_Patient_Treatment] FOREIGN KEY (PatientId)     
    REFERENCES [dbo].[Patient] (PatientId)     
    ON DELETE CASCADE    
    ON UPDATE CASCADE 
)

--INSERT INTO [dbo].[Patient]
--VALUES ('Fabricio', 'Salazar', 25, '(506)88576838', 'fabri10.se@gmail.com', GETDATE(), GETDATE());

--INSERT INTO [dbo].[Treatment]
--VALUES (GETDATE(), GETDATE(), 5000, 'Testing2', 1);

--INSERT INTO [dbo].[Patient]
--VALUES ('Nelson', 'Salazar', 50, '(506)88165501', 'nelsar66@gmail.com', GETDATE(), GETDATE());

--INSERT INTO [dbo].[Treatment]
--VALUES (GETDATE(), GETDATE(), 5000, 'Testing3', 2);