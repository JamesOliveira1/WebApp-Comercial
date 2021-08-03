import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
   name:'cliente',
   contact:'(XX) 0000-0000',
   details:'status da negociação/atendimento'
    
  }
  
  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Cliente cadastrado com sucesso')
      this.router.navigate(['/products'])
    })

    
  }

  cancel(): void {
    this.router.navigate(['/products'])
}
}
