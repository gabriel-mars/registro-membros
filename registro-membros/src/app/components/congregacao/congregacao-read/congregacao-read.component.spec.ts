import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongregacaoReadComponent } from './congregacao-read.component';

describe('CongregacaoReadComponent', () => {
  let component: CongregacaoReadComponent;
  let fixture: ComponentFixture<CongregacaoReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongregacaoReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongregacaoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
