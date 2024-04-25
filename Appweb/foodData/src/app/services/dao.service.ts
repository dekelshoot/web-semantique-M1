import { Injectable } from '@angular/core';
import { RoutesService } from './routes.service';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class DaoService {

  constructor(
    private route: RoutesService,
    private requete: RequestService) { }


  getStart() {

    // let data = {
    //   'query': `
    //   PREFIX foo: <http://filmontology.org/ontology/1.0/>
    //   PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
    //   PREFIX owl: <http://www.w3.org/2002/07/owl#>
    //   PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    //   PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    //   PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/foodData#>
    //   SELECT ?nom ?description ?individu
    //   WHERE {
    //     ?individu rdf:type food:Dish.
    //     ?individu food:name ?nom .
    //     ?individu food:description ?description
    //   }`
    // }
    let data = { 'query': "PREFIX foo: <http://filmontology.org/ontology/1.0/> PREFIX fo: <http://www.w3.org/1999/XSL/Format#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/foodData#>SELECT ?nom ?description ?individuWHERE {  ?individu rdf:type food:Dish.  ?individu food:name ?nom .  ?individu food:description ?description}" };
    return this.requete.post(this.route.baseUrlquery, data)
  }


}
