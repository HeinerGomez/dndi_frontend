import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordMatch } from '@validators/password-match.validator';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Component({
	selector: 'app-my-info',
	templateUrl: './my-info.component.html',
	styles: []
})
export class MyInfoComponent implements OnInit {
	
	heading = 'My Info';
	subheading = 'Complete the form, and click "Update my info" button afterwards.';
	icon = 'fa fa-user-circle-o icon-gradient bg-night-sky';
	
	updateInfoForm: FormGroup;
	error: string;
	progress: boolean | number = false;
	
	states: any = [
		{id: 1, name: 'Florida'},
		{id: 2, name: 'Test'},
	];
	
	cities: any = [
		{id: 1, id_state: 1, name: 'Miami'},
		{id: 2, id_state: 1, name: 'Orlando'},
		{id: 3, id_state: 1, name: 'Fort Lauderdale'},
		{id: 4, id_state: 2, name: 'Test'},
	];
	
	stateCities: any = [];
	
	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private _authService: AuthService,
	) {}
	
	ngOnInit() {
		
		this.updateInfoForm = this.formBuilder.group({
			name: ['KFC', [Validators.required]],
			nickname: ['KFC', [Validators.required]],
			state: [{id: 1, name: 'Florida'}, [Validators.required]],
			city: [{id: 1, id_state: 1, name: 'Miami'}, [Validators.required]],
			tax_id: ['3454492', [Validators.required]],
			address: ['3515 NW 7th Ave, Miami, FL 33127, USA', [Validators.required]],
			phone: ['+1 305-633-0603', [Validators.required]],
			logo: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
		}, {
			validator: PasswordMatch('password', 'password_confirmation')
		});
		
	}
	
	get controls(): any {
		return this.updateInfoForm.controls;
	}
	
	getCities = (state: any) => {
		this.controls.city.reset();
		this.stateCities = this.cities.filter((city: any) => city.id_state === state.id);
	}
	
}
