import { Component, Inject } from '@angular/core';
import { Asset } from '../../../shared/models/asset';
import { AssetService } from '../../../shared/services/assetService';
import { NgForm } from '@angular/forms';
import { AssetDialogData } from '../../../shared/models/assetDialogData';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-asset-add-dialog',
  templateUrl: './asset-add-dialog.component.html',
  styleUrls: ['./asset-add-dialog.component.scss'],
})
export class AssetAddDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AssetAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssetDialogData,
    public assetService: AssetService
  ) {}

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const asset: Asset = {
      assetTypeId: form.value.assetTypeId,
      description: form.value.description,
      employeeId: form.value.employeeId,
    };

    this.assetService.addAsset(asset).subscribe(
      (result) => {
        this.dialogRef.close();
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('record added');
        window.location.reload();
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
