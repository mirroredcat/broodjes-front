import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MenuComponent} from "./menu/menu.component";
import {OverviewComponent} from "./overview/overview.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'order', component: MenuComponent},
  { path: 'overview', component: OverviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
