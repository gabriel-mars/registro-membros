import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembrosCrudComponent } from './membros-crud.component';

describe('MembrosCrudComponent', () => {
  let component: MembrosCrudComponent;
  let fixture: ComponentFixture<MembrosCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembrosCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembrosCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
