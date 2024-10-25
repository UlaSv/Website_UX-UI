import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { ProductitemComponent } from '../productitem/productitem.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProductgridComponent } from '../productgrid/productgrid.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'app-productlist',
    standalone: true,
    templateUrl: './productlist.component.html',
    styleUrl: './productlist.component.css',
    imports: [
        CommonModule,
        FormsModule,
        ProductitemComponent,
        DataViewModule,
        ButtonModule,
        SelectButtonModule,
        ProductgridComponent,
        ProgressSpinnerModule,
        CheckboxModule,
        AccordionModule,
        SliderModule,
        InputNumberModule,
    ],
})
export class ProductlistComponent {
    products!: Product[];
    products2!: Product[];
    public selectedButton = 1;
    noProducts = false;
    isLoading = false;
    filterBrands!: string[];
    chosenBrands: string[] = [];
    filterCategory!: string[];
    chosenCategories: string[] = [];
    filterGenders!: string[];
    chosenGenders: string[] = [];
    searchInput!: string;
    selectedBrandCount: number = 0;
    selectedCategoryCount: number = 0;
    selectedGenderCount: number = 0;
    minPrice: number = 5;
    maxPrice: number = 1000;
    selectedMaxPrice: number = 105;
    small: boolean = false;
    isExpanded: boolean = false;
    constructor(private productService: ProductService) {
        this.productService
            .getInitialProductMetadata(12)
            .subscribe((values) => {
                this.products = values;
            });
        this.productService
            .getInitialProductMetadata(12)
            .subscribe((values) => {
                this.products2 = values;
            });
        this.productService.getBrandList().subscribe((values) => {
            this.filterBrands = values;
        });
        this.productService.getCategoryList().subscribe((values) => {
            this.filterCategory = values;
        });
        this.productService.getGenderList().subscribe((values) => {
            this.filterGenders = values;
        });
        this.productService.getPriceList().subscribe((prices) => {
            const numericPrices = prices.map((price) => parseFloat(price));
            this.minPrice = Math.min(...numericPrices);
            this.maxPrice = Math.max(...numericPrices);
        });
    }

    toggle(): void {
        this.isExpanded = !this.isExpanded;
    }
    selectButton(button: number) {
        this.selectedButton = button;
    }

    shouldShowLoadButton(): boolean {
        return this.products.length % 12 === 0;
    }

    updateSelectedCheckboxCount(): void {
        this.selectedBrandCount = this.chosenBrands.length;
        this.selectedCategoryCount = this.chosenCategories.length;
        this.selectedGenderCount = this.chosenGenders.length;
    }

    Load() {
        this.isLoading = true;
        setTimeout(() => {
            this.productService
                .getNextProductMetadata(12)
                .subscribe((values) => {
                    this.products = this.products.concat(values);
                    this.products2 = this.products2.concat(values);
                    this.isLoading = false;
                    console.log(this.products.length);
                });
        }, 500);
    }
    onFilter() {
        this.productService
            .getInitialProductMetadata(
                12,
                undefined,
                this.searchInput,
                this.chosenBrands,
                this.chosenGenders,
                undefined,
                this.chosenCategories
            )
            .subscribe((filteredProducts) => {
                this.products = filteredProducts;
                this.products2 = filteredProducts;

                if (filteredProducts.length == 0) this.noProducts = true;
                else this.noProducts = false;
                this.updateSelectedCheckboxCount();
                this.onPriceRangeChange();
                window.scrollTo(0, 0);
            });
    }
    search() {
        this.productService
            .getInitialProductMetadata(
                12, //numItems
                undefined, //filter
                this.searchInput, //searchtext,
                this.chosenBrands, //brandfiltered
                this.chosenGenders, //gendersfiltered
                undefined, //typesfiltered
                this.chosenCategories // categoriesfiltered
            )
            .subscribe((filteredProducts) => {
                this.products = filteredProducts;
                this.products2 = filteredProducts;

                if (filteredProducts.length == 0) this.noProducts = true;
                else this.noProducts = false;
            });
    }
    check(event: any) {
        if (event.key === 'Enter') {
            this.search();
        }
    }
    onPriceRangeChange() {
        const filteredProducts = this.products.filter((product) => {
            const price = product.price;
            return price <= this.selectedMaxPrice;
        });
        this.products = filteredProducts;
        this.products2 = filteredProducts;
        this.noProducts = filteredProducts.length === 0;
    }
}
