var dashboardModel = require("../models/dashboardModel")

function ultimasCapturas(req, res) {
  let idAtm = req.params.idAtm;

  dashboardModel.ultimasCapturas(idAtm).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send('ultimasCapturas: nenhum resultado encontrado!')
    }
  }).catch((erro) => {
    console.log(erro);
    console.log("Houve um erro ao buscar as últimas capturas: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  })
}

function pegarParametros(req, res) {
  let idEmpresa = req.params.idEmpresa;

  dashboardModel.pegarParametros(idEmpresa).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send('pegarParametros: nenhum resultado encontrado!')
    }
  }).catch((erro) => {
    console.log(erro);
    console.log("Houve um erro ao buscar as últimas capturas: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  })
}

function pegarDowntime(req, res) {
  let idAtm = req.params.idAtm;

  const dataFim = new Date();
  const dataInicio = new Date(dataFim.getTime() - (7 * 24 * 60 * 60 * 1000))

  function formatarData(data) {
    return data.toISOString().slice(0, 19).replace('T', ' ');
  }

  dashboardModel.pegarDowntime(idAtm, formatarData(dataFim), formatarData(dataInicio)).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send('pegarDowntime: nenhum resultado encontrado!')
    }
  }).catch((erro) => {
    console.log(erro);
    console.log("Houve um erro ao buscar as últimas capturas: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  })
}


module.exports = {
  ultimasCapturas,
  pegarParametros,
  pegarDowntime
}