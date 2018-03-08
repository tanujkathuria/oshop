import { Products } from './../../models/Products';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database-deprecated";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  product:Products = new Products();
  id;

  constructor(
    private route:ActivatedRoute,
    private router:Router,private db:AngularFireDatabase,private categoryService: CategoryService,
  private ps: ProductService) {
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

   save(product){
    if(this.id && this.id !='new'){
      console.log('id updating :'+this.id);
      this.ps.updateProduct(this.id,product);
    } 
    else
    {
      this.ps.create(product);
    }
     this.router.navigate(['/admin/products']);
   }

   delete(){
    if(!confirm('Are u sure you want to delete this product?'))return;
      this.ps.deleteProduct(this.id);
      this.router.navigate(['/admin/products']);
    
   }

 

}
