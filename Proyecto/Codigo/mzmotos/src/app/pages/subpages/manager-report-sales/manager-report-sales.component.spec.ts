import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerReportSalesComponent } from './manager-report-sales.component';

describe('ManagerReportSalesComponent', () => {
  let component: ManagerReportSalesComponent;
  let fixture: ComponentFixture<ManagerReportSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerReportSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerReportSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
