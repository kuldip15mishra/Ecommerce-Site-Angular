import { MatSnackBar, MatDialog } from '@angular/material';
import { ModalService } from './../../modal/modal.service';
import { ConfirmDialog } from './../../shared/dialogs/confirm-dialog.component';
import { AuthService } from './../../shared/services/auth.service';
import { CrudHelper } from './../../shared/services/crud.helper';
import { CrudService } from './../../shared/services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { Http, URLSearchParams } from '@angular/http';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'salientink-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
    media: any;
    loading: Boolean;
    errorMessage: string;
    cols: Array<Object>;
    busy: Subscription;
    sort: { predicate: string, reverse: boolean };
    public uploader: FileUploader = new FileUploader({
        url: 'api/media',
        authToken: this.auth.getToken()
    });
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;

    constructor(private snack: MatSnackBar, private http: Http, private helper: CrudHelper, private crud: CrudService, private route: ActivatedRoute, private dialog: MatDialog, private auth: AuthService, private modal: ModalService) {
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            var responsePath = JSON.parse(response);
            this.getData('-createdAt');
        };
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
    ngOnInit() {
        this.cols = this.helper.help([
            { field: 'name' },
            { field: 'address' },
            { field: 'comment' },
        ]);
        this.sort = { predicate: null, reverse: false };
        this.getData('-createdAt');
    }
    getData(sort?: string) {
        let params = new URLSearchParams();
        this.loading = true;
        params.set('sort', sort);
        this.busy = this.crud.get('media/my', params, true)
            .subscribe(data => {
                this.media = data; this.loading = false;
            },
            error => {
                this.snack.open(<any>error, 'OK', { duration: 2000 }); this.loading = false;
            });
    }
    delete(image) {
        this.modal.confirm('Delete?', 'Are you sure to delete')
            .subscribe(res => {
                if (res) {
                    this.busy = this.crud.delete('media', image)
                        .subscribe(data => { this.getData('-createdAt'); }, error => { this.snack.open(<any>error, 'OK', { duration: 2000 }); this.loading = false; });
                }
            });
    }
}
