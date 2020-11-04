import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GlossaryWordRoutingModule } from "./glossary-word-routing.module";
import { GlossaryWordListComponent } from "./glossary-word-list/glossary-word-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LaddaModule } from "angular2-ladda";
import { NgBootstrapFormValidationModule } from "ng-bootstrap-form-validation";
import { NgSelectModule } from "@ng-select/ng-select";
import { LayoutModule } from "../../../../layout/layout.module";
import { ComponentsModule } from "../../../components.module";
import { FormGlossaryWordComponent } from "./form-glossary-word/form-glossary-word.component";
import { ModalService } from "../../../../services/shared/modal.service";

@NgModule({
	declarations: [GlossaryWordListComponent, FormGlossaryWordComponent],
	entryComponents: [FormGlossaryWordComponent],
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
		GlossaryWordRoutingModule,
	],
	providers: [ModalService],
})
export class GlossaryWordModule {}
