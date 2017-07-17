USE [MyFavoriteDentist]

GO

INSERT INTO [MyFavoriteDentist].[dbo].[Treatment] VALUES (GETDATE(), GETDATE(), 5000, 'Surgery1', 1);
INSERT INTO [MyFavoriteDentist].[dbo].[Treatment] VALUES (GETDATE(), GETDATE(), 10000, 'Surgery2', 1);
INSERT INTO [MyFavoriteDentist].[dbo].[Treatment] VALUES (GETDATE(), GETDATE(), 8000, 'Surgery1', 2);
INSERT INTO [MyFavoriteDentist].[dbo].[Treatment] VALUES (GETDATE(), GETDATE(), 7000, 'Surgery2', 2);
INSERT INTO [MyFavoriteDentist].[dbo].[Treatment] VALUES (GETDATE(), GETDATE(), 9000, 'Surgery1', 3);
INSERT INTO [MyFavoriteDentist].[dbo].[Treatment] VALUES (GETDATE(), GETDATE(), 2000, 'Surgery2', 3);