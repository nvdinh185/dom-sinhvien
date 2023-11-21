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

function generateUuid() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function render(array) {
    var ulElement = $('#list-students');

    var htmls = array.map(function (student) {
        return `<li>
            <h2>Name: ${student.name}</h2>
            <p>Address: ${student.address}</p>
            <button onclick="onUpdate('${student.id}')">Sửa</button>
            <button onclick="onDelete('${student.id}')">Xóa</button>
        </li>`
    });

    ulElement.html(htmls.join(''));
}
render(students);

var createBtn = $('#create');
var updateBtn = $("#update");
var stName = $('input[name="name"]');
var address = $('input[name="address"]');

// Xử lý khi kích vào button Thêm
createBtn.click(function () {
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
            name: stName.val(),
            address: address.val()
        }

        students.push(newSt);
        render(students);
        stName.val('');
        address.val('');
    }

    function isRequired(input) {
        var errorElement = input.parent().children()[3];
        if (input.val().trim() === '') {
            $(errorElement).attr('style', 'color: red; font-style: italic;');
            $(errorElement).text('Yêu cầu nhập!');
            input.addClass('invalid');
            return true;
        }
    }
})

function handleBlurInput(input) {
    var errorElement = input.parent().children()[3];
    input.blur(function () {
        if (input.val().trim() === '') {
            $(errorElement).attr('style', 'color: red; font-style: italic;');
            $(errorElement).text('Yêu cầu nhập!');
            input.addClass('invalid');
        }
    })

    input.on('input', function () {
        $(errorElement).attr('style', 'display: none;');
        input.removeClass('invalid');
    })
}

handleBlurInput(stName);
handleBlurInput(address);

var idEd;
// Xử lý khi kích vào button Sửa
function onUpdate(id) {
    idEd = id;
    // tìm sinh viên muốn sửa
    var edStudent = students.find(function (st) {
        return st.id === idEd;
    })

    stName.val(edStudent.name);
    address.val(edStudent.address);
    $(updateBtn).attr('style', 'display: block;');
    $(createBtn).attr('style', 'display: none');
}

// Xử lý sửa sinh viên
updateBtn.click(function () {
    var student = {
        id: idEd,
        name: stName.val(),
        address: address.val()
    }

    var idx = students.findIndex(function (student) {
        return student.id === idEd;
    })

    students.splice(idx, 1, student);
    render(students);

    $(updateBtn).attr('style', 'display: none;');
    $(createBtn).attr('style', 'display: block;');
    stName.val('');
    address.val('');
})

// Xử lý khi kích vào button Xóa
async function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        var idx = students.findIndex(function (student) {
            return student.id === id;
        })
        students.splice(idx, 1);
        render(students);
    }
}