import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-edit',
  templateUrl: './category-page-detail.component.html',
  styleUrls: ['./category-page-detail.component.css']
})
export class CategoryPageDetailComponent implements OnInit {
  id!: number;
  form!: FormGroup;
  category: Category = {
    id: 0
  };
  basePageOptions: BasePage = {
    title: '',
    routeUrl: 'categories',
    routeTitle: 'Back',
    routeUrl2: '',
    routeTitle2: '',
    resourcesLoaded: true,
  }
  constructor(
    public commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.id = this.route.snapshot.params['idCategory'];
    if (this.id) {
      this.commonService.findCategory(this.id).subscribe((data: Category) => {
        this.category = data;
      });
      this.basePageOptions.title = 'Edit Category'
    } else {
      this.category = <Category>{};
      this.basePageOptions.title = 'Create Category';
    }


    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

  }

  get f() {
    return this.form.controls;
  }
  submit(id: number) {
    if (id != null) {
      this.commonService.updateCategory(this.id, this.form.value).subscribe(res => {
        console.log('Category updated successfully!');
        this.router.navigateByUrl('categories');
      })
    } else {
      console.log(this.form.value);
      this.commonService.createCategory(this.form.value).subscribe(res => {
        console.log(res);
      })
      this.router.navigateByUrl('categories');
    }

  }

}
