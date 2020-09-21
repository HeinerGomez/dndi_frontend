import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DiseasesRoutingModule } from "./diseases-routing.module";
import { RenderDiseasesComponent } from "./render-diseases/render-diseases.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LaddaModule } from "angular2-ladda";
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";
import { NgSelectModule } from "@ng-select/ng-select";
import { LayoutModule } from "../../../../layout/layout.module";
import { ComponentsModule } from "../../../components.module";
import { ModalService } from "../../../../services/shared/modal.service";
import { FormDiseasesComponent } from "./form-diseases/form-diseases.component";

@NgModule({
	declarations: [RenderDiseasesComponent, FormDiseasesComponent],
	entryComponents: [FormDiseasesComponent],
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
		DiseasesRoutingModule,
	],
	providers: [ModalService],
})
export class DiseasesModule {}
