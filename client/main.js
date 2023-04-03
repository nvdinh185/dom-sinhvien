const studentsApi = "http://localhost:3001/students";

var createBtn = document.querySelector('#create');
var stName = document.querySelector('input[name="name"]');
var address = document.querySelector('input[name="address"]');
var students = [];

/**
 * Render ra từng sinh viên
 * @param {*} student 
 * @returns 
 */
function renderStudent(student) {
    return `<li class='student-${student.id}'>
                <h2>Name: ${student.name}</h2>
                <p>Address: ${student.address}</p>
                <button onclick="onUpdate(${student.id})">Sửa</button>
                <button onclick="onDelete(${student.id})">Xóa</button>
            </li>`
}

(async function () {
    students = await axios.get(studentsApi);
    students = students.data;

    var ulElement = document.querySelector('#list-students');

    var htmls = students.map(function (student) {
        return renderStudent(student);
    })
    ulElement.innerHTML = htmls;
})()

// Xử lý khi kích vào button Thêm
createBtn.onclick = async function () {
    var check = true;
    if (validation(stName)) {
        check = false;
    }
    if (validation(address)) {
        check = false;
    }
    if (check) {
        var newSt = {
            id: students.length + 1,
            name: stName.value,
            address: address.value
        }

        var result = await axios({
            method: "POST",
            url: studentsApi,
            data: JSON.stringify(newSt),
            headers: { "Content-Type": "application/json" },
        })

        result = result.data;
        students.unshift(result);
        var ulElement = document.querySelector('#list-students');
        ulElement.innerHTML = renderStudent(result) + ulElement.innerHTML;
        stName.value = '';
        address.value = '';
    }

    function validation(input) {
        var errorElement = input.parentElement.querySelector('.form-message');
        if (input.value === '') {
            Object.assign(errorElement.style, {
                display: 'block',
                color: 'red',
                fontStyle: 'italic'
            })
            return true;
        } else {
            errorElement.setAttribute('style', 'display: none;');
            return false;
        }
    }
}

function handleBlurInput(input) {
    var errorElement = input.parentElement.querySelector('.form-message');
    input.onblur = function () {
        if (input.value === '') {
            errorElement.setAttribute('style', 'display: block; color: red; font-style: italic;');
        } else {
            errorElement.setAttribute('style', 'display: none;');
        }
    }
}

handleBlurInput(stName);
handleBlurInput(address);

// Xử lý khi kích vào button Sửa
async function onUpdate(id) {
    // tìm sinh viên muốn sửa
    var student = students.find(function (st) {
        return st.id === id;
    })

    stName.value = student.name;
    address.value = student.address;

    var updateBtn = document.createElement('button');
    updateBtn.id = 'update';
    updateBtn.innerText = 'Sửa';
    if (!document.getElementById('update')) {
        createBtn.parentElement.appendChild(updateBtn);
        createBtn.remove();
    }

    updateBtn.onclick = async function () {
        var student = {
            id: id,
            name: stName.value,
            address: address.value
        }
        var result = await axios({
            method: "PUT",
            url: studentsApi + "/" + id,
            data: JSON.stringify(student),
            headers: { "Content-Type": "application/json" },
        })

        result = result.data;
        var idx = students.findIndex(function (student) {
            return student.id === id;
        })
        students.splice(idx, 1, result);
        var htmls = renderStudent(result);
        var studentElement = document.querySelector('.student-' + id);
        if (studentElement) {
            studentElement.outerHTML = htmls;
        }
        updateBtn.parentElement.appendChild(createBtn);
        updateBtn.remove();
        stName.value = '';
        address.value = '';
    }
}

// Xử lý khi kích vào button Xóa
async function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        await axios({
            method: "DELETE",
            url: studentsApi + '/' + id,
            headers: { "Content-Type": "application/json" }
        })
        var studentElement = document.querySelector('.student-' + id);
        if (studentElement) {
            studentElement.remove();
        }
    }
}