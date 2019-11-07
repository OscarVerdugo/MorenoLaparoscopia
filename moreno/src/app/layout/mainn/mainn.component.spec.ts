import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainnComponent } from './mainn.component';

describe('MainnComponent', () => {
  let component: MainnComponent;
  let fixture: ComponentFixture<MainnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
