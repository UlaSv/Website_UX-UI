import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../services/product';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { ProductlistComponent } from '../productlist/productlist.component';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-productgrid',
    standalone: true,
    imports: [
        CommonModule, DataViewModule, DividerModule, ProductlistComponent, RouterModule
    ],
    templateUrl: './productgrid.component.html',
    styleUrl: './productgrid.component.css',
    
})
export class ProductgridComponent{
    @Input() product2!: Product;
 }
