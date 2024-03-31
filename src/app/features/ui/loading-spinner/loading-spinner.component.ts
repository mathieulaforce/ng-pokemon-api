import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-loading-spinner',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col gap-6 justify-center items-center h-96">
      <img
        src="assets/pokeball.svg"
        alt="pokeball"
        class="w-32 h-32 animate-spin"
      />
      <div class="text-2xl text-background font-bold">{{loadingText}}</div>
    </div>
  `,
  styles: ``,
})
export class LoadingSpinnerComponent {
  @Input() loadingText: string = 'Loading...';
}
