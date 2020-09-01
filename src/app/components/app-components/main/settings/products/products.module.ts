import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductsRoutingModule } from './products-routing.module';
import { LayoutModule } from '@layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalService } from '@services/shared/modal.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';

@NgModule({
	declarations: [ProductListComponent, ProductCreateComponent],
	entryComponents: [ProductCreateComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		LaddaModule,
		NgBootstrapFormValidationModule,
		NgSelectModule,
		ProductsRoutingModule,
		LayoutModule
	],
	providers: [ModalService]
})
export class ProductsModule {
}
