import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PrivilegesComponent } from "./privileges/privileges.component";
import { RedeemCouponComponent } from "@components/app-components/main/redeem-coupon/redeem-coupon.component";

const routes: Routes = [
	{
		path: "dashboard",
		component: DashboardComponent,
		data: { breadcrumbs: "Dashboard" },
	},
	{
		path: "privileges",
		component: PrivilegesComponent,
		data: { breadcrumbs: "Privileges" },
	},
	{
		path: "modules",
		loadChildren: () =>
			import("./modules/modules.module").then((m) => m.ModulesModule),
		data: { breadcrumbs: "Modulos" },
	},
	{
		path: "generate-content/:moduleId/:contentId",
		loadChildren: () =>
			import("./generate-content/generate-content.module").then(
				(m) => m.GenerateContentModule
			),
		data: { breadcrumbs: "Generador de contenidos" },
	},
	{
		path: "diseases",
		loadChildren: () =>
			import("./diseases/diseases.module").then((m) => m.DiseasesModule),
		data: { breadcrumbs: "Enfermedades" },
	},
	{
		path: "image-bank",
		loadChildren: () =>
			import("./image-bank/image-bank.module").then((m) => m.ImageBankModule),
		data: { breadcrumbs: "Banco de imagenes" },
	},
	{
		path: "glossary-word",
		loadChildren: () =>
			import("./glossary-word/glossary-word.module").then(
				(m) => m.GlossaryWordModule
			),
		data: { breadcrumbs: "Glosario de palabras" },
	},
	{
		path: "self-evaluations",
		loadChildren: () =>
			import("./self-evaluations/self-evaluations.module").then(
				(m) => m.SelfEvaluationsModule
			),
		data: { breadcrumbs: "Auto Evaluaciones" },
	},
	{
		path: "privacy-policies",
		loadChildren: () =>
			import("./privacy-policies/privacy-policies.module").then(
				(m) => m.PrivacyPoliciesModule
			),
		data: { breadcrumbs: "Políticas De Privacidad" },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MainRoutingModule {}
