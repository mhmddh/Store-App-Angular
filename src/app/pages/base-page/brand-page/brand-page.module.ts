import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthInterceptor } from 'src/app/services/auth-interceptor';
import { AuthGuard } from 'src/app/services/auth.guard';
import { CommonService } from 'src/app/services/common.service';
import { BrandEffects } from 'src/app/store/effectors/brand.effects';
import { paginationBrandReducer } from 'src/app/store/reducers/brand.reducer';
import { BasePageModule } from '../base-page.module';
import { BrandPageDetailComponent } from './brand-page-detail/brand-page-detail.component';
import { BrandPageListComponent } from './brand-page-list/brand-page-list.component';
import { BrandRoutingModule } from './brand-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        FontAwesomeModule,
        StoreModule.forFeature('brandsResponse', paginationBrandReducer),
        EffectsModule.forFeature([ BrandEffects]),
        BrandRoutingModule,
        BasePageModule

    ],
    declarations: [
        BrandPageDetailComponent,
        BrandPageListComponent
    ],
    providers: [CommonService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    bootstrap: [BrandPageDetailComponent, BrandPageListComponent]

})
export class BrandPageModule { }