import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CouponListComponent } from "@components/app-components/main/coupons/coupon-list/coupon-list.component";

const routes: Routes = [
	{
		path: "",
		component: CouponListComponent,
		data: { breadcrumbs: "List" },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CouponsRoutingModule {}
