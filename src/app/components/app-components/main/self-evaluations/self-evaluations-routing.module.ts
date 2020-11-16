import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SelfEvaluationsListComponent } from "./self-evaluations-list/self-evaluations-list.component";
import { QuestionsComponent } from "./questions/questions.component";

const routes: Routes = [
	{
		path: "",
		component: SelfEvaluationsListComponent,
		data: { breadcrumbs: "" },
	},
	{
		path: "questions",
		component: QuestionsComponent,
		data: { breadcrumbs: "Preguntas" },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SelfEvaluationsRoutingModule {}
