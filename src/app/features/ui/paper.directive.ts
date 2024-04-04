import { Directive, Input, computed, input, signal } from '@angular/core';
import { ClassValue } from 'clsx';
import { twClassUtil } from '../../utils/twClassUtils';
import { cva, VariantProps } from 'class-variance-authority';
const paperElevations = cva('bg-background rounded-md p-6',
{
  variants: {    
     elevation: {
      none: '', 
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
     '2xl': 'shadow-2xl', 
      '3xl': 'shadow-3xl',
     }
  } 
});
type PaperElevationProps = VariantProps<typeof paperElevations>;
@Directive({
  selector: '[uiPaper]',
  standalone: true,
  host: {
    '[class]': '_computedClass()'
  }
})
export class PaperDirective { 
  
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
		twClassUtil(paperElevations({ elevation: this._elevation() }), this.userClass()),
	);
 
  private readonly _elevation = signal<PaperElevationProps['elevation']>('sm');
  @Input()
	set elevation(elevation: PaperElevationProps['elevation'] | string) {
    if(typeof elevation === 'string')
      this._elevation.set(elevation as PaperElevationProps['elevation']);
    else
		  this._elevation.set(elevation);
	}
  constructor() { } 
} 
 