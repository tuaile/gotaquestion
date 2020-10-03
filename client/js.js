window.onload = function() {
	loginstatus();
}
async function cq() {
    var question = document.getElementById("question");
    var catagories = document.getElementById("catagories");
    var currentlloginid = await currentloginid();
    var questiondetails = new FormData();
    questiondetails.append('question', question.value);
    questiondetails.append('catagories', catagories.value);
    questiondetails.append('loginid', currentlloginid);
    fetch('http://localhost/gaq/api/api.php?action=createquestion', {
        method: 'POST',
        body: questiondetails,
    });
}
function vq() {
   var out = ''; 
   fetch('http://localhost/gaq/api/api.php?action=viewquestion', {
       method: 'GET',
    })
   .then(function(response) {

        response.json().then( async function(data) {
            var id = await currentloginid();
            console.log(id);
            data.forEach(row => {
                if(row.loginid == id) {
                    editquestion = '';
                    deletequestion = '';
                } else {
                    editquestion = '<button class="editquestionbutton" onclick="editquestionmodal(); eq(this);">Edit Question</button>';
                    deletequestion = '<button class="deletequestionbutton" onclick="dq(this)">Delete Question</button>';
                }
                out += '<tr><td>' + row.question +
                '</td><td>' + row.timestamp +
                '</td><td>' + row.catagories +
                '</td><td>' + row.answer +
                '</td><td>' + editquestion + 
                '</td><td>' + deletequestion +
                '</td><td style="display:none !important;">' + row.questionid +
                '</td></tr>';
            });
            queue.innerHTML = out;
        })
    });
}
function eq(row) {
    var out = ''; 
    window.questionrow = row.parentNode.parentNode.lastChild.innerHTML;
    var editquestionfd = new FormData();
    editquestionfd.append('questionid', questionrow);
    fetch('http://localhost/gaq/api/api.php?action=editquestion', {
       method: 'POST',
       body: editquestionfd,
    })
   .then(function(response) {
        response.json()
    .then(function(response) {
            response.forEach(row => {
                document.getElementById("editquestion").value = row.question;
            });
            editquestion.innerHTML = out;
        })
    }); 
}
function sq() {
    var editquestion = document.getElementById("editquestion");
    var questionrows = questionrow;
    var editquestiondetails = new FormData();
    editquestiondetails.append('newquestion', editquestion.value);
    editquestiondetails.append('questionidentify', questionrows);
    fetch('http://localhost/gaq/api/api.php?action=savequestion', {
       method: 'POST',
       body: editquestiondetails,
    })
}
function dq(row) {
    var questionidentify = row.parentNode.parentNode.lastChild.innerHTML;
    var deletequestionfd = new FormData();
    deletequestionfd.append('questionid', questionidentify);
    fetch('http://localhost/gaq/api/api.php?action=deletequestion', {
        method: 'POST',
        body: deletequestionfd,
    });
}
function login() {
    var studentnumber = document.getElementById("studentnumber");
    var password = document.getElementById("password");
    var logindetails = new FormData();
    logindetails.append('studentnumber', studentnumber.value);
    logindetails.append('password', password.value);
    fetch('http://localhost/gaq/api/api.php?action=login', {
        method: 'POST',
        body: logindetails,
    }
)
    .then(function(response){
        if (response.status == 202) {
            var studentnumber = document.getElementById("studentnumber");
            var logindetails = new FormData();
            logindetails.append('numberofstudent', studentnumber.value);
            fetch('http://localhost/gaq/api/api.php?action=processlogin', {
            method: 'POST',
            body: logindetails,
            });
            var createquestion = document.querySelector(".createquestion");
            createquestion.style.display = "block";
            var logout = document.querySelector("#logout");
            logout.style.display = "block";
            var viewuser = document.querySelector("#viewuser");
            viewuser.style.display = "block";
            var login = document.querySelector(".reloadquestion");
            login.style.display = "block";
            var table = document.querySelector("#table");
            table.style.display = "block";
            var login = document.querySelector("#signinbtn");
            login.style.display = "none";
            vq();
            console.log("Success");
        } else {
            console.log("Error");
        }
    })

}
function logout() {
    fetch('http://localhost/gaq/api/api.php?action=logout', {
        method: 'GET',
    });
}
async function vu() {
    var userloginid = await currentloginid();
    var currentuserid = new FormData();
    currentuserid.append('userloginid', userloginid);
    fetch('http://localhost/gaq/api/api.php?action=viewuser', {
        method: 'POST',
        body: currentuserid,
    })
    .then(function(response) {
        response.json().then(function(data) {
            data.forEach(row => {
                document.getElementById("userstudentnumber").value = row.studentnumber;
                document.getElementById("userfullname").value = row.fullname;
                document.getElementById("userpassword").value = row.password;
            })
        })
    }); 
}
function su() {
    var studentnumber = document.getElementById("userstudentnumber");
    var fullname = document.getElementById("userfullname");
    var password = document.getElementById("userpassword");
    var newuserdetails = new FormData();
    newuserdetails.append('studentnumber', studentnumber.value);
    newuserdetails.append('fullname', fullname.value);
    newuserdetails.append('password', password.value);
    fetch('http://localhost/gaq/api/api.php?action=saveuser', {
        method: 'POST',
        body: newuserdetails,
    });
}
function loginstatus() {
    fetch('http://localhost/gaq/api/api.php?action=loginstatus', 
        {
            method: 'GET',
        }
    )
    .then(function(response) {
        if (response.status == 206) {
            var createquestion = document.querySelector(".createquestion");
            createquestion.style.display = "block";
            var logout = document.querySelector("#logout");
            logout.style.display = "block";
            var viewuser = document.querySelector("#viewuser");
            viewuser.style.display = "block";
            var login = document.querySelector(".reloadquestion");
            login.style.display = "block";
            var table = document.querySelector("#table");
            table.style.display = "block";
            var signin = document.querySelector("#signinbtn");
            signin.style.display = "none";
        } else {
            console.log("Not Logged In");
        }
    });
}
function currentloginid() {
    return fetch('http://localhost/gaq/api/api.php?action=userid', {
       method: 'GET',
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
            var userid = JSON.parse(data);
            console.log(userid);
            return userid;
        })
}
function loginmodal() {
	$('.ui.basic.modal.login')
    .modal('show');
}
function createquestionmodal() {
    $('.ui.basic.modal.createquestion')
    .modal('show');
}
function editquestionmodal() {
    $('.ui.basic.modal.editquestion')
    .modal('show');
}
function editusermodal() {
    $('.ui.basic.modal.edituser')
    .modal('show');
}