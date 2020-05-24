import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongregacaoCrudComponent } from './congregacao-crud.component';

describe('CongregacaoCrudComponent', () => {
  let component: CongregacaoCrudComponent;
  let fixture: ComponentFixture<CongregacaoCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongregacaoCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongregacaoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
