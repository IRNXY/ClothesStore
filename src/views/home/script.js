var new_products_group = 1;
var sales_products_group = 1;
const max_new_products_groups = document.getElementsByClassName("new_product_container").length;
const max_sales_products_groups = document.getElementsByClassName("new_product_container").length;


function timeOutAnimation(i, array, token){
    setTimeout(() => {
        array[i].classList.remove(token + i)
    }, 700)
}

function transitionNewRight() {

    document.getElementById("new_group" + new_products_group).style.display = "none";

    new_products_group += 1;

    document.getElementById("new_group" + new_products_group).style.display = "flex";
    if (new_products_group === max_new_products_groups) {
        document.getElementById("button_new_right").style.visibility = "hidden";
    }else if (new_products_group === 2) {
        document.getElementById("button_new_left").style.visibility = "visible";
    }
    var products = document.getElementsByClassName('new_product_group_' + new_products_group);
    for (var i = 0; i < products.length; i++) {
        products[i].classList.add('product_right_center_' + i);
        timeOutAnimation(i, products, 'product_right_center_');
    }
}

function transitionNewLeft() {
    document.getElementById("new_group" + new_products_group).style.display = "none";
    new_products_group -= 1;
    document.getElementById("new_group" + new_products_group).style.display = "flex";
    if (new_products_group === 1) {
        document.getElementById("button_new_left").style.visibility = "hidden";
    }else if (new_products_group === 2) {
        document.getElementById("button_new_right").style.visibility = "visible";
    }
    var products = document.getElementsByClassName('new_product_group_' + new_products_group);
    for (var i = 0; i < products.length; i++) {
        products[i].classList.add('product_left_center_' + i);
        timeOutAnimation(i, products, 'product_left_center_');
    }
}


function transitionSalesRight() {

    document.getElementById("sales_group" + sales_products_group).style.display = "none";

    sales_products_group += 1;

    document.getElementById("sales_group" + sales_products_group).style.display = "flex";
    if (sales_products_group === max_sales_products_groups) {
        document.getElementById("button_sales_right").style.visibility = "hidden";
    }else if (sales_products_group === 2) {
        document.getElementById("button_sales_left").style.visibility = "visible";
    }
    var products = document.getElementsByClassName('sales_product_group_' + sales_products_group);
    for (var i = 0; i < products.length; i++) {
        products[i].classList.add('product_right_center_' + i);
        timeOutAnimation(i, products, 'product_right_center_');
    }
}

function transitionSalesLeft() {
    document.getElementById("sales_group" + sales_products_group).style.display = "none";
    sales_products_group -= 1;
    document.getElementById("sales_group" + sales_products_group).style.display = "flex";
    if (sales_products_group === 1) {
        document.getElementById("button_sales_left").style.visibility = "hidden";
    }else if (sales_products_group === 2) {
        document.getElementById("button_sales_right").style.visibility = "visible";
    }
    var products = document.getElementsByClassName('sales_product_group_' + sales_products_group);
    for (var i = 0; i < products.length; i++) {
        products[i].classList.add('product_left_center_' + i);
        timeOutAnimation(i, products, 'product_left_center_');
    }
}

function delAllSections(){
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
}

function addSection(event) {
    delAllSections();

    const targetId = event.target.id
    var blockId = targetId.split('_')[0]
    document.getElementById(blockId).style.display = "block";
}

function delSection(event) {
    const blockId = event.target.id
    document.getElementById(blockId).style.display = "none";
}
