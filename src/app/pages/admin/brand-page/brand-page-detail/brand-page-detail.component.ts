import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Brand, BasePage } from 'src/app/common/models/model';

@Component({
  selector: 'app-edit',
  templateUrl: './brand-page-detail.component.html',
  styleUrls: ['./brand-page-detail.component.css']
})
export class BrandPageDetailComponent implements OnInit {
  id!: number;
  fileName = '';
  form!: FormGroup;
  formData = new FormData();
  brand: Brand = {
    id: 0
  };
  basePageOptions: BasePage = {
    title: 'Edit Brand',
    routeUrl: 'admin/brands',
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
    this.id = this.route.snapshot.params['idBrand'];
    if (this.id) {
      this.commonService.findBrand(this.id).subscribe((data: Brand) => {
        this.brand = data;
        this.basePageOptions.loading = false;
      });
      this.basePageOptions.title = 'Edit Brand';
    } else {
      this.brand = <Brand>{};
      this.basePageOptions.title = 'Create Brand';
      this.basePageOptions.loading = false;
    }


    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (!this.validateFile(file.name)) {
        console.log('Selected file format is not supported');
        return;
      }
      this.fileName = file.name;
      this.formData.append("file", file);
    }
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg') {
      return true;
    }
    else {
      return false;
    }
  }

  uploadService(id: number, formData: FormData) {
    this.commonService.uploadBrandFile(id, formData).subscribe(res => {
      console.log(res);
    });
  }

  submit(id: number) {
    if (id != null) {
      this.commonService.updateBrand(this.id, this.form.value).subscribe(res => {
        console.log(res);
        this.uploadService(this.id, this.formData);
        this.router.navigate(['admin/brands'])
          .then(() => {
            window.location.reload();
          });
      })
    } else {
      this.commonService.createBrand(this.form.value).subscribe(res => {
        this.id = res.brand_id;
        this.uploadService(this.id, this.formData);
        this.router.navigateByUrl('admin/brands');
      })
    }

  }


}
