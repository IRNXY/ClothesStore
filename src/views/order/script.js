


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
