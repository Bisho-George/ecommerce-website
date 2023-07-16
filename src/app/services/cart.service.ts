import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });
  constructor(private _snakBar: MatSnackBar) { }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => item.id === _item.id);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    this._snakBar.open("1 item added to cart", "Ok", {
      duration: 3000,
    });
  }
  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
  clearCart(): void {
    this.cart.next({ items: [] });
    this._snakBar.open("Cart is cleared", "Ok", {
      duration: 3000,
    })
  }
  deleteItem(id: number): void {
    const filteredItems = this.cart.value.items.filter((item) => item.id !== id);
    this.cart.next({ items: filteredItems });
    this._snakBar.open("Item is deleted", "Ok", {
      duration: 3000
    })
  }
  removeItem(cartItem: CartItem): void {
    let filteredItems = this.cart.value.items.map((item) => {
      if (item.id === cartItem.id) {
        item.quantity--;
      }
      return item;
    })
    filteredItems = this.cart.value.items.filter((_item) => _item.quantity > 0);

    this.cart.next({ items: filteredItems });
    this._snakBar.open('1 item is deleted', 'Ok', {
      duration: 3000
    })
  }
}
