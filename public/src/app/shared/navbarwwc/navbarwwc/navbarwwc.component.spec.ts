import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarwwcComponent } from './navbarwwc.component';

describe('NavbarwwcComponent', () => {
  let component: NavbarwwcComponent;
  let fixture: ComponentFixture<NavbarwwcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarwwcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarwwcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
