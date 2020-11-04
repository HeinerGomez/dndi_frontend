import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SelfEvaluationsRoutingModule } from "./self-evaluations-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LaddaModule } from "angular2-ladda";
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";
import { NgSelectModule } from "@ng-select/ng-select";
import { LayoutModule } from "../../../../layout/layout.module";
import { ComponentsModule } from "../../../components.module";
import { ModalService } from "../../../../services/shared/modal.service";
import { SelfEvaluationsListComponent } from "./self-evaluations-list/self-evaluations-list.component";
import { FormSelfEvaluationsComponent } from "./form-self-evaluations/form-self-evaluations.component";

@NgModule({
	declarations: [SelfEvaluationsListComponent, FormSelfEvaluationsComponent],
	entryComponents: [FormSelfEvaluationsComponent],
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
		SelfEvaluationsRoutingModule,
	],
	providers: [ModalService],
})
export class SelfEvaluationsModule {}
