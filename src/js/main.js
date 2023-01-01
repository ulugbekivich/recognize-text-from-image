const fileSelector = document.querySelector('input');
const start = document.querySelector('button');
const img = document.querySelector('img');
const progress = document.querySelector('.progress');
const textarea = document.querySelector('textarea');
const progress_status = document.getElementById('status');

// first show image on upload
fileSelector.onchange = () => {
    progress_status.style.backgroundColor='#E9ECEF';
    var file = fileSelector.files[0]
    var imgUrl = window.URL.createObjectURL(new Blob([file], { type: 'image/jpg' }))
    img.src = imgUrl
}

// now start text recognition
start.onclick = () => {
    progress_status.style.backgroundColor='#E9ECEF';
    textarea.innerHTML = ''
    const rec = new Tesseract.TesseractWorker()
    rec.recognize(fileSelector.files[0])
        .progress(function (response) {
            if(response.status == 'recognizing text'){
                progress_status.style.backgroundColor='greenyellow';
                progress.innerHTML = response.status + '   ' + response.progress
            }else{
                progress_status.style.backgroundColor='greenyellow';
                progress.innerHTML = response.status
            }
        })
        .then(function (data) {
            textarea.innerHTML = data.text
            progress.innerHTML = 'Done!'
            progress_status.style.backgroundColor='lightgreen';
        })
}

function copyText(){
    document.getElementById("txt_copy").select();
    document.execCommand('copy');
    progress.innerHTML = 'Copied!'
}