var param_obj = {value: [], name: [], id: []}
var products_data= []
var hidden_height = 9;


fetch(`http://localhost:3000/api/v1/bags/all`, {
    method: 'GET',
})
    .then(response => response.json())
    .then(data => {
        products_data = data;
        displayBagsData(products_data);
    })
    .catch(error => console.error('Error fetching user data:', error));

function displayBagsData(data) {
    var uniq_list = new Array();
    document.getElementById("products").innerHTML = "";
    for(let i= 0; i<data.length; i++){
        if ( uniq_list.indexOf(data[i].product_name) == -1){
            var link_to_page = "http://localhost:3000/product_page?name=" + data[i].product_name;
            var prod_name = data[i].product_name;
            var prod_price = data[i].price;
            var prod_src = data[i].img_path;
            var exapmle_prod_block = `<a href="${link_to_page}" class="product_block">` +
                `<img class="product_img" src="http://localhost:3000/images/${prod_src}" onmouseleave="changePictureBack(this)" onmouseenter="changePicture(this)" />` +
                `<h4>${prod_name}</h4>` + `<p>text</p> <h4 id="price_product">AED ${prod_price}</h4> </a>`;

            document.getElementById("products").innerHTML += exapmle_prod_block;
            uniq_list.push(prod_name);
        }
    }
}

function displayCategoriesInf(data) {
    document.getElementById("categories").innerHTML = "";
    for(let i= 0; i<data.value.length; i++){
        var prod_value = data.value[i];
        var prod_name = data.name[i];
        var exapmle_cat_block = `<button name="${prod_name}" value="${prod_value}" onclick="getParameter(this)" class="category_block">` +
            `<p>${prod_value}</p> <img height="18px" src="http://localhost:3000/images/del.webp"/> </button>`;

        document.getElementById("categories").innerHTML += exapmle_cat_block;
    }
    // document.getElementById("price1").checked = false;
}

function delAllSections() {
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

function formConditionData(cond) {
    var result_obj = []
    for (var i = 0; i < products_data.length; i++) {
        var flag = 0
        for (var j = 0; j < cond.name.length; j++) {
            if (cond.name[j] === "color" && cond.value[j] === products_data[i].color) {
                flag += 1;
            }else if (cond.name[j] === "size" && cond.value[j] === products_data[i].size) {
                flag += 1;
            }else if (cond.name[j] === "price" && cond.value[j].split(" ")[0] == products_data[i].price){
                flag += 1;
            }
        }
        if (flag ===  cond.name.length){
            result_obj.push(products_data[i]);
        }
    }
    displayBagsData(result_obj);
}

function changePicture(arg){
    // работает столько с png
    var need = arg.src
    arg.src = need.slice(0, need.length - 4) + "_2.png"
    console.log(arg.src)
}

function changePictureBack(arg){
    // работает столько с png
    var need = arg.src
    arg.src = need.slice(0, need.length - 6) + ".png"
    console.log(arg.src)
}

function getParameter(arg) {
    if (arg.checked) {
        param_obj.value.push(arg.value);
        param_obj.name.push(arg.name);
        param_obj.id.push(arg.id);
    } else {
        var index_delete = param_obj.value.indexOf(arg.value);
        param_obj.value.splice(index_delete, 1);
        param_obj.name.splice(index_delete, 1);

        document.getElementById(param_obj.id[index_delete]).checked = false;
        param_obj.id.splice(index_delete, 1);
    }
    formConditionData(param_obj)
    displayCategoriesInf(param_obj)
}

var header_height = document.getElementById('bags_title').offsetHeight;
document.getElementsByTagName('main')[0].style.paddingTop = header_height + 'px';

window.addEventListener('resize', () => {
    header_height = document.getElementById('bags_title').offsetHeight;
    document.getElementById('title_bags').style.paddingTop = header_height + 'px';
});

