var alertasModel = require("../models/alertasModel")


function ObterKPI_1(req, res) {
  let fkEmpresa = req.params.idEmpresa;

  alertasModel.ObterKPI_1(fkEmpresa)
    .then((resultado) => {
      console.log("resultado da controller:")
      console.log(resultado)

      res.json({
        TotalAlerta: resultado[0].TotalAlerta
      });

      console.log(resultado[0])
    }).catch((erro) => {
      console.log(erro)
      console.log("Erro ao obter KPI 1:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function ObterKPI_1_qtdCritico(req, res) {
  let fkEmpresa = req.params.idEmpresa;

  alertasModel.ObterKPI_1_qtdCritico(fkEmpresa)
    .then((resultado) => {
      console.log("resultado da controller:")
      console.log(resultado)

      res.json({
        TotalAlertaCritico: resultado[0].TotalAlertaCritico
      });

      console.log(resultado[0])
    }).catch((erro) => {
      console.log(erro)
      console.log("Erro ao obter KPI 1 critico:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function ObterKPI_1_qtdModerado(req, res) {
  let fkEmpresa = req.params.idEmpresa;

  alertasModel.ObterKPI_1_qtdModerado(fkEmpresa)
    .then((resultado) => {
      console.log("resultado da controller:")
      console.log(resultado)

      res.json({
        TotalAlertaModerado: resultado[0].TotalAlertaModerado
      });

      console.log(resultado[0])
    }).catch((erro) => {
      console.log(erro)
      console.log("Erro ao obter KPI 1 moderado:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}


function ObterKPI_2(req, res) {
  let fkEmpresa = req.params.idEmpresa;

  alertasModel.ObterKPI_2(fkEmpresa)
    .then((resultado) => {
      console.log("resultado da controller:")
      console.log(resultado)
      if (resultado.length > 0) {
        res.json({
          Numeracao: resultado[0].Numeracao
        });
      } else {
        res.status(200).json({});
      }


      console.log(resultado[0])
    }).catch((erro) => {
      console.log(erro)
      console.log("Erro ao obter KPI 2:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function ObterKPI_2_qtdCritico(req, res) {
  let fkEmpresa = req.params.idEmpresa;

  alertasModel.ObterKPI_2_qtdCritico(fkEmpresa)
    .then((resultado) => {
      console.log("resultado da controller:")
      console.log(resultado)

      res.json({
        TotalAlertaCritico: resultado[0].TotalAlertaCritico
      });

      console.log(resultado[0])
    }).catch((erro) => {
      console.log(erro)
      console.log("Erro ao obter KPI 2 critico:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function ObterKPI_2_qtdModerado(req, res) {
  let fkEmpresa = req.params.idEmpresa;

  alertasModel.ObterKPI_2_qtdModerado(fkEmpresa)
    .then((resultado) => {
      console.log("resultado da controller:")
      console.log(resultado)

      res.json({
        TotalAlertaModerado: resultado[0].TotalAlertaModerado
      });

      console.log(resultado[0])
    }).catch((erro) => {
      console.log(erro)
      console.log("Erro ao obter KPI 2 moderado:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}


function ObterKPI_3(req, res) {
  let fkEmpresa = req.params.idEmpresa;

  alertasModel.ObterKPI_3(fkEmpresa)
    .then((resultado) => {
      console.log("resultado da controller:")
      console.log(resultado)

      res.json({
        TotalResolvido: resultado[0].TotalResolvido
      });

      console.log(resultado[0])
    }).catch((erro) => {
      console.log(erro)
      console.log("Erro ao obter KPI 3:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function ObterKPI_3_qtdCritico(req, res) {
  let fkEmpresa = req.params.idEmpresa;

  alertasModel.ObterKPI_3_qtdCritico(fkEmpresa)
    .then((resultado) => {
      console.log("resultado da controller:")
      console.log(resultado)

      res.json({
        TotalResolvidoCritico: resultado[0].TotalResolvidoCritico
      });

      console.log(resultado[0])
    }).catch((erro) => {
      console.log(erro)
      console.log("Erro ao obter KPI 3 critico:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function ObterKPI_3_qtdModerado(req, res) {
  let fkEmpresa = req.params.idEmpresa;

  alertasModel.ObterKPI_3_qtdModerado(fkEmpresa)
    .then((resultado) => {
      console.log("resultado da controller:")
      console.log(resultado)

      res.json({
        TotalResolvidoModerado: resultado[0].TotalResolvidoModerado
      });

      console.log(resultado[0])
    }).catch((erro) => {
      console.log(erro)
      console.log("Erro ao obter KPI 3 critico:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function Grafico_Bar(req, res) {
  let fkEmpresa = req.params.idEmpresa;

  alertasModel.Grafico_Bar(fkEmpresa)
    .then((resultado) => {
      console.log("resultado da controller:")
      console.log(resultado)

      const obterDados = (nomeComponente) => {
        const item = resultado.find(r => r.NomeComponente === nomeComponente);

        return item || { TotalAlertas: 0, QtdPendentes: 0, QtdResolvidos: 0 };
      }

      const cpu = obterDados('CPU');
      const ram = obterDados('Memória RAM');
      const disco = obterDados('Disco');
      const rede = obterDados('Placa de rede');

      res.json({
        TotalAlertaCPU: cpu.TotalAlertas,
        PendentesAlertaCPU: cpu.QtdPendentes,
        ResolvidosAlertaCPU: cpu.QtdResolvidos,

        TotalAlertaRAM: ram.TotalAlertas,
        PendentesAlertaRAM: ram.QtdPendentes,
        ResolvidosAlertaRAM: ram.QtdResolvidos,

        TotalAlertaDisco: disco.TotalAlertas,
        PendentesAlertaDisco: disco.QtdPendentes,
        ResolvidosAlertaDisco: disco.QtdResolvidos,

        TotalAlertaRede: rede.TotalAlertas,
        PendentesAlertaRede: rede.QtdPendentes,
        ResolvidosAlertaRede: rede.QtdResolvidos,
      });

      console.log(resultado[0])
    }).catch((erro) => {
      console.log(erro)
      console.log("Erro ao obter gráfico de linhas:", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  ObterKPI_1,
  ObterKPI_1_qtdCritico,
  ObterKPI_1_qtdModerado,
  ObterKPI_2,
  ObterKPI_2_qtdCritico,
  ObterKPI_2_qtdModerado,
  ObterKPI_3,
  ObterKPI_3_qtdCritico,
  ObterKPI_3_qtdModerado,
  Grafico_Bar
}