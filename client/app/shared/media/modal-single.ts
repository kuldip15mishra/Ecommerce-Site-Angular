import { MatDialogRef } from '@angular/material';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'modal-single',
  templateUrl: './modal-single.html',
  styleUrls: ['media.component.css']
})
export class SingleFileUploadModal {
  public uploader: FileUploader = new FileUploader({
    url: 'api/media',
    authToken: this.auth.getToken()
  });
  public hasBaseDropZoneOver: boolean = false;
  image: string;
  constructor(public dialogRef: MatDialogRef<SingleFileUploadModal>, private auth: AuthService) {
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      this.image = response;// log response
      // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', JSON.parse(response));
      this.dialogRef.close(response);
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}