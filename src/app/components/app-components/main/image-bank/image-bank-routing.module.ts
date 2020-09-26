import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RenderImageBankComponent } from "./render-image-bank/render-image-bank.component";

const routes: Routes = [
	{
		path: "",
		component: RenderImageBankComponent,
		data: { breadcrumbs: "" },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ImageBankRoutingModule {}
