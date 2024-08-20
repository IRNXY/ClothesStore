var hidden_height = 9;
var all_bag_info = []
var block_num = 0;
var color_now = ""


// about header: start
getNumOfOrders()
styleEdit()
setUserCookies()

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

function styleEdit(){
    var picture_width = document.getElementById('first_picture').offsetWidth;
    document.getElementById('arrow_right').style.left = (picture_width - 40) + 'px';

    var header_height = document.getElementById('bags_title').offsetHeight;
    document.getElementsByTagName('main')[0].style.paddingTop = header_height + 'px';
}

window.addEventListener('resize', () => {
    styleEdit()
    objectPosition()
});

// about header: end

var url = window.location.search
var product_param = url.substring(url.indexOf('?') + 1);
var product_name = product_param.split('=')[1];
fetch(`http://localhost:3000/api/v1/bags/${product_name}`, {method:"GET"})
    .then(response => response.json())
    .then(data => {
        all_bag_info = data;
        displayData(data[0])
        displayPossibleColors(data)
    })
    .catch(error => console.error('Error fetching user data:', error));



function removeAllParameters(){
    var menu_blocks = document.getElementsByClassName("menu");
        for (var i = 0; i < menu_blocks.length; i++) {
            menu_blocks[i].style.height = hidden_height + 'px';
        }
}


function displayParameters(arg) {
    if (document.getElementById(arg).offsetHeight <= 80) {
        removeAllParameters();

        document.getElementById(arg).style.height = document.getElementById(arg).offsetHeight + document.getElementById(arg + '_parameters').offsetHeight + "px";
    }else{
        removeAllParameters()
    }
}

function displayPossibleColors(data) {
    for (var i = 0; i < data.length; i++) {
        let circle_outer = document.createElement("div");
        circle_outer.id = "circle_" + i + "_outer";
        circle_outer.className = "color_circle_outer";
        circle_outer.setAttribute("onclick", "giveBorder(this)");

        let circle_inner = document.createElement("div");
        circle_inner.id = "circle_" + i + "_inner";
        circle_inner.className = "color_circle_inner";
        circle_inner.style.backgroundColor = data[i].color;

        document.getElementById("color_menu").appendChild(circle_outer);
        document.getElementById("circle_" + i + "_outer").appendChild(circle_inner);
    }
}

function displayData(arg) {
    color_now = arg.color;
    document.getElementById("title_prod").innerText = arg.product_name;
    document.getElementById("add_text").innerText = arg.short_description;
    document.getElementById("amount_left").innerText = "1";
    document.getElementById("price").innerText = arg.price;
    document.getElementById("color_picked").innerText = arg.color;

    var standart_path = "http://localhost:3000/images/"
    document.getElementById("first_picture").src = standart_path + arg.img_path;
    var patrs = arg.img_path.split(".");
    document.getElementById("second_picture").src = standart_path + patrs[0] + "_3." + patrs[1];
    document.getElementById("third_picture").src = standart_path + patrs[0] + "_2." + patrs[1];
    document.getElementById("fourth_picture").src = standart_path + patrs[0] + "_4." + patrs[1];
}

function giveBorder(arg){
    for (var i = 0; i < all_bag_info.length; i++){
        document.getElementById("circle_" + i + "_outer").style.border = "none";
    }
    document.getElementById(arg.id).style.border = "1px solid black";
    let color = document.getElementById("circle_" + arg.id.split("_")[1] + "_inner").style.backgroundColor;
    color_now = color;
    for (let i = 0; i < all_bag_info.length; i++){
        if (all_bag_info[i].color === color.toUpperCase()){
            displayData(all_bag_info[i]);
            break
        }
    }
}

function transitionLeft(){
    block_num = block_num - 1;
    if (block_num === 0){
        document.getElementById("arrow_left").style.visibility = "hidden";
    }else if (block_num === 2) {
        document.getElementById("arrow_right").style.visibility = "visible";
    }
    objectPosition()
}

function transitionRight(){
    block_num = block_num + 1;
    if (block_num === 3){
        document.getElementById("arrow_right").style.visibility = "hidden";
    }else if (block_num === 1) {
        document.getElementById("arrow_left").style.visibility = "visible";
    }
    objectPosition()
}


function objectPosition(){
    var window_size = document.getElementById('picture_block').offsetWidth * -1;
    document.getElementById("movable_pictures").style.left = window_size * block_num + "px";
}

function placeInBag(){
    let u_id = getUserCookies();
    let p_id = getProductId();
    fetch(`http://localhost:3000/api/v1/orders`,
        {method:"POST",
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({user_id: u_id, product_id: p_id}),
        })
    .then(response => response.json())
    .then(data => { processResult(data)  })
    .catch(error => console.error('Error fetching order data:', error));
}

function processResult(data){
    if (data.status && data.status === "fail"){
        document.getElementById("error").style.opacity = "1";
        setTimeout(()=>{document.getElementById("error").style.opacity = "0"; }, 3000)
    }else{
        reveal()
        getNumOfOrders()
    }
}

function getUserCookies() {
    return document.cookie.split('=')[1]
}

function getProductId(){
    for (let i = 0; i < all_bag_info.length; i++){
        if (all_bag_info[i].color === color_now.toUpperCase()){
            return all_bag_info[i].id;
        }
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

function reveal(){
    document.getElementById("add_to_bag").disabled = true;
    document.getElementById("button_text").style.display = "none";
    document.getElementsByClassName("checkmark")[0].style.display = "block";

    setTimeout(() => {
        document.getElementsByClassName("checkmark")[0].style.display = "none";
        document.getElementById("button_text").style.display = "block";
        document.getElementById("add_to_bag").disabled = false;
        }, 2000);
}

