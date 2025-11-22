// var ambiente_processo = 'producao';
var ambiente_processo = "desenvolvimento";

var caminho_env = ambiente_processo === "producao" ? ".env" : ".env.dev";

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var empresaRouter = require("./src/routes/empresa");
var gestaoRouter = require("./src/routes/gestaoUsuarios");
var gestaoATMRouter = require("./src/routes/gestaoATM");
var dashboardRouter = require("./src/routes/dashboardRoutes");
var alertasRouter = require("./src/routes/alertasRoutes");
var gestaoAcessoRouter = require("./src/routes/gestaoAcessoRoutes");
var segurancaRouter = require("./src/routes/segurancaRoutes"); //Rota da Catarina ;)
var cpuRouter = require("./src/routes/cpuRoutes"); //rota do brenokas :)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/empresa", empresaRouter);
app.use("/gestao", gestaoRouter);
app.use("/gestaoATM", gestaoATMRouter);
app.use("/dashboard", dashboardRouter);
app.use("/alertas", alertasRouter);
app.use("/gestaoAcesso", gestaoAcessoRouter);
app.use("/seguranca", segurancaRouter);
app.use("/cpu", cpuRouter);


app.listen(PORTA_APP, function () {
  console.log(`
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n`);
});
