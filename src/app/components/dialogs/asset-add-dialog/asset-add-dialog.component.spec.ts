import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAddDialogComponent } from './asset-add-dialog.component';

describe('AssetAddDialogComponent', () => {
  let component: AssetAddDialogComponent;
  let fixture: ComponentFixture<AssetAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
