import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongregacaoDeleteComponent } from './congregacao-delete.component';

describe('CongregacaoDeleteComponent', () => {
  let component: CongregacaoDeleteComponent;
  let fixture: ComponentFixture<CongregacaoDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongregacaoDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongregacaoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
