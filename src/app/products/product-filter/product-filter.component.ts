import { ShoppingCartService } from './../../shopping-cart.service';
import { Products } from './../../models/Products';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  product:Products = new Products();
  id;


  constructor( private route:ActivatedRoute,
    private router:Router,private db:AngularFireDatabase,private categoryService: CategoryService,
  private ps: ProductService,private ss: ShoppingCartService) 
  { 
    this.categories$=categoryService.getCategories().subscribe(
      (categories) => {
        this.categories$ = categories;
        console.log(this.categories$);
        this.id = this.route.snapshot.paramMap.get('id');
        console.log('id'+this.id);
        if(this.id ){
          this.ps.getProduct(this.id).subscribe(
            (x)=>
            {
              console.log(x);
              this.product=x;
            } 
          )
        }
      }
    )
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

  ngOnInit() {
  }

}
