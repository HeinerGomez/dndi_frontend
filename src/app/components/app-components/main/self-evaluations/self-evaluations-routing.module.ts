import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SelfEvaluationsListComponent } from "./self-evaluations-list/self-evaluations-list.component";

const routes: Routes = [
	{
		path: "",
		component: SelfEvaluationsListComponent,
		data: { breadcrumbs: "" },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SelfEvaluationsRoutingModule {}
