
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



insert into senhas(senha, usuario) values
(123,2),
(456,2),
(11,3);

select u.nome "Nome usuario", s.senha "Senhas Criadas" from usuario u
inner join senhas s
on s.usuario = u.id;


select u.nome "Nome usuario", s.senha "Senhas Criadas" from usuario u
inner join senhas s
on s.usuario = u.id
where u.email = 'cardosoigor113@gmail.com';

