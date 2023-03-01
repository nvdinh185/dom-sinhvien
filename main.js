const students = [
    {
        id: 1,
        name: "Dinh",
        address: "hue"
    },
    {
        id: 2,
        name: "Nam",
        address: "quang nam"
    },
    {
        id: 3,
        name: "Tan",
        address: "da nang"
    },
    {
        id: 4,
        name: "Hung",
        address: "hue"
    },
    {
        id: 5,
        name: "Tri",
        address: "quang tri"
    },
    {
        id: 6,
        name: "Anh",
        address: "hue"
    },
    {
        id: 7,
        name: "Binh",
        address: "da nang"
    }
];

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

/**
 * Render ra mảng sinh viên
 * @param {*} arrStudents 
 */
function render(arrStudents) {
    var ulElement = document.querySelector('#list-students');

    var htmls = '';
    for (const student of arrStudents) {
        htmls += renderStudent(student);
    }
    ulElement.innerHTML = htmls;
}

render(students);

var createBtn = document.querySelector('#create');
var stName = document.querySelector('input[name="name"]');
var address = document.querySelector('input[name="address"]');

// Xử lý khi kích vào button Thêm
createBtn.onclick = function () {
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
        students.unshift(newSt);
        var ulElement = document.querySelector('#list-students');
        ulElement.innerHTML = renderStudent(newSt) + ulElement.innerHTML;
        stName.value = '';
        address.value = '';
    }
}

// Xử lý khi kích vào button Sửa
function onUpdate(id) {
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

    updateBtn.onclick = function () {
        var student = {
            id: id,
            name: stName.value,
            address: address.value
        }
        var idx = students.findIndex(function (student) {
            return student.id === id;
        })
        students.splice(idx, 1, student);
        var htmls = renderStudent(student);
        var studentElement = document.querySelector('.student-' + id);
        if (studentElement) {
            studentElement.innerHTML = htmls;
        }
        updateBtn.parentElement.appendChild(createBtn);
        updateBtn.remove();
        stName.value = '';
        address.value = '';
    }
}

// Xử lý khi kích vào button Xóa
function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        var idx = students.findIndex(function (student) {
            return student.id === id;
        })
        students.splice(idx, 1);
        var studentItem = document.querySelector('.student-' + id);
        if (studentItem) {
            studentItem.remove();
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

handleBlurInput(stName);
handleBlurInput(address);