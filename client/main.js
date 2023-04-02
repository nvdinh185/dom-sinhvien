const studentsApi = "http://localhost:3001/students";

var createBtn = $('#create');
var stName = $('input[name="name"]');
var address = $('input[name="address"]');
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

    var ulElement = $('#list-students');

    var htmls = students.map(function (student) {
        return renderStudent(student);
    })
    ulElement.html(htmls);
})()

// Xử lý khi kích vào button Thêm
createBtn.click(async function () {
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
            name: stName.val(),
            address: address.val()
        }

        var result = await axios({
            method: "POST",
            url: studentsApi,
            data: JSON.stringify(newSt),
            headers: { "Content-Type": "application/json" },
        })

        result = result.data;
        students.unshift(result);
        var ulElement = $('#list-students');
        ulElement.html(renderStudent(result) + ulElement.html());
        stName.val('');
        address.val('');
    }

    function validation(input) {
        var errorElement = input.parent().children()[3];
        if (input.val() === '') {
            Object.assign(errorElement.style, {
                display: 'block',
                color: 'red',
                fontStyle: 'italic'
            })
            return true;
        } else {
            $(errorElement).attr('style', 'display: none;');
            return false;
        }
    }
})

function handleBlurInput(input) {
    var errorElement = input.parent().children()[3];
    input.blur(function () {
        if (input.val() === '') {
            $(errorElement).attr('style', 'display: block; color: red; font-style: italic;');
        } else {
            $(errorElement).attr('style', 'display: none;');
        }
    })
}

handleBlurInput(stName);
handleBlurInput(address);

// Xử lý khi kích vào button Sửa
async function onUpdate(id) {
    // tìm sinh viên muốn sửa
    var student = students.find(function (st) {
        return st.id === id;
    })

    stName.val(student.name);
    address.val(student.address);

    var updateBtn = $("#update");
    $(updateBtn).attr('style', 'display: block;');
    $(createBtn).attr('style', 'display: none');

    updateBtn.click(async function () {
        var student = {
            id: id,
            name: stName.val(),
            address: address.val()
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
        var studentElement = $('.student-' + id);
        if (studentElement) {
            studentElement.html(htmls);
        }
        $(updateBtn).attr('style', 'display: none;');
        $(createBtn).attr('style', 'display: block;');
        stName.val('');
        address.val('');
    })
}

// Xử lý khi kích vào button Xóa
async function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        await axios({
            method: "DELETE",
            url: studentsApi + '/' + id,
            headers: { "Content-Type": "application/json" }
        })
        var studentElement = $('.student-' + id);
        if (studentElement) {
            studentElement.remove();
        }
    }
}