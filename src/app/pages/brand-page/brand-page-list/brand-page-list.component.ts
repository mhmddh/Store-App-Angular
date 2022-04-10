import { Component, OnInit } from '@angular/core';

import { CommonService } from '../../../services/common.service';
import { Brand } from '../brand';
import { BasePage } from '../../base-page/base-page';
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
    resourcesLoaded: false

  }
  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.getAllBrands().subscribe((data: Brand[]) => {
      this.brands = data;
      this.basePageOptions.resourcesLoaded = true;
    })
  }
  deleteBrand(id: number) {
    this.commonService.deleteBrand(id).subscribe(res => {
      this.brands = this.brands.filter(item => item.id !== id);
      console.log('Brand deleted successfully!');
    })
  }


}
