const studentsApi = "http://localhost:3001/students";

var createBtn = document.querySelector('#create');
var updateBtn = document.querySelector('#update');
var stName = document.querySelector('input[name="name"]');
var address = document.querySelector('input[name="address"]');

function generateUuid() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Render ra từng sinh viên
 * @param {*} student 
 * @returns 
 */
function renderStudent(student) {
    return `<li class='student-${student.id}'>
                <h2>Name: ${student.name}</h2>
                <p>Address: ${student.address}</p>
                <button onclick="onUpdate('${student.id}')">Sửa</button>
                <button onclick="onDelete('${student.id}')">Xóa</button>
            </li>`
}

async function displaySinhVien() {
    var students = await axios.get(studentsApi);
    students = students.data;

    var ulElement = document.querySelector('#list-students');

    var htmls = '';
    for (const student of students) {
        htmls += renderStudent(student);
    }
    ulElement.innerHTML = htmls;
}
displaySinhVien();

// Xử lý khi kích vào button Thêm
createBtn.onclick = async function () {
    var check = true;
    if (isRequired(stName)) {
        check = false;
    }
    if (isRequired(address)) {
        check = false;
    }
    if (check) {
        var newSt = {
            id: generateUuid(),
            name: stName.value,
            address: address.value
        }

        var result = await axios({
            method: "POST",
            url: studentsApi,
            data: newSt
        })

        result = result.data;
        var ulElement = document.querySelector('#list-students');
        ulElement.innerHTML += renderStudent(result);
        stName.value = '';
        address.value = '';
    }

    function isRequired(input) {
        var errorElement = input.parentElement.querySelector('.form-message');
        if (input.value.trim() === '') {
            errorElement.setAttribute('style', 'display: block; color: red; font-style: italic;');
            errorElement.innerText = 'Yêu cầu nhập!';
            input.classList.add('invalid');
            return true;
        }
    }
}

function handleBlurInput(input) {
    var errorElement = input.parentElement.querySelector('.form-message');
    input.onblur = function () {
        if (input.value.trim() === '') {
            errorElement.setAttribute('style', 'display: block; color: red; font-style: italic;');
            errorElement.innerText = 'Yêu cầu nhập!';
            input.classList.add('invalid');
        }
    }

    input.oninput = function () {
        errorElement.setAttribute('style', 'display: none;');
        input.classList.remove('invalid');
    }
}

handleBlurInput(stName);
handleBlurInput(address);

var idEd;
// Xử lý khi kích vào button Sửa
async function onUpdate(id) {
    idEd = id;
    // tìm sinh viên muốn sửa
    var student = await axios({
        method: "GET",
        url: studentsApi + "/" + id
    });
    student = student.data;

    stName.value = student.name;
    address.value = student.address;

    createBtn.setAttribute('style', 'display: none');
    updateBtn.setAttribute('style', 'display: block');
}

updateBtn.onclick = async function () {
    var student = {
        id: idEd,
        name: stName.value,
        address: address.value
    }
    var result = await axios({
        method: "PUT",
        url: studentsApi + "/" + idEd,
        data: student
    })

    result = result.data;
    var htmls = renderStudent(result);
    var studentElement = document.querySelector('.student-' + idEd);
    if (studentElement) {
        studentElement.outerHTML = htmls;
    }
    createBtn.setAttribute('style', 'display: none');
    updateBtn.setAttribute('style', 'display: block');
    stName.value = '';
    address.value = '';
}

// Xử lý khi kích vào button Xóa
async function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        await axios({
            method: "DELETE",
            url: studentsApi + '/' + id
        })
        var studentElement = document.querySelector('.student-' + id);
        if (studentElement) {
            studentElement.remove();
        }
    }
}