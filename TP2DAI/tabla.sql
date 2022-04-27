USE [TP2]
GO

/****** Object:  Table [dbo].[Personaje]    Script Date: 27/4/2022 09:24:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Personaje](
	[nombre] [varchar](50) NULL,
	[edad] [int] NULL,
	[peso] [int] NULL,
	[historia] [varchar](50) NULL,
	[imagen] [varchar](50) NULL
) ON [PRIMARY]
GO


