const students = [
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
 * @param {*} arrStudents 
 */
function render(arrStudents) {
    var ulElement = document.querySelector('#list-students');

    var htmls = arrStudents.map(function (student) {
        return `<li>
                    <h2>Name: ${student.name}</h2>
                    <p>Address: ${student.address}</p>
                </li>`
    });
    // for (const student of arrStudents) {
    //     htmls += `<li>
    //                 <h2>Name: ${student.name}</h2>
    //                 <p>Address: ${student.address}</p>
    //             </li>`
    // }
    ulElement.innerHTML = htmls.join('');
}

render(students);

var createBtn = document.querySelector('#create');
var stName = document.querySelector('input[name="name"]');
var address = document.querySelector('input[name="address"]');

function generateUuid() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Xử lý khi kích vào button Thêm
createBtn.onclick = function () {
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
            errorElement.setAttribute('style', 'display: block; color: red; font-style: italic;');
            errorElement.innerText = 'Yêu cầu nhập!';
            input.classList.add('invalid');
            return true;
        } else {
            errorElement.setAttribute('style', 'display: none;');
            input.classList.remove('invalid');
            return false;
        }
    }
}