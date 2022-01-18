import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerReportInventoriesComponent } from './manager-report-inventories.component';

describe('ManagerReportInventoriesComponent', () => {
  let component: ManagerReportInventoriesComponent;
  let fixture: ComponentFixture<ManagerReportInventoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerReportInventoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerReportInventoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
