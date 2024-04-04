import { computed, Directive, Input, input, signal } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';
import { twClassUtil } from '../../utils/twClassUtils';

const badgeTypeVariants = cva('inline-flex items-center border rounded-full px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
{
  variants: {
    variant:{
      normal: 'bg-normal text text-white', 
      fire: 'bg-fire text text-white',
      water: 'bg-water text text-white',
      grass: 'bg-grass text text-white',
      electric: 'bg-electric text text-white',
      ice: 'bg-ice text text-white',
      fighting: 'bg-fighting text text-white',
      poison: 'bg-poison text text-white',
      ground: 'bg-ground text text-white',
      flying: 'bg-flying text text-white',
      psychic: 'bg-psychic text text-white',
      bug: 'bg-bug text text-white',
      rock: 'bg-rock text text-white',
      ghost: 'bg-ghost text text-white',
      dark: 'bg-dark text text-white',
      dragon: 'bg-dragon text text-white',
      steel: 'bg-steel text text-white',
      fairy: 'bg-fairy text text-white', 
    }
  } 
});

type BadgeTypeVariants = VariantProps<typeof badgeTypeVariants>;

@Directive({
  selector: '[uiPokemonTypeTag]',
  standalone: true,
  host: {
		'[class]': '_computedClass()',
	},
})
export class PokemonTypeTagDirective {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected _computedClass = computed(() =>
		twClassUtil(badgeTypeVariants({ variant: this._variant() }), this.userClass()),
	);

  private readonly _variant = signal<BadgeTypeVariants['variant']>('normal');
	@Input()
	set variant(variant: BadgeTypeVariants['variant'] | string) {
    if(typeof variant === 'string')
      this._variant.set(variant as BadgeTypeVariants['variant']);
    else
		  this._variant.set(variant);
	}

  constructor() { }

}
