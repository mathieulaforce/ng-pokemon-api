import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ui-svg-icon',
  standalone: true,
  imports: [],
  template: ` `,
  styles: `
  :host {
    height: 100%;
    width: 100%; 
    -webkit-mask-size: contain;
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    display: inline-block;
}
  `,
})
export class SvgIconComponent {
  @HostBinding('style.-webkit-mask-image')
  private _path!: string;

  @Input()
  public set path(filePath: string) {
    this._path = `url("${filePath}")`;
  }
}
