import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EstudianteService } from '../estudiante.service';
import { Estudiante } from '../estudiante';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { ApexChart, ApexXAxis } from 'ng-apexcharts'; // Asegúrate de importar estos tipos

export interface ChartOptions {
  series: { name: string; data: number[] }[];
  chart: ApexChart; // Cambia el tipo a ApexChart
  xaxis: ApexXAxis; // Cambia el tipo a ApexXAxis
}

@Component({
  selector: 'app-lista-estudiantes-curso',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ChartComponent],
  templateUrl: './lista-estudiantes-curso.component.html',
  styleUrls: ['./lista-estudiantes-curso.component.css']
})
export class ListaEstudiantesCursoComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  cursoId: number = 0;
  errorMessage: string = '';
  mostrarFormulario: boolean = false;
  nuevoEstudiante: Estudiante = new Estudiante();
  
  // Añadir variable para las opciones del gráfico
  chartOptions: ChartOptions;

  constructor(
    private estudianteService: EstudianteService,
    private route: ActivatedRoute
  ) {
    // Inicializar las opciones del gráfico
    this.chartOptions = {
      series: [{
        name: 'Notas Medias',
        data: []
      }],
      chart: {
        type: 'bar', // Asegúrate de que este tipo es aceptado
        height: 350
      },
      xaxis: {
        categories: []
      }
    };
  }

  ngOnInit(): void {
    this.cursoId = Number(this.route.snapshot.paramMap.get('cursoId'));
    console.log('ID del curso actual:', this.cursoId);

    if (this.cursoId && this.cursoId > 0) {
      this.obtenerEstudiantesPorCurso(this.cursoId);
    } else {
      this.errorMessage = 'ID de curso inválido';
    }
  }

  obtenerEstudiantesPorCurso(cursoId: number): void {
    this.estudianteService.obtenerEstudiantesPorCursoId(cursoId).subscribe({
      next: (estudiantes: Estudiante[]) => {
        this.estudiantes = estudiantes;
        this.actualizarGrafica(); // Llamar a la función para actualizar la gráfica
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los estudiantes';
        console.error(error);
      }
    });
  }

  actualizarGrafica(): void {
    const nombres = this.estudiantes.map(est => `${est.nombre} ${est.apellido}`);
    const notas = this.estudiantes.map(est => est.notaMedia);

    this.chartOptions.xaxis.categories = nombres;
    this.chartOptions.series[0].data = notas;
  }

  agregarEstudiante(): void {
    const nuevoEstudiante: Estudiante = {
      nombre: this.nuevoEstudiante.nombre,
      apellido: this.nuevoEstudiante.apellido,
      dni: this.nuevoEstudiante.dni,
      telefono: this.nuevoEstudiante.telefono,
      notaMedia: this.nuevoEstudiante.notaMedia,
      curso: { id: this.cursoId }
    } as Estudiante;

    this.estudianteService.agregarEstudiante(nuevoEstudiante).subscribe({
      next: (estudiante: Estudiante) => {
        this.estudiantes.push(estudiante);
        console.log('Estudiante añadido correctamente');
        this.cancelar();
        this.actualizarGrafica(); // Actualizar la gráfica al agregar un estudiante
      },
      error: (error) => {
        this.errorMessage = 'Error al añadir el estudiante';
        console.error('Ocurrió un error:', error);
      }
    });
  }

  eliminarEstudiante(id: number): void {
    this.estudianteService.eliminarEstudiante(id).subscribe({
      next: () => {
        this.estudiantes = this.estudiantes.filter(estudiante => estudiante.id !== id);
        this.actualizarGrafica(); // Actualizar la gráfica al eliminar un estudiante
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar el estudiante';
        console.error(error);
      }
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.nuevoEstudiante = new Estudiante();
  }
}
