import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroUpdateComponent } from './membro-update.component';

describe('MembroUpdateComponent', () => {
  let component: MembroUpdateComponent;
  let fixture: ComponentFixture<MembroUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembroUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembroUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
