import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-coupon-request',
  templateUrl: './coupon-request.component.html',
  styles: []
})
export class CouponRequestComponent implements OnInit {
	
	couponRequestForm: FormGroup;
	error: string;
	progress: boolean | number = false;
	
	products: any = [
		{id: 1, name: 'Chicken'},
		{id: 2, name: 'Spicy Big Box'},
	];
	
	promotions: any = [
		{id: 1, name: '2x1'},
		{id: 2, name: '50% discount'},
	];
	
	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private _authService: AuthService,
	) {}
	
	ngOnInit() {
		
		this.couponRequestForm = this.formBuilder.group({
			name: ['', [Validators.required]],
			// category: ['', [Validators.required]],
			// status: ['', [Validators.required]],
			// description: ['', [Validators.required]],
			// picture: ['', [Validators.required]],
		});
		
	}
	
	get controls(): any {
		return this.couponRequestForm.controls;
	}

}
