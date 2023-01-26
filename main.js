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

function renderStudent(student) {
    return `<li class='student-${student.id}'>
                <h2>Name: ${student.name}</h2>
                <p>Address: ${student.address}</p>
                <button onclick="onUpdate(${student.id})">Sửa</button>
                <button onclick="onDelete(${student.id})">Xóa</button>
            </li>`
}

function render(arrStudents) {
    var ulElement = document.querySelector('#list-students');

    var htmls = '';
    for (const student of arrStudents) {
        htmls += renderStudent(student);
    }
    ulElement.innerHTML = htmls;
}

render(students);

var button = document.querySelector('#create');
var stName = document.querySelector('input[name="name"]');
var address = document.querySelector('input[name="address"]');

button.onclick = function () {
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

function onUpdate(id) {
    var student = students.find(function (st) {
        return st.id === id;
    })

    stName.value = student.name;
    address.value = student.address;

    var createBtn = document.querySelector('#create');
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
        var studentItem = document.querySelector('.student-' + id);
        if (studentItem) {
            studentItem.innerHTML = htmls;
        }
        updateBtn.parentElement.appendChild(createBtn);
        updateBtn.remove();
        stName.value = '';
        address.value = '';
    }
}

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

stName.onblur = function () {
    if (this.value === '') {
        this.parentElement.querySelector('.form-message')
            .setAttribute('style', 'display: block; color: red; font-style: italic;');
    } else {
        this.parentElement.querySelector('.form-message')
            .setAttribute('style', 'display: none;');
    }
}

address.onblur = function () {
    if (this.value === '') {
        this.parentElement.querySelector('.form-message')
            .setAttribute('style', 'display: block; color: red; font-style: italic;');
    } else {
        this.parentElement.querySelector('.form-message')
            .setAttribute('style', 'display: none;');
    }
}

function validation(input) {
    if (input.value === '') {
        input.parentElement.querySelector('.form-message')
            .setAttribute('style', 'display: block; color: red; font-style: italic;');
        return true;
    } else {
        input.parentElement.querySelector('.form-message')
            .setAttribute('style', 'display: none;');
        return false;
    }
}