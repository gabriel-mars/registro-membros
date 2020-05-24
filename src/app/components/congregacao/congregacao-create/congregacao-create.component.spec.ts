import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongregacaoCreateComponent } from './congregacao-create.component';

describe('CongregacaoCreateComponent', () => {
  let component: CongregacaoCreateComponent;
  let fixture: ComponentFixture<CongregacaoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongregacaoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongregacaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
