import { TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckPasswordValidator } from './check-password.directive';


describe('CheckPasswordValidator', () => {
  let directive: CheckPasswordValidator;
  let parentForm: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        CheckPasswordValidator,
        { provide: ControlContainer, useValue: { formDirective: {} } }
      ]
    });
    directive = TestBed.inject(CheckPasswordValidator);
    parentForm = new FormGroup({});

  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should set password control', () => {
    const passwordControl = 'password';
    directive.appCheckPassword = passwordControl;
    expect(directive['passwordControl']).toEqual(passwordControl);
  });

  it('should return null if control value is empty', () => {
    const control = { value: '' };
    expect(directive.validate(control as any)).toBeNull();
  });

  it('should return null if control value matches password', () => {
    parentForm.addControl('password', new FormControl('password123'));
    directive['passwordControl'] = 'password';
    const control = new FormControl('password123');
    expect(directive.validate(control)).toEqual({ passwordMatch: true});
  });

  it('should return error if control value does not match password', () => {
    parentForm.addControl('password', new FormControl('password123'));
    directive['passwordControl'] = 'password';
    const control = new FormControl('wrongpassword');
    expect(directive.validate(control)).toEqual({ passwordMatch: true });
  });
});
