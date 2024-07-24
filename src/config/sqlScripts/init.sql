create table bags (
	id int(5) not null primary key,
    product_name varchar(20) not null,
    designer_name varchar(40) not null,
    description text,
    color varchar(20),
    size varchar(20),
    price int(10) not null,
    img_path varchar(100)
);

insert into bags values
	(1, "Model X", "Samira", "Long description", 'YELLOW',  "M", 1000, "path_to_image"),
    (2, "Model Y", "Abdula", "Long description", 'RED',  "XXL", 2000, "path_to_image"),
    (3, "Model Z", "Vika", "Long description", 'RED',  "X", 3000, "path_to_image"),
    (4, "Model XX", "Sasha", "Long description", 'YELLOW',  "XXL", 1000, "path_to_image"),
    (5, "Model XY", "Samira", "Long description", 'BLUE',  "X", 2000, "path_to_image"),
    (6, "Model XZ", "Lois", "Long description", 'BLUE',  "X", 3000, "path_to_image"),
    (7, "Model YX", "Juan", "Long description", 'BLUE',  "XXL", 3000, "path_to_image"),
    (8, "Model YY", "Patric", "Long description", 'RED',  "M", 3000, "path_to_image"),
    (9, "Model YZ", "Kevin", "Long description", 'YELLOW',  "M", 1000, "path_to_image")
;
