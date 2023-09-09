import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from './delete-confirmation.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDeleteConfirmation(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        // The user confirmed the deletion, perform the deletion logic here
      }
    });
  }
}
