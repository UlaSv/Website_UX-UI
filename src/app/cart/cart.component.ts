import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Color } from '../services/color';
import { Observable, map } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { InfoService } from '../services/info.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [
        CommonModule,
        RadioButtonModule,
        FloatLabelModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        CalendarModule,
        RouterModule,
        DividerModule,
        BadgeModule,
    ],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
})
export class CartComponent {
    items: any;
    products: any = [];

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private router: Router,
        private cartService: CartService,
        private changeDetectorRef: ChangeDetectorRef,
        private infoService: InfoService
    ) {
        this.items = this.cartService.getAllCartItems();

        this.items.forEach((product: { id: string }) => {
            this.productService.getProductMetadata(product.id).subscribe(
                (productMetadata) => {
                    this.products.push(productMetadata);
                    this.calcTotal();
                },
                (error) => {
                    console.error(error);
                }
            );
        });
    }

    check() {
        if (this.products) {
            this.products.forEach((item2: { id: string }) =>
                console.log(item2.id)
            );
        } else {
            console.log('nicht init');
        }
    }
    getBrand(id: string): string {
        let find = this.products.find(
            (product: { id: string }) => product.id === id
        );
        return find.brand;
    }
    getGender(id: string): string {
        let find = this.products.find(
            (product: { id: string }) => product.id === id
        );
        return find.gender;
    }
    getName(id: string): string {
        let find = this.products.find(
            (product: { id: string }) => product.id === id
        );
        return find.name;
    }
    getCategory(id: string): string {
        let find = this.products.find(
            (product: { id: string }) => product.id === id
        );
        return find.category;
    }
    getType(id: string): string {
        let find = this.products.find(
            (product: { id: string }) => product.id === id
        );
        return find.type;
    }
    getPrice(id: string): number {
        let find = this.products.find(
            (product: { id: string }) => product.id === id
        );
        return find.price;
    }
    getColorName(e: string, colorId: string): string | undefined {
        let product = this.products.find((product: { id: string }) => {
            return product.id == e;
        });
        let color = product.colors.find((color: { color_id: string }) => {
            return color.color_id == colorId;
        });
        return color?.color_name;
    }

    increment(e: string, size: string) {
        let input = <HTMLInputElement>(
            document.getElementById('hours' + e + size)
        );
        let count = Number(input.value);
        count++;
        input.value = count.toString();
        let find = this.items.find(
            (item: { color: string; size: string }) =>
                item.color === e && item.size === size
        );
        find.quantity = count;
        this.cartService.setCartItem(find);
        this.calcTotal();
    }

    decrement(e: string, size: string) {
        let input = <HTMLInputElement>(
            document.getElementById('hours' + e + size)
        );
        let count = Number(input.value);
        if (count === 1) {
            this.del(e);
            return;
        }
        if (count > 1) {
            count--;
            input.value = count.toString();
        }
        let find = this.items.find(
            (item: { color: string; size: string }) =>
                item.color === e && item.size === size
        );
        find.quantity = count;
        this.cartService.setCartItem(find);
        this.calcTotal();
    }
    del(e: any) {
        let find = this.items.find(
            (item: { color: string }) => item.color === e
        );
        this.cartService.removeCartItem(find);
        this.items = this.cartService.getAllCartItems();
        this.items.forEach((product: { id: string }) => {
            this.productService.getProductMetadata(product.id).subscribe(
                (productMetadata) => {
                    this.products.push(productMetadata);
                },
                (error) => {
                    console.error(error);
                }
            );
        });
        this.calcTotal();
    }
    total: number = 1;
    totalSum: number = 0;
    calcTotal() {
        let result = this.items.map(
            (item: { quantity: any; id: any; anzahl: number }) => {
                let product = this.products.find(
                    (product: { id: any; price: number }) =>
                        product.id === item.id
                );
                if (product) {
                    return item.quantity * product.price;
                } else {
                    return 0;
                }
            }
        );
        this.total = result.reduce((a: any, b: any) => a + b, 0);
        this.totalSum = this.total + 8;
        this.infoService.total = this.totalSum;
    }
}
