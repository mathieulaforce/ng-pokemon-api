import { Directive, computed, input } from '@angular/core';
import { twClassUtil } from '../../utils/twClassUtils';
import { ClassValue } from 'clsx';

@Directive({
  selector: '[uiInput]',
  standalone: true,
  host: {
		'[class]': '_computedClass()',
	},
})
export class InputDirective {

  public readonly userClass = input<ClassValue>('', { alias: 'class' });

  constructor() { }

  protected _computedClass = computed(() => twClassUtil('block w-full h-10 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500', this.userClass()));
}
