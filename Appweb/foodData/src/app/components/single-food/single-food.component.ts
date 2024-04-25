import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/models/food.model';
import { RequestService } from 'src/app/services/request.service';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-single-food',
  templateUrl: './single-food.component.html',
  styleUrls: ['./single-food.component.scss']
})
export class SingleFoodComponent implements OnInit {
  food!: any;
  foods!: any;
  id!: number;
  constructor(
    private routes: ActivatedRoute,
    private requestService: RequestService,
    private route: RoutesService,
  ) { }

  ngOnInit(): void {
    let id = this.routes.snapshot.params['id']

    let data = new URLSearchParams()
    data.set("query", `
    PREFIX foo: <http://filmontology.org/ontology/1.0/>
    PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

    SELECT ?name ?description ?image
    WHERE {
      ?individu rdf:type food:Dish.
      ?individu food:name ?name .
      ?individu food:description ?description.
      ?individu food:image ?image.
    }`)
    this.requestService.post(this.route.baseUrlquery, data).then(
      (res: any) => {
        console.log(res.results.bindings)
        this.foods = res.results.bindings
        this.foods.forEach((element: any) => {
          if (element.name.value == id.split('_').join(' ')) {
            this.food = element
          }
        });
      },
      (err) => {
        console.log(err)
      }
    )
  }

  // ngRandom(): void {


  //   for (let i = 0; i < 5; i++) {
  //     this.foods.push(this.arraysService.foods[Math.floor(Math.random() * this.arraysService.foods.length)]);
  //   }
  // }

}
