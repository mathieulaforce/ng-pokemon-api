import { NgModule } from '@angular/core'; 
import { SkeletonDirective } from './skeleton.directive';
import { PokemonTypeTagDirective } from './pokemon-type-tag.directive';
import { PaperDirective } from './paper.directive';
import { InputDirective } from './input.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SvgIconComponent } from './icons/svg-icon/svg-icon.component';
import CardDirectives from './card';
 
@NgModule({
  declarations: [],
  exports: [
    SkeletonDirective,
    PokemonTypeTagDirective,
    PaperDirective,
    InputDirective, 
    LoadingSpinnerComponent,
    SvgIconComponent,
    CardDirectives
  ],
  imports: [
     SkeletonDirective,
     PokemonTypeTagDirective,
     PaperDirective,
     InputDirective, 
     LoadingSpinnerComponent,
     SvgIconComponent,
     CardDirectives
  ]
})
export class UiModule { }
