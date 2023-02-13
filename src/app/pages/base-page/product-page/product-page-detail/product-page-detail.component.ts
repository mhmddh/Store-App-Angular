import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product, Brand, Category, BasePage } from 'src/app/common/models/model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.state';
import { getAllCategories } from 'src/app/store/selectors/category.selector';
import { loadAllCategories } from 'src/app/store/actions/category.action';
import { getAllBrands } from 'src/app/store/selectors/brand.selector';
import { loadAllBrands } from 'src/app/store/actions/brand.action';

@Component({
  selector: 'app-edit',
  templateUrl: './product-page-detail.component.html',
  styleUrls: ['./product-page-detail.component.scss']
})
export class ProductPageDetailComponent implements OnInit {
  id!: number;
  product: Product = {
    id: 0
  };
  formData = new FormData();
  form!: FormGroup;
  files: File[] = [];
  images: string[] = [];
  images_ids: string[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  basePageOptions: BasePage = {
    title: '',
    routeUrl: '/products',
    routeTitle: 'Back',
    loading: true,
  }
  isCarouselDisplayed = false;
  openedImageIndex!: number;
  faTrash = faTrash;
  BrandImgUrl = '';
  brand_imgs = new Map();

  constructor(
    public commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private store: Store<AppState>,
  ) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idProduct'];
    this.getAllCategories();
    this.getAllBrands();

    if (this.id) {
      this.commonService.findProduct(this.id).subscribe((data: any) => {
        if (data.success) {
          this.product = data.product;
          var ids: string[] = Object.keys(data.product.images || []);
          var values: string[] = Object.values(data.product.images || []);
          this.images = values;
          this.images_ids = ids;
          this.BrandImgUrl = data.product.brand_image;
          this.basePageOptions.title = 'Edit Product';
          this.basePageOptions.loading = false;
        } else {
          console.log(data.message);
          this.router.navigateByUrl('404');
        }

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
      file: new FormControl(''),
    });
  }

  get f() {
    return this.form.controls;
  }

  onFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.images.push(event.target.result);
      }
      reader.readAsDataURL(event.target.files[i]);
    }
  }

  uploadService(id: number, formData: FormData) {
    for (var i = 0; i < this.files.length; i++) {
      formData.append("file[]", this.files[i]);
    }
    this.commonService.uploadProductFiles(id, formData).subscribe(res => {
      console.log(res);
    });
  }

  submit(id: number) {
    if (id != null) {
      this.commonService.updateProduct(this.id, this.form.value).subscribe(res => {
        console.log(res);
        this.uploadService(this.id, this.formData);
        window.location.assign('/products')
      })
    } else {
      this.commonService.createProduct(this.form.value).subscribe(res => {
        this.id = res.product_id;
        this.uploadService(this.id, this.formData);
        window.location.assign('/products')
      })
    }
  }

  changeBrand(event: any) {
    let brand_id = +event.target.value;
    this.BrandImgUrl = this.brand_imgs.get(brand_id);
  }

  openCarousel(index: number) {
    this.openedImageIndex = index;
    this.isCarouselDisplayed = true;
  }

  closeCarousel() {
    this.isCarouselDisplayed = false;
  }

  hoverImage(event: any) {
    event.currentTarget.querySelector('img').style.opacity = 0.7;
    event.currentTarget.querySelector('span').style.display = 'block';

  }

  unhoverImage(event: any) {
    event.currentTarget.querySelector('img').style.opacity = 1;
    event.currentTarget.querySelector('span').style.display = 'none';
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    if (this.id != null) {
      var id: number = +this.images_ids[index];
      this.commonService.deleteProductFile(id).subscribe(res => {
        console.log(res);
        this.images_ids.splice(index, 1);
      })
    } else {
      this.files.splice(index, 1);
    }

  }

  getAllCategories() {
    this.store.select(getAllCategories).subscribe(
      (data) => {
        this.categories = data;
      }
    )
    if (this.categories.length === 0) {
      this.store.dispatch(loadAllCategories());
    }
  }

  getAllBrands() {
    this.store.select(getAllBrands).subscribe(
      (data) => {
        this.brands = data;
        for (let i = 0; i < this.brands.length; i++) {
          this.brand_imgs.set(this.brands[i].id, this.brands[i].image);
        }
      }
    )
    if (this.brands.length === 0)
      this.store.dispatch(loadAllBrands());
  }

}
