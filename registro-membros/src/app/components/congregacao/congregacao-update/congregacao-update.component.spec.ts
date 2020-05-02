import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongregacaoUpdateComponent } from './congregacao-update.component';

describe('CongregacaoUpdateComponent', () => {
  let component: CongregacaoUpdateComponent;
  let fixture: ComponentFixture<CongregacaoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongregacaoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongregacaoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
