var param_obj = {value: [], name: []}
var products_data= []

fetch(`http://localhost:3000/api/v1/bags`, {
    method: 'GET',
})
    .then(response => response.json())
    .then(data => {
        products_data = data;
        displayBagsData(products_data);
    })
    .catch(error => console.error('Error fetching user data:', error));

function displayBagsData(data) {
    document.getElementById("products_section").innerHTML = "";
    for(let i= 0; i<data.length; i++){
        var link_to_page = "http://localhost:3000/page?id=" + data[i].id;
        var prod_name = data[i].product_name;
        var prod_price = data[i].price;
        var exapmle_prod_block = `<a href="${link_to_page}" class="product_block">` +
            '<img class="product_img" src="http://localhost:3000/home/images/i.webp"/>' +
            `<h4>${prod_name}</h4>` + `<p>text</p> <h4>AED ${prod_price}</h4> </a>`;

        document.getElementById("products_section").innerHTML += exapmle_prod_block;
    }
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

function displayParameters(arg) {
    document.getElementById(arg + '_parameters').style.display = document.getElementById(arg + '_parameters').style.display === 'none' ? 'block' : 'none';
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
            }else if (cond.name[j] === "price" && cond.value[j] == products_data[i].price){
                flag += 1;
            }
        }
        if (flag ===  cond.name.length){
            result_obj.push(products_data[i]);
        }
    }
    displayBagsData(result_obj);
}

function getParameter(arg) {
    if (arg.checked) {
        param_obj.value.push(arg.value);
        param_obj.name.push(arg.name);
    } else {
        var index_delete = param_obj.value.indexOf(arg.value);
        param_obj.value.splice(index_delete, 1);
        param_obj.name.splice(index_delete, 1);
    }
    formConditionData(param_obj)
}