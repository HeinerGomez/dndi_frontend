import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';

@Component({
	selector: 'app-redeem-coupon',
	templateUrl: './redeem-coupon.component.html',
	styles: []
})
export class RedeemCouponComponent implements OnInit {
	
	heading = 'Redeem a coupon';
	subheading = 'Here you can redeem a coupon.';
	icon = 'fa fa-qrcode icon-gradient bg-night-sky';
	
	products: any;
	
	redeemCouponForm: FormGroup;
	
	constructor(
		private formBuilder: FormBuilder,
		private _storageService: StorageService,
		private _modalService: ModalService
	) {}
	
	ngOnInit() {
		
		this.redeemCouponForm = this.formBuilder.group({
			code: ['AXT4366', [Validators.required]],
		});
		
	}
	
}
