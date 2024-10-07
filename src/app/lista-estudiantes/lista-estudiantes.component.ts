import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from '../estudiante.service';
import { Estudiante } from '../estudiante';
import { CommonModule } from '@angular/common';

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
    this.obtenerEstudiantes();

    this.route.queryParams.subscribe(params => {
      this.cursoNombre = params['cursoNombre'];
    });
  }

  private obtenerEstudiantes(): void {
    this.estudianteService.obtenerTodosLosEstudiantes().subscribe(
      (data: Estudiante[]) => {
        this.estudiantes = data;
      },
      error => {
        console.error('Error al obtener los estudiantes:', error);
      }
    );
  }

  eliminarEstudiante(id: number): void {
    this.estudianteService.eliminarEstudiante(id).subscribe(
      () => {
        this.estudiantes = this.estudiantes.filter(estudiante => estudiante.id !== id);
        console.log('Estudiante eliminado con éxito');
      },
      error => {
        console.error('Error al eliminar el estudiante:', error);
      }
    );
  }
}
