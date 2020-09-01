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
import { ModulesComponent } from './modules/modules.component';

@NgModule({
	declarations: [ModulesComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		LaddaModule,
		NgBootstrapFormValidationModule,
		NgSelectModule,
		LayoutModule,
		ModulesRoutingModule,
	],
	providers: [ModalService],
})
export class ModulesModule {}
