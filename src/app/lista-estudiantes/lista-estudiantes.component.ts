import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../estudiante.service';
import { Estudiante } from '../estudiante';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';  // Importa SweetAlert2

@Component({
  selector: 'app-lista-estudiantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-estudiantes.component.html',
  styleUrls: ['./lista-estudiantes.component.css']
})
export class ListaEstudiantesComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  cursoNombre: string | null = null;

  constructor(private route: ActivatedRoute, private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.obtenerEstudiantes();  // Obtener la lista de estudiantes

    // Obtener el nombre del curso de los parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      this.cursoNombre = params['cursoNombre'];
    });
  }

  private obtenerEstudiantes(): void {
    this.estudianteService.obtenerTodosLosEstudiantes().subscribe(
      (data: Estudiante[]) => {
        this.estudiantes = data;  // Asignar la lista de estudiantes a la variable
      },
      error => {
        console.error('Error al obtener los estudiantes:', error);
        Swal.fire('Error', 'No se pudo cargar la lista de estudiantes.', 'error');
      }
    );
  }

  // Método para eliminar un estudiante con SweetAlert2
  eliminarEstudiante(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, se procede con la eliminación
        this.estudianteService.eliminarEstudiante(id).subscribe(
          () => {
            this.estudiantes = this.estudiantes.filter(estudiante => estudiante.id !== id);  // Actualiza la lista de estudiantes
            console.log('Estudiante eliminado con éxito');
            Swal.fire('Eliminado!', 'El estudiante ha sido eliminado.', 'success');
          },
          error => {
            console.error('Error al eliminar el estudiante:', error);
            Swal.fire('Error', 'No se pudo eliminar el estudiante', 'error');
          }
        );
      }
    });
  }
}
