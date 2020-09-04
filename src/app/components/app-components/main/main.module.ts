import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainRoutingModule } from "./main-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LaddaModule } from "angular2-ladda";
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";
import { NgSelectModule } from "@ng-select/ng-select";
import { LayoutModule } from "@layout/layout.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PrivilegesComponent } from "./privileges/privileges.component";
import { RedeemCouponComponent } from "./redeem-coupon/redeem-coupon.component";
import { ComponentsModule } from "../../components.module";

@NgModule({
	declarations: [
		DashboardComponent,
		PrivilegesComponent,
		RedeemCouponComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		LaddaModule,
		NgBootstrapFormValidationModule,
		NgSelectModule,
		LayoutModule,
		MainRoutingModule,
		ComponentsModule,
	],
})
export class MainModule {}
