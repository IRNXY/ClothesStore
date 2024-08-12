create table bags (
	id int(5) not null primary key,
    product_name varchar(50) not null,
    short_description varchar(100) not null,
    description text,
    category varchar(50),
    fabric varchar(50),
    color varchar(20),
    price int(10) not null,
    img_path varchar(100)
);

insert into bags values
	(1, "Le Chiquito moyen boucle", "LA CASA", "Long description", "Cross-body Bags", "Leather", 'YELLOW', 4095, "le_chiquito_moyen_boucle_yellow.png"),
    (2, "Le Chiquito moyen boucle", "LA CASA", "Long description", "Cross-body Bags", "Leather", 'BLACK', 4095, "le_chiquito_moyen_boucle_black.png"),
    (3, "Le Chiquito", "LES SCULPTURES", "Long description", "Mini Bags", "Leather", 'WHITE', 2515, "le_chiquito_white.png"),
    (4, "Le Chiquito", "LES SCULPTURES", "Long description", "Mini Bags", "Leather", 'BLACK', 2515, "le_chiquito_black.png"),
    (5, "Le sac Marcel", "LA CASA", "Long description", "Baskets & Tote Bags", "Cotton", 'YELLOW', 1785, "le_sac_marcel_yellow.png"),
    (6, "Le sac Marcel", "LA CASA", "Long description", "Baskets & Tote Bags", "Cotton", 'RED', 1785, "le_sac_marcel_red.png"),
    (7, "Le sac Marcel", "LA CASA", "Long description", "Baskets & Tote Bags", "Cotton", 'BLUE', 1785, "le_sac_marcel_blue.png"),
    (8, "Le grand Bambino", "Handbag with adjustable crossbody strap.", "Long description", "Cross-body Bags", "Crepe", 'WHITE', 3750, "le_grand_bambino_white.png"),
    (9, "Le grand Bambino", "Handbag with adjustable crossbody strap.", "Long description", "Cross-body Bags", "Crepe", 'BLACK', 3750, "le_grand_bambino_black.png"),
    (10, "Le grand Bambino", "Handbag with adjustable crossbody strap.", "Long description", "Cross-body Bags", "Crepe", "RED", 3750, "le_grand_bambino_red.png"),
    (11, "Le porte-cartes Bambino", "GUIRLANDE", "Long description", "Mini Bags", "Satin", 'YELLOW', 685, "le_porte-cartes_bambino_yellow.png"),
    (12, "Le Chiquito Long", "Kevin", "Long description", "Cross-body Bags", "Leather", 'BLACK', 3155, "le_chiquito_long_black.png"),
    (13, "Le Chiquito Long", "Kevin", "Long description", "Cross-body Bags", "Leather", 'WHITE', 3155, "le_chiquito_long_white.png"),
    (14, "Le Chiquito Long", "Kevin", "Long description", "Cross-body Bags", "Leather", 'RED', 3155, "le_chiquito_long_red.png"),
    (15, "Le Bisou Perle", "LES SCULPTURES", "Long description", "Shoulder Bags", "Suede", 'BLUE', 4525, "le_bisou_perle_blue.png"),
    (16, "Le Bambimou", "LE MARIAGE", "Long description", "Shoulder Bags", "Suede", 'BLUE', 4525, "le_bambimou_blue.png")
;


create table orders (
	id_user varchar(50) not null,
    id_product int(5) not null
);