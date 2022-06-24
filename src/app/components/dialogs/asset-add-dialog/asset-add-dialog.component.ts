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
    @Inject(MAT_DIALOG_DATA) public data: AssetDialogData
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
