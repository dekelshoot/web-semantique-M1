import { Component, OnInit } from '@angular/core';
import { ArraysService } from '../../services/arrays.service';
import { Food } from 'src/app/models/food.model';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {
  foods!: Array<Food>;
  constructor(
    private arraysService: ArraysService
  ) { }

  ngOnInit(): void {
    this.foods = this.arraysService.foods;
  }
}
