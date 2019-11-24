import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinCreationOperatorsComponent } from './join-creation-operators.component';

describe('JoinCreationOperatorsComponent', () => {
  let component: JoinCreationOperatorsComponent;
  let fixture: ComponentFixture<JoinCreationOperatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinCreationOperatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinCreationOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
