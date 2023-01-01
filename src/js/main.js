const fileSelector = document.querySelector('input');
const start = document.querySelector('button');
const img = document.querySelector('img');
const progress = document.querySelector('.progress');
const textarea = document.querySelector('textarea');
const progress_status = document.getElementById('status');

function myFunction() {
    // Get the text field
    var copyText = document.getElementById("text_area");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  
    // Alert the copied text
    alert("Copied the text: " + copyText.value);
}

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
            progress.innerHTML = 'Done'
            progress_status.style.backgroundColor='lightgreen';
        })
}

