import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    console.log(password.value, confirmPassword.value)

    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;
}
