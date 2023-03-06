import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobocheckComponent } from './robocheck.component';

describe('RobocheckComponent', () => {
  let component: RobocheckComponent;
  let fixture: ComponentFixture<RobocheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobocheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobocheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
