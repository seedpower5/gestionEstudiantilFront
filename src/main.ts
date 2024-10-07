import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Importa las rutas
import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient

// Inicia la aplicación Angular y configura el enrutador y el cliente HTTP
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Proporciona el enrutador con las rutas definidas
    provideHttpClient() // Proporciona HttpClient para hacer solicitudes HTTP
  ]
}).catch(err => console.error(err)); // Maneja errores durante el inicio
