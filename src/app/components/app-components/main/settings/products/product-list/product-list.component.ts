import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from '@services/shared/modal.service';
import { StorageService } from '@services/app-services/storage.service';
import { ProductCreateComponent } from '@components/app-components/main/settings/products/product-create/product-create.component';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styles: []
})
export class ProductListComponent implements OnInit, OnChanges {
	
	heading = 'Products';
	subheading = 'Here you can find your registered products.';
	icon = 'fa fa-list-alt icon-gradient bg-night-sky';
	
	products: any;
	
	searchData: any;
	
	progressSearch: boolean | number = false;
	
	productListForm: FormGroup;
	loadControl: any = 0;
	
	constructor(
		private formBuilder: FormBuilder,
		private _storageService: StorageService,
		// private _productsService: ProductsService,
		private _modalService: ModalService
	) {}
	
	ngOnInit() {
		
		this.productListForm = this.formBuilder.group({
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
		this.searchProducts();
		// 	}
		// });
		
		this.ngOnChanges();
		
	}
	
	ngOnChanges() {
		
		this.productListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});
		
	}
	
	get term() {
		return this.productListForm.get('term');
	}
	
	get page() {
		return this.productListForm.get('page');
	}
	
	get limit() {
		return this.productListForm.get('limit');
	}
	
	search = () => {
		this.progressSearch = 0;
		this.searchProducts().then(() => this.progressSearch = false);
	};
	
	getProducts = () => {
		return {
			currentPage: 1,
			data: [
				{
					id: 1, name: 'Chicken', category: 'Food', status: 'Active',
				},
				{
					id: 2, name: 'Spicy Big Box', category: 'Food', status: 'Inactive',
				}
			],
			lastPage: 1,
			total: 1
		};
	};
	
	reset = () => {
		this.productListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.products = [];
	};
	
	async searchProducts() {
		// this.products = [];
		this.loadControl = 0;
		// return await this._productsService.search(this.searchData).then((response: any) => {
		this.loadControl = 1;
		this.products = this.getProducts();
		// });
	};
	
	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	};
	
	createProductModal = () => {
		this._modalService.open({
			component: ProductCreateComponent,
			title: 'Add a product',
			size: 'modal-xl'
		});
	};
	
}
