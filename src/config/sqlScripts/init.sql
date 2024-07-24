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

insert into bags values
	(1, "Model X", "Samira", "Long description", 1,  3, 1000, "path_to_image"),
    (2, "Model Y", "Abdula", "Long description", 2,  2, 2000, "path_to_image"),
    (3, "Model Z", "Vika", "Long description", 2,  1, 3000, "path_to_image"),
    (4, "Model XX", "Sasha", "Long description", 1,  2, 1000, "path_to_image"),
    (5, "Model XY", "Samira", "Long description", 3,  1, 2000, "path_to_image"),
    (6, "Model XZ", "Lois", "Long description", 3,  1, 3000, "path_to_image"),
    (7, "Model YX", "Juan", "Long description", 3,  2, 3000, "path_to_image"),
    (8, "Model YY", "Patric", "Long description", 2,  3, 3000, "path_to_image"),
    (9, "Model YZ", "Kevin", "Long description", 1,  3, 1000, "path_to_image")
;

insert into color values
	(1, 'YELLOW'),
    (2, 'RED'),
    (3, 'BLUE');

insert into size values
	(1, "X"),
    (2, "XXL"),
    (3, "M")
;
