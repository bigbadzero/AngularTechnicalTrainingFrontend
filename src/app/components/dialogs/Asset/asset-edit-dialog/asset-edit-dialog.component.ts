import { Component, Inject } from '@angular/core';
import { Asset } from '../../../../shared/models/asset';
import { AssetService } from '../../../../shared/services/assetService';
import { NgForm } from '@angular/forms';
import { AssetDialogData } from '../../../../shared/models/assetDialogData';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';
@Component({
  selector: 'app-asset-edit-dialog',
  templateUrl: './asset-edit-dialog.component.html',
  styleUrls: ['./asset-edit-dialog.component.scss'],
})
export class AssetEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AssetEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssetDialogData,
    public assetService: AssetService,
    private logger: NGXLogger
  ) {}

  onInit() {
    this.logger.trace('initializing asset-edit-dialog component')
  }

  onSubmit(form: NgForm) {
    this.logger.trace('submitting form to edit asset')
    let retired: boolean ;
    if (form.value.retired == true) {
      this.logger.trace('retired is checked')
      retired = true;
    } else {
      this.logger.trace('retired is not checked')
      retired = false;
    }
    const asset: Asset = {
      tagId: form.value.tagId,
      assetTypeId: form.value.assetTypeId,
      description: form.value.description,
      employeeId: form.value.employeeId,
      dateAdded: form.value.dateAdded,
      retired: retired,
      dateRetired: form.value.dateRetired,
    };
    this.logger.trace('editing asset');
    this.assetService.updateAsset(asset).subscribe(
      (result) => {
        this.dialogRef.close();
      },
      (err) => {
        this.logger.error(err);
      },
      () => {
        this.logger.trace('asset updated');
        window.location.reload();
      }
    );
  }

  onNoClick(): void {
    this.logger.trace('closing AssetEditDialogComponent')
    this.dialogRef.close();
  }
}
