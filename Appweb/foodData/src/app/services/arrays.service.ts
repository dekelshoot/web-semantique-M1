import { Injectable } from '@angular/core';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root'
})
export class ArraysService {

  constructor() { }

  foods: Array<Food> = [
    {
      id: 1,
      image: "../../assets/Somalie-Natly.jpg",
      name: "Pilons de poulet rôtis somaliens",
      type: "rôtis",
      ingredients: ["12 pilons de poulet", "1 kg de petites pommes de terre nouvelles", "2 c. à café de romarin séché", "2 c. à café de tandoori", "5 gousses d’ail", "1/2 cube de bouillon de volaille", "1 c. à soupe de vinaigre blanc", "5 c. à soupe d’huile d’olive", "Sel"],
      description: "Pilons de poulet rôtis somaliens (Natly)",
      preparation: `
      1- 12 pilons de poulet
      2- 1 kg de petites pommes de terre nouvelles
      3- 2 c. à café de romarin séché
      4- 2 c. à café de tandoori
      5- 5 gousses d’ail
      6- 1/2 cube de bouillon de volaille
      7- 1 c. à soupe de vinaigre blanc
      8- 5 c. à soupe d’huile d’olive
      9-Sel
      `,
    },
    {
      id: 2,
      image: "../../assets/Croquettes-de-viande-de-Somalie-0012.jpg",
      name: "Croquettes de boeuf",
      type: "friture",
      ingredients: ["200 g de mie de pain céto", "120 g d'eau", "680 g de bœuf haché", "2 oignons", "2 gousses d'ail", "20 g de persil haché", "1 Œuf", "1 cuillère à café rase de poivre noir", "1 cuillère à café de cumin moulu", "1/2 cuillère à café de paprika", "Sel au goût", "45 g d'huile de coco"],
      description: "Croquettes de boeuf (Sophie)",
      preparation: `
      1- 200 g de mie de pain céto
      2- 120 g d'eau
      3- 680 g de bœuf haché
      4- 2 oignons
      5- 2 gousses d'ail
      6- 20 g de persil haché
      7- 1 Œuf
      8- 1 cuillère à café rase de poivre noir
      9- 1 cuillère à café de cumin moulu
      10- 1/2 cuillère à café de paprika
      11- Sel au goût
      12- 45 g d'huile de coco
      `,
    },
    {
      id: 3,
      image: "../../assets/The-aux-epices-somalien.jpg",
      name: "Shaah - Thé aux épices ",
      type: "Boisson",
      ingredients: ["1 c. à c. de feuilles de thé", "3 gousses de cardamome", "1 clou de girofle", "2 cm de gingembre frais", "1 bâton de cannelle", "1 c. à s. d'érythritol roux", "3 c. à s. de crème fraîche liquide", "50 cl d'eau],"],
      description: "Shaah - Thé aux épices (Sophie)",
      preparation: `
      1- 1 c. à c. de feuilles de thé
      2- 3 gousses de cardamome
      3- 1 clou de girofle
      4- 2 cm de gingembre frais
      5- 1 bâton de cannelle
      6- 1 c. à s. d'érythritol roux
      7- 3 c. à s. de crème fraîche liquide
      _- 50 cl d'eau
      `,
    },
    {
      id: 4,
      image: "../../assets/Somalie-Martine.jpg",
      name: "Lahooh aux lentilles et aux épinards",
      type: "croissant",
      ingredients: ["1- 195 g de farine T 65", "2- 65 g de farine de maïs", "3- 1 oeuf", "4- 50 cl de lait entier", "5- une pincée de sel", "6- 1 cc de bicarbonate de soude", "7- 200 g de lentilles", "8- 2 oignons", "9- 1 grosse tomate", "10- 500 g d' épinards", "11- 1 cc de cumin", "12- sel et poivre"],
      description: "Shaah - Thé aux épices (Sophie)",
      preparation: `
      1- 195 g de farine T 65
      2- 65 g de farine de maïs
      3- 1 oeuf
      4- 50 cl de lait entier
      5- une pincée de sel
      6- 1 cc de bicarbonate de soude
      7- 200 g de lentilles
      8- 2 oignons
      9- 1 grosse tomate
      10- 500 g d' épinards
      11- 1 cc de cumin
      12- sel et poivre
      `,
    },

  ]
}
