CREATE DATABASE constructora; 
USE constructora;

create table herramientas (
  idherramienta   int auto_increment primary key,
  nombre          varchar(50) not null,
  marca           varchar(50) not null,
  descripcion     varchar(100) not null,
  fotografia      varchar(200) null , 
  condicion       enum('bueno','regular','malo') not null default 'bueno',
  tipo            enum('manual','electrica') not null default 'electrica'
)engine = innodb;

  -- x2 manuales 
insert into herramientas 
(nombre,marca,descripcion,tipo)
VALUES ('alicates','kamasa','Para trabajos electricos', 'manual'),
        ('destornillador0','PB', 'Tipo cruz imantado', 'manual');



select * from herramientas;