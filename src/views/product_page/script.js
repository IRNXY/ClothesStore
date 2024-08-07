var url = window.location.search

var product_param = url.substring(url.indexOf('?') + 1);
var product_name = product_param.split('=')[1];
var hidden_height = 9;
var all_bag_info = []
fetch(`http://localhost:3000/api/v1/bags/${product_name}`, {method:"GET"})
    .then(response => response.json())
    .then(data => {
        all_bag_info = data;
        displayData(data[0])
        displayPossibleColors(data)
    })
    .catch(error => console.error('Error fetching user data:', error));


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
    document.getElementById("amount_left").innerText = "1";
    document.getElementById("price").innerText = arg.price;
    document.getElementById("color_picked").innerText = arg.color;
}

function giveBorder(arg){
    for (var i = 0; i < all_bag_info.length; i++){
        document.getElementById("circle_" + i + "_outer").style.border = "none";
    }
    document.getElementById(arg.id).style.border = "1px solid black";
    let color = document.getElementById("circle_" + arg.id.split("_")[1] + "_inner").style.backgroundColor;
    for (let i = 0; i < all_bag_info.length; i++){
        if (all_bag_info[i].color === color.toUpperCase()){
            displayData(all_bag_info[i]);
            break
        }
    }
}


var header_height = document.getElementById('bags_title').offsetHeight;
document.getElementsByTagName('main')[0].style.paddingTop = header_height + 'px';

window.addEventListener('resize', () => {
    header_height = document.getElementById('bags_title').offsetHeight;
    document.getElementsByTagName('main')[0].style.paddingTop = header_height + 'px';
});


