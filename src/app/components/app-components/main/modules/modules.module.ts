import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ModulesRoutingModule } from "./modules-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LaddaModule } from "angular2-ladda";
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";
import { NgSelectModule } from "@ng-select/ng-select";
import { LayoutModule } from "../../../../layout/layout.module";
import { ModalService } from "../../../../services/shared/modal.service";
import { BaseModulesComponent } from "./base-modules/base-modules.component";
import { RenderModulesComponent } from "./base-modules/render-modules/render-modules.component";
import { SquarePillButtonComponent } from "../../../shared/square-pill-button/square-pill-button.component";
import { ComponentsModule } from "../../../components.module";
import { FormModulesComponent } from "./base-modules/form-modules/form-modules.component";

@NgModule({
	declarations: [
		BaseModulesComponent,
		RenderModulesComponent,
		SquarePillButtonComponent,
		FormModulesComponent,
	],
	entryComponents: [FormModulesComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		LaddaModule,
		NgBootstrapFormValidationModule,
		NgSelectModule,
		LayoutModule,
		ComponentsModule,
		ModulesRoutingModule,
	],
	providers: [ModalService],
})
export class ModulesModule {}
