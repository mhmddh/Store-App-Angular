import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { BasePage } from '../../base-page/base-page';
import { Product } from '../product';

@Component({
  selector: 'app-index',
  templateUrl: './product-page-list.component.html',
  styleUrls: ['./product-page-list.component.css']
})
export class ProductPageListComponent implements OnInit {
  products: Product[] = [];
  basePageOptions: BasePage = {
    title: 'Products',
    routeUrl: 'create-product',
    routeTitle: 'Create New Product',
    routeUrl2: '',
    routeTitle2: '',
    resourcesLoaded: false,

  }
  constructor(public commonService: CommonService) { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

    this.commonService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.basePageOptions.resourcesLoaded = true;
      console.log(this.products);

    })

  }


  deleteProduct(id: number) {
    this.commonService.deleteProduct(id).subscribe(res => {
      this.products = this.products.filter(item => item.id !== id);
      console.log(res);
    })
  }



}
