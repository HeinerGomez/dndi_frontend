import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BaseModulesComponent } from "./base-modules/base-modules.component";
import { RenderModulesComponent } from "./base-modules/render-modules/render-modules.component";
import { RenderDiseasesComponent } from "./render-diseases/render-diseases.component";
import { RenderLanguagesComponent } from "./render-languages/render-languages.component";

const routes: Routes = [
	{
		path: "",
		component: BaseModulesComponent,
		children: [
			{ path: "module/:id", component: RenderModulesComponent },
			{ path: "render-diseases", component: RenderDiseasesComponent },
			{
				path: "render-languages/:diseaseId",
				component: RenderLanguagesComponent,
			},
			{ path: "**", redirectTo: "render-diseases" },
		],
		data: { breadcrumbs: "" },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ModulesRoutingModule {}
