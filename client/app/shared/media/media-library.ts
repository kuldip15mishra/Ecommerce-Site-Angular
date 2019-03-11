import { Subscription } from 'rxjs';
import { CrudService } from './../services/crud.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'media-library',
  templateUrl: './media-library.html',
  styleUrls: ['media-library.css']
})
export class MediaLibraryModal {
  public uploader: FileUploader = new FileUploader({
    url: 'api/media',
    authToken: this.auth.getToken()
  });
  public hasBaseDropZoneOver: boolean = false;
  image: string;
  media: any;
  busy: Subscription;
  loading: boolean = false;
  constructor(public dialogRef: MatDialogRef<MediaLibraryModal>, private auth: AuthService, private crud: CrudService, private snack: MatSnackBar) {
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      this.getData('-createdAt');
    };
  }
  ngOnInit() {
    this.getData('-createdAt');
  }
  getData(sort?: string) {
    let params = new URLSearchParams();
    this.loading = true;
    params.set('sort', sort);
    this.busy = this.crud.get('media', params, true)
      .subscribe(data => { this.media = data; this.loading = false; }, error => { this.snack.open(<any>error, 'OK', { duration: 2000 }); this.loading = false; });
  }
  ok(item) {
    this.dialogRef.close(item);
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}