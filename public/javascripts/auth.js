const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_up_form = document.getElementById('signupform');
const sign_in_form = document.getElementById('signinform');

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const cellphone = document.getElementById("cellphone");
const gender = document.getElementsByName("gender");
const username = document.getElementById("username");
const password = document.getElementById("password");
const sign_in_username = document.getElementById("sign-in-username");
const sign_in_password = document.getElementById("sign-in-password");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


sign_up_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const genderFunction = (input) => {
    if (input[0].checked) {
      return input[0].value
    }
    return input[1].value;
  }
  const data = {
    firstname: firstname.value.trim(),
    lastname: lastname.value.trim(),
    cellphone: cellphone.value.trim(),
    username: username.value.trim(),
    password: password.value.trim(),
    gender: genderFunction(gender)
  };

  fetch('/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then((data) => {
      if (data.result === true) {
        container.classList.remove("sign-up-mode");
      }
      else {
        $("div.failure").html(data.message);
        $("div.failure").fadeIn(300).delay(1500).fadeOut(400);
      }
    }).catch(function (error) {
      console.log(error);
    })
});

sign_in_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    username: sign_in_username.value.trim(),
    password: sign_in_password.value.trim()
  };

  fetch('/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then((data) => {
      if (data.result === true) {
        window.location.href = "/blogger/profile";
      }
      else {
        $("div.failure").html(data.message);
        $("div.failure").fadeIn(300).delay(1500).fadeOut(400);
      }
    }).catch(function (error) {
      console.log(error);
    })
});