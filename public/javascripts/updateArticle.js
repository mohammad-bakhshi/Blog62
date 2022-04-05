const updateArticle = (id) => {
    let fd = new FormData();
    fd.append('title', document.getElementById('title').value);
    fd.append('text', document.getElementById('text').value);
    let myFile = document.getElementById('image').files[0];
    fd.append('image', myFile);
    let req = new Request(`/article/${id}`, {
        method: 'PUT',
        body: fd
    });
    fetch(req).then((response) => {
        window.location.href = '/blogger/profile';
    })
        .catch(function (error) {
            console.log(error);
        })
};
