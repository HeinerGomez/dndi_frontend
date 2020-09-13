import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GenerateContentRoutingModule } from "./generate-content-routing.module";
import { GenerateContentComponent } from "./generate-content.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LaddaModule } from "angular2-ladda";
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";
import { NgSelectModule } from "@ng-select/ng-select";
import { LayoutModule } from "../../../../layout/layout.module";
import { ComponentsModule } from "../../../components.module";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
	declarations: [GenerateContentComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AngularEditorModule,
		HttpClientModule,
		NgbModule,
		LaddaModule,
		NgBootstrapFormValidationModule,
		NgSelectModule,
		LayoutModule,
		ComponentsModule,
		GenerateContentRoutingModule,
	],
})
export class GenerateContentModule {}
