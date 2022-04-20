import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { User, BasePage } from 'src/app/common/models/model'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Validation from 'src/app/providers/validation';
@Component({
  selector: 'app-user',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  id!: number;
  form!: FormGroup;
  passwordform!: FormGroup;
  user: User = {};
  closeResult = '';
  passResult = '';
  isChanged = false;
  basePageOptions: BasePage = {
    title: 'Mohamad Daher',
    routeUrl: 'admin/products',
    routeTitle: 'Back',
    loading: true,
    currentPage: 1,
    totalPages: 0,
  }
  constructor(
    public commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idUser'];
    this.commonService.getUserDetails(this.id).subscribe((data: User) => {
      this.user = data;
      this.basePageOptions.loading = false;
    });
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.passwordform = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
      Validation.mustMatch('password', 'confirmPassword')
    );
  }

  get f() {
    return this.form.controls;
  }

  get ff() {
    return this.passwordform.controls;
  }

  submit() {
    this.commonService.updateUser(this.id, this.form.value).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('admin/products');
    })
  }

  changePassword() {
    this.commonService.changePassword(this.id, this.passwordform.value).subscribe(res => {
      if (res.success) {
        this.isChanged = true;
        this.modalService.dismissAll();
        this.passwordform.reset();
      }
      this.passResult = res.message;
    })
  }

  open(content: any) {
    this.passResult = '';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
