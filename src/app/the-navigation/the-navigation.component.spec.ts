import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheNavigationComponent } from './the-navigation.component';

describe('TheNavigationComponent', () => {
  let component: TheNavigationComponent;
  let fixture: ComponentFixture<TheNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
