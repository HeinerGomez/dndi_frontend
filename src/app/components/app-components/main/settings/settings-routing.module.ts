import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyInfoComponent } from '@components/app-components/main/settings/my-info/my-info.component';

const routes: Routes = [
	{
		path: 'my-info',
		component: MyInfoComponent,
		data: {breadcrumbs: 'My Info'}
	},
	{
		path: 'products',
		loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
		data: {breadcrumbs: 'Products'}
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SettingsRoutingModule {
}
