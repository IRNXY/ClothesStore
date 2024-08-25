var param_obj = {value: [], name: [], id: []}
var products_data = []
var hidden_height = 9;


// about header: start
getNumOfOrders()
resizeHeader()
setUserCookies()
getCategories()
getFabric()
getColor()

function delAllSections() {
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


function getNumOfOrders() {
    let user_id = document.cookie.split('=')[1]
    fetch(`http://localhost:3000/api/v1/orders/${user_id}`, {method: "GET"})
        .then(response => response.json())
        .then(data => {
            displayAmountOfOrders(data.length)
        })
        .catch(error => console.error('Error fetching user data:', error));
}


function displayAmountOfOrders(arg) {
    document.getElementById("order_num").innerHTML = (arg === 0) ? "" : arg;
    if (arg < 10) {
        document.getElementById("order_num").style.left = "-21px"
    }
}

function resizeHeader() {
    var header_height = document.getElementById('bags_title').offsetHeight;
    document.getElementsByTagName('main')[0].style.paddingTop = header_height + 'px';
}

window.addEventListener('resize', () => {
    resizeHeader()
});

// about header: end


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
    for (let i = 0; i < data.length; i++) {
        if (uniq_list.indexOf(data[i].product_name) == -1) {
            var link_to_page = "http://localhost:3000/product_page?name=" + data[i].product_name;
            var prod_name = data[i].product_name;
            var prod_price = data[i].price;
            var prod_src = data[i].img_path;
            var exapmle_prod_block = `<a href="${link_to_page}" class="product_block">` +
                `<img class="product_img" src="http://localhost:3000/images/${prod_src}" onmouseleave="changePictureBack(this)" onmouseenter="changePicture(this)" />` +
                `<h4>${prod_name}</h4>` + `<h4 id="price_product">AED ${prod_price}</h4> </a>`;

            document.getElementById("products").innerHTML += exapmle_prod_block;
            uniq_list.push(prod_name);
        }
    }
}

function displayCategoriesInf(data) {
    document.getElementById("categories").innerHTML = "";
    for (let i = 0; i < data.value.length; i++) {
        var prod_value = data.value[i];
        var prod_innerText = data.value[i];
        var prod_name = data.name[i];
        if (prod_name === "price") {
            prod_innerText += " AED";
        }
        var exapmle_cat_block = `<button name="${prod_name}" value="${prod_value}" onclick="getParameter(this)" class="category_block">` +
            `<p>${prod_innerText}</p> <img height="18px" src="http://localhost:3000/images/del.webp"/> </button>`;

        document.getElementById("categories").innerHTML += exapmle_cat_block;
    }
    // document.getElementById("price1").checked = false;
}

function removeAllParameters() {
    var menu_blocks = document.getElementsByClassName("menu");
    for (var i = 0; i < menu_blocks.length; i++) {
        menu_blocks[i].style.height = hidden_height + 'px';
    }
}


function displayParameters(arg) {
    if (document.getElementById(arg).offsetHeight <= 80) {
        removeAllParameters();

        document.getElementById(arg).style.height = document.getElementById(arg).offsetHeight + document.getElementById(arg + '_parameters').offsetHeight + "px";
    } else {
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
            } else if (cond.name[j] === "category" && cond.value[j] === products_data[i].category) {
                flag += 1;
            } else if (cond.name[j] === "price" && cond.value[j].split("-")[0] <= products_data[i].price && cond.value[j].split("-")[1] > products_data[i].price) {
                flag += 1;
            } else if (cond.name[j] === "fabric" && cond.value[j] === products_data[i].fabric) {
                flag += 1;
            }
        }
        if (flag === cond.name.length) {
            result_obj.push(products_data[i]);
        }
    }
    displayBagsData(result_obj);
}

function changePicture(arg) {
    // работает столько с png
    var need = arg.src
    arg.src = need.slice(0, need.length - 4) + "_3.png"
}

function changePictureBack(arg) {
    // работает столько с png
    var need = arg.src
    arg.src = need.slice(0, need.length - 6) + ".png"
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

function displayFilterData(section, arg, data){
    for (var i = 0; i < data.length; i++) {
        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = section + i;
        input.name = section;
        input.value = data[i][arg];
        input.setAttribute("onchange", "getParameter(this)")
        document.getElementById(section + "_box").appendChild(input);

        let label = document.createElement("label");
        label.innerText = data[i][arg];
        label.htmlFor = section + i;
        document.getElementById(section + "_box").appendChild(label);

        document.getElementById(section + "_box").innerHTML += "</br>"
    }
}

function getCategories() {
    fetch('http://localhost:3000/api/v1/category', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        displayFilterData("category", "name", data)
    })
    .catch(error => console.error('Error fetching get filter data:', error));
}

function getFabric(){
    fetch('http://localhost:3000/api/v1/fabric', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        displayFilterData("fabric", "name", data)
    })
    .catch(error => console.error('Error fetching get filter data:', error));
}

function getColor(){
    fetch('http://localhost:3000/api/v1/color', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        displayFilterData("color", "color", data)
    })
    .catch(error => console.error('Error fetching get filter data:', error));
}



function creatId() {
    let strings = window.crypto.getRandomValues(new BigUint64Array(2));
    let id = strings[0].toString(36) + strings[1].toString(36).toUpperCase();
    return id;
}

function setUserCookies() {
    if (!(document.cookie)) {
        let name = "user_id"
        let value = creatId()
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    }
}