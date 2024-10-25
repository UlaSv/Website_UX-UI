import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { Router, RouterModule } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CartItem } from '../services/cart-item';
import { CartService } from '../services/cart.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-productpage',
    standalone: true,
    imports: [
        CommonModule,
        DividerModule,
        RadioButtonModule,
        DropdownModule,
        RouterModule,
        ImageModule,
        ButtonModule,
        InputNumberModule,
        ToastModule
    ],
    providers: [MessageService],
    templateUrl: './productpage.component.html',
    styleUrl: './productpage.component.css',
})
export class ProductpageComponent {
    product!: Product;
    //color!: any;
    test!: any;
    colorname!: string;
    id!: any;
    color!: any;
    changeDetectorRef: any;
    size!: any;
    favor = false;
    quant: number = 1;
    quantity: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    colorid!: any;
    par1!: any;
    par2!: any;
    colorstring!: string;
    sizestring!: string;
    messageVisible = false;
    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private router: Router,
        private cartService: CartService,
        private messageService: MessageService
    ) {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
        });

        this.productService.getProductMetadata(this.id).subscribe((values) => {
            this.product = values;
            this.color = this.product.id;
            this.route.queryParams.subscribe((params) => {
                if (params['color']) {
                    this.color = params['color'];
                }
            });
            this.route.queryParams.subscribe((params) => {
                if (params['size']) {
                    this.size = params['size'];
                }
            });
            this.colorstring = this.color;
            this.colorname = this.getColorName(this.colorstring)!;
            console.log(this.color);
            console.log(this.color.toString());
            console.log(this.size);
            console.log(this.colorname);
            this.sizestring = this.size;
        });
    }

    changeColor(name: string, i: number) {
        this.colorname = name;
        this.color = this.product.colors.at(i)?.color_id;
        this.id = this.product.colors.at(i)?.color_id;
        this.changeDetectorRef.detectChanges();
    }

    changeSize() {
        this.size = (<HTMLInputElement>document.getElementById('drop')).value;
        console.log(this.size);
        const commands = ['/products', this.product.id];
        const extras: NavigationExtras = {
            queryParams: {
                color: this.color,
                size: this.size,
            },
        };
        this.router.navigate(commands, extras);
        this.changeDetectorRef.detectChanges();
    }

    favorite() {
        this.favor = !this.favor;
    }
    changeQuant() {
        this.quant = Number(
            (<HTMLInputElement>document.getElementById('quant')).value
        );
    }
    addToCart(id: string, color: string, size: string, quant: number) {
        console.log(
            'id' + id + ' color' + color + ' size' + size + ' quant' + quant
        );
        const item = {
            id: id,
            color: color,
            size: size,
            quantity: quant,
        } as CartItem;
        this.cartService.addCartItem(item);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product(s) added to cart!' });
    }
    getColorName(e: string): string | undefined {
        let color = this.product.colors.find((color: { color_id: string }) => {
            return color.color_id === e;
        });
        return color?.color_name;
    }
}
