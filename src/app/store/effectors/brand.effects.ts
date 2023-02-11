import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as brandActions from '../actions/brand.action';
import { CommonService } from 'src/app/services/common.service';
import { Paginater } from 'src/app/common/models/model';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { withLatestFrom } from 'rxjs/internal/operators/withLatestFrom';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { getAllBrands } from '../selectors/brand.selector';
import { PageService } from 'src/app/services/page-service';


@Injectable()
export class BrandEffects {
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

    loadBrands$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(brandActions.loadBrands),
            withLatestFrom(this.store.select(getAllBrands)),
            mergeMap(() => {
                return this.commonService.getPaginatedBrands(this.paginater).pipe(
                    map((brandsResponse) => {
                        return brandActions.loadBrandsSuccess({ brandsResponse });
                    })
                );
            })
        );
    });
}