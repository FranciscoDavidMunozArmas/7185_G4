import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientproductComponent } from './clientproduct.component';

describe('ClientproductComponent', () => {
  let component: ClientproductComponent;
  let fixture: ComponentFixture<ClientproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
