import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'  // Se asegura que el servicio esté disponible en toda la aplicación
})
export class CursoService {
  private apiUrl = 'http://localhost:8080/api/cursos';  // URL de la API

  constructor(private http: HttpClient) { }

  // Método para obtener todos los cursos
  obtenerTodosLosCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl).pipe(
      catchError(this.manejarError)  // Manejo de errores
    );
  }

  // Método para crear un nuevo curso
  agregarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso).pipe(
      catchError(this.manejarError)  // Manejo de errores
    );
  }

  // Método para eliminar un curso por ID
  eliminarCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.manejarError)  // Manejo de errores
    );
  }

  // Método privado para manejar errores
  private manejarError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError('Error en la comunicación con la API. Inténtalo de nuevo más tarde.');
  }
}
