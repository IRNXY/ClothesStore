var num_of_blocks = 0

// about header: start
styleEdit()

getCategories()
getFabric()


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

function styleEdit() {
    var header_height = document.getElementById('shop_title').offsetHeight;
    document.getElementsByTagName('main')[0].style.paddingTop = header_height + 'px';
}

window.addEventListener('resize', () => {
    styleEdit()
});

// about header: end


function sendNewProd(prod_data) {
    fetch('http://localhost:3000/api/v1/bags', {
        method: 'POST',
        body: prod_data,
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message)
    })
    .catch(error => console.error('Error fetching create product data:', error));
}

function sendNewField(filed_data) {
    fetch(`http://localhost:3000/api/v1/${Object.keys(filed_data)[0]}`, {
        method: 'POST',
        body: JSON.stringify(filed_data),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message)
        getCategories()
        getFabric()
    })
    .catch(error => console.error('Error fetching create product data:', error));
}


function addColor() {
    num_of_blocks += 1;
    let block = document.createElement("div");
    block.id = "item_" + num_of_blocks ;
    block.className = "item_block";
    document.getElementById("color_section").appendChild(block);

    let variant = document.createElement("h2");
    variant.className = "variant_header";
    variant.innerText = "Variant " + num_of_blocks;
    document.getElementById("item_" + num_of_blocks).appendChild(variant);

    let color_label = document.createElement("label");
    color_label.className = "label";
    color_label.innerText = "Color:";
    document.getElementById("item_" + num_of_blocks).appendChild(color_label);

    let input = document.createElement("input");
    input.type = "text";
    input.id = "color_" + num_of_blocks ;
    input.name = "color" ;
    input.setAttribute("onchange", "tryColor(this)");
    input.required = true;
    document.getElementById("item_" + num_of_blocks).appendChild(input);

    let visual_color = document.createElement("div");
    visual_color.id = "test_color_" + num_of_blocks;
    visual_color.className = "field";
    document.getElementById("item_" + num_of_blocks).appendChild(visual_color);

    let first_file_label = document.createElement("p");
    first_file_label.className = "label";
    first_file_label.innerText = "First picture:";
    document.getElementById("item_" + num_of_blocks).appendChild(first_file_label);

    let fisrt_files = document.createElement("input");
    fisrt_files.type = "file";
    fisrt_files.required = true;
    fisrt_files.name = "images"
    fisrt_files.accept = ".png";
    document.getElementById("item_" + num_of_blocks).appendChild(fisrt_files);

    let second_file_label = document.createElement("p");
    second_file_label.className = "label";
    second_file_label.innerText = "Second picture:";
    document.getElementById("item_" + num_of_blocks).appendChild(second_file_label);

    let second_files = document.createElement("input");
    second_files.type = "file";
    second_files.required = true;
    second_files.name = "images"
    second_files.accept = ".png";
    document.getElementById("item_" + num_of_blocks).appendChild(second_files);

    let other_files_label = document.createElement("p");
    other_files_label.className = "label";
    other_files_label.innerText = "Other pictures:";
    document.getElementById("item_" + num_of_blocks).appendChild(other_files_label);

    let others_files = document.createElement("input");
    others_files.type = "file";
    others_files.required = true;
    others_files.name = "images"
    others_files.multiple= "multiple";
    others_files.accept = ".png";
    document.getElementById("item_" + num_of_blocks).appendChild(others_files);

    let button = document.createElement("button");
    button.id = "del_button_" + num_of_blocks ;
    button.innerText = "Del Color";
    button.setAttribute("onclick", `delColor(${num_of_blocks})` );
    document.getElementById("item_" + num_of_blocks).appendChild(button);
}

function tryColor(arg) {
    let id = arg.id.split("_")[1]
    document.getElementById("test_color_" + id).style.backgroundColor = arg.value
}

function delColor(id) {
    document.getElementById("item_" + id).remove()
}


function displayCategoriesInf(data){
    document.getElementById("categories").innerHTML = "";
    for (let i = 0; i < data.length; i++){
        let option = document.createElement("option");
        option.innerText = data[i].name;
        document.getElementById("categories").appendChild(option);
    }
}

function displayFabricInf(data){
    document.getElementById("fabric").innerHTML = "";
    for (let i = 0; i < data.length; i++){
        let option = document.createElement("option");
        option.innerText = data[i].name;
        document.getElementById("fabric").appendChild(option);
    }
}

function getCategories() {
    fetch('http://localhost:3000/api/v1/category', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        displayCategoriesInf(data)
    })
    .catch(error => console.error('Error fetching create product data:', error));
}

function getFabric(){
    fetch('http://localhost:3000/api/v1/fabric', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        displayFabricInf(data)
    })
    .catch(error => console.error('Error fetching create product data:', error));
}

function serializeForm(formNode) {
    let prod_data = { color: []}
    var data = new FormData();
    var variant = -1
    var sequence = 0

    const {elements} = formNode
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].name) {
            if (elements[i].name === "color"){
                prod_data.color.push(elements[i].value);
                variant += 1
                sequence = 0
            }else if(elements[i].name === "images"){
                for (let j = 0; j < elements[i].files.length; j++) {
                    let need = elements[i].files[j];
                    data.append('image_' + variant + "_" + sequence, need);
                    sequence += 1
                }
            }else{
                data.append(elements[i].name, elements[i].value);
            }
        }
    }
    data.append("colors", prod_data.color)
    data.append("password", document.getElementById("password").value)

    for (var pair of data.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    sendNewProd(data)

}

function processCategory(formNode){
    let category_inf = {}
    const {elements} = formNode
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].name) {
            category_inf[elements[i].name] = elements[i].value;
        }
    }
    category_inf["password"] = document.getElementById("password").value;
    sendNewField(category_inf)
}

function processFabric(formNode){
    let fabric_inf = {}
    const {elements} = formNode
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].name) {
            fabric_inf[elements[i].name] = elements[i].value;
        }
    }
    fabric_inf["password"] = document.getElementById("password").value;
    sendNewField(fabric_inf)
}

function handleFormSubmit(event) {
    event.preventDefault()
    serializeForm(prodForm)
}

function handleCategorySubmit(event) {
    event.preventDefault()
    processCategory(categoryForm)
}

function handleFabricSubmit(event) {
    event.preventDefault()
    processFabric(fabricForm)
}


const prodForm = document.getElementById('form_creat_prod')
prodForm.addEventListener('submit', handleFormSubmit)

const categoryForm = document.getElementById('add_category')
categoryForm.addEventListener('submit', handleCategorySubmit)

const fabricForm = document.getElementById('add_fabric')
fabricForm.addEventListener('submit', handleFabricSubmit)