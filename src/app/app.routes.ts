import { Routes } from '@angular/router';
import { ListadoCursosComponent } from './listado-cursos/listado-cursos.component';
import { ListaEstudiantesComponent } from './lista-estudiantes/lista-estudiantes.component';
import { ListaEstudiantesCursoComponent } from './lista-estudiantes-curso/lista-estudiantes-curso.component';


export const routes: Routes = [
  { path: 'cursos', component: ListadoCursosComponent },
  { path: 'estudiantes-curso/:cursoId', component: ListaEstudiantesCursoComponent }, // Cambiar para incluir el ID del curso
  { path: 'estudiantes', component: ListaEstudiantesComponent },
  { path: '', redirectTo: 'cursos', pathMatch: 'full' },
  { path: '**', redirectTo: 'cursos' }
];
