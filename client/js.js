window.onload = function() {
	loginstatus();
    if(localStorage.getItem('Dark Mode') == 'True') {
        darkmodecheckbox.checked = true;
        currentcolor = localStorage.getItem('Secret');
        darkmode(); 
    }
}
async function cq() {
    var question = document.getElementById("question");
    var questioncatagorie = document.getElementById("catagorie");
    var currentlloginid = await currentloginid();
    var questiondetails = new FormData();
    questiondetails.append('question', question.value);
    questiondetails.append('catagories', questioncatagorie.value);
    questiondetails.append('loginid', currentlloginid);
    fetch('api/api.php?action=createquestion', {
        method: 'POST',
        body: questiondetails,
    })
    .then(function(response) {
        if (response.status == 401) {
            errormessage("Naughty Naughty, You Have Unauthorised Access");
        }
        if (response.status == 404) {
            errormessage("Teachers Can't Mind Read Yet, Please Add A Question");
        }
        if (response.status == 202) {
            successmessage("Question Created, Now Sit Back And Relax");
            vq();
        }
    });
}
function vq() {
    loadingmodal();
    var out = ''; 
    fetch('api/api.php?action=viewquestion', {
       method: 'GET',
    })
    .then(function(response) {
        if (response.status == 401) {
            errormessage("Naughty Naughty, You Have Unauthorised Access");
        }
        response.json().then( async function(data) {
            if (data.length == 0 ) {
            errormessage("Ummm... We Don't Have Any Question To You");
            }
            var id = await currentloginid();
            data.forEach(row => {
                if(row.loginid == id) {
                    editquestion = '<button class="editquestionbutton ui positive basic button" onclick="editquestionmodal(); eq(this);">Edit Question</button>';
                    deletequestion = '<button class="deletequestionbutton ui negative basic button" onclick="dq(this)">Delete Question</button>';
                } else {
                    editquestion = '';
                    deletequestion = '';
                }
                out += '<tr><td>' + row.question +
                '</td><td>' + row.timestamp +
                '</td><td>' + row.catagories +
                '</td><td>' + (row.answer === null ? "Not Answered" : row.answer) +
                '</td><td>' + editquestion + 
                '</td><td>' + deletequestion +
                '</td><td style="display:none !important;">' + row.questionid +
                '</td></tr>';
            });
            queue.innerHTML = out;
            darkmode();
            closeloadingmodal();
        })
    });
}
function eq(row) {
    var out = ''; 
    window.questionrow = row.parentNode.parentNode.lastChild.innerHTML;
    var editquestionfd = new FormData();
    editquestionfd.append('questionid', questionrow);
    fetch('api/api.php?action=editquestion', {
       method: 'POST',
       body: editquestionfd,
    })
   .then(function(response) {
        if (response.status == 401) {
            errormessage("Naughty Naughty, You Have Unauthorised Access");
        }
        if (response.status == 404) {
            errormessage("Stop... This Question Doesn't Exist");
        }
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
    fetch('api/api.php?action=savequestion', {
       method: 'POST',
       body: editquestiondetails,
    })
    .then(function(response) {
        if (response.status == 401) {
            errormessage("What Are You Doing Here, Registered Users Only");
        }
        if (response.status == 404) {
            errormessage("Hmm..., You Trying To Trick Me?... Question Can't Be Blank");
        }
        if (response.status == 202) {
            successmessage("Congrats, Question Edited");
            fetch('api/api.php?action=viewquestion');
        }
    })
}
function dq(row) {
    var questionidentify = row.parentNode.parentNode.lastChild.innerHTML;
    var deletequestionfd = new FormData();
    deletequestionfd.append('questionid', questionidentify);
    fetch('api/api.php?action=deletequestion', {
        method: 'POST',
        body: deletequestionfd,
    })
    .then(function(response) {
        if (response.status == 401) {
            errormessage("*Bouncer Stares At You*, What Are You Doing Here?, VIP's Only");
        }
        if (response.status == 404) {
            successmessage("*Conufused Sounds*, What Question Am I Deleting?");
        }
        if (response.status == 202) {
            successmessage("*Hitman Washes Bloodied Hands* ... It's Done Question Deleted");
        }
    });
}
function login() {
    loadinglogin();
    var studentnumber = document.getElementById("studentnumber");
    var password = document.getElementById("password");
    var logindetails = new FormData();
    logindetails.append('studentnumber', studentnumber.value);
    logindetails.append('password', password.value);
    fetch('api/api.php?action=login', {
        method: 'POST',
        body: logindetails,
        credentials: 'include',
    }
)
    .then(function(response) {
        if (response.status == 202) {
            closeloadinglogin();
            var studentnumber = document.getElementById("studentnumber");
            var logindetails = new FormData();
            logindetails.append('numberofstudent', studentnumber.value);
            fetch('api/api.php?action=processlogin', {
            method: 'POST',
            body: logindetails,
            })
            .then(function(response) {
                response.json().then(function(data) {
                    if (data.length == 0 ) {
                        errormessage("Error Something Went Wrong Please Login Again");
                        fetch('api/api.php?action=logout', {
                        method: 'GET',
                        });
                    } else {
                        var studentnumber = data[0].studentnumber;
                        var fullname = data[0].fullname;
                        localStorage.setItem('Student Number', studentnumber);
                        localStorage.setItem('Full Name', fullname);
                        localStorage.setItem('Logged In', "True"); 
                    }
                })
            })
            ;
            var createquestion = document.querySelector("#createquestion");
            createquestion.style.display = "block";
            var logout = document.querySelector("#logout");
            logout.style.display = "block";
            var viewuser = document.querySelector("#viewuser");
            viewuser.style.display = "block";
            var login = document.querySelector("#reloadquestion");
            login.style.display = "block";
            var table = document.querySelector("#table");
            table.style.display = "block";
            var login = document.querySelector("#signinbtn");
            login.style.display = "none";
            var slider = document.querySelector("#slider");
            slider.style.display = "block";
            vq();
        }
        if (response.status == 410) {
            closeloadinglogin();
            errormessage("Please Fill All Fields");
        }
        if (response.status == 404) {
            closeloadinglogin();
            errormessage("Invalid Username Or Password");
        }
        if (response.status == 409) {
            closeloadinglogin();
            errormessage("Already Logged In, Try Again");
            fetch('api/api.php?action=logout', {
            method: 'GET',
            });
        }
        if (response.status == 501) {
            closeloadinglogin();
            errormessage("Server Error Try Again");
        }
    });

}
function logout() {
    fetch('api/api.php?action=logout', {
        method: 'GET',
    })
    .then(function(response) {
        if (response.status == 202) {
            var createquestion = document.querySelector("#createquestion");
            createquestion.style.display = "none";
            var logout = document.querySelector("#logout");
            logout.style.display = "none";
            var viewuser = document.querySelector("#viewuser");
            viewuser.style.display = "none";
            var login = document.querySelector("#reloadquestion");
            login.style.display = "none";
            var table = document.querySelector("#table");
            table.style.display = "none";
            var signin = document.querySelector("#signinbtn");
            signin.style.display = "block";
            var slider = document.querySelector("#slider");
            slider.style.display = "none";
            successmessage("Success, You're Logged Out");
        }
        else {
            errormessage("Internal Server Error Not Logged Out");
        }
    })
    
}
async function vu() {
    var userloginid = await currentloginid();
    var currentuserid = new FormData();
    currentuserid.append('userloginid', userloginid);
    fetch('api/api.php?action=viewuser', {
        method: 'POST',
        body: currentuserid,
    })
    .then(function(response) {
        if (response.status == 401) {
            errormessage("Naughty Naughty, You Have Unauthorised Access");
        }
        response.json().then(function(data) {
            //Checks if returned any json.
            if (data.length == 0) {
                document.getElementById("userstudentnumber").value = "Oops.. Something Went Wrong";
                document.getElementById("userfullname").value = "Oops.. Something Went Wrong";
                document.getElementById("userpassword").value = "Oops.. Something Went Wrong";
            }
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
    fetch('api/api.php?action=saveuser', {
        method: 'POST',
        body: newuserdetails,
    })
    .then(function(response) {
        if (response.status == 401) {
            errormessage("Naughty Naughty, You Have Unauthorised Access");
        }
        if (response.status == 400) {
            errormessage("Bro, You Need A Student Number");
        }
        if (response.status == 411) {
            errormessage("You Need A Name For Database Stuff");
        }
        if (response.status == 412) {
            errormessage("Password Has To Be At Least 6 Characters");
        }
        if (response.status == 405) {
            errormessage("Student Number Has To Be 9 Numbers Only");
        }
        if (response.status == 410) {
            errormessage("Am I Missing Something Are Passwords Supposed To Be Blank?");
        }
        if (response.status == 202) {
            successmessage("User Details Edit Successful, Boss");
        }
    });
}
function loginstatus() {
    fetch('api/api.php?action=loginstatus', 
        {
            method: 'GET',
        }
    )
    .then(function(response) {
        if (response.status == 202) {
            var createquestion = document.querySelector("#createquestion");
            createquestion.style.display = "block";
            var logout = document.querySelector("#logout");
            logout.style.display = "block";
            var viewuser = document.querySelector("#viewuser");
            viewuser.style.display = "block";
            var login = document.querySelector("#reloadquestion");
            login.style.display = "block";
            var table = document.querySelector("#table");
            table.style.display = "block";
            var signin = document.querySelector("#signinbtn");
            signin.style.display = "none";
            var slider = document.querySelector("#slider");
            slider.style.display = "block";
        }
        if (response.status == 404) {
            var createquestion = document.querySelector("#createquestion");
            createquestion.style.display = "none";
            var logout = document.querySelector("#logout");
            logout.style.display = "none";
            var viewuser = document.querySelector("#viewuser");
            viewuser.style.display = "none";
            var login = document.querySelector("#reloadquestion");
            login.style.display = "none";
            var table = document.querySelector("#table");
            table.style.display = "none";
            var signin = document.querySelector("#signinbtn");
            signin.style.display = "block";
            var slider = document.querySelector("#slider");
            slider.style.display = "none";
        }
    });
}
function currentloginid() {
    return fetch('api/api.php?action=userid', {
       method: 'GET',
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
            var userid = JSON.parse(data);
            return userid;
        })
}
function errormessage(message) {

    var messages = document.querySelector("#message");
    messages.innerHTML = message;
    var errormessage = document.querySelector("#errormessage");
    errormessage.style.display = "block";
    errormessage.addEventListener("click", 
        function() { 
            errormessage.style.display = 'none' 
        });
    window.setTimeout(function() {
        errormessage.style.display = 'none';
    }, 7000)
}
function successmessage(message) {

    var succmessages = document.querySelector("#succmessage");
    succmessages.innerHTML = message;
    var successmessage = document.querySelector("#successmessage");
    successmessage.style.display = "block";
    successmessage.addEventListener("click", 
        function() { 
            successmessage.style.display = 'none' 
        });
    window.setTimeout(function() {
        successmessage.style.display = 'none';
    }, 7000)
}
function edituservalidationpassword() {
    var data = document.getElementById("userpassword");
    var passworderr = document.querySelector("#edituserpassworderr");
    var jspassworderr = document.querySelector("#jseditpassword");
    if (data.value.length > 5) {
        data.style.border = "3px solid green";
        passworderr.style.display = "none";
    } else {
        data.style.border = "3px solid red";
        passworderr.style.display = "block";
        jspassworderr.innerHTML = "Password Has To Be At Least 6 Characters";
    }
}
function editusername() {
    var data = document.getElementById("userfullname");
    var nameerr = document.querySelector("#editusernameerr");
    var jsnameerr = document.querySelector("#jseditname");
    if (data.value.length > 5) {
        data.style.border = "3px solid green";
        nameerr.style.display = "none";
    } else {
        data.style.border = "3px solid red";
        nameerr.style.display = "block";
        jsnameerr.innerHTML = "Your Name Has To Be At Least 6 Characters";
    }
}
function createquestionvalidation() {
    var data = document.getElementById("question");
    var createquestionerr = document.querySelector("#createquestionerr");
    var jscreatequestion = document.querySelector("#jscreatequestion");
    if (data.value.length > 29) {
        data.style.border = "3px solid green";
        createquestionerr.style.display = "none";
    } else {
        data.style.border = "3px solid red";
        createquestionerr.style.display = "block";
        jscreatequestion.innerHTML = "Question Has To Be At Least 30 Characters";
    }
}
function editquestionvalidation() {
    var data = document.getElementById("editquestion");
    var createquestionerr = document.querySelector("#editquestionerr");
    var jscreatequestion = document.querySelector("#jseditquestion");
    if (data.value.length > 29) {
        data.style.border = "3px solid green";
        createquestionerr.style.display = "none";
    } else {
        data.style.border = "3px solid red";
        createquestionerr.style.display = "block";
        jscreatequestion.innerHTML = "Question Has To Be At Least 30 Characters";
    }
}
function darkmode() {
    var darkmodecheckbox = document.getElementById("darkmodecheckbox");
    if (darkmodecheckbox.checked == true) {
        localStorage.setItem('Dark Mode', 'True');
        localStorage.setItem('Secret', currentcolor);
        //Background Color
        document.body.style.backgroundColor = "#121212";
        //Got A Question Logo
        var h1 = document.getElementsByTagName("h1");
        for(var i = 0; i < h1.length; i++) {
            h1[i].style.color = currentcolor;
        }
        //Icons
        var itag = document.getElementsByTagName("i");
        for(var i = 0; i < itag.length; i++) {
            itag[i].style.color = currentcolor;
            itag[i].style.border = "none";
        }
        //Loading Text
        var h4 = document.getElementsByTagName("h4");
        for(var i = 0; i < h4.length; i++) {
            h4[i].style.color = currentcolor;
        }
        //Queue Background Color
        var queue = document.querySelector("#queue");
        queue.style.setProperty("background-color", "#1e1e1e", "important");
        //Thead Styling
        var thead = document.querySelector("#thead");
        thead.style.setProperty("background-color", "#1e1e1e", "important");
        //Title Color For Queues
        var th = document.getElementsByTagName("th");
        for(var i = 0; i < th.length; i++) {
            th[i].style.color = currentcolor;
        }
        //Text Color
        var td = document.getElementsByTagName("td");
        for(var i = 0; i < td.length; i++) {
            td[i].style.color = currentcolor;
        }
        //Lines Between Rows
        var tr = document.getElementsByTagName("tr");
        for(var i = 0; i < tr.length; i++) {
        tr[i].style.borderBottom = "1em solid #121212";
        tr[i].style.borderLeft = "1em solid #121212";
        tr[i].style.borderRight = "1em solid #121212";
        }
        //Thead Fixes
        var head = document.querySelector(".ui.table");
        head.style.setProperty("background", "none", "important");
        head.style.setProperty("border", "none", "important");
        //Dark Mode Fix
        var dark = document.querySelector("#darkmodelabel");
        dark.style.setProperty("color", "white", "important");
    } else {
        localStorage.setItem('Dark Mode', 'False');
        //Background Color
        document.body.style.backgroundColor = "";
        //Got A Question Logo
        var h1 = document.getElementsByTagName("h1");
        for(var i = 0; i < h1.length; i++) {
            h1[i].style.color = "";
        }
        //Icons
        var itag = document.getElementsByTagName("i");
        for(var i = 0; i < itag.length; i++) {
            itag[i].style.color = "";
            itag[i].style.border = "";
        }
        //Loading Text
        var h4 = document.getElementsByTagName("h4");
        for(var i = 0; i < h4.length; i++) {
            h4[i].style.color = "";
        }
        //Queue Background Color
        var queue = document.querySelector("#queue");
        queue.style.setProperty("background-color", "");
        //Thead Styling
        var thead = document.querySelector("#thead");
        thead.style.setProperty("background-color", "");
        //Title Color For Queues
        var th = document.getElementsByTagName("th");
        for(var i = 0; i < th.length; i++) {
            th[i].style.color = "";
        }
        //Text Color
        var td = document.getElementsByTagName("td");
        for(var i = 0; i < td.length; i++) {
            td[i].style.color = "";
        }
        //Lines Between Rows
        var tr = document.getElementsByTagName("tr");
        for(var i = 0; i < tr.length; i++) {
        tr[i].style.borderBottom = "";
        tr[i].style.borderLeft = "";
        tr[i].style.borderRight = "";
        }
        //Thead Fixes
        var head = document.querySelector(".ui.table");
        head.style.setProperty("background", "");
        head.style.setProperty("border", "");
        //Dark Mode Fix
        var dark = document.querySelector("#darkmodelabel");
        dark.style.setProperty("color", "black", "important");
    }

}
var iterator;
var currentcolor = "#bb86fc";
function gotaquestion() {
    var array = ['#ff6961', '#779ecb', '#fdfd96', '#44D362', '#bb86fc', '#ffb347', '#fff'];
    if (!iterator) iterator = array.values();
    var next = iterator.next();
    if (next.done) {
        iterator = array.values();
        next = iterator.next();
    }
    currentcolor = next.value
    darkmode();
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
function loadingmodal() {
    var loading = document.querySelector("#loading");
    loading.style.display = "block";
}
function closeloadingmodal() {
    var loading = document.querySelector("#loading");
    loading.style.display = "none";
}
function loadinglogin() {
    var loading = document.querySelector("#loadinglogin");
    loading.style.display = "block";
}
function closeloadinglogin() {
    var loading = document.querySelector("#loadinglogin");
    loading.style.display = "none";
}