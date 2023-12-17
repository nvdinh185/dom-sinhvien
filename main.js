var students = [
    {
        id: '1',
        name: "Dinh",
        address: "hue"
    },
    {
        id: '2',
        name: "Nam",
        address: "quang nam"
    },
    {
        id: '3',
        name: "Tan",
        address: "da nang"
    },
    {
        id: '4',
        name: "Hung",
        address: "hue"
    },
    {
        id: '5',
        name: "Tri",
        address: "quang tri"
    },
    {
        id: '6',
        name: "Anh",
        address: "hue"
    },
    {
        id: '7',
        name: "Binh",
        address: "da nang"
    }
]

/**
 * Render ra mảng sinh viên
 * @param {*} array 
 */
function render(array) {
    var ulElement = document.querySelector('#list-students');

    var htmls = array.map(function (student) {
        return `<li>
                    <h2>Name: ${student.name}</h2>
                    <p>Address: ${student.address}</p>
                    <button onclick="onUpdate('${student.id}')">Sửa</button>
                    <button onclick="onDelete('${student.id}')">Xóa</button>
                </li>`
    });

    ulElement.innerHTML = htmls.join('');
}

render(students);

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

// Xử lý khi kích vào button Thêm
createBtn.onclick = function (e) {
    e.preventDefault();
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
        students.push(newSt);
        render(students);

        stName.value = '';
        address.value = '';
    }

    function isRequired(input) {
        var errorElement = input.parentElement.querySelector('.form-message');
        if (input.value.trim() === '') {
            errorElement.setAttribute('style', 'color: red; font-style: italic;');
            errorElement.innerText = 'Yêu cầu nhập!';
            input.classList.add('invalid');
            return true;
        }
    }
}

var idEd;
// Xử lý khi kích vào button Sửa
function onUpdate(id) {
    idEd = id;
    // tìm sinh viên muốn sửa
    var edStudent = students.find(function (st) {
        return st.id === idEd;
    })

    stName.value = edStudent.name;
    address.value = edStudent.address;

    createBtn.setAttribute('style', 'display: none');
    updateBtn.setAttribute('style', 'display: block');
}

// Xử lý sửa sinh viên
updateBtn.onclick = function (e) {
    e.preventDefault();
    var student = {
        id: idEd,
        name: stName.value,
        address: address.value
    }
    var idx = students.findIndex(function (student) {
        return student.id === idEd;
    })
    students.splice(idx, 1, student);
    render(students);
    createBtn.setAttribute('style', 'display: block');
    updateBtn.setAttribute('style', 'display: none');
    stName.value = '';
    address.value = '';
}

// Xử lý khi kích vào button Xóa
function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        // var idx = students.findIndex(function (student) {
        //     return student.id === id;
        // })
        // students.splice(idx, 1);
        students = students.filter(std => std.id !== id);
        render(students);
    }
}

/**
 * Hàm để xử lý khi blur hoặc nhập vào ô input
 * @param {*} input 
 */
function handleBlurInput(input) {
    var errorElement = input.parentElement.querySelector('.form-message');
    input.onblur = function () {
        if (input.value.trim() === '') {
            errorElement.setAttribute('style', 'color: red; font-style: italic;');
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