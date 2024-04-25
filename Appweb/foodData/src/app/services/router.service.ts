import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) { }

  routeFood(id: string) {
    this.router.navigate(["foods", id]);
  }
}
