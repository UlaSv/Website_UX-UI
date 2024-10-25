import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../services/product';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { ProductlistComponent } from '../productlist/productlist.component';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-productitem',
    standalone: true,
    imports: [
        CommonModule, DataViewModule, DividerModule, ProductlistComponent, RouterModule
    ],
    templateUrl: './productitem.component.html',
    styleUrl: './productitem.component.css',
    
})
export class ProductitemComponent{
    @Input() product!: Product;
 }
