import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LaddaModule } from "angular2-ladda";
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";
import { NgSelectModule } from "@ng-select/ng-select";
import { LayoutModule } from "@layout/layout.module";
import { CouponsRoutingModule } from "./coupons-routing.module";

import { ModalService } from "@services/shared/modal.service";
import { CouponListComponent } from "./coupon-list/coupon-list.component";
import { CouponRequestComponent } from "./coupon-request/coupon-request.component";

@NgModule({
	declarations: [CouponListComponent, CouponRequestComponent],
	entryComponents: [CouponRequestComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		LaddaModule,
		NgBootstrapFormValidationModule,
		NgSelectModule,
		LayoutModule,
		CouponsRoutingModule,
	],
	providers: [ModalService],
})
export class CouponsModule {}
