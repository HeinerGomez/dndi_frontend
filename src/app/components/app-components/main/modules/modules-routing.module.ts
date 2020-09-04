import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BaseModulesComponent } from "./base-modules/base-modules.component";
import { RenderModulesComponent } from "./base-modules/render-modules/render-modules.component";

const routes: Routes = [
	{
		path: "",
		component: BaseModulesComponent,
		children: [
			{ path: "module/:id", component: RenderModulesComponent },
			{ path: "**", redirectTo: "module/0" },
		],
		data: { breadcrumbs: "" },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ModulesRoutingModule {}
