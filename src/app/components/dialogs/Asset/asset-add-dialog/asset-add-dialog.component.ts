import { Component, Inject } from '@angular/core';
import { Asset } from '../../../../shared/models/asset';
import { AssetService } from '../../../../shared/services/assetService';
import { NgForm } from '@angular/forms';
import { AssetDialogData } from '../../../../shared/models/assetDialogData';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';
@Component({
  selector: 'app-asset-add-dialog',
  templateUrl: './asset-add-dialog.component.html',
  styleUrls: ['./asset-add-dialog.component.scss'],
})
export class AssetAddDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AssetAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssetDialogData,
    public assetService: AssetService,
    private logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.logger.trace('initializing asset-add-dialog component')
  }

  onSubmit(form: NgForm) {
    this.logger.trace('submitting form to add asset')
    let employeeId:number;
    if(this.data.lockEmployee == true){
      this.logger.trace('employee dropdown is locked')
      employeeId = this.data.asset.employeeId;
    }
    else{
      this.logger.trace('employee dropdown is not locked')
      employeeId = form.value.employeeId;
    }
    const asset: Asset = {
      assetTypeId: form.value.assetTypeId,
      description: form.value.description,
      employeeId: employeeId,
    };

    this.logger.trace('adding asset');
    this.assetService.addAsset(asset).subscribe(
      (result) => {
        this.dialogRef.close();
      },
      (err) => {
        this.logger.error(err);
      },
      () => {
        this.logger.trace('record added');
        window.location.reload();
      }
    );
  }

  onNoClick(): void {
    this.logger.trace('closing AssetAddDialogComponent')
    this.dialogRef.close();
  }
}
