const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
        let fd = new FormData();
        fd.append('title', document.getElementById('title').value);
        fd.append('text', document.getElementById('text').value);
        let myFile = document.getElementById('image').files[0];
        fd.append('image', myFile);
        let req = new Request('/article', {
            method: 'POST',
            mode: 'no-cors',
            body: fd
        });
        fetch(req).then((response) => {
            window.location.href = '/blogger/profile';
        })
            .catch(function (error) {
                console.log(error);
            })
});