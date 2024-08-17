

// about header: start
getNumOfOrders()
resizeHeader()
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
        displayData(data)
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

function displayData(data){
    let local_path = "http://localhost:3000/images/"
    let subtotal_price = 0

    document.getElementById("num_items").innerHTML = "(" + data.length + " items)";
    document.getElementById("num_items_total").innerHTML = "(" + data.length + " items)";

    for (let i = 0; i < data.length; i++) {
        let block = document.createElement("div");
        block.id = "product_" + data[i].id ;
        block.className = "item_block";
        document.getElementById("products_section").appendChild(block);

        let image = document.createElement("img");
        image.className = "item_image";
        image.src = local_path + data[i].img_path;
        document.getElementById(block.id).appendChild(image);

        let info_left = document.createElement("div")
        info_left.id = "info_left_" + data[i].id ;
        info_left.className = "info_left"
        document.getElementById(block.id).appendChild(info_left);

        let a_header = document.createElement("a");
        a_header.innerText = data[i].product_name;
        a_header.className = "a_header";
        a_header.href = "http://localhost:3000/product_page?name=" + data[i].product_name;
        document.getElementById(info_left.id).appendChild(a_header);

        let p_subheader = document.createElement("p");
        p_subheader.innerText = data[i].short_description;
        p_subheader.className = "p_subheader";
        document.getElementById(info_left.id).appendChild(p_subheader);

        let p_color = document.createElement("p");
        p_color.innerText = data[i].color;
        p_color.className = "p_color";
        document.getElementById(info_left.id).appendChild(p_color);

        let p_quantity = document.createElement("p");
        p_quantity.innerText = "Qty 1"
        p_quantity.className = "p_quantity"
        document.getElementById(info_left.id).appendChild(p_quantity);

        let info_right = document.createElement("div")
        info_right.id = "info_right_" + data[i].id ;
        info_right.className = "info_right"
        document.getElementById(block.id).appendChild(info_right);

        let p_price = document.createElement("p");
        p_price.innerText = data[i].price + " AED";
        p_price.className = "p_price";
        document.getElementById(info_right.id).appendChild(p_price);
        subtotal_price += data[i].price;

        let bin = document.createElement("img");
        bin.id = "image_bin_" + data[i].id ;
        bin.src = local_path + "bin_del.png"
        bin.className = "bin_del_pic";
        bin.setAttribute("onclick", "delItem(this)");
        document.getElementById(info_right.id).appendChild(bin);
    }

    document.getElementById("subtotal_price").innerText = subtotal_price + "AED";
    document.getElementById("vat").innerText = (Math.floor(subtotal_price * 0.05)) + "AED";
    document.getElementById("total_price").innerText = (subtotal_price + Math.floor(subtotal_price * 0.05)) + "AED";
}



// about cookies: start
function getId(){
    let strings = window.crypto.getRandomValues(new BigUint64Array(2));
    let id = strings[0].toString(36) + strings[1].toString(36).toUpperCase();
    return id;
}

function setUserCookies() {
    if (!(document.cookie)){
        let name = "user_id"
        let value = getId()
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    }
}
// about cookies: end