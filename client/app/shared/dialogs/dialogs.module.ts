import { DialogsService } from './dialogs.service';
import { NgModule } from '@angular/core';

import { AcceptDialog } from './accept-dialog.component';
import { ConfirmDialog } from './confirm-dialog.component';

@NgModule({
    imports: [
    ],
    exports: [
        ConfirmDialog, AcceptDialog,
    ],
    declarations: [
        ConfirmDialog, AcceptDialog,
    ],
    providers: [
        DialogsService,
    ],
    entryComponents: [
        ConfirmDialog, AcceptDialog,
    ],
})
export class DialogsModule { }
