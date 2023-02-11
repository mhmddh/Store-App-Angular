import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as productActions from '../actions/product.action';
import { CommonService } from 'src/app/services/common.service';
import { Paginater } from 'src/app/common/models/model';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { withLatestFrom } from 'rxjs/internal/operators/withLatestFrom';
import { Store } from '@ngrx/store';
import { getAllProducts } from '../selectors/product.selector';
import { AppState } from '../states/app.state';
import { PageService } from 'src/app/services/page-service';


@Injectable()
export class ProductEffects {
    paginater !: Paginater;
    constructor(
        private actions$: Actions,
        private commonService: CommonService,
        private pageService: PageService,
        private store: Store<AppState>
    ) {
        this.pageService.paginater$.subscribe((paginater) => {
            this.paginater = paginater;
        });

    }


    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(productActions.loadProducts),
            withLatestFrom(this.store.select(getAllProducts)),
            mergeMap(() => {
                    return this.commonService.getPaginatedProducts(this.paginater).pipe(
                        map((productsResponse) => {
                            return productActions.loadProductsSuccess({ productsResponse });
                        })
                    );
            })
        );
    });
}