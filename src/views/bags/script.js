var param_obj = {value: [], name: []}



fetch(`http://localhost:3000/api/v1/bags`, {
    method: 'PUT',
    body: JSON.stringify(param_obj),
    })
.then(response => response.json())
.then(data => {
    displayBagsData(data);
})
.catch(error => console.error('Error fetching user data:', error));

function displayBagsData(data) {

}



function delAllSections(){
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

function fetchData(){
    fetch(`http://localhost:3000/api/v1/bags`, {
            method: 'PUT',
            body: JSON.stringify(param_obj)},
            )
        .then(response => response.json())
        .then(data => {
            displayBagsData(data);
        })
        .catch(error => console.error('Error fetching user data:', error));
}
function getParameter(arg) {
    if (arg.checked){
        param_obj.value.push(arg.value);
        param_obj.name.push(arg.name);
    }else{
        var index_delete = param_obj.value.indexOf(arg.value);
        param_obj.value.splice(index_delete, 1);
        param_obj.name.splice(index_delete, 1);
    }
    fetchData(param_obj)
}