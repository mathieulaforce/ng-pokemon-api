import { Directive, computed, input } from '@angular/core';
import { ClassValue } from 'clsx';
import { twClassUtil } from '../../../utils/twClassUtils';

// CARD
@Directive({
  selector: '[uiCard]',
  standalone: true,
  host: {
    '[class]': '_computedClass()'
  }
})
export class CardDirective { 
  constructor() { 
   } 
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected _computedClass = computed(() => twClassUtil("flex flex-col items-center border p-4 gap-4 rounded-lg border bg-card text-card-foreground shadow-sm", this.userClass()));
 
} 

// CARD HEADER
@Directive({
  selector: '[uiCardHeader]',
  standalone: true,
  host: {
    "[class]": "_computedClass()"
  }
})
export class CardHeaderDirective {

  constructor() { }

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = () => twClassUtil("flex flex-col space-y-1.5 p-6", this.userClass());

}

// CARD TITLE
@Directive({
  selector: '[uiCardTitle]',
  standalone: true,
  host: {
    '[class]': '_computedClass()'
  }
}) 
export class CardTitleDirective {

  public readonly userClass = input<ClassValue>('', { alias: 'class' });

  constructor() { }  
  protected _computedClass = () => twClassUtil("text-2xl font-semibold leading-none tracking-tight", this.userClass());

}
 
// CARD SUBTITLE
@Directive({
  selector: '[uiCardDescription]',
  standalone: true,
  host: {
    '[class]': '_computedClass()'
  }
})
export class CardDescriptionDirective {

  public userClass = input<string>('', { alias: 'class' });
  constructor() { }

  protected _computedClass = () => twClassUtil("text-sm text-muted-foreground font-light", this.userClass());
}

// CARD CONTENT
@Directive({
  selector: '[uiCardContent]',
  standalone: true,
  host: {
    '[class]': '_computedClass()'
  }
})
export class CardContentDirective {

  public userClass = input<string>('', { alias: 'class' });
  constructor() { }

  protected _computedClass = () => twClassUtil("p-6 pt-0", this.userClass());
}

// CARD FOOTER
@Directive({
  selector: '[uiCardFooter]',
  standalone: true,
  host: {
    '[class]': '_computedClass()'
  }
})
export class CardFooterDirective {

  public userClass = input<string>('', { alias: 'class' });
  constructor() { }

  protected _computedClass = () => twClassUtil("flex items-center p-6 pt-0", this.userClass());
}