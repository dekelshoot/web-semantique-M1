import { Component, Input, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { Food } from '../../models/food.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() food: Food | any;
  constructor(public routerService: RouterService) { }

  ngOnInit(): void {
  }
}
