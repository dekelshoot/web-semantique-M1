import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor() { }

  baseUrlupdate = 'http://localhost:3030/FoodData/update';
  baseUrlquery = 'http://localhost:3030/FoodData/query'
  baseUrlsparql = 'http://localhost:3030/FoodData/sparql'

}
