import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import {
    FormControl,
    FormGroup,
    FormsModule,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { CartService } from '../services/cart.service';
import { InfoService } from '../services/info.service';
import { DividerModule } from 'primeng/divider';
@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        StepperModule,
        ButtonModule,
        FormsModule,
        InputTextModule,
        MessagesModule,
        FloatLabelModule,
        DropdownModule,
        CardModule,
        ReactiveFormsModule,
        ListboxModule,
        DividerModule
    ],
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
    total: number = 0;
    deliveryFee: number = 0;
    productSum: number = 0;
    constructor(
        private cartService: CartService,
        private infoService: InfoService
    ) {
        this.total = this.infoService.total;
    }
    adressForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        streetNumber: new FormControl('', [
            Validators.required,
            Validators.pattern(/^[0-9]*$/),
        ]),
        postalCode: new FormControl('', [
            Validators.required,
            Validators.pattern(/^[0-9]*$/),
        ]),
        city: new FormControl('', Validators.required),
        country: new FormControl<{ name: string }>(
            { name: '' },
            Validators.required
        ),
    });
    get firstName() {
        return this.adressForm.get('firstName');
    }
    get lastName() {
        return this.adressForm.get('lastName');
    }
    get street() {
        return this.adressForm.get('street');
    }

    get streetNumber() {
        return this.adressForm.get('streetNumber');
    }

    get postalCode() {
        return this.adressForm.get('postalCode');
    }

    get city() {
        return this.adressForm.get('city');
    }

    get country() {
        return this.adressForm.get('country');
    }
    countries = [
        { name: 'Lithuania' },
        { name: 'Latvia' },
        { name: 'Estonia' },
        { name: 'Finland' },
        { name: 'Sweden' },
        { name: 'Iceland' },
    ];
    fillAddress() {
        this.adressForm.patchValue({
            firstName: 'Vardas',
            lastName: 'Pavardė',
            street: 'Vokiečių g.',
            streetNumber: '45',
            postalCode: '01130',
            city: 'Vilnius',
            country: { name: 'Lithuania' },
        });
        this.adressForm.markAllAsTouched();
    }
    deliveryForm = new FormGroup({
        deliveryOption: new FormControl('', Validators.required),
    });

    deliveryOptions = [
        {
            label: 'Standard Delivery (3-5 days, 10€)',
            value: 'Standard Delivery',
            fee: 10,
        },
        {
            label: 'Express Delivery (1-2 days, 20€)',
            value: 'Express Delivery',
            fee: 20,
        },
        {
            label: 'Priority Delivery (same day, 30€)',
            value: 'Priority Delivery',
            fee: 30,
        },
    ];
    paymentForm = new FormGroup({
        paymentOption: new FormControl('', Validators.required),
    });

    paymentOptions = [
        {
            label: 'Credit Card',
            value: 'Credit Card',
            icon: 'pi pi-credit-card',
        },
        { label: 'PayPal', value: 'Paypal', icon: 'pi pi-paypal' },
        { label: 'Google Pay', value: 'Google Pay', icon: 'pi pi-google' },
        { label: 'Apple Pay', value: 'Apple Pay', icon: 'pi pi-apple' },
    ];

    getPaymentOptionIcon() {
        const selectedValue = this.paymentForm.get('paymentOption')!.value;
        const selectedOption = this.paymentOptions.find(option => option.value === selectedValue);
        return selectedOption ? selectedOption.icon : '';
    }

    resetCart() {
        this.cartService.clearCart();
    }

    current!: number;
    change(i: string): void {
        this.total = this.infoService.total;
        console.log('testchange: ' + i);
        let find = this.deliveryOptions.find(
            (del: { fee: number; value: string }) => del.value === i
        );
        this.current = find!.fee;
        this.deliveryFee = find!.fee;
        this.productSum = this.total - 8;
        console.log('testchange: ' + this.current);
        this.total = this.total + this.current;
    }
}
