import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PrivacyPoliciesRoutingModule } from "./privacy-policies-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LaddaModule } from "angular2-ladda";
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";
import { NgSelectModule } from "@ng-select/ng-select";
import { LayoutModule } from "../../../../layout/layout.module";
import { ComponentsModule } from "../../../components.module";
import { ModulesRoutingModule } from "../modules/modules-routing.module";
import { RenderPrivacyPoliciesComponent } from "./render-privacy-policies/render-privacy-policies.component";
import { FormPrivacyPoliciesComponent } from "./form-privacy-policies/form-privacy-policies.component";
import { ModalService } from "../../../../services/shared/modal.service";
import { AngularEditorModule } from "@kolkov/angular-editor";

@NgModule({
	declarations: [RenderPrivacyPoliciesComponent, FormPrivacyPoliciesComponent],
	entryComponents: [FormPrivacyPoliciesComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		LaddaModule,
		NgBootstrapFormValidationModule,
		NgSelectModule,
		AngularEditorModule,
		LayoutModule,
		ComponentsModule,
		PrivacyPoliciesRoutingModule,
	],
	providers: [ModalService],
})
export class PrivacyPoliciesModule {}
