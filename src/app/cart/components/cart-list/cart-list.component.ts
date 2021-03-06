import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartService } from '../../../core/services/cart.service';
import { CartItemModel } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, OnDestroy {

  public cartItems: Array<CartItemModel>;

  public cases = ['price', 'count', 'name'];
  public order = 'price';
  isAsc = false;

  public price: number;
  public itemsCount: number;

  private subscription: Subscription;

  constructor(private router: Router,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getProducts();
    this.subscription = this.cartService.getCardUpdatedEmitter()
      .subscribe((items: Array<CartItemModel>) => this.update(items));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  update(items: Array<CartItemModel>): void {
    this.cartItems = items;
    this.price = this.cartService.getTotalPrice();
    this.itemsCount = this.cartService.getTotalCount();
  }

  onRemove(cartItem: CartItemModel): void {
    this.cartService.removeProduct(cartItem);
  }

  trackById(index: any, cartItem: CartItemModel): string {
    return cartItem.id;
  }

  clear(): void {
    this.cartService.removeAllProducts();
  }

  nonEmpty(): boolean {
    return this.cartItems.length > 0;
  }

  onOrder(): void {
    this.router.navigate(['/order']);
  }
}
