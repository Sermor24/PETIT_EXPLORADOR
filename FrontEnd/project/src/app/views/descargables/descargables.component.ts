import { Component } from '@angular/core';


@Component({
  selector: 'app-descargables',
  standalone: true,
  imports: [],
  templateUrl: './descargables.component.html',
  styleUrl: './descargables.component.css'
})
export class DescargablesComponent {
  
  constructor() { }

  previewImage(event: any) {
    const fileInput = event?.target;
    if (fileInput instanceof HTMLInputElement && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const imagePreview = document.getElementById('imagePreview');
        if (imagePreview) {
          const img = document.createElement('img');
          img.src = event?.target?.result as string;
          imagePreview.innerHTML = '';
          imagePreview.appendChild(img);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  uploadFile() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileURL = URL.createObjectURL(file);
      const files = JSON.parse(localStorage.getItem('files') || '[]') || [];
      files.push({ name: file.name, url: fileURL });
      localStorage.setItem('files', JSON.stringify(files));

      const fileList = document.getElementById('fileList');
      if (fileList) {
        this.addFileToList(file.name, fileURL, fileList);
      }

      const imagePreview = document.getElementById('imagePreview');
      if (imagePreview) {
        imagePreview.innerHTML = '';
      }

      fileInput.value = ''; // Clear file input
    }
  }

  addFileToList(fileName: string, fileURL: string, fileListElement: HTMLElement) {
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
    deleteBtn.onclick = () => {
      this.removeFile(fileName);
      fileListElement.removeChild(fileItem);
    };

    fileItem.appendChild(link);
    fileItem.appendChild(deleteBtn);

    fileListElement.appendChild(fileItem);
  }

  removeFile(fileName: string) {
    let files = JSON.parse(localStorage.getItem('files') || '[]') || [];
    files = files.filter(function (file: any) {
      return file.name !== fileName;
    });
    localStorage.setItem('files', JSON.stringify(files));
  }
}
