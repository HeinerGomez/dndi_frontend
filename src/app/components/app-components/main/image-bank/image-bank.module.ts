import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ImageBankRoutingModule } from "./image-bank-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LaddaModule } from "angular2-ladda";
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";
import { NgSelectModule } from "@ng-select/ng-select";
import { LayoutModule } from "../../../../layout/layout.module";
import { ComponentsModule } from "../../../components.module";
import { RenderImageBankComponent } from "./render-image-bank/render-image-bank.component";
import { ModalService } from "../../../../services/shared/modal.service";
import { FormImageBankComponent } from "./form-image-bank/form-image-bank.component";

@NgModule({
	declarations: [RenderImageBankComponent, FormImageBankComponent],
	entryComponents: [FormImageBankComponent],
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
		ImageBankRoutingModule,
	],
	providers: [ModalService],
})
export class ImageBankModule {}
