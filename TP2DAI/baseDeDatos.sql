USE [master]
GO
/****** Object:  Database [TP2]    Script Date: 3/6/2022 09:59:15 ******/
CREATE DATABASE [TP2]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TP2', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\TP2.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TP2_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\TP2_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [TP2] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TP2].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TP2] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TP2] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TP2] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TP2] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TP2] SET ARITHABORT OFF 
GO
ALTER DATABASE [TP2] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TP2] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TP2] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TP2] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TP2] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TP2] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TP2] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TP2] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TP2] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TP2] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TP2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TP2] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TP2] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TP2] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TP2] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TP2] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TP2] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TP2] SET RECOVERY FULL 
GO
ALTER DATABASE [TP2] SET  MULTI_USER 
GO
ALTER DATABASE [TP2] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TP2] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TP2] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TP2] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TP2] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'TP2', N'ON'
GO
ALTER DATABASE [TP2] SET QUERY_STORE = OFF
GO
USE [TP2]
GO
/****** Object:  User [alumno]    Script Date: 3/6/2022 09:59:15 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Pelicula]    Script Date: 3/6/2022 09:59:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pelicula](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[imagen] [varchar](50) NULL,
	[titulo] [varchar](50) NULL,
	[fechaCreacion] [date] NULL,
	[calificacion] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personaje]    Script Date: 3/6/2022 09:59:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personaje](
	[nombre] [varchar](50) NULL,
	[edad] [int] NULL,
	[peso] [int] NULL,
	[historia] [varchar](50) NULL,
	[imagen] [varchar](50) NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Personaje] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonajeXPelicula]    Script Date: 3/6/2022 09:59:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonajeXPelicula](
	[IdPeliculasAsociadas] [int] NOT NULL,
	[IdPersonajeAsociado] [int] NOT NULL,
	[IdPersonajePelicula] [int] NOT NULL,
 CONSTRAINT [PK_PersonajeXPelicula] PRIMARY KEY CLUSTERED 
(
	[IdPersonajePelicula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Pelicula] ON 

INSERT [dbo].[Pelicula] ([Id], [imagen], [titulo], [fechaCreacion], [calificacion]) VALUES (1, N'fwefwe', N'Titanic', CAST(N'2020-05-03' AS Date), 5)
INSERT [dbo].[Pelicula] ([Id], [imagen], [titulo], [fechaCreacion], [calificacion]) VALUES (4, N'fwefw', N'Rapidos', CAST(N'2005-06-02' AS Date), 2)
SET IDENTITY_INSERT [dbo].[Pelicula] OFF
GO
SET IDENTITY_INSERT [dbo].[Personaje] ON 

INSERT [dbo].[Personaje] ([nombre], [edad], [peso], [historia], [imagen], [id]) VALUES (N'Lamas', 33, 44, N'fw', N'fwewe', 1)
INSERT [dbo].[Personaje] ([nombre], [edad], [peso], [historia], [imagen], [id]) VALUES (N'Clara', 12, 66, N'r3wr3', N'fwefwe', 2)
INSERT [dbo].[Personaje] ([nombre], [edad], [peso], [historia], [imagen], [id]) VALUES (N'Eze', 14324, 653426, N'r3fswfdswwr3', N'fwefwe', 4)
SET IDENTITY_INSERT [dbo].[Personaje] OFF
GO
INSERT [dbo].[PersonajeXPelicula] ([IdPeliculasAsociadas], [IdPersonajeAsociado], [IdPersonajePelicula]) VALUES (1, 1, 1)
INSERT [dbo].[PersonajeXPelicula] ([IdPeliculasAsociadas], [IdPersonajeAsociado], [IdPersonajePelicula]) VALUES (4, 1, 2)
INSERT [dbo].[PersonajeXPelicula] ([IdPeliculasAsociadas], [IdPersonajeAsociado], [IdPersonajePelicula]) VALUES (4, 2, 3)
GO
ALTER TABLE [dbo].[PersonajeXPelicula]  WITH CHECK ADD  CONSTRAINT [FK_PersonajeXPelicula_Personaje] FOREIGN KEY([IdPersonajeAsociado])
REFERENCES [dbo].[Personaje] ([id])
GO
ALTER TABLE [dbo].[PersonajeXPelicula] CHECK CONSTRAINT [FK_PersonajeXPelicula_Personaje]
GO
USE [master]
GO
ALTER DATABASE [TP2] SET  READ_WRITE 
GO
