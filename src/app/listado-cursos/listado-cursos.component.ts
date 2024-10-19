import { Component, OnInit } from '@angular/core';
import { Curso } from '../curso';  // Modelo Curso
import { CursoService } from '../curso.service';  // Servicio Curso
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Para ngModel y ngForm
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-cursos',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Asegúrate de agregar FormsModule
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.css']
})
export class ListadoCursosComponent implements OnInit {
  cursos: Curso[] = [];  // Lista de cursos
  mostrarFormulario: boolean = false;  // Controlar visibilidad del formulario
  nuevoCurso: Curso = new Curso();  // Nuevo curso a añadir

  constructor(private cursoServicio: CursoService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerCursos();  // Obtener los cursos al iniciar el componente
  }

  // Obtener los cursos desde el servicio
  private obtenerCursos() {
    this.cursoServicio.obtenerTodosLosCursos().subscribe({
      next: (dato: Curso[]) => {
        this.cursos = dato;
      },
      error: (error) => {
        console.error('Error al obtener los cursos:', error);
        Swal.fire('Error', 'No se pudo cargar la lista de cursos.', 'error');
      }
    });
  }

  // Eliminar un curso
  eliminarCurso(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoServicio.eliminarCurso(id).subscribe({
          next: () => {
            this.cursos = this.cursos.filter(curso => curso.id !== id);
            Swal.fire('Eliminado', 'El curso ha sido eliminado correctamente.', 'success');
          },
          error: (error) => {
            console.error('Error al eliminar el curso:', error);
            Swal.fire('Error', 'Ocurrió un error al eliminar el curso.', 'error');
          }
        });
      }
    });
  }

  // Agregar un nuevo curso
  agregarCurso(): void {
    // Validar que la fecha de inicio no sea posterior a la fecha final
    if (this.nuevoCurso.fechaInicio && this.nuevoCurso.fechaFinal) {
      const fechaInicio = new Date(this.nuevoCurso.fechaInicio);
      const fechaFin = new Date(this.nuevoCurso.fechaFinal);

      if (fechaInicio > fechaFin) {
        Swal.fire('Error', 'La fecha inicial no puede ser posterior a la fecha final', 'error');
        return;
      }
    }

    this.cursoServicio.agregarCurso(this.nuevoCurso).subscribe({
      next: (curso: Curso) => {
        this.cursos.push(curso);
        Swal.fire('Guardado', 'El curso ha sido añadido correctamente.', 'success');
        this.cancelar();
      },
      error: (error) => {
        console.error('Error al añadir el curso:', error);
        Swal.fire('Error', 'Ocurrió un error al añadir el curso.', 'error');
      }
    });
  }

  // Cancelar el formulario y limpiar
  cancelar(): void {
    this.mostrarFormulario = false;
    this.nuevoCurso = new Curso();  // Limpiar formulario
  }

  // Navegar al listado de estudiantes
  irAListadoEstudiantes(curso: Curso): void {
    this.router.navigate(['/estudiantes-curso', curso.id]);  // Navegar a estudiantes
  }
}
