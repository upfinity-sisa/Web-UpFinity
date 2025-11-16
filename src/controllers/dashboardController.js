var dashboardModel = require("../models/dashboardModel");

function ultimasCapturas(req, res) {
  const idAtm = req.params.idAtm;

  dashboardModel
    .ultimasCapturas(idAtm)
    .then((resultado) => {
      console.log(`[Controller] resultado das ultimas capturas: ${resultado}`)
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(200).json([]);
      }
    })
    .catch((erro) => {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as últimas capturas: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function ultimasCapturasRede(req, res) {
  const idAtm = req.params.idAtm;

  dashboardModel
    .ultimasCapturasRede(idAtm)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(200).json([]);
      }
    })
    .catch((erro) => {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar as últimas capturas de rede: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function pegarParametros(req, res) {
  const idEmpresa = req.params.idEmpresa;

  dashboardModel
    .pegarParametros(idEmpresa)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(200).json([]);
      }
    })
    .catch((erro) => {
      console.log(erro);
      console.log("Houve um erro ao buscar os parametros: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function pegarDowntime(req, res) {
  const idAtm = req.params.idAtm;

  const dataFim = new Date();
  const dataInicio = new Date(dataFim.getTime() - 7 * 24 * 60 * 60 * 1000);

  function formatarData(data) {
    return data.toISOString().slice(0, 19).replace("T", " ");
  }

  dashboardModel
    .pegarDowntime(idAtm, formatarData(dataFim), formatarData(dataInicio))
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(200).json([]);
      }
    })
    .catch((erro) => {
      console.log(erro);
      console.log("Houve um erro ao buscar o downtime: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function pegarUltimosHorariosCaptura(req, res) {
  const idAtm = req.params.idAtm;

  dashboardModel
    .pegarUltimosHorariosCaptura(idAtm)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(200).json([]);
      }
    })
    .catch((erro) => {
      console.log(erro);
      console.log(
        "Houve um erro ao buscar os ultimos horarios de captura: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function carregarAlertas(req, res) {
  const idAtm = req.params.idAtm;

  dashboardModel
    .carregarAlertas(idAtm)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(200).json([]);
      }
    })
    .catch((erro) => {
      console.log(erro);
      console.log("Houve um erro ao carregar os alertas: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  ultimasCapturas,
  ultimasCapturasRede,
  pegarParametros,
  pegarDowntime,
  pegarUltimosHorariosCaptura,
  carregarAlertas,
};
