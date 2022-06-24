// import { Component, OnInit, Inject } from '@angular/core';
// import { Asset } from '../../shared/asset';
// import { AssetType } from '../../shared/assetType';
// import { Employee } from '../../shared/employee';
// import { NgForm } from '@angular/forms';
// import { AssetDialogData } from '../../shared/assetDialogData';
// import {
//   MatDialog,
//   MatDialogRef,
//   MAT_DIALOG_DATA,
// } from '@angular/material/dialog';
// @Component({
//   selector: 'app-asset-edit-dialog',
//   templateUrl: './asset-edit-dialog.component.html',
//   styleUrls: ['./asset-edit-dialog.component.scss']
// })
// export class AssetEditDialogComponent implements OnInit {

//   constructor(
//     public dialogRef: MatDialogRef<AssetEditDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: AssetDialogData,
//     public employeeAssetsService: EmployeeAssetsService
//   ) {
//   }

//   onInit() {
//   }

//   onSubmit(form: NgForm) {
//     let retired:boolean;
//     if(form.value.retired === true) {
//       retired === true;
//     }
//     else{
//       retired === false;
//     }
//     console.log(form.value);
//     const asset: Asset ={
//       tagId: form.value.tagId,
//       assetTypeId: form.value.assetTypeId,
//       description: form.value.description,
//       employeeId: form.value.employeeId,
//       dateAdded: form.value.dateAdded,
//       retired: retired,
//       dateRetired: form.value.dateRetired,
//     }
//     this.employeeAssetsService.updateAsset(asset).subscribe((result) =>{
//       this.dialogRef.close();
//     }, err =>{
//       console.log(err);
//     }, () =>{
//       console.log("record updated");
//       window.location.reload();
//     })
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
