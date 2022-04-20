import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Category, BasePage, Paginater } from 'src/app/common/models/model';
@Component({
  selector: 'app-index',
  templateUrl: './category-page-list.component.html',
  styleUrls: ['./category-page-list.component.css']
})
export class CategoryPageListComponent implements OnInit {
  categories: Category[] = [];
  basePageOptions: BasePage = {
    title: 'Categories',
    routeUrl: 'admin/categories/create-category',
    routeTitle: 'Create New Category',
    loading: true,
  }
  paginater: Paginater = {
    limit: Number(localStorage.getItem('limit')),
    currentPage: 1,
    totalPages: 0,
    sortParameters: ['Date', 'ASC'],
    searchKey: 'Name',
  }

  nbOfCategories: number = 0;
  constructor(public commonService: CommonService) { }
  ngOnInit(): void {
    this.setDefaultLimit(10);
    this.getCategories(this.paginater);
  }

  nextPage() {
    if (this.paginater.currentPage < this.paginater.totalPages) {
      this.paginater.currentPage++;
      if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
        this.searchItem(this.paginater.searchValue);
      }
      else {
        this.getCategories(this.paginater);

      }
    }
  }
  changePage(page: any) {
    this.paginater.currentPage = page;
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.searchItem(this.paginater.searchValue);
    }
    else {
      this.getCategories(this.paginater);

    }
  }
  previousPage() {
    if (this.paginater.currentPage > 1) {
      this.paginater.currentPage--;
      if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
        this.searchItem(this.paginater.searchValue);
      }
      else {
        this.getCategories(this.paginater);

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
      this.getCategories(this.paginater);

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
      this.getCategories(this.paginater);
    }
  }

  getCategories(paginater: Paginater) {
    this.paginater.limit = Number(localStorage.getItem('limit'));
    this.commonService.getPaginatedCategories(paginater).subscribe((data: any) => {
      this.categories = data.categories;
      this.paginater.totalPages = data.pages;
      this.nbOfCategories = data.nbOfItems;
      this.basePageOptions.loading = false;
    })
  }

  searchItem(str: string) {
    this.paginater.searchValue = str;
    if (str != '' && str != null) {
      this.categories = [];
      this.commonService.searchCategories(this.paginater).subscribe((data: any) => {
        this.categories = data.categories;
        this.paginater.totalPages = data.pages;
        this.nbOfCategories = data.nbOfItems;
        this.basePageOptions.loading = false;
      })
    } else {
      this.getCategories(this.paginater);
    }
  }
  deleteCategory(id: number) {
    this.commonService.deleteCategory(id).subscribe(res => {
      this.categories = this.categories.filter(item => item.id !== id);
      console.log('Category deleted successfully!');
    })
  }



}
