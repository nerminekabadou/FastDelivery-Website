import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
  standalone: false
})
export class FoodListComponent implements OnInit {

  @Input()
  order!:Order;

  constructor() { }

  ngOnInit(): void {
  }
}
