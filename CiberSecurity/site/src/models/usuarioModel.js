var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: (autenticar)connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco \n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, perfil) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: (cadastrar) connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, perfil);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, perfil) VALUES ('${nome}', '${email}', '${senha}', '${perfil}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function listar() {
    var instrucaoSql = `SELECT * FROM usuario;`;
    return database.executar(instrucaoSql);
}

function pontuacaoQuizz(email) {
    var instrucaoSql = `select pontuacao, data from vw_quizzSegBasic where email = '${email}' order by idQuizz;`;

    return database.executar(instrucaoSql);
}

function pontuacaoQuizzAvanc(email) {
    var instrucaoSql = `select pontuacao, data from vw_quizzSegAvanc where email = '${email}' order by idQuizz;`;

    return database.executar(instrucaoSql);
}

function pontuacaoQuizzHacking(email) {
    var instrucaoSql = `select pontuacao, data from vw_quizzHacking where email = '${email}' order by idQuizz;`;

    return database.executar(instrucaoSql);
}

function perfisRegistrados() {
    var instrucaoSql = `select descricao,count(perfil) as unidades from usuario u
inner join perfil p 
on p.id = u.perfil
group by descricao;`
    return database.executar(instrucaoSql);
}

function insertQuizz(email, pontuacao) {
    console.log("to no final", email, pontuacao)

    var instrucaoSql = `insert into quizzSegBasic (pontuacao, id_usuario) values
(${pontuacao}, (select id from usuario where email = '${email}'));`
    return database.executar(instrucaoSql);
}

function insertQuizzHacking(email, pontuacao) {

    var instrucaoSql = `insert into quizzHacking(pontuacao, id_usuario) values
(${pontuacao}, (select id from usuario where email = '${email}'));`
    return database.executar(instrucaoSql);
}

function insertQuizzSegAvanc(email, pontuacao) {
    console.log("passou model")
    var instrucaoSql = `insert into quizzSegAvanc(pontuacao, id_usuario) values
(${pontuacao}, (select id from usuario where email = '${email}'));`
    return database.executar(instrucaoSql);
}

function kpiConhecimento(email) {
    console.log("passou model")
    var instrucaoSql = `select
  case 
    when
      coalesce((select sum(pontuacao) from quizzSegBasic where id_usuario = u.id), 0) = 0 and
      coalesce((select sum(pontuacao) from quizzSegAvanc where id_usuario = u.id), 0) = 0 and
      coalesce((select sum(pontuacao) from quizzHacking where id_usuario = u.id), 0) = 0
    then 'faça um quizz'
    else case greatest(
      coalesce((select sum(pontuacao) from quizzSegBasic where id_usuario = u.id), 0),
      coalesce((select sum(pontuacao) from quizzSegAvanc where id_usuario = u.id), 0),
      coalesce((select sum(pontuacao) from quizzHacking where id_usuario = u.id), 0)
    )
      when coalesce((select sum(pontuacao) from quizzSegBasic where id_usuario = u.id), 0) then 'Segurança Básica'
      when coalesce((select sum(pontuacao) from quizzSegAvanc where id_usuario = u.id), 0) then 'Segurança Avançada'
      when coalesce((select sum(pontuacao) from quizzHacking where id_usuario = u.id), 0) then 'Hacking'
    end
  end as Conhecimento
from usuario u
where email = '${email}';
`
    return database.executar(instrucaoSql);
}

function plotarLiderBoard() {
    console.log("passou model")
    var instrucaoSql = `select u.nome, u.id,
    (
        coalesce((select sum(pontuacao) from quizzSegBasic where id_usuario = u.id), 0) +
        coalesce((select sum(pontuacao) from quizzSegAvanc where id_usuario = u.id), 0) +
        coalesce((select sum(pontuacao) from quizzHacking  where id_usuario = u.id), 0)
    ) as total_pontuacao
from usuario u
order by total_pontuacao desc
limit 3;`
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    listar,
    pontuacaoQuizz,
    perfisRegistrados,
    pontuacaoQuizzAvanc,
    pontuacaoQuizzHacking,
    insertQuizz,
    insertQuizzHacking,
    insertQuizzSegAvanc,
    kpiConhecimento,
    plotarLiderBoard
};