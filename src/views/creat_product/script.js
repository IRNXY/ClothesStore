var num_of_blocks = 0

// about header: start
styleEdit()

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
        // window.location = "http://localhost:3000/"
    })
    .catch(error => console.error('Error fetching create product data:', error));
}

function serializeForm(formNode) {
    // let prod_data = {color: []}
    // var pic_data = new FormData();
    // var queue = 0
    // const {elements} = formNode
    // for (let i = 0; i < elements.length; i++) {
    //     if (elements[i].name) {
    //         if (elements[i].name === "color"){
    //             prod_data.color.push(elements[i].value);
    //         }else if(elements[i].name === "images"){
    //             for (let j = 0; j < elements[i].files.length; j++) {
    //                 let need = elements[i].files[j];
    //                 pic_data.append('image_' + queue + "_"+ j, need);
    //             }
    //             queue += 1
    //         }else{
    //             prod_data[elements[i].name] = elements[i].value;
    //         }
    //     }
    // }
    // sendNewProd(pic_data, prod_data)

    let prod_data = { color: []}
    var data = new FormData();
    var queue = 0
    const {elements} = formNode
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].name) {
            if (elements[i].name === "color"){
                prod_data.color.push(elements[i].value);
            }else if(elements[i].name === "images"){
                for (let j = 0; j < elements[i].files.length; j++) {
                    let need = elements[i].files[j];
                    data.append('image_' + queue + "_"+ j, need);
                }
                queue += 1
            }else{
                data.append(elements[i].name, elements[i].value);
            }
        }
    }
    data.append("colors", prod_data.color)

    for (var pair of data.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    sendNewProd(data)
}

function handleFormSubmit(event) {
    event.preventDefault()
    serializeForm(applicantForm)
}

function addColor() {
    num_of_blocks += 1;
    let block = document.createElement("div");
    block.id = "item_" + num_of_blocks ;
    document.getElementById("color_section").appendChild(block);

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

    let files = document.createElement("input");
    files.type = "file";
    files.required = true;
    files.name = "images"
    files.multiple= "multiple";
    files.accept = ".png";
    document.getElementById("item_" + num_of_blocks).appendChild(files);

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
    console.log(document.getElementById("item_" + id));
    document.getElementById("item_" + id).remove()
}


const applicantForm = document.getElementById('form_creat')
applicantForm.addEventListener('submit', handleFormSubmit)