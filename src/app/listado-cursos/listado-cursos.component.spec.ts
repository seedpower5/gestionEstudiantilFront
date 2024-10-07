import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCursosComponent } from './listado-cursos.component';

describe('ListadoCursosComponent', () => {
  let component: ListadoCursosComponent;
  let fixture: ComponentFixture<ListadoCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoCursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
