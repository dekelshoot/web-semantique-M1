# FoodData (Somalie)

food data est un project d'initiation au web sementique
dans ce projet nous avons:

- collecter les données de nourriture sur un pays: Somalie
- créer une ontology sur Protetege en suivant le diagram uml suivant [**ic**](./Uml/FoodData.png)
- l'enrichir avec les données sur les nourritures du pays
- le déployer sur jena fuseki server
- effectuer les requêtes saparql
- desgner une appweb et mobile pour effectuer les requests

## Comment utiliser FoodData?

pour l'utiliser, rien de plus simple

1.  installez jena fuseki server
2.  deployez l'ontologie qui se trouve [**ici**](./onthologie/onthologie.owl) dans jena fuseki dans une dataset que vous appelrez FoodDaat
3.  lancez lefichier [**ci**](./Appweb/dist/index.html) dans un server live ou deposez le dociez [**ci**](./Appweb/dist) dans htdocs de Zampp et lancez le
4.  vous pourez aisement effecteuer vos requetes dans une application conviviale et propre
5.  le dossier [**ci**](./Appweb/foodData/) est un projet angularde l'application web de fooData vous pouvez continuer le dévelopement de l'application
