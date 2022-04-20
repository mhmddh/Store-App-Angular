import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product, Brand, Category, BasePage } from 'src/app/common/models/model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
  formData = new FormData();
  form!: FormGroup;
  files: File[] = [];
  images: string[] = [];
  images_ids: string[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  basePageOptions: BasePage = {
    title: '',
    routeUrl: 'admin/products',
    routeTitle: 'Back',
    loading: true,
  }
  faTrash = faTrash;
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
        var ids: string[] = Object.keys(data.images || []);
        var values: string[] = Object.values(data.images || []);
        this.images = values;
        this.images_ids = ids;
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
        this.uploadService(this.id, this.formData);
        this.router.navigateByUrl('admin/products');
      })
    } else {
      this.commonService.createProduct(this.form.value).subscribe(res => {
        this.id = res.product_id;
        this.uploadService(this.id, this.formData);
        this.router.navigateByUrl('admin/products');
      })
    }
  }

  viewImage(event: any) {

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

}
