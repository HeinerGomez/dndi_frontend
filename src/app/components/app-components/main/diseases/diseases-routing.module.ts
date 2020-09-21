import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RenderDiseasesComponent } from "./render-diseases/render-diseases.component";

const routes: Routes = [
	{
		path: "",
		component: RenderDiseasesComponent,
		data: { breadcrumbs: "" },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DiseasesRoutingModule {}
