import { BasePage } from '../../base-page/base-page';
import { Brand } from '../../brand-page/brand';
import { Category } from '../../category-page/category';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../product';

@Component({
  selector: 'app-edit',
  templateUrl: './product-page-detail.component.html',
  styleUrls: ['./product-page-detail.component.css']
})
export class ProductPageDetailComponent implements OnInit {
  id!: number;
  product: Product = {
    id: 0
  };
  form!: FormGroup;
  categories: Category[] = [];
  brands: Brand[] = [];
  basePageOptions: BasePage = {
    title: '',
    routeUrl: 'products',
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
    this.id = this.route.snapshot.params['idProduct'];
    this.commonService.getAllCategories().subscribe((data: Category[]) => {
      this.categories = data;
    })
    this.commonService.getAllBrands().subscribe((data: Brand[]) => {
      this.brands = data;
    })
    if (this.id) {
      this.commonService.findProduct(this.id).subscribe((data: Product) => {
        this.product = data;
      });
      this.basePageOptions.title = 'Edit Product';
    }
    else {
      this.product = <Product>{};
      this.basePageOptions.title = 'Create Product';
    }


    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(id: number) {
    if (id != null) {

      this.commonService.updateProduct(this.id, this.form.value).subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('products');
      })
    } else {
      console.log(this.form.value);
      this.commonService.createProduct(this.form.value).subscribe(res => {
        console.log(res);
      })
      this.router.navigateByUrl('products');

    }
  }

}
