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
    limit: 4,
    currentPage: 1,
    totalPages: 0,
    sortParameters: ['Date', 'ASC']
  }
  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.getBrands(this.paginater);
  }

  getBrands(paginater: Paginater) {
    this.commonService.getPaginatedBrands(this.paginater).subscribe((data: any) => {
      this.brands = data.brands;
      this.paginater.totalPages = data.pages;
      this.basePageOptions.resourcesLoaded = true;
    })
  }

  nextPage() {
    if (this.paginater.currentPage < this.paginater.totalPages) {
      this.paginater.currentPage++;
      this.getBrands(this.paginater);
    }
  }
  changePage(event: any) {
    this.paginater.currentPage = event.target.value;
    this.getBrands(this.paginater);
  }
  previousPage() {
    if (this.paginater.currentPage > 1) {
      this.paginater.currentPage--;
      this.getBrands(this.paginater);
    }
  }

  arrayPages(n: number) {
    return new Array(n);
  }
  changeLimit(limit: any) {
    this.paginater.limit = limit;
    this.getBrands(this.paginater);
    console.log(this.paginater.limit);
  }

  sortBy(parameters: any) {
    this.paginater.sortParameters = parameters.split(" ", 2);
    console.log(this.paginater);
    this.getBrands(this.paginater);
  }
  deleteBrand(id: number) {
    this.commonService.deleteBrand(id).subscribe(res => {
      this.brands = this.brands.filter(item => item.id !== id);
      console.log('Brand deleted successfully!');
    })
  }


}
