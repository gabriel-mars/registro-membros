import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroReadComponent } from './membro-read.component';

describe('MembroReadComponent', () => {
  let component: MembroReadComponent;
  let fixture: ComponentFixture<MembroReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembroReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembroReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
