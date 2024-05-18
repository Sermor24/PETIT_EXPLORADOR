
    window.onload = function () {
        const files = JSON.parse(localStorage.getItem('files')) || [];
        const fileList = document.getElementById('fileList');

        files.forEach(function (file) {
            addFileToList(file.name, file.url);
        });
    };

    function previewImage() {
        const fileInput = document.getElementById('fileInput');
        const imagePreview = document.getElementById('imagePreview');
        const file = fileInput.files[0];

        const reader = new FileReader();
        reader.onload = function (event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    function uploadFile() {
        const fileInput = document.getElementById('fileInput');
        const fileList = document.getElementById('fileList');
        const file = fileInput.files[0];

        const fileURL = URL.createObjectURL(file);

        const files = JSON.parse(localStorage.getItem('files')) || [];
        files.push({ name: file.name, url: fileURL });
        localStorage.setItem('files', JSON.stringify(files));

        addFileToList(file.name, fileURL);
        document.getElementById('imagePreview').innerHTML = '';
        fileInput.value = ''; // Clear file input
    }

    function addFileToList(fileName, fileURL) {
        const fileList = document.getElementById('fileList');
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');

        const link = document.createElement('a');
        link.href = fileURL;
        link.textContent = fileName;
        link.setAttribute('download', fileName);
        link.classList.add('file-link');

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = function () {
            removeFile(fileName);
            fileList.removeChild(fileItem);
        };

        fileItem.appendChild(link);
        fileItem.appendChild(deleteBtn);

        fileList.appendChild(fileItem);
    }

    function removeFile(fileName) {
        let files = JSON.parse(localStorage.getItem('files')) || [];
        files = files.filter(function (file) {
            return file.name !== fileName;
        });
        localStorage.setItem('files', JSON.stringify(files));
    }

