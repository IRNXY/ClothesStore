// about header: start
styleEdit()

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

function styleEdit(){
    var header_height = document.getElementById('shop_title').offsetHeight;
    document.getElementsByTagName('main')[0].style.paddingTop = header_height + 'px';
}

window.addEventListener('resize', () => {
    styleEdit()
});

// about header: end

function serializeForm(formNode) {
    let answ = {}
    const { elements } = formNode
    for (let i = 0; i < elements.length; i++) {
        if(elements[i].name){
            answ[elements[i].name] = elements[i].value
        }
    }
    // console.log(answ);
    sendEmail(answ)
}

function handleFormSubmit(event) {
    event.preventDefault()
    serializeForm(applicantForm)
}


function sendEmail(arg){
    arg["user_id"] = document.cookie.split("=")[1]
    fetch(`http://localhost:3000/api/v1/email`,
        {method:"POST",
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(arg),
        })
    .then(response => response.json())
    .then(data => { window.location = "http://localhost:3000/confirmation" })
    .catch(error => console.error('Error fetching order data:', error));
}

const applicantForm = document.getElementById('form_order')
applicantForm.addEventListener('submit', handleFormSubmit)