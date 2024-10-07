import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEstudiantesCursoComponent } from './lista-estudiantes-curso.component';

describe('ListaEstudiantesCursoComponent', () => {
  let component: ListaEstudiantesCursoComponent;
  let fixture: ComponentFixture<ListaEstudiantesCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEstudiantesCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEstudiantesCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
