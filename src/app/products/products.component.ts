import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { Products } from './../models/Products';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [NgbCarouselConfig] // add NgbCarouselConfig to the component providers
})
export class ProductsComponent  {

  products:Products[];
  filteredProducts:Products[];
  categories$;
  category:string;
  quantity;
  isLoading = true;
 //initializing p to one
 p: number = 1;


  constructor(config: NgbCarouselConfig,
    route:ActivatedRoute,
    ps:ProductService,cs:CategoryService,
    private ss: ShoppingCartService) { 
      // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
      // customize default values of carousels used by this component tree
      ps.getAll().subscribe(
      (products)=>{
        this.products = products ;
        route.queryParamMap.subscribe(
          params => {
            let category=params.get('category');
            console.log(category);
            if(category)
              this.filteredProducts = category ? this.products.filter(p => category === p.category) : this.products;
            else 
            {
              this.filteredProducts=this.products;
              console.log(this.filteredProducts);
            }
            this.isLoading=false;
    
          }
        )

      }
    );
    this.categories$= cs.getCategories();
   


  }


  addToCart(p:Products){
     this.ss.addToCart(p);
  }

  removeFromCart(p:Products){
    this.ss.removeFromCart(p);
 }

  getItemQuantity(p){
    let quanty;
    let item = this.ss.getItem(p.$key);
    item.subscribe(x=>
      {
        if(x)
        {
          quanty=x.quantity;
        }
      });
      return quanty;
  }

  /*getItemQuantity(p){
    let item = this.ss.getItem(p);
    item.take(1).map((item)=>{
      console.log(item);
    })
  }*/


  

}
