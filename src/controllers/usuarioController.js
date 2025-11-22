var usuarioModel = require("../models/usuarioModel")

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          res.json({
            idUsuario: resultadoAutenticar[0].idUsuario,
            email: resultadoAutenticar[0].email,
            nome: resultadoAutenticar[0].nome,
            CPF: resultadoAutenticar[0].CPF,
            fkEmpresa: resultadoAutenticar[0].fkEmpresa,
            fkTipoUsuario: resultadoAutenticar[0].fkTipoUsuario,
          });

          usuarioModel.registrarLogin(resultadoAutenticar[0].idUsuario, email, 1);

          console.log(resultadoAutenticar[0]);
        } else if (resultadoAutenticar.length == 0) {
          usuarioModel.registrarLogin(null, email, 0);
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrarUsuario(req, res) {

  console.log("requisição recebida no controller")

  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var cpf = req.body.cpfServer;
  var fkEmpresa = req.body.fkEmpresaServer;
  var cnpj = req.body.cnpjServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (cpf == undefined) {
    res.status(400).send("Seu CPF está undefined!")
  } else {



    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrarUsuario(nome, email, senha, cnpj, cpf, fkEmpresa)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function alterarSenha(req, res) {
  var idFuncionario = req.body.idUsuario;
  var senha = req.body.senhaServer;

  if (idFuncionario == undefined) {
    res.status(400).send("O id do Funcionario está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("A senha está undefined!")
  } else {
    usuarioModel.alterarSenha(idFuncionario, fkEmpresa, senha)
      .then((resultado) => {
        res.status(201).json(resultado);
      }).catch((erro) => {
        console.log("Erro ao alterar a senha:", erro);
        res.status(500).json(erro);
      });
  }

}

function verificarEmail(req, res) {
  var email = req.params.email;

  usuarioModel.verificarEmail(email)
    .then((resultado) => {
      console.log("resultado da controller:")
      console.log(resultado)

      res.json({
        idUsuario: resultado[0].idUsuario,
        email: resultado[0].email
      });

      console.log(resultado[0])
    }).catch((erro) => {
      console.log(erro)
      console.log("Erro ao verificar o email:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
  autenticar,
  cadastrarUsuario,
  alterarSenha,
  verificarEmail,
};