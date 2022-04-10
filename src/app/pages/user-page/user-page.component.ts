import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { User, BasePage } from '../../common/models/model'
@Component({
  selector: 'app-user',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  id!: number;
  form!: FormGroup;
  user: User = {};
  basePageOptions: BasePage = {
    title: 'Mohamad Daher',
    routeUrl: 'products',
    routeTitle: 'Back',
    routeUrl2: 'change-password',
    routeTitle2: 'Change Password',
    resourcesLoaded: false,
    limit: 8,
    currentPage: 1,
    totalPages: 0,
  }
  constructor(
    public commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['idUser'];
    this.commonService.getUserDetails(this.id).subscribe((data: User) => {
      this.user = data;
      this.basePageOptions.resourcesLoaded = true;
    });

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
    this.basePageOptions.resourcesLoaded = true;

  }
  submit(id: number) {
    this.commonService.updateUser(this.id, this.form.value).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('products');
    })
  }


}
