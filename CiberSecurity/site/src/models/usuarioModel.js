var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, perfil) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, perfil);

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
    var instrucaoSql = `select pontuacao, data from vw_quizz where email = '${email}' order by idQuizz;`;

    return database.executar(instrucaoSql);
}



function perfisRegistrados() {
    var instrucaoSql = `select descricao,count(perfil) as unidades from usuario u
inner join perfil p 
on p.id = u.perfil
group by descricao;`
    return database.executar(instrucaoSql);}


module.exports = {
    autenticar,
    cadastrar,
    listar,
    pontuacaoQuizz,
    perfisRegistrados
};