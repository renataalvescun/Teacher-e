const URL_BASE = "http://localhost:3001/student";
const URL_BASE2 = "http://localhost:3001/teacher";

window.onload = function(){
    readAll();
    readAllTeachers();
}

function callAPI(url, method, callback, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url, true);
    if (method == 'POST' || method == 'PATCH' || method == 'PUT') {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
    xhr.onload = function () {
        callback(xhr.status, xhr.response);
    }
    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}

function createCard(student) {
    var str = "<article>";
    str += "<h1>" + student.name + "</h1>";
    str += "<p>" + student.tia + "</p>";
    str += "<p>" + student.course + "</p>";
    str += "<button onclick='deleteStudent(" + student.tia + ")'>X</button>";
    str += "<button onclick='findStudent(" + student.tia + ")'>Editar</button>";
    str += "</article>";
    return str;
}

function readAll() {
    const url = URL_BASE;
    callAPI(url, 'GET', function (status, response) {
        if (status === 200) {
            var content = document.getElementById('content');
            content.innerHTML = "";
            for (var i = 0; i < response.length; i++) {
                var str = createCard(response[i]);
                content.innerHTML += str;
            }

        } else {
            alert("Erro ao contatar o servidor. Tente novamente mais tarde!");
        }
    });
}

function insertStudent() {
    event.preventDefault();
    var student = {
        name: document.getElementById('name').value,
        tia: document.getElementById('tia').value,
        course: document.getElementById('course').value
    }

    const url = URL_BASE;

    callAPI(url, "POST", function (status, response) {
        if (status === 200 || status === 201) {
            readAll();
            clear();
        } else {
            alert("ERRO: " + status);
        }
    }, student);
}

function clear() {
    document.getElementById('name').value = "";
    document.getElementById('tia').value = "";
    document.getElementById('course').value = "";
}

function deleteStudent(tia) {
    const resp = confirm('Deseja realmente apagar o aluno com tia ' + tia + '?');
    if (resp) {
        const url = URL_BASE + "/" + tia;
        callAPI(url, "DELETE", function () {
            readAll();
        });
    }
}

function findStudent(tia) {
    const url = URL_BASE + "/" + tia;
    callAPI(url, "GET", function (status, response) {
        if (status === 200 || status === 201) {
            document.getElementById('name').value = response.name;
            document.getElementById('tia').value = response.tia;
            document.getElementById('course').value = response.course;
            document.getElementById('button').innerHTML = "Atualizar";
            document.getElementById('button').onclick = updateStudent;
        } else {
            alert("ERRO: " + status);
        }
    });
}


function updateStudent() {
    event.preventDefault();
    var student = {
        name: document.getElementById('name').value,
        tia: document.getElementById('tia').value,
        course: document.getElementById('course').value
    }

    const url = URL_BASE + "/";

    callAPI(url, "PATCH", function (status, response) {
        if (status === 200 || status === 201) {
            readAll();

            clear();

            document.getElementById('button').innerHTML = "Inserir";
            document.getElementById('button').onclick = insertStudent;

        } else {
            alert("ERRO: " + status);
        }
    }, student);
}




//-----------------------------------------------------

function createTeacherCard(teacher) {
    var str = "<article>";
    str += "<h1>" + teacher.name + "</h1>";
    str += "<p>" + teacher.drt + "</p>";
    str += "<button class='botao-delete' onclick='deleteTeacher(" + teacher.drt + ")'>X</button>";
    str += "<button class='botao-find' onclick='findTeacher(" + teacher.drt + ")'>Editar</button>";
    str += "</article>";
    return str;
}

function readAllTeachers() {
    const url = URL_BASE2;
    callAPI(url, 'GET', function (status, response) {
        if (status === 200) {
            var content = document.getElementById('content2');
            content.innerHTML = "";
            for (var i = 0; i < response.length; i++) {
                var str = createTeacherCard(response[i]);
                content.innerHTML += str;
            }

        } else {
            alert("Erro ao contatar o servidor. Tente novamente mais tarde!");
        }
    });
}

function insertTeacher() {
    event.preventDefault();
    var teacher = {
        name: document.getElementById('name2').value,
        drt: document.getElementById('drt').value
    }

    const url = URL_BASE2;

    callAPI(url, "POST", function (status, response) {
        if (status === 200 || status === 201) {
            readAllTeachers();
            clear2();
        } else {
            alert("ERRO: " + status);
        }
    }, teacher);
}

function clear2() {
    document.getElementById('name2').value = "";
    document.getElementById('drt').value = "";
}

function deleteTeacher(drt) {
    const resp = confirm('Deseja realmente apagar o professor com DRT ' + drt + '?');
    if (resp) {
        const url = URL_BASE2 + "/" + drt;
        callAPI(url, "DELETE", function () {
            readAllTeachers();
        });
    }
}

function findTeacher(drt) {
    const url = URL_BASE2 + "/" + drt;
    callAPI(url, "GET", function (status, response) {
        if (status === 200 || status === 201) {
            document.getElementById('name2').value = response.name;
            document.getElementById('drt').value = response.drt;
            document.getElementById('button2').innerHTML = "Atualizar";
            document.getElementById('button2').onclick = updateTeacher;
        } else {
            alert("ERRO: " + status);
        }
    });
}


function updateTeacher() {
    event.preventDefault();
    var teacher = {
        name: document.getElementById('name2').value,
        drt: document.getElementById('drt').value
    }

    const url = URL_BASE2 + "/";

    callAPI(url, "PATCH", function (status, response) {
        if (status === 200 || status === 201) {
            readAllTeachers();

            clear2();

            document.getElementById('button2').innerHTML = "Inserir";
            document.getElementById('button2').onclick = insertTeacher;

        } else {
            alert("ERRO: " + status);
        }
    }, teacher);
}