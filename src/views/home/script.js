var new_products_group = 1;
var sales_products_group = 1;
const max_new_products_groups = document.getElementsByClassName("new_product_container").length;
const max_sales_products_groups = document.getElementsByClassName("new_product_container").length;

setUserCookies()


// about header: start
getNumOfOrders()
resizeHeader()

function delAllSections(){
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
}

function addSection(event) {
    delAllSections();

    const target_id = event.target.id
    var block_id = target_id.split('_')[0];
    document.getElementById(block_id).style.display = "block";
}

function delSection(event) {
    const blockId = event.target.id
    document.getElementById(blockId).style.display = "none";
}


function getNumOfOrders(){
    let user_id = document.cookie.split('=')[1]
    fetch(`http://localhost:3000/api/v1/orders/${user_id}`, {method:"GET"})
    .then(response => response.json())
    .then(data => {
        displayAmountOfOrders(data.length)
    })
    .catch(error => console.error('Error fetching user data:', error));
}


function displayAmountOfOrders(arg){
    document.getElementById("order_num").innerHTML = (arg === 0) ? "": arg;
    if (arg < 10) {
        document.getElementById("order_num").style.left = "-21px"
    }
}

function resizeHeader(){
    var header_height = document.getElementById('bags_title').offsetHeight;
    document.getElementsByTagName('main')[0].style.paddingTop = header_height + 'px';
}

window.addEventListener('resize', () => {
    resizeHeader()
});

// about header: end


function timeOutAnimation(i, array, token){
    setTimeout(() => {
        array[i].classList.remove(token + i)
    }, 700)
}

function putOpacity(i, array, token){
    setTimeout(() => {
        array[i].style.opacity = token;
    }, 500)
}

function transitionNewRight() {
    document.getElementById("new_group" + new_products_group).style.display = "none";
    var products_prev = document.getElementsByClassName('new_product_group_' + new_products_group);
    for (var i = 0; i < products_prev.length; i++) {
        putOpacity(i, products_prev, '0');
    }
    new_products_group += 1;
    document.getElementById("new_group" + new_products_group).style.display = "flex";

    if (new_products_group === max_new_products_groups) {
        document.getElementById("button_new_right").style.visibility = "hidden";
    }else if (new_products_group === 2) {
        document.getElementById("button_new_left").style.visibility = "visible";
    }
    var products_next = document.getElementsByClassName('new_product_group_' + new_products_group);
    for (var i = 0; i < products_next.length; i++) {
        products_next[i].classList.add('product_right_center_' + i);
        timeOutAnimation(i, products_next, 'product_right_center_');
        putOpacity(i, products_next, '1');
    }

}

function transitionNewLeft() {
    document.getElementById("new_group" + new_products_group).style.display = "none";
    var products_prev = document.getElementsByClassName('new_product_group_' + new_products_group);
    for (var i = 0; i < products_prev.length; i++) {
        putOpacity(i, products_prev, '0');
    }
    new_products_group -= 1;
    document.getElementById("new_group" + new_products_group).style.display = "flex";
    if (new_products_group === 1) {
        document.getElementById("button_new_left").style.visibility = "hidden";
    }else if (new_products_group === 2) {
        document.getElementById("button_new_right").style.visibility = "visible";
    }
    var products_next = document.getElementsByClassName('new_product_group_' + new_products_group);
    for (var i = 0; i < products_next.length; i++) {
        products_next[i].classList.add('product_left_center_' + i);
        timeOutAnimation(i, products_next, 'product_left_center_');
        putOpacity(i, products_next, '1');
    }
}


function transitionSalesRight() {

    document.getElementById("sales_group" + sales_products_group).style.display = "none";
    var products_prev = document.getElementsByClassName('sales_product_group_' + sales_products_group);
    for (var i = 0; i < products_prev.length; i++) {
        putOpacity(i, products_prev, '0');
    }
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
        putOpacity(i, products, '1');
    }
}

function transitionSalesLeft() {
    document.getElementById("sales_group" + sales_products_group).style.display = "none";
    var products_prev = document.getElementsByClassName('sales_product_group_' + sales_products_group);
    for (var i = 0; i < products_prev.length; i++) {
        putOpacity(i, products_prev, '0');
    }
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
        putOpacity(i, products, '1');
    }

}

function creatId(){
    let strings = window.crypto.getRandomValues(new BigUint64Array(2));
    let id = strings[0].toString(36) + strings[1].toString(36).toUpperCase();
    return id;
}

function setUserCookies() {
    if (!(document.cookie)){
        let name = "user_id"
        let value = creatId()
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    }
}
