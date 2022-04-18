import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product, Brand, Category, BasePage, Paginater } from '../../../common/models/model';

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
    loading: true,
  }
  constructor(
    public commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idProduct'];
    this.commonService.getAllCategories().subscribe((data: any) => {
      this.categories = data;
    })
    this.commonService.getAllBrands().subscribe((data: any) => {
      this.brands = data;
    })
    if (this.id) {
      this.commonService.findProduct(this.id).subscribe((data: Product) => {
        this.product = data;
        this.basePageOptions.title = 'Edit Product';
        this.basePageOptions.loading = false;
      });
    }
    else {
      this.product = <Product>{};
      this.basePageOptions.title = 'Create Product';
      this.basePageOptions.loading = false;
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
