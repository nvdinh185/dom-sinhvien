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

function render(arrStudents) {
    var ulElement = document.querySelector('#list-students');

    var html = '';
    for (const student of arrStudents) {
        html += `<li>
                    <h2>Name: ${student.name}</h2>
                    <p>Address: ${student.address}</p>
                    <button onclick="onUpdate(${student.id})">Sửa</button>
                    <button onclick="onDelete(${student.id})">Xóa</button>
                </li>`
    }
    ulElement.innerHTML = html;
}

render(students);

var button = document.querySelector('#create');

button.onclick = function () {
    var name = document.querySelector('input[name="name"]');
    var address = document.querySelector('input[name="address"]');
    var newSt = {
        id: students.length + 1,
        name: name.value,
        address: address.value
    }
    students.unshift(newSt);
    render(students);
    name.value = '';
    address.value = '';
}

function onUpdate(id) {
    var student = students.find(function (st) {
        return st.id === id;
    })
    var name = document.querySelector('input[name="name"]');
    var address = document.querySelector('input[name="address"]');

    name.value = student.name;
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
            name: name.value,
            address: address.value
        }
        var idx = students.findIndex(function (student) {
            return student.id === id;
        })
        students.splice(idx, 1, student);
        render(students);
        updateBtn.parentElement.appendChild(createBtn);
        updateBtn.remove();
        name.value = '';
        address.value = '';
    }
}

function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        var idx = students.findIndex(function (student) {
            return student.id === id;
        })
        students.splice(idx, 1);
        render(students);
    }
}