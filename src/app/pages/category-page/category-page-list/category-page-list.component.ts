import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Category, BasePage, Paginater } from '../../../common/models/model';
@Component({
  selector: 'app-index',
  templateUrl: './category-page-list.component.html',
  styleUrls: ['./category-page-list.component.css']
})
export class CategoryPageListComponent implements OnInit {
  categories: Category[] = [];
  basePageOptions: BasePage = {
    title: 'Categories',
    routeUrl: 'create-category',
    routeTitle: 'Create New Category',
    routeUrl2: '',
    routeTitle2: '',
    resourcesLoaded: false,
  }
  paginater: Paginater = {
    limit: 4,
    currentPage: 1,
    totalPages: 0,
  }

  constructor(public commonService: CommonService) { }
  ngOnInit(): void {
    this.getCategories(this.paginater);
  }
  getCategories(paginater: Paginater) {
    this.commonService.getAllCategories(paginater.limit, paginater.currentPage).subscribe((data: any) => {
      this.categories = data.categories;
      this.paginater.totalPages = data.pages;
      this.basePageOptions.resourcesLoaded = true;
    })
  }

  nextPage() {
    if (this.paginater.currentPage < this.paginater.totalPages) {
      this.paginater.currentPage++;
      this.getCategories(this.paginater);
    }
  }
  changePage(event: any) {
    this.paginater.currentPage = event.target.value;
    this.getCategories(this.paginater);
  }
  previousPage() {
    if (this.paginater.currentPage > 1) {
      this.paginater.currentPage--;
      this.getCategories(this.paginater);
    }
  }

  arrayPages(n: number) {
    return new Array(n);
  }
  deleteCategory(id: number) {
    this.commonService.deleteCategory(id).subscribe(res => {
      this.categories = this.categories.filter(item => item.id !== id);
      console.log('Category deleted successfully!');
    })
  }


}
