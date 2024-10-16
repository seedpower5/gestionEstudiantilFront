import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; // Importa Router y RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrige `styleUrl` a `styleUrls`
})
export class AppComponent {
  title = 'gestión Estudiantil';

  constructor(private router: Router) { } // Inyecta Router

  // Método para redirigir a la lista de estudiantes
  irAListadoEstudiantes() {
    this.router.navigate(['/estudiantes']); // Redirige a la ruta de estudiantes
  }

  // Método para redirigir a la página principal
  irAlHome() {
    this.router.navigate(['']); // Redirige a la ruta de inicio
  }
}
