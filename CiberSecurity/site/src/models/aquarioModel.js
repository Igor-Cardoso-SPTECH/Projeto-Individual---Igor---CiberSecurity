var database = require("../database/config");

function buscarSenhasPorUsuario(email) {

  var instrucaoSql = `
  select u.nome "Nome usuario", s.senha "Senhas Criadas" from usuario u
  inner join senhas s
  on s.usuario = u.id
  where u.email = '${email}';`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, descricao) {
  
  var instrucaoSql = `INSERT INTO (descricao, fk_empresa) aquario VALUES (${descricao}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarSenhasPorUsuario,
  cadastrar
}