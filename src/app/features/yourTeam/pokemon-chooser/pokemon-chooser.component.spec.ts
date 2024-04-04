import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonChooserComponent } from './pokemon-chooser.component';

describe('PokemonChooserComponent', () => {
  let component: PokemonChooserComponent;
  let fixture: ComponentFixture<PokemonChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonChooserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
