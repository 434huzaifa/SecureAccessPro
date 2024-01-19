
function handelError(err, msg = "") {
  if (err?.response?.data) {
    showToast(`${msg}.${err.response.data}`)
  } else {
    showToast("Something error")
  }
}

function showToast(msg, textColor = "red", bg = "white", callback = () => { }) {
  Toastify({
    text: msg,
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: bg,
      color: textColor,
    },
    callback: callback
  }).showToast();
}




function createUser(e) {
  e.preventDefault();
  let data = Object.fromEntries(new FormData(e.target))
  axios.post("/usercreate", data).then(res => {
    if (res?.data?._id) {
      showToast("User Created", 'white', 'green', callback = window.location.reload())
    }
  }).catch(err => {
    handelError(err, msg = "User Creation failed")
  })
}


function Login(e) {
  e.preventDefault();
  let data = Object.fromEntries(new FormData(e.target))
  if (!!data?.isadmin) {
    if (data['userid'] == "456123") {
      if (data['pass'] == "456789") {

        window.location = "/createuser"
      }
      else {
        showToast("Admin User Id or Password Wrong")
      }
    } else {
      showToast("Admin User Id or Password Wrong")
    }
  } else {
    axios.post(`/user`, data).then(res => {
      if (res?.data.valid) {
        localStorage.setItem("userid", data['userid']);
        showToast("User Found", "white", "green");
        window.location = "/userupdate";
      } else {
        showToast("User Not Found")
      }
    }).catch(err => {
      handelError(err)
    })
  }

}
function action(actionType, btn) {
  console.log(actionType);
  console.log(btn.id);
  axios.get(`/changeuser?id=${btn.id}&action=${actionType}`).then(res => {
    if (res?.data) {
      showToast(res.data.msg, "black", "green", window.location.reload())
    }
  }).catch(err => {
    handelError(err)
  })
}