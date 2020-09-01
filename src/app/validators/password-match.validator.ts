import { FormGroup } from '@angular/forms';

export function PasswordMatch(controlName: string, matchingControlName: string) {
	
	return (formGroup: FormGroup) => {
		
		let control = formGroup.controls[controlName];
		let matchingControl = formGroup.controls[matchingControlName];
		
		if(matchingControl.errors && !matchingControl.errors.mustMatch) {
			return;
		}
		
		matchingControl.setErrors((control.value !== matchingControl.value) ? {mustMatch: true} : null);
		
	};
	
}
