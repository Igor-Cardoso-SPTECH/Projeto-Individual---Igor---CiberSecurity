var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.post("/pontuacaoQuizz", function (req, res) {
    usuarioController.pontuacaoQuizz(req, res);
});

router.post("/pontuacaoQuizzAvanc", function (req, res) {
    usuarioController.pontuacaoQuizzAvanc(req, res);
});

router.post("/pontuacaoQuizzHacking", function (req, res) {
    usuarioController.pontuacaoQuizzHacking(req, res);
});


router.get("/Registrados", function (req, res) {
    usuarioController.perfisRegistrados(req, res);
});


router.post("/quizz", function (req, res) {
    usuarioController.insertQuizz(req, res);
});
router.post("/quizzAvanc", function (req, res) {
    usuarioController.insertQuizzSegAvanc(req, res);
});
router.post("/quizzHacking", function (req, res) {
    usuarioController.insertQuizzHacking(req, res);
});









module.exports = router;