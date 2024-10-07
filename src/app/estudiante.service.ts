import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Estudiante } from './estudiante'; 

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = 'http://localhost:8080/api/estudiantes';

  constructor(private http: HttpClient) { }

  // Método para obtener todos los estudiantes
  obtenerTodosLosEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl)
      .pipe(catchError(this.manejarError));
  }

  // Método para crear un nuevo estudiante
  agregarEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.apiUrl, estudiante)
      .pipe(catchError(this.manejarError));
  }

  // Método para obtener un estudiante por ID
  obtenerEstudiantePorId(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.manejarError));
  }

  // Método para eliminar un estudiante por ID
  eliminarEstudiante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.manejarError));
  }

  // Método para obtener estudiantes por curso ID
  obtenerEstudiantesPorCursoId(cursoId: number): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/curso/${cursoId}`)
      .pipe(catchError(this.manejarError));
  }

  // Método para manejar errores
  private manejarError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError('Error en la comunicación con la API. Inténtalo de nuevo más tarde.');
  }
}

