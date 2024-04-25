import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFoodComponent } from './single-food.component';

describe('SingleFoodComponent', () => {
  let component: SingleFoodComponent;
  let fixture: ComponentFixture<SingleFoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleFoodComponent]
    });
    fixture = TestBed.createComponent(SingleFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
