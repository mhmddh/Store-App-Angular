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
    routeUrl2: '',
    routeTitle2: '',
    resourcesLoaded: false,
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
    this.getBrands(this.paginater);
  }

  getBrands(paginater: Paginater) {
    this.paginater.limit = Number(localStorage.getItem('limit'));
    this.commonService.getPaginatedBrands(this.paginater).subscribe((data: any) => {
      this.brands = data.brands;
      this.paginater.totalPages = data.pages;
      this.nbOfBrands = data.nbOfItems;
      this.basePageOptions.resourcesLoaded = true;
    })
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
  changePage(event: any) {
    this.paginater.currentPage = event.target.value;
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
  changeLimit(limit: any) {
    localStorage.setItem('limit', limit.toString());
    this.paginater.limit = Number(localStorage.getItem('limit'));
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.searchItem(this.paginater.searchValue);
    }
    else {
      this.getBrands(this.paginater);

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
  searchItem(str: string) {
    this.paginater.searchValue = str;
    if (str != '' && str != null) {
      this.brands = [];
      this.commonService.searchBrands(this.paginater).subscribe((data: any) => {
        this.brands = data.brands;
        this.paginater.totalPages = data.pages;
        this.nbOfBrands = data.nbOfItems;
        this.basePageOptions.resourcesLoaded = true;
      })
    } else {
      this.getBrands(this.paginater);
    }
  }

  deleteBrand(id: number) {
    this.commonService.deleteBrand(id).subscribe(res => {
      this.brands = this.brands.filter(item => item.id !== id);
      console.log('Brand deleted successfully!');
    })
  }


}
