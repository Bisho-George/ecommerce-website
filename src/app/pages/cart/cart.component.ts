import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  constructor (private cartService: CartService) {}
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "Sncikers",
        price: 150,
        quantity: 1,
        id: 1,
      }, {
        product: "https://via.placeholder.com/150",
        name: "Sncikers",
        price: 150,
        quantity: 3,
        id: 2,
      },
    ],
  };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  onClearCart (): void {
    this.cartService.clearCart();
  }

  onDeleteItem (item: any): void {
    this.cartService.deleteItem(item);
  }
  onRemoveItem (cartItem: CartItem): void {
    this.cartService.removeItem(cartItem);
  }
  onAddItem (cartItem: CartItem): void { 
    this.cartService.addToCart(cartItem);
  }
}
