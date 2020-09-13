import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GenerateContentComponent } from "./generate-content.component";

const routes: Routes = [
	{ path: "", component: GenerateContentComponent, data: { breadcrumbs: "" } },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GenerateContentRoutingModule {}
