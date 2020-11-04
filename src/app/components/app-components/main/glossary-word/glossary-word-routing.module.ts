import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GlossaryWordListComponent } from "./glossary-word-list/glossary-word-list.component";

const routes: Routes = [
	{
		path: "",
		component: GlossaryWordListComponent,
		data: { breadcrumbs: "" },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GlossaryWordRoutingModule {}
