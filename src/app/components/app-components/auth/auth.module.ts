import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LaddaModule } from "angular2-ladda";
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { NgSelectModule } from "@ng-select/ng-select";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		LaddaModule,
		NgBootstrapFormValidationModule,
		SlickCarouselModule,
		NgSelectModule,
		AuthRoutingModule,
	],
})
export class AuthModule {}
