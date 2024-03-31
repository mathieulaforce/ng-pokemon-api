import { Directive, computed, input } from '@angular/core';
import { twClassUtil } from '../../utils/twClassUtils';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[uiSkeleton], ui-skeleton',
  standalone: true,host: {
		'[class]': '_computedClass()',
	}
})
export class SkeletonDirective {

	public readonly userClass = input<ClassValue>('', { alias: 'class' });
   
  protected _computedClass = computed(() => twClassUtil('block animate-pulse rounded-md bg-muted', this.userClass()));
}
