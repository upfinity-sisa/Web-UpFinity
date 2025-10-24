var database = require("../database/config");

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha,
  );
  var instrucaoSql = `
        SELECT idUsuario, nome, email, fkEmpresa, fkTipoUsuario, CPF FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarUsuario(nome, email, senha, cnpj, cpf, fkEmpresa) {

  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    email,
    senha,
    fkEmpresa,
    cpf,
  );

  cnpj = cnpj.replace(".", "").replace(".", "").replace(".", "").replace("/", "").replace("-", "");

  cpf = cpf.replace(".", "").replace(".", "").replace("-", "");


  var selectSql = `
  SELECT idEmpresa FROM Empresa WHERE cnpj = '${cnpj}' LIMIT 1;`;

  console.log("Executando o select SQL: \n" + selectSql);

  return database.executar(selectSql).then((resultado) => {
    console.log("SELECT:" , resultado);
    if (resultado.length > 0) {
      var fkEmpresa = resultado[0].idEmpresa;

      var instrucaoSql = `
        INSERT INTO Usuario (nome, email, senha, cpf ,fkEmpresa, fkTipoUsuario) VALUES ('${nome}','${email}', '${senha}', '${cpf}', '${fkEmpresa}', 1);
    `;
      console.log("Executando a instrução SQL: \n" + instrucaoSql);




      return database.executar(instrucaoSql);

    }
  });
}

module.exports = {
  autenticar,
  cadastrarUsuario,
};
