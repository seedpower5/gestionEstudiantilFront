import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudianteService } from '../estudiante.service';
import { Estudiante } from '../estudiante';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { ApexChart, ApexXAxis } from 'ng-apexcharts';
import Swal from 'sweetalert2';  // Importamos SweetAlert2

export interface ChartOptions {
  series: { name: string; data: number[] }[];
  chart: ApexChart;
  xaxis: ApexXAxis;
}

@Component({
  selector: 'app-lista-estudiantes-curso',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartComponent],
  providers: [EstudianteService], // Añadido el EstudianteService
  templateUrl: './lista-estudiantes-curso.component.html',
  styleUrls: ['./lista-estudiantes-curso.component.css']
})
export class ListaEstudiantesCursoComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  cursoId: number = 0;
  errorMessage: string = '';
  mostrarFormulario: boolean = false;
  nuevoEstudiante: Estudiante = new Estudiante();

  chartOptions: ChartOptions;

  constructor(
    private estudianteService: EstudianteService,
    private route: ActivatedRoute
  ) {
    this.chartOptions = {
      series: [{
        name: 'Notas Medias',
        data: []
      }],
      chart: {
        type: 'bar',
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
        this.actualizarGrafica();
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

  // Validación del DNI español
  validarDNI(dni: string): boolean {
    const dniPattern = /^[0-9]{8}[A-Z]$/;
    return dniPattern.test(dni);
  }

  // Validación del teléfono español
  validarTelefono(telefono: string): boolean {
    const telefonoPattern = /^[0-9]{9}$/;
    return telefonoPattern.test(telefono);
  }

  agregarEstudiante(): void {
    if (!this.validarDNI(this.nuevoEstudiante.dni)) {
      Swal.fire('Error', 'Error al crear estudiante: DNI no válido', 'error');
      return;
    }

    if (!this.validarTelefono(this.nuevoEstudiante.telefono)) {
      Swal.fire('Error', 'Error al crear estudiante: Teléfono no válido', 'error');
      return;
    }

    // Verificar duplicados
    const dniDuplicado = this.estudiantes.some(est => est.dni === this.nuevoEstudiante.dni);
    const telefonoDuplicado = this.estudiantes.some(est => est.telefono === this.nuevoEstudiante.telefono);

    if (dniDuplicado) {
      Swal.fire('Error', 'Error: ya existe ese DNI', 'error');
      return;
    }

    if (telefonoDuplicado) {
      Swal.fire('Error', 'Error: ya existe ese teléfono', 'error');
      return;
    }

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
        this.actualizarGrafica();
        Swal.fire('Éxito', 'Estudiante creado correctamente', 'success');
      },
      error: (error) => {
        this.errorMessage = 'Error al añadir el estudiante';
        console.error('Ocurrió un error:', error);
        Swal.fire('Error', 'No se pudo añadir el estudiante', 'error');
      }
    });
  }

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
        this.estudianteService.eliminarEstudiante(id).subscribe(
          () => {
            this.estudiantes = this.estudiantes.filter(estudiante => estudiante.id !== id);
            this.actualizarGrafica();
            Swal.fire('Eliminado!', 'El estudiante ha sido eliminado.', 'success');
          },
          error => {
            Swal.fire('Error', 'No se pudo eliminar el estudiante', 'error');
          }
        );
      }
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.nuevoEstudiante = new Estudiante();
  }
}
