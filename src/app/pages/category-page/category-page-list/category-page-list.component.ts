import { BasePage } from '../../base-page/base-page';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';

import { Category } from '../category';
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
  constructor(public commonService: CommonService) { }
  ngOnInit(): void {
    this.commonService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
      this.basePageOptions.resourcesLoaded = true;
    })
  }

  deleteCategory(id: number) {
    this.commonService.deleteCategory(id).subscribe(res => {
      this.categories = this.categories.filter(item => item.id !== id);
      console.log('Category deleted successfully!');
    })
  }


}
