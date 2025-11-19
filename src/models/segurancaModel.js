var database = require("../database/config");

function exibirKPIinvasoes(idAtm) {
    var instrucaoSql = `
    select * from Invasao where fkSeguranca = 
	    (select idSeguranca from Seguranca join Atm on idAtm = fkAtm where categoria = "invasao" and idAtm = ${idAtm})
		    and horarioCaptura = (select max(horarioCaptura) from Invasao);
    `

    return database.executar(instrucaoSql);
}

module.exports = {
  exibirKPIinvasoes,
};