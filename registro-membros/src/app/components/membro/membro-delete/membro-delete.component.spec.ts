import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroDeleteComponent } from './membro-delete.component';

describe('MembroDeleteComponent', () => {
  let component: MembroDeleteComponent;
  let fixture: ComponentFixture<MembroDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembroDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembroDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
