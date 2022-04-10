import { Component, OnInit } from '@angular/core';
import { Brand } from '../brand';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-edit',
  templateUrl: './brand-page-detail.component.html',
  styleUrls: ['./brand-page-detail.component.css']
})
export class BrandPageDetailComponent implements OnInit {
  id!: number;
  form!: FormGroup;
  brand: Brand = {
    id: 0
  };
  basePageOptions: BasePage = {
    title: 'Edit Brand',
    routeUrl: 'brands',
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
    this.id = this.route.snapshot.params['idBrand'];
    if (this.id) {
      this.commonService.findBrand(this.id).subscribe((data: Brand) => {
        this.brand = data;
      });
      this.basePageOptions.title = 'Edit Brand';
    } else {
      this.brand = <Brand>{};
      this.basePageOptions.title = 'Create Brand';
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
      this.commonService.updateBrand(this.id, this.form.value).subscribe(res => {
        console.log('Brand updated successfully!');
        this.router.navigateByUrl('brands');
      })
    } else {
      console.log(this.form.value);
      this.commonService.createBrand(this.form.value).subscribe(res => {
        console.log('Brand created successfully!');
        this.router.navigateByUrl('brands');
      })
    }

  }


}
