import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLignesComponent } from './details-lignes.component';

describe('DetailsLignesComponent', () => {
  let component: DetailsLignesComponent;
  let fixture: ComponentFixture<DetailsLignesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsLignesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsLignesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
