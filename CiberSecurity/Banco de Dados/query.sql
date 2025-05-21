
create database cybersecurity;
use cybersecurity;

CREATE TABLE perfil (
  id int NOT NULL AUTO_INCREMENT,
  descricao varchar(45),
  PRIMARY KEY (id));
 
 
CREATE TABLE usuario (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(45),
  email varchar(50),
  senha varchar(30),
  perfil int,
  PRIMARY KEY (id),
  KEY perfil (perfil),
  CONSTRAINT usuariofk1 FOREIGN KEY (perfil) REFERENCES perfil (id)
);

create table senhas(
id int primary key auto_increment,
senha int, 
usuario int,
foreign key (usuario) references usuario(id));


insert into perfil (descricao)values 
('Estudante'),
('Especialista em segurança'),
('Especialista em segurança'),
('Hacker Ativo'),
('Profissional Em Formação');


select u.nome "Nome usuario", s.senha "Senhas Criadas" from usuario u
inner join senhas s
on s.usuario = u.id;


select u.nome "Nome usuario", s.senha "Senhas Criadas" from usuario u
inner join senhas s
on s.usuario = u.id
where u.email = 'cardosoigor113@gmail.com';


create table quizz (
id int primary key auto_increment,
pontuacao int, 
id_usuario int,
data datetime default(current_time),
foreign key(id_usuario) references usuario(id));


insert into usuario(nome,perfil)values
('igor',2),
('Marcos',2),
('bob',4),
('leo',5);

select * from usuario;

insert into quizz(pontuacao, id_usuario) 
values 
(16,1),
(17,2),
(18,3),
(19,2),
(20,3);

select q.id,pontuacao,data from quizz q
inner join  usuario u 
on u.id = q.id order by q.id desc limit 5;

select descricao,count(perfil) as unidades from usuario u
inner join perfil p 
on p.id = u.perfil
group by descricao;

select pontuacao,data from quizz order by id desc limit 5;