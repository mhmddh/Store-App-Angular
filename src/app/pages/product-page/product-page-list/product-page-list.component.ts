import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Product, BasePage, Paginater } from '../../../common/models/model'

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
  paginater: Paginater = {
    limit: 5,
    currentPage: 1,
    totalPages: 0,
    sortParameters: ['Date', 'ASC']
  }

  constructor(public commonService: CommonService) { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.getProducts(this.paginater);
  }
  getProducts(paginater: Paginater) {
    this.commonService.getAllProducts(paginater).subscribe((data: any) => {
      this.products = data.products;
      this.paginater.totalPages = data.pages;
      this.basePageOptions.resourcesLoaded = true;
    })
  }

  nextPage() {
    if (this.paginater.currentPage < this.paginater.totalPages) {
      this.paginater.currentPage++;
      this.getProducts(this.paginater);
    }
  }
  changePage(event: any) {
    this.paginater.currentPage = event.target.value;
    this.getProducts(this.paginater);
  }
  previousPage() {
    if (this.paginater.currentPage > 1) {
      this.paginater.currentPage--;
      this.getProducts(this.paginater);
    }
  }

  arrayPages(n: number) {
    return new Array(n);
  }

  changeLimit(limit: any) {
    this.paginater.limit = limit;
    this.getProducts(this.paginater);
    console.log(this.paginater.limit);
  }

  sortBy(parameters: any) {
    this.paginater.sortParameters = parameters.split(" ",2);
    console.log(this.paginater);
    this.getProducts(this.paginater);
  }

  deleteProduct(id: number) {
    this.commonService.deleteProduct(id).subscribe(res => {
      this.products = this.products.filter(item => item.id !== id);
      console.log(res);
    })
  }




}
