import { Component, Input, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food.model';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-card2',
  templateUrl: './card2.component.html',
  styleUrls: ['./card2.component.scss']
})
export class Card2Component implements OnInit {
  @Input() food: Food | any;
  constructor(public routerService: RouterService) { }

  ngOnInit(): void {
  }
}
