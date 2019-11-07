import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessConsultComponent } from './process-consult.component';

describe('ProcessConsultComponent', () => {
  let component: ProcessConsultComponent;
  let fixture: ComponentFixture<ProcessConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
