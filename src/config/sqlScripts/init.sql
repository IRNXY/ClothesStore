create table bags (
	id int(5) not null primary key,
    product_name varchar(20) not null,
    designer_name varchar(40) not null,
    description text,
    id_color int(5),
    id_size int(5),
    price int(10) not null,
    img_path varchar(100)
);

create table color (
	id int(10) not null primary key,
    name varchar(20) not null
);

create table size (
	id int(5) not null primary key,
    name varchar(20) not null
);