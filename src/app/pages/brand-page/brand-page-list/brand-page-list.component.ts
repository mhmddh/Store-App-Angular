import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Brand, BasePage, Paginater } from '../../../common/models/model';
@Component({
  selector: 'app-index',
  templateUrl: './brand-page-list.component.html',
  styleUrls: ['./brand-page-list.component.css']
})
export class BrandPageListComponent implements OnInit {
  brands: Brand[] = [];
  basePageOptions: BasePage = {
    title: 'Brands',
    routeUrl: 'create-brand',
    routeTitle: 'Create New Brand',
    loading: true,
  }
  paginater: Paginater = {
    limit: Number(localStorage.getItem('limit')),
    currentPage: 1,
    totalPages: 0,
    sortParameters: ['Date', 'ASC'],
    searchKey: 'Name',
  }
  nbOfBrands: number = 0;

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.setDefaultLimit(10);
    this.getBrands(this.paginater);
  }
  nextPage() {
    if (this.paginater.currentPage < this.paginater.totalPages) {
      this.paginater.currentPage++;
      if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
        this.searchItem(this.paginater.searchValue);
      }
      else {
        this.getBrands(this.paginater);

      }
    }
  }
  changePage(page: any) {
    this.paginater.currentPage = page;
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.searchItem(this.paginater.searchValue);
    }
    else {
      this.getBrands(this.paginater);
    }
  }
  previousPage() {
    if (this.paginater.currentPage > 1) {
      this.paginater.currentPage--;
      if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
        this.searchItem(this.paginater.searchValue);
      }
      else {
        this.getBrands(this.paginater);

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
      this.getBrands(this.paginater);

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
      this.getBrands(this.paginater);
    }
  }
  getBrands(paginater: Paginater) {
    this.paginater.limit = Number(localStorage.getItem('limit'));
    this.commonService.getPaginatedBrands(paginater).subscribe((data: any) => {
      this.brands = data.brands;
      this.paginater.totalPages = data.pages;
      this.nbOfBrands = data.nbOfItems;
      this.basePageOptions.loading = false;
    })
  }
  searchItem(str: string) {
    this.paginater.searchValue = str;
    if (str != '' && str != null) {
      this.brands = [];
      this.commonService.searchBrands(this.paginater).subscribe((data: any) => {
        this.brands = data.brands;
        this.paginater.totalPages = data.pages;
        this.nbOfBrands = data.nbOfItems;
        this.basePageOptions.loading = false;
      })
    } else {
      this.getBrands(this.paginater);
    }
  }

  deleteBrand(id: number) {
    this.commonService.deleteBrand(id).subscribe(res => {
      if (res.success) {
        this.brands = this.brands.filter(item => item.id !== id);
      }
      console.log(res.message);

    })
  }


}
