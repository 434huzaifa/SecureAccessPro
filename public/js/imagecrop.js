var imageElement = document.getElementById('image');
imageElement.hidden = true
var fileInput = document.getElementById('formFile');
var cropper;
fileInput.addEventListener('change', function () {
    if (this.files && this.files.length > 0) {
        var file = this.files[0]
        var reader = new FileReader();
        reader.addEventListener('load', function (e) {
            imageElement.src = e.target.result;
            imageElement.hidden = false

            if (cropper) {
                cropper.destroy();
            }
            cropper = new Cropper(imageElement, {
                aspectRatio: 1 / 1,

            });
        });
        reader.readAsDataURL(file);
    }
});

function updateUser(e) {
    e.preventDefault();
    let name = e.target.name.value
    let img = e.target.img.value
    let formdata = new FormData()
    formdata.append('name', name)
    formdata.append('filename', img)
    cropper.getCroppedCanvas().toBlob((blob) => {
        let t=String(img).split("\\")
        t=t[t.length-1]
        console.log(t);
        formdata.append('image', blob,t);
        formdata.append('userid', localStorage.getItem("userid"))
        console.log(Object.fromEntries(formdata));
         axios.post('/updateuser', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    }, 'image/jpeg');
   
}



function getCroped() { // save crop image
    var croppedImageDataUrl = cropper.getCroppedCanvas().toDataURL();
    var downloadLink = document.createElement('a');
    downloadLink.href = croppedImageDataUrl;
    downloadLink.download = 'cropped_image.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}