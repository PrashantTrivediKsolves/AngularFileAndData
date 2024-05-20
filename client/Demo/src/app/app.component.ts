import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  images:any;
  selectedFile: File | null = null;
  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  username:any;
  submitForm(data:any)
  {
    // this.username=data.username;
    // console.log(data.username);
    console.log(data);
    this.username=data.username;
    // this.selectedFile=data.file;
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();

    formData.append('file', this.selectedFile);
    formData.append('username', this.username);
    // formData.append('username',this.username!);
    this.http.post<any>('http://localhost:8000/upload', formData)
      .subscribe(
        response => {
          console.log('File uploaded successfully:', response);
          // Handle success
        },
        error => {
          console.error('Error uploading file:', error);
          // Handle error
        }
      );
  }
  // onUpload() {
  //   if (!this.selectedFile) {
  //     console.error('No file selected');
  //     return;
  //   }
  //   const formData = new FormData();

  //   formData.append('file', this.selectedFile);
  //   formData.append('username', this.username);
  //   // formData.append('username',this.username!);
  //   this.http.post<any>('http://localhost:8000/upload', formData)
  //     .subscribe(
  //       response => {
  //         console.log('File uploaded successfully:', response);
  //         // Handle success
  //       },
  //       error => {
  //         console.error('Error uploading file:', error);
  //         // Handle error
  //       }
  //     );
  // }
  getAllFiles()
  {
    this.http.get<any[]>('http://localhost:8000/uploads')
      .subscribe(
        (images: string[]) => {
          this.images = images;
          console.log(images);
        },
        error => {
          console.error('Error fetching images:', error);
        }
      );
  }

}
