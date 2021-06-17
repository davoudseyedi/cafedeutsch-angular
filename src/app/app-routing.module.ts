import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./pages/home/home.component";
import { ProductComponent } from "./pages/product/product.component";


const routes: Routes = [
    {
        component: HomeComponent,
        path: '',
        pathMatch: 'full'
    },
    {
        component: ProductComponent,
        path: 'product/:id'
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
