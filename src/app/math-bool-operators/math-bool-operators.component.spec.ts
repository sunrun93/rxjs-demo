import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathBoolOperatorsComponent } from './math-bool-operators.component';

describe('MathBoolOperatorsComponent', () => {
  let component: MathBoolOperatorsComponent;
  let fixture: ComponentFixture<MathBoolOperatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathBoolOperatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathBoolOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
