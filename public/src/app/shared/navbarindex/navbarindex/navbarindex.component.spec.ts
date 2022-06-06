import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarindexComponent } from './navbarindex.component';

describe('NavbarindexComponent', () => {
  let component: NavbarindexComponent;
  let fixture: ComponentFixture<NavbarindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
