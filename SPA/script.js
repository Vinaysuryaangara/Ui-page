
const userDB = {};
let mode = 'add';
const tableBodyElement = document.getElementById('table-body');


const generateUser = (userId) => {

    return `
        <tr>
            <td onclick=\"showUserDetails(\'${userId}\')\">${userId}</td>
            <td onclick=\"showUserDetails(\'${userId}\')\">${userDB[userId].name}</td>
            <td onclick=\"showUserDetails(\'${userId}\')\">${userDB[userId].age}</td>
            <td onclick=\"showUserDetails(\'${userId}\')\">${userDB[userId].place}</td>
            <td>
                <div class=\"d-flex\">
                    <button onclick=\"editUser(\'${userId}\')\"><i class=\"fa-solid fa-user-pen\"></i></button>
                    <button onclick=\"deleteUser(\'${userId}\')\"><i class=\"fa-solid fa-user-xmark\"></i></button>
                </div>
            </td>
        </tr>`
}


function refreshUserList() {
    let tableBodyHtml = ""

    Object.keys(userDB).forEach(userId => {
        tableBodyHtml += generateUser(userId);
    });
    
    tableBodyElement.innerHTML = tableBodyHtml;
}


function generateUserId() {
    return 'ID-' + Math.floor(Math.random() * 20);
}

function toggleModal(userId) {
    const addUserModal = document.getElementById("add-user-modal");
    addUserModal.style.display = addUserModal.style.display === "block" ? "none" : "block";
    if (addUserModal.style.display === "block") {
        const modalBtn = document.getElementById('modal-btn');
        const modalHeading = document.getElementById('modal-heading');
        
        if (mode === "add") {
            const userId = generateUserId()
            modalBtn.innerHTML = `<button class="btn" onclick=\"save(\'${userId}\')\"><i class="fa-solid fa-user-plus"></i> Add User</button>`;
            modalHeading.innerHTML = ' Add User';
        } else {
            modalBtn.innerHTML = `<button class="stclr" onclick=\"save(\'${userId}\')\"><i class=\"fa-solid fa-user-pen\" 
            ></i> Edit User</button>`;
            modalHeading.innerHTML = 'Edit User';
        }
    } else {
        initializeFormValues("", "", "");
        mode = 'add';
    }
}
  
function initializeFormValues(name, age, place) {
    document.getElementById("name").value = name;
    document.getElementById("age").value = age;
    document.getElementById("place").value = place;
}


function extractFormValues() {
    const user = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        place: document.getElementById("place").value,
        imageURL: './image' + Math.floor(Math.random() * 5) + '.jpeg'
    }
    return user;
}

function updateDB(userId) {
    const user = extractFormValues();
    userDB[userId] = user;
}

function editUser(userId) {
    mode = "edit";
    toggleModal(userId);
    initializeFormValues(userDB[userId].name, userDB[userId].age, userDB[userId].place);
}


function save(userId) {
    updateDB(userId);
    refreshUserList();
    toggleModal()
}

function deleteUser(userId) {
      alert("The deleted data doesnt get back")
    delete userDB[userId];
    if (Object.keys(userDB).length === 0) {
        
        tableBodyElement.innerHTML = `
            <tr>
                <td colspan=\"5\">
                    <div style=\"display: flex; justify-content: space-around;\"> No Users</div>
                </td>
            </tr>`;
    } else {
     
        refreshUserList();
    }
}

function generateUserDetails(userId) {

    return ` <button class="data" onclick="blockshowuserDetails()">Table</button><div class="center"><h1>personal details:</h1><div class="detail-row">
                <p>Name: 
               ${userDB[userId].name}</p>
            </div>
            <div class="detail-row">
                <p>Age: 
                ${userDB[userId].age}</p>
            </div>
            <div class="detail-row">
                <p>Place:
                ${userDB[userId].place}</p>
            </div>
            <div class="detail-row">
                <p>Image:</p>
                <img src="${userDB[userId].imageURL}">
            </div></div>`
}

function showUserDetails(userId) {
    const deatilsBody = document.getElementById('details-body');
    deatilsBody.innerHTML = generateUserDetails(userId);
    document.getElementById("disply").style.display = "none";
      document.getElementById("blocking").style.display = "block";  
}
function blockshowuserDetails(){
    document.getElementById("disply").style.display = "block";
     document.getElementById("blocking").style.display = "none";                             
}
