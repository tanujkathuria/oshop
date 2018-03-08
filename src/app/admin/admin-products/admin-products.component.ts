import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

products : {title: string}[];
filteredProducts:any[];
subscription: Subscription;


  constructor(private productService:ProductService) { 

   this.subscription =  this.productService.getAll().subscribe(
      products=> {
        this.filteredProducts = this.products=products;
      }
    )
    console.log(this.products);
  }

  ngOnInit() {
  }

  filter(query){
    console.log(query);
    this.filteredProducts = query? this.products.filter(p => p.title.toLowerCase().
    includes(query.toLowerCase())): this.products;
  }
  

}
