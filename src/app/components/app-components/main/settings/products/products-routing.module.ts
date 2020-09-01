import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from '@components/app-components/main/settings/products/product-list/product-list.component';

const routes: Routes = [
	{
		path: '',
		component: ProductListComponent,
		data: {breadcrumbs: 'List'}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductsRoutingModule {
}
