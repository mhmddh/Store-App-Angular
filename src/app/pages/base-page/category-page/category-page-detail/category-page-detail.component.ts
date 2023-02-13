import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category, BasePage } from 'src/app/common/models/model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './category-page-detail.component.html',
  styleUrls: ['./category-page-detail.component.scss']
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
    loading: true,
  }
  constructor(
    public commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['idCategory'];
    if (this.id) {
      this.commonService.findCategory(this.id).subscribe((data: any) => {
        if (data.success) {
          this.category = data.category;
          this.basePageOptions.title = 'Edit Category'
          this.basePageOptions.loading = false;
        } else {
          console.log(data.message);
          this.router.navigateByUrl('404');
        }
      });
    } else {
      this.category = <Category>{};
      this.basePageOptions.title = 'Create Category';
      this.basePageOptions.loading = false;
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
        this.router.navigateByUrl('admin/categories');
      })
    } else {
      this.commonService.createCategory(this.form.value).subscribe(res => {
        console.log(res);
      })
      this.router.navigateByUrl('admin/categories');
    }

  }

}
