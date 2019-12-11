import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraionFormComponent } from './registraion-form.component';

describe('RegisreationFormComponent', () => {
  let component: RegistraionFormComponent;
  let fixture: ComponentFixture<RegistraionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistraionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
