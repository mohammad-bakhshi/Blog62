$(document).ready(function () {
    const container = document.querySelector(".container");
    container.classList.add("sign-up-mode");
    const form = document.getElementById("updateForm");
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const cellphone = document.getElementById("cellphone");
    const username = document.getElementById("username");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = {
            firstname: firstname.value.trim(),
            lastname: lastname.value.trim(),
            cellphone: cellphone.value.trim(),
            username: username.value.trim()
          };
        fetch('/blogger/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then((data) => {
                if (data.result === true) {
                    window.location.replace('/blogger/profile');
                }
                else {
                    $("div.failure").html(data.message);
                    $("div.failure").fadeIn(300).delay(1500).fadeOut(400);
                }
            }).catch(function (error) {
                console.log(error);
            })
    });
});

