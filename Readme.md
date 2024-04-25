# FoodData (Somalie)

food data est un projet d'initiation au web sémantique.
Dans ce projet, nous avons :

- collecter les données de nourriture sur un pays : Somalie
- créer une ontologie sur Protetege en suivant le diagramme uml suivant [**ic**](./Uml/FoodData.png)
- l'enrichir avec les données sur les nourritures du pays
- le déployer sur jena fuseki server
- effectuer les requêtes saparql
- designer une appweb et mobile pour effectuer les requêtes

## Comment utiliser FoodData?

Pour l'utiliser, rien de plus simple

1.  Installez jena fuseki server
2.  Déployez l'ontologie qui se trouve [**ici**](./onthologie/onthologie.owl) dans jena fuseki dans une dataset que vous appellerez FoodData
3.  Lancez le fichier [**ci**](./Appweb/dist/index.html) dans un server live ou déposez le dossier [**ci**](./Appweb/dist) dans htdocs de Zampp et lancez le
4.  Vous pourrez aisément effectuer vos requêtes dans une application conviviale et propre
5.  Le dossier [**ci**](./Appweb/foodData/) est un projet angular de l'application web de fooData vous pouvez continuer le développement de l'application
