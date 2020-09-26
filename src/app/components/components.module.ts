import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SquarePillButtonComponent } from "./shared/square-pill-button/square-pill-button.component";
import { NavigationRibbonComponent } from "./shared/navigation-ribbon/navigation-ribbon.component";
import { SquaredPillImageButtonComponent } from "./shared/squared-pill-image-button/squared-pill-image-button.component";

@NgModule({
	declarations: [
		SquarePillButtonComponent,
		NavigationRibbonComponent,
		SquaredPillImageButtonComponent,
	],
	imports: [CommonModule],
	exports: [
		SquarePillButtonComponent,
		NavigationRibbonComponent,
		SquaredPillImageButtonComponent,
	],
})
export class ComponentsModule {}
