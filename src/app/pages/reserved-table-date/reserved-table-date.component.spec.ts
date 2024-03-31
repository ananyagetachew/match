import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedTableDateComponent } from './reserved-table-date.component';

describe('ReservedTableDateComponent', () => {
  let component: ReservedTableDateComponent;
  let fixture: ComponentFixture<ReservedTableDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedTableDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedTableDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
