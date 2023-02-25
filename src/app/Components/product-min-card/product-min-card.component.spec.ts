import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMinCardComponent } from './product-min-card.component';

describe('ProductMinCardComponent', () => {
  let component: ProductMinCardComponent;
  let fixture: ComponentFixture<ProductMinCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMinCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMinCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
