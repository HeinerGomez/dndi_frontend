import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { ProductCreateComponent } from '@components/app-components/main/settings/products/product-create/product-create.component';
import { CouponRequestComponent } from '@components/app-components/main/coupons/coupon-request/coupon-request.component';

@Component({
	selector: 'app-coupon-list',
	templateUrl: './coupon-list.component.html',
	styles: []
})
export class CouponListComponent implements OnInit {
	
	heading = 'Coupons';
	subheading = 'Here you can find your coupons.';
	icon = 'fa fa-share icon-gradient bg-night-sky';
	
	coupons: any;
	
	searchData: any;
	
	progressSearch: boolean | number = false;
	
	couponListForm: FormGroup;
	loadControl: any = 0;
	
	constructor(
		private formBuilder: FormBuilder,
		private _storageService: StorageService,
		private _modalService: ModalService
	) {}
	
	ngOnInit() {
		
		this.couponListForm = this.formBuilder.group({
			term: ['', []],
			page: [1, []],
			limit: [10, []]
		});
		
		this.searchData = {
			term: this.term.value,
			page: this.page.value,
			limit: this.limit.value
		};
		
		// this.storageSub = this._storageService.watch().pipe(debounceTime(500)).subscribe((token: any) => {
		// 	if (token) {
		this.searchCoupons();
		// 	}
		// });
		
		this.ngOnChanges();
		
	}
	
	ngOnChanges() {
		
		this.couponListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});
		
	}
	
	get term() {
		return this.couponListForm.get('term');
	}
	
	get page() {
		return this.couponListForm.get('page');
	}
	
	get limit() {
		return this.couponListForm.get('limit');
	}
	
	search = () => {
		this.progressSearch = 0;
		this.searchCoupons().then(() => this.progressSearch = false);
	};
	
	getCoupons = () => {
		return {
			currentPage: 1,
			data: [
				{
					id: 1, code: 'RC-001', date: new Date(), status: 'Cancelled',
				},
				{
					id: 2, code: 'RC-002', date: new Date(), status: 'Pending',
				},
				{
					id: 3, code: 'RC-003', date: new Date(), status: 'Delivered',
				}
			],
			lastPage: 1,
			total: 1
		};
	};
	
	reset = () => {
		this.couponListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.coupons = [];
	};
	
	async searchCoupons() {
		// this.coupons = [];
		this.loadControl = 0;
		// return await this._couponsService.search(this.searchData).then((response: any) => {
		this.loadControl = 1;
		this.coupons = this.getCoupons();
		// });
	};
	
	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	};
	
	generateCouponRequestModal = () => {
		this._modalService.open({
			component: CouponRequestComponent,
			title: 'Generate a new coupon request',
			size: 'modal-full'
		});
	};
	
}
