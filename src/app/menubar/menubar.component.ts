import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-menubar',
    standalone: true,
    imports: [CommonModule, ButtonModule, RouterModule, BadgeModule],
    templateUrl: './menubar.component.html',
    styleUrl: './menubar.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarComponent implements OnInit {
    amount: number = 0;
    constructor(
        private router: Router,

        private cartService: CartService,
        private cd: ChangeDetectorRef
    ) {
        setInterval(() => {
            this.amount = this.cartService.getTotalCartItems();
            this.cd.detectChanges();
            console.log('amount: ' + this.amount);
        }, 200);
    }

    ngOnInit(): void {}
    cart() {
        this.router.navigateByUrl('cart');
    }
}
