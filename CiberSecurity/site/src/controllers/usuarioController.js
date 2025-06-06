var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        aquarioModel.buscarSenhasPorUsuario(resultadoAutenticar[0].email)
                            .then((resultadoAquarios) => {
                                if (resultadoAquarios.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha,
                                        perfil: resultadoAquarios
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var perfil = req.body.perfilServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (perfil == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, perfil)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum usuário encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}
function pontuacaoQuizz(req, res) {
    const email = req.body.email;
    usuarioModel.pontuacaoQuizz(email)
        .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o inserir! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function pontuacaoQuizzAvanc(req, res) {
    const email = req.body.email;
    usuarioModel.pontuacaoQuizzAvanc(email)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao buscar pontuação:", erro);
            res.status(500).json(erro);
        });
}

function pontuacaoQuizzHacking(req, res) {
    const email = req.body.email;
    usuarioModel.pontuacaoQuizzHacking(email)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao buscar pontuação:", erro);
            res.status(500).json(erro);
        });
}

function perfisRegistrados(req,res){

     usuarioModel.perfisRegistrados()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum usuário encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function insertQuizz(req,res){
    const email = req.body.email;
    const pontuacao = req.body.pontuacao;

    usuarioModel.insertQuizz(email, pontuacao)
        .then(resultado => {
            res.status(200).json({ mensagem: "Pontuação inserida com sucesso" });
        })
        .catch(erro => {
            console.error("Erro ao inserir no banco:", erro);
            res.status(500).json({ erro: erro.sqlMessage || erro.message });
        });

}

function insertQuizzHacking(req,res){
     const email = req.body.email;
    const pontuacao = req.body.pontuacao;


     usuarioModel.insertQuizzHacking(email,pontuacao)
      
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function insertQuizzSegAvanc(req,res){
     const email = req.body.email;
    const pontuacao = req.body.pontuacao;
     usuarioModel.insertQuizzSegAvanc(email,pontuacao)
     .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function insertQuizzSegAvanc(req,res){
     const email = req.body.email;
    const pontuacao = req.body.pontuacao;
     usuarioModel.insertQuizzSegAvanc(email,pontuacao)
     .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function kpiConhecimento(req, res){
    const email = req.body.email;
    usuarioModel.kpiConhecimento(email)
    .then(function(resultados) {
        res.json(resultados);
    })
    .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function plotarLiderBoard(req, res){
    
    usuarioModel.plotarLiderBoard()
    .then(function(resultados) {
        res.json(resultados);
    })
    .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
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
}