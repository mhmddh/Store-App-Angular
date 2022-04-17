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
    loading: true,
  }
  paginater: Paginater = {
    limit: Number(localStorage.getItem('limit')),
    currentPage: 1,
    totalPages: 0,
    sortParameters: ['Date', 'ASC'],
    searchKey: 'Name',
  }
  nbOfProducts: number = 0;
  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.setDefaultLimit(10);
    this.getProducts(this.paginater);
  }



  nextPage() {
    if (this.paginater.currentPage < this.paginater.totalPages) {
      this.paginater.currentPage++;
      if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
        this.searchItem(this.paginater.searchValue);
      }
      else {
        this.getProducts(this.paginater);

      }
    }
  }
  changePage(page: any) {
    this.paginater.currentPage = page;
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.searchItem(this.paginater.searchValue);
    }
    else {
      this.getProducts(this.paginater);

    }
  }
  previousPage() {
    if (this.paginater.currentPage > 1) {
      this.paginater.currentPage--;
      if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
        this.searchItem(this.paginater.searchValue);
      }
      else {
        this.getProducts(this.paginater);

      }
    }
  }

  arrayPages(n: number) {
    return new Array(n);
  }

  resetCurrentPage() {
    this.paginater.currentPage = 1;
  }

  changeLimit(limit: any) {
    localStorage.setItem('limit', limit.toString());
    this.paginater.limit = Number(localStorage.getItem('limit'));
    this.resetCurrentPage();
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.searchItem(this.paginater.searchValue);
    }
    else {
      this.getProducts(this.paginater);

    }
  }

  setDefaultLimit(limit: number) {
    if (this.paginater.limit == 0 || this.paginater.limit == undefined) {
      this.paginater.limit = limit;
      localStorage.setItem('limit', limit.toString());
    }
  }

  sortBy(parameters: any) {
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.paginater.sortParameters = parameters.split(" ", 2);
      this.searchItem(this.paginater.searchValue);
    } else {
      this.paginater.sortParameters = parameters.split(" ", 2);
      this.getProducts(this.paginater);
    }
  }

  getProducts(paginater: Paginater) {
    this.paginater.limit = Number(localStorage.getItem('limit'));
    this.commonService.getPaginatedProducts(paginater).subscribe((data: any) => {
      this.products = data.products;
      this.paginater.totalPages = data.pages;
      this.nbOfProducts = data.nbOfItems;
      this.basePageOptions.loading = false;

    })
  }

  searchItem(str: string) {
    this.paginater.searchValue = str;
    if (str != '' && str != null) {
      this.products = [];
      this.commonService.searchProducts(this.paginater).subscribe((data: any) => {
        this.products = data.products;
        this.paginater.totalPages = data.pages;
        this.nbOfProducts = data.nbOfItems;
        this.basePageOptions.loading = false;
      })
    } else {
      this.getProducts(this.paginater);
    }
  }

  deleteProduct(id: number) {
    this.commonService.deleteProduct(id).subscribe(res => {
      this.products = this.products.filter(item => item.id !== id);
      console.log(res);
    })
  }




}
