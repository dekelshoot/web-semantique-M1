import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food.model';
import { ArraysService } from 'src/app/services/arrays.service';
import { RequestService } from '../../services/request.service';
import { RoutesService } from 'src/app/services/routes.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  foods: Array<any> = [];
  card: any = {}
  foodsDropDown: Array<any> = [];
  foodsSparql: Array<any> = [];
  foodsSearch: Array<any> = [];
  ingredient: Array<any> = [];
  foodComponent: Array<any> = [];
  classSubclassInstance!: any;
  classSubclassInstance2!: any;
  form = 1;

  arborescence = ""

  order = 'ASC'
  query: string = `
  PREFIX foo: <http://filmontology.org/ontology/1.0/>
  PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

  SELECT ?nom ?description ?image
  WHERE {
    ?individu rdf:type food:Dish.
    ?individu food:name ?nom .
    ?individu food:description ?description.
    ?individu food:image ?image.
  }`
  dropDownInForm!: FormGroup;
  errorMessage!: string;
  loadingDropDown = false;
  successDropDown = false;
  errorDropDown = false;
  errorMessageDropdown = "";

  sparqlForm!: FormGroup;
  sparqlerrorMessage!: string;
  loadingsparql = false;
  successsparql = false;
  errorsparql = false;
  errorMessagesparql = "";

  searchForm!: FormGroup;
  searcherrorMessage!: string;
  loadingsearch = false;
  successsearch = false;
  errorsearch = false;
  errorMessagessearch = "";
  successMessagesform = ""

  formForm!: FormGroup;
  formerrorMessage!: string;
  loadingform = false;
  successform = false;
  errorform = false;
  errorMessagesform = "";

  loadingClassSubclassInstance = true;
  loadingClassSubclassInstance2 = true;
  datas!: any;
  constructor(
    private requestService: RequestService,
    private route: RoutesService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.datas = [
      {
        id: 1,
        query: "Give the name of all the foods in ascending and descending order"
      },
      {
        id: 3,
        query: "get all the Ingredients in ascending and descending order"
      },

    ]
    let data = new URLSearchParams()
    data.set("query", `
    PREFIX foo: <http://filmontology.org/ontology/1.0/>
    PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

    SELECT ?nom ?description ?image
    WHERE {
      ?individu rdf:type food:Dish.
      ?individu food:name ?nom .
      ?individu food:description ?description.
      ?individu food:image ?image.
    }`)
    this.requestService.post(this.route.baseUrlquery, data).then(
      (res: any) => {
        this.foods = res.results.bindings
      },
      (err) => {
        // console.log(err)
      }
    )
    this.onChargeClassSubclassInstance();
    this.oncharDishAndLink();
    this.initFormDropdown();
    this.initFormSparql();
    this.initFormSearch();
    this.initForm();
    this.sparqlForm.setValue({ query: this.query })
  }

  initFormDropdown() {
    this.dropDownInForm = this.formBuilder.group({
      query: ['', [Validators.required]],

    });
  }

  initFormSearch() {
    this.searchForm = this.formBuilder.group({
      query: ['', [Validators.required]],

    });
  }

  initFormSparql() {
    this.sparqlForm = this.formBuilder.group({
      query: ['', [Validators.required]],

    });
  }

  initForm() {
    this.formForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      checkbox: new FormArray([]),
    });
  }

  initForm2() {
    this.formForm = new FormGroup({
      // control for radio exemple
      name: new FormControl("", Validators.required),
      // control for Checkbox exemple
      checkboxs: new FormArray([]),
    });
  }
  initForm3() {
    this.formForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      checkboxs: new FormArray([]),
    });
  }


  onSubmitDropdown() {
    this.loadingDropDown = true;
    this.errorDropDown = false;
    this.successDropDown = false;
    const query = this.dropDownInForm.get('query')?.value;
    if (query == 1) {
      this.getNameFood();
    } else if (query == 2) {

    } else if (query == 3) {
      this.getAllIngredient();
    }

  }



  onSubmitSparql() {
    this.loadingsparql = true;
    this.errorsparql = false;
    this.successsparql = false;
    const query = this.sparqlForm.get('query')?.value;
    let data = new URLSearchParams()
    data.set("query", query)
    this.requestService.post(this.route.baseUrlquery, data).then(
      (res: any) => {
        this.foodsSparql = res.results.bindings
        this.loadingsparql = false;
        this.successsparql = true;
        this.errorsparql = false;
      },
      (err) => {
        this.errorsparql = true;
        this.errorMessagesparql = err.error
        this.loadingsparql = false;
        this.successsparql = false;
        // console.log(err)
      }
    )
  }

  onSubmitSearch() {
    this.loadingsearch = true;
    this.errorsearch = false;
    this.successsearch = false;
    const query = this.searchForm.get('query')?.value;
    let data = new URLSearchParams()
    data.set("query", `
    PREFIX foo: <http://filmontology.org/ontology/1.0/>
    PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

    SELECT DISTINCT ?nom ?description ?image
    WHERE {
      ?individu rdf:type ?food.
      ?individu food:name ?nom .
      OPTIONAL {?individu food:description ?description.}
    OPTIONAL {?individu food:image ?image.}
    FILTER CONTAINS(?nom , "${query}")
    }ORDER BY ${this.order}(?nom)`)
    this.requestService.post(this.route.baseUrlquery, data).then(
      (res: any) => {
        // console.log(res.results.bindings)
        this.foodsSearch = res.results.bindings
        this.loadingsearch = false;
        this.successsearch = true;
        this.errorsearch = false;
      },
      (err) => {
        this.errorsearch = true;
        this.errorMessagessearch = err.error
        this.loadingsearch = false;
        this.successsearch = false;
        // console.log(err)
      }
    )
  }


  changeOrder(order: string) {
    this.order = order;
  }


  getNameFood() {
    let data = new URLSearchParams()
    data.set("query", `

  PREFIX foo: <http://filmontology.org/ontology/1.0/>
  PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

  SELECT ?nom
  WHERE {
    ?individu rdf:type food:Dish.
    ?individu food:name ?nom .
  }ORDER BY ${this.order}(?nom)`)
    this.requestService.post(this.route.baseUrlquery, data).then(
      (res: any) => {
        // console.log(res.results.bindings)
        this.foodsDropDown = res.results.bindings
        this.loadingDropDown = false;
        this.successDropDown = true;
        this.errorDropDown = false;
      },
      (err) => {
        this.errorDropDown = true;
        this.errorMessageDropdown = err.error
        this.loadingDropDown = false;
        this.successDropDown = false;
        // console.log(err)
      }
    )
  }

  getAllIngredient() {
    let data = new URLSearchParams()
    data.set("query", `

  PREFIX foo: <http://filmontology.org/ontology/1.0/>
  PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

  SELECT ?nom
  WHERE {
    ?individu rdf:type food:Ingredient.
    ?individu food:name ?nom .
  }ORDER BY ${this.order}(?nom)`)
    this.requestService.post(this.route.baseUrlquery, data).then(
      (res: any) => {
        // console.log(res.results.bindings)
        this.foodsDropDown = res.results.bindings
        this.loadingDropDown = false;
        this.successDropDown = true;
        this.errorDropDown = false;
      },
      (err) => {
        this.errorDropDown = true;
        this.errorMessageDropdown = err.error
        this.loadingDropDown = false;
        this.successDropDown = false;
        // console.log(err)
      }
    )
  }

  getAllIngredient2(n: number) {
    let data = new URLSearchParams()
    data.set("query", `

  PREFIX foo: <http://filmontology.org/ontology/1.0/>
  PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
  PREFIX owl: <http://www.w3.org/2002/07getAllIngredient2()/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

  SELECT ?nom
  WHERE {
    ?individu rdf:type food:Ingredient.
    ?individu food:name ?nom .
  }ORDER BY ${this.order}(?nom)`)
    this.requestService.post(this.route.baseUrlquery, data).then(
      (res: any) => {
        // console.log(res.results.bindings)

        this.ingredient = res.results.bindings
        this.loadingform = false;
        this.errorform = false;
        this.onChangeForm(n);
      },
      (err) => {
        this.errorform = true;
        this.errorMessagesform = err.error
        this.loadingform = false;
        this.successform = false;

      }
    )
  }


  getAllFoodComponent(n: number) {
    let data = new URLSearchParams()
    data.set("query", `

  PREFIX foo: <http://filmontology.org/ontology/1.0/>
  PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
  PREFIX owl: <http://www.w3.org/2002/07getAllIngredient2()/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

  SELECT ?nom
  WHERE {
    ?individu rdf:type food:FoodComponent.
    ?individu food:name ?nom .
  }ORDER BY ASC(?nom)`)
    this.requestService.post(this.route.baseUrlquery, data).then(
      (res: any) => {
        this.foodComponent = res.results.bindings
        // console.log(this.foodComponent)
        this.onChangeForm(n);
        this.loadingform = false;
        this.errorform = false;
      },
      (err) => {
        this.errorform = true;
        this.errorMessagesform = err.error
        this.loadingform = false;
        this.successform = false;

      }
    )
  }

  onSubmitFrom(form: string) {
    this.loadingform = true;
    this.errorform = false;
    this.successform = false;


    if (form == '1') {
      const query = this.formForm.get('Name')?.value;
      let data = new URLSearchParams()
      data.set("update", `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foo: <http://filmontology.org/ontology/1.0/>
PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

INSERT DATA
{
  food:${query.replace(/ /g, "_")} rdf:type food:FoodComponent .
  food:${query.replace(/ /g, "_")} food:name "${query}"^^xsd:string .
}`)
      this.requestService.post(this.route.baseUrlupdate, data).then(
        (res: any) => {
          // console.log(res)
          this.loadingform = false;
          this.successform = true;
          this.errorform = false;
          this.formForm.setValue({ Name: '' })
        },
        (err) => {
          this.loadingform = false;
          this.successform = true;
          this.errorform = false;

          this.successMessagesform = err.error.text
          this.loadingform = false;
          this.successform = true;
          this.onChangeForm(1);


        }
      )

    } else if (form == '2') {
      const name = this.formForm.get('name')?.value;
      const checkboxs = this.formForm.get('checkboxs')?.value.filter((value: any) => value.checked);
      let loop = () => {
        let loop: Array<any> = []
        checkboxs.forEach((element: any) => {
          loop.push(`food:${name.replace(/ /g, "_")} food:hasFoodComponent food:${element.name.replace(/ /g, "_")} .\n`)
        });
        return loop.join(' ');
      }
      let data = new URLSearchParams()
      data.set("update", `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foo: <http://filmontology.org/ontology/1.0/>
PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

INSERT DATA
{
  food:${name.replace(/ /g, "_")} rdf:type food:Ingredient .
  food:${name.replace(/ /g, "_")} food:name "${name}"^^xsd:string .
  ${loop()}
}`)
      this.requestService.post(this.route.baseUrlupdate, data).then(
        (res: any) => {
          // console.log(res)
          this.loadingform = false;
          this.successform = true;
          this.errorform = false;
          this.onChangeForm(2);
        },
        (err) => {
          this.loadingform = false;
          this.successform = true;
          this.errorform = false;

          this.successMessagesform = err.error.text
          this.loadingform = false;
          this.successform = true;
          this.onChangeForm(2);


        }
      )
    } else if (form == '3') {
      const name = this.formForm.get('name')?.value;
      const description = this.formForm.get('description')?.value;
      const image = this.formForm.get('image')?.value;
      const checkboxs = this.formForm.get('checkboxs')?.value.filter((value: any) => value.checked);
      let loop = () => {
        let loop: Array<any> = []
        checkboxs.forEach((element: any) => {
          loop.push(`food:${name.replace(/ /g, "_")} food:hasIngredient food:${element.name.replace(/ /g, "_")} .\n`)
        });
        return loop.join(' ');
      }
      let data = new URLSearchParams()
      data.set("update", `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX foo: <http://filmontology.org/ontology/1.0/>
PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

INSERT DATA
{
  food:${name.replace(/ /g, "_")} rdf:type food:Dish .
  food:${name.replace(/ /g, "_")} food:name "${name}"^^xsd:string .
  food:${name.replace(/ /g, "_")} food:description "${description}"^^xsd:string .
  food:${name.replace(/ /g, "_")} food:image "${image}"^^xsd:string .
  food:${name.replace(/ /g, "_")} food:isFrom food:Somalia .
  ${loop()}
}`)
      this.requestService.post(this.route.baseUrlupdate, data).then(
        (res: any) => {
          // console.log(res)
          this.loadingform = false;
          this.successform = true;
          this.errorform = false;
          this.onChangeForm(3);
        },
        (err) => {
          this.loadingform = false;
          this.successform = true;
          this.errorform = false;

          this.successMessagesform = err.error.text
          this.loadingform = false;
          this.successform = true;
          this.onChangeForm(3);



        }
      )
    }

  }

  onChangeForm(n: number) {
    this.form = n;
    if (n == 1) {
      this.initForm();
    } else if (n == 2) {
      this.initForm2();
      // get array control
      const formArray = this.formForm.get('checkboxs') as FormArray;
      // loop for each existing value
      this.foodComponent.forEach((component) => {
        // add new control to FormArray
        formArray.push(
          // here the new FormControl with item value from RADIO_LIST_FROM_DATABASE
          new FormGroup({
            name: new FormControl(component.nom.value),
            checked: new FormControl(false),
          })
        );
      });
    } else if (n == 3) {
      this.initForm3();
      // get array control
      const formArray = this.formForm.get('checkboxs') as FormArray;
      // loop for each existing value
      this.ingredient.forEach((component) => {
        // add new control to FormArray
        formArray.push(
          // here the new FormControl with item value from RADIO_LIST_FROM_DATABASE
          new FormGroup({
            name: new FormControl(component.nom.value),
            checked: new FormControl(false),
          })
        );
      });
    }



  }
  onParse(n: string) {
    // console.log(n.replace(/ /g, "_"))
    return n.replace(/ /g, "_")
  }



  onChargeClassSubclassInstance() {
    let results: any = {};

    // class --------------------------------------------------------------------------------------
    this.loadingClassSubclassInstance = true;
    let data = new URLSearchParams()
    data.set("query", `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    SELECT DISTINCT ?class WHERE {
      ?class a owl:Class .
    }

      `)
    this.requestService.post(this.route.baseUrlquery, data).then(
      (res: any) => {

        this.loadingClassSubclassInstance = false;
        res.results.bindings.forEach((element: any) => {
          results[element.class.value.split("#")[1]] = {}

        })
        // console.log(results)

        // Subclass --------------------------------------------------------------------------------------

        this.loadingClassSubclassInstance = true;
        let data = new URLSearchParams()
        data.set("query", `
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        SELECT ?subclass ?class WHERE {
          ?subclass rdfs:subClassOf ?class .
        }
      `)
        this.requestService.post(this.route.baseUrlquery, data).then(
          (res: any) => {
            res.results.bindings.forEach((element: any) => {
              if (element.subclass.value.split("#")[1] in results) {
                results[element.class.value.split("#")[1]][element.subclass.value.split("#")[1]] = results[element.subclass.value.split("#")[1]]
                delete results[element.subclass.value.split("#")[1]]
              }

            })

            for (let cle in results) {
              if (Object.keys(results[cle]).length == 0) {
                results[cle] = []
              } else {
                for (let cl in results[cle]) {
                  if (Object.keys(results[cle][cl]).length == 0) {
                    results[cle][cl] = []
                  }
                }
              }
            }

            // console.log(results)

            // Instance --------------------------------------------------------------------------------------
            this.loadingClassSubclassInstance = true;
            let data = new URLSearchParams()
            data.set("query", `
            SELECT ?instance ?class WHERE {
              ?instance a ?class .
            }
            `)
            this.requestService.post(this.route.baseUrlquery, data).then(
              (res: any) => {
                // console.log(res.results.bindings)
                for (let cle in results) {
                  if (results[cle] instanceof Array) {
                    res.results.bindings.forEach((element: any) => {
                      if (element.class.value.split("#")[1] == cle) {
                        results[cle].push(element.instance.value.split("#")[1])
                      }
                    })
                  } else {
                    for (let cl in results[cle]) {
                      res.results.bindings.forEach((element: any) => {
                        if (element.class.value.split("#")[1] == cl) {
                          results[cle][cl].push(element.instance.value.split("#")[1])
                        }
                      })
                    }
                  }

                }
                console.log(results)
                this.classSubclassInstance = results
                this.loadingClassSubclassInstance = false


              },
              (err) => {
                this.loadingClassSubclassInstance = false;
                // console.log(err)
              }
            )
            // --------------------------------------------------------------------------------------

          },
          (err) => {// Subclass --------------------------------------------------------------------------------------
            this.loadingClassSubclassInstance = false;
            // console.log(err)
          }
        )

        //--------------------------------------------------------------------------------------



      },
      (err) => {
        this.loadingClassSubclassInstance = false;
        // console.log(err)
      }
    )
  }

  oncharDishAndLink() {
    this.loadingClassSubclassInstance2 = true;
    let results: any = {};

    // class --------------------------------------------------------------------------------------

    let data = new URLSearchParams()
    data.set("query", `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX food: <http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

SELECT  ?Dish
WHERE {
  ?Dish rdf:type food:Dish.

}
      `)

    this.requestService.post(this.route.baseUrlquery, data).then(
      (res: any) => {
        // console.log(res.results.bindings)
        res.results.bindings.forEach((element: any) => {
          results[element.Dish.value.split("#")[1]] = {}

          for (let keys of Object.keys(results)) {
            let data = new URLSearchParams()
            data.set("query", `
            PREFIX fd: <http://foodable.co/ns/>
            PREFIX foo: <http://filmontology.org/ontology/1.0/>
            PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
            PREFIX owl: <http://www.w3.org/2002/07getAllIngredient2()/owl#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

            SELECT ?Dish ?ingredient
            WHERE {
              ?Dish a food:Dish .
            ?ingredient a food:Ingredient .
            ?Dish food:hasIngredient ?ingredient .
            }`)
            this.requestService.post(this.route.baseUrlquery, data).then(
              (res: any) => {
                // console.log(res.results.bindings)
                results[keys]["ingredients"] = {}
                res.results.bindings.forEach((element: any) => {
                  // console.log(keys, element.Dish.value.split("#")[1])
                  if (element.Dish.value.split("#")[1] == keys) {
                    results[keys]["ingredients"][element.ingredient.value.split("#")[1]] = []
                  }
                });


                let data = new URLSearchParams()
                data.set("query", `
                  PREFIX fd: <http://foodable.co/ns/>
                  PREFIX foo: <http://filmontology.org/ontology/1.0/>
                  PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
                  PREFIX owl: <http://www.w3.org/2002/07getAllIngredient2()/owl#>
                  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                  PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

                  SELECT DiSTINCT ?ingredient ?foodComponent
                  WHERE {
                    ?ingredient a food:Ingredient .
                  ?foodComponent a food:FoodComponent .
                  ?ingredient food:hasFoodComponent ?foodComponent .
                  }`)

                this.requestService.post(this.route.baseUrlquery, data).then(
                  (res: any) => {
                    // console.log(res.results.bindings)

                    res.results.bindings.forEach((element: any) => {

                      for (let cle of Object.keys(results[keys]["ingredients"])) {
                        if (element.ingredient.value.split("#")[1] == cle) {
                          results[keys]["ingredients"][element.ingredient.value.split("#")[1]].push(element.foodComponent.value.split("#")[1])
                        }
                        // for (let cl of Object.keys(results[cle]) {

                        // }
                      }

                    });


                    this.loadingClassSubclassInstance2 = false;

                  },
                  (err) => {
                    this.loadingClassSubclassInstance2 = false;
                    console.log(err);

                  }
                )


              },
              (err) => {
                this.loadingClassSubclassInstance2 = false;
                console.log(err);

              }
            )

            data = new URLSearchParams()
            data.set("query", `
 PREFIX foo: <http://filmontology.org/ontology/1.0/>
  PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

  SELECT ?nom ?description ?image
  WHERE {
    ?individu rdf:type food:Dish.
    ?individu food:name ?nom .
    ?individu food:description ?description.
    ?individu food:image ?image.
  }`)
            this.requestService.post(this.route.baseUrlquery, data).then(
              (res: any) => {
                // console.log(res.results.bindings)
                res.results.bindings.forEach((element: any) => {
                  if (element.nom.value.replace(/ /g, "_") == keys) {
                    results[keys]["name"] = [element.nom.value.replace(/ /g, "_")]
                    results[keys]["description"] = [element.description.value.replace(/ /g, "_")]
                    results[keys]["image"] = [element.image.value.replace(/ /g, "_")]
                  }
                });


              },
              (err) => {
                this.loadingClassSubclassInstance2 = false;
                console.log(err);

              }
            )

          }


          console.log(results)
          this.classSubclassInstance2 = results

        })
        // console.log(res.results.bindings)
        // console.log(results)
      },
      (err) => {
        this.loadingClassSubclassInstance2 = false;
        console.log(err);


      }
    )
  }


  getKeys(obj: Object) {
    if (obj instanceof Array) {
      return []
    } return Object.keys(obj);
  }



  getList(object: any, cle: string) {
    if (object[cle] instanceof Array) {
      return object[cle]
    } else return []
  }

  getAllIngredientByDishName(n: string) {
    let data = new URLSearchParams()
    data.set("query", `
    PREFIX fd: <http://foodable.co/ns/>
    PREFIX foo: <http://filmontology.org/ontology/1.0/>
    PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
    PREFIX owl: <http://www.w3.org/2002/07getAllIngredient2()/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX food: 	<http://www.semanticweb.org/dekelshoot/ontologies/2024/3/FoodData#>

    SELECT ?Dish ?ingredient
    WHERE {
      ?Dish a food:Dish .
    ?ingredient a food:Ingredient .
    ?Dish food:hasIngredient ?ingredient .
    }`)
    this.requestService.post(this.route.baseUrlquery, data).then(
      (res: any) => {
        console.log(res.results.bindings)


        return res.results.bindings

      },
      (err) => {
        this.errorform = true;
        this.errorMessagesform = err.error
        this.loadingform = false;
        this.successform = false;

      }
    )
    return {};
  }

  charDishInfo(n: string) {

    let d = {}
    for (let key of Object.keys(this.classSubclassInstance2[n])) {
      if (key != "ingredients") {
        this.card[key] = this.classSubclassInstance2[n][key][0]
      }
    }
    console.log(this.card)
  }

  suppBar(n: string) {
    return n.split('_').join(' ')
  }

  checLengnth(card: Object) {
    if (Object.keys(card).length != 0) {
      return true
    } return false
  }

}

