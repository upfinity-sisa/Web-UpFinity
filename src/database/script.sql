CREATE DATABASE upfinity;
USE upfinity;

-- Tabela TipoUsuario

CREATE TABLE TipoUsuario (
    idTipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(45)
);

-- Tabela TipoComponente

CREATE TABLE TipoComponente (
    idTipoComponente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    unidadeMedida VARCHAR(45) NOT NULL
);

-- Tabela Endereco

CREATE TABLE Endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    logradouro VARCHAR(45) NOT NULL,
    num CHAR(5) NOT NULL,
    complemento VARCHAR(100),
    bairro VARCHAR(45) NOT NULL,
    cidade VARCHAR(45) NOT NULL,
    UF CHAR(2) NOT NULL,
    CEP CHAR(8) NOT NULL
);

-- Tabela TipoAlerta

CREATE TABLE TipoAlerta (
    idTipoAlerta INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(45),
    nivel INT
);

-- Tabela Usuario

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    fkTipo INT NOT NULL,
    fkUsuario INT NOT NULL,
    nome VARCHAR(45) NOT NULL,
    CPF CHAR(11) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    FOREIGN KEY (fkTipo) REFERENCES TipoUsuario(idTipoUsuario),
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);

-- Tabela Empresa

CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45) NOT NULL,
    nomeFantasia VARCHAR(45),
    CNPJ CHAR(14) NOT NULL
);

-- Tabela Atm

CREATE TABLE Atm (
    idAtm INT PRIMARY KEY AUTO_INCREMENT,
    fkEmpresa INT NOT NULL,
    fkEndereco INT NOT NULL,
    numeroAtm INT NOT NULL,
    ip VARCHAR(45) NOT NULL,
    macAddress VARCHAR(45) NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    status INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
    FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco)
);

-- Tabela Componente

CREATE TABLE Componente (
    idComponente INT PRIMARY KEY AUTO_INCREMENT,
    fkAtm INT NOT NULL,
    fkTipoComponente INT NOT NULL,
    FOREIGN KEY (fkAtm) REFERENCES Atm(idAtm),
    FOREIGN KEY (fkTipoComponente) REFERENCES TipoComponente(idTipoComponente)
);

-- Tabela Captura

CREATE TABLE Captura (
    idCaptura INT PRIMARY KEY AUTO_INCREMENT,
    fkAtmComponente INT NOT NULL,
    valor DOUBLE,
    horario DATETIME,
    FOREIGN KEY (fkAtmComponente) REFERENCES Componente(idComponente)
);

-- Tabela Alerta

CREATE TABLE Alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    fkTipoAlerta INT NOT NULL,
    fkCaptura INT NOT NULL,
    FOREIGN KEY (fkTipoAlerta) REFERENCES TipoAlerta(idTipoAlerta),
    FOREIGN KEY (fkCaptura) REFERENCES Captura(idCaptura)
);

-- Tabela Parametro

CREATE TABLE Parametro (
    idParametro INT PRIMARY KEY AUTO_INCREMENT,
    fkTipoComponente INT NOT NULL,
    fkEmpresa INT NOT NULL,
    limiteMin DOUBLE,
    limiteMax DOUBLE,
    FOREIGN KEY (fkTipoComponente) REFERENCES TipoComponente(idTipoComponente),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela statusEtapas

CREATE TABLE statusEtapas (
    idStatusEtapas INT PRIMARY KEY AUTO_INCREMENT,
    fkEmpresa INT NOT NULL,
    fkUsuario INT NOT NULL,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

-- Tabela Planos

CREATE TABLE plano (
	idPlano INT PRIMARY KEY AUTO_INCREMENT,
    fkEmpresa INT NOT NULL,
    tipoPlano INT,
    valorPlano INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);