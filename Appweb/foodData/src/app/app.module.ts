import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { CardComponent } from './layouts/card/card.component';
import { StartComponent } from './components/start/start.component';
import { SingleFoodComponent } from './components/single-food/single-food.component';
import { FoodsComponent } from './components/foods/foods.component';
import { HttpClientModule } from '@angular/common/http';
import { DaoService } from './services/dao.service';
import { RoutesService } from './services/routes.service';
import { RequestService } from './services/request.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableComponent } from './layouts/table/table.component';
import { Card2Component } from './layouts/card2/card2.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    StartComponent,
    SingleFoodComponent,
    FoodsComponent,
    TableComponent,
    Card2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    DaoService,
    RoutesService,
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
