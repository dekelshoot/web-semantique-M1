import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { FoodsComponent } from './components/foods/foods.component';
import { SingleFoodComponent } from './components/single-food/single-food.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'foods', component: FoodsComponent },
  { path: 'foods/:id', component: SingleFoodComponent },
  { path: '', pathMatch: 'full', component: StartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
