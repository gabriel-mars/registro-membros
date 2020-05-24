import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroCreateComponent } from './membro-create.component';

describe('MembroCreateComponent', () => {
  let component: MembroCreateComponent;
  let fixture: ComponentFixture<MembroCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembroCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembroCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
