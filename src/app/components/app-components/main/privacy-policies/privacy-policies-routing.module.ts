import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RenderPrivacyPoliciesComponent } from "./render-privacy-policies/render-privacy-policies.component";

const routes: Routes = [
	{
		path: "",
		component: RenderPrivacyPoliciesComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PrivacyPoliciesRoutingModule {}
