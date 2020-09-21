import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SquarePillButtonComponent } from "./shared/square-pill-button/square-pill-button.component";
import { NavigationRibbonComponent } from "./shared/navigation-ribbon/navigation-ribbon.component";

@NgModule({
	declarations: [SquarePillButtonComponent, NavigationRibbonComponent],
	imports: [CommonModule],
	exports: [SquarePillButtonComponent, NavigationRibbonComponent],
})
export class ComponentsModule {}
