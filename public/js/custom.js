function showToast(msg, textColor = "red", bg = "white") {
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
    onClick: function () { } // Callback after click
  }).showToast();
}

function Login(e) {
  e.preventDefault();
  let data = Object.fromEntries(new FormData(e.target))
  console.log(data);
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
}