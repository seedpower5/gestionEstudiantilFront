import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs'; // Importar solo los operadores necesarios
import { Curso } from './curso'; 

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:8080/api/cursos'; 

  constructor(private http: HttpClient) { }

  // Método para obtener todos los cursos
  obtenerTodosLosCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl).pipe(
      catchError(this.manejarError) // Maneja el error
    );
  }

   // Método para crear un nuevo curso
   agregarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso).pipe(
      catchError(this.manejarError) // Maneja el error
    );
  }
  
  // Método para eliminar un curso por ID
  eliminarCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.manejarError) // Maneja el error
    );
  }

  // Método para manejar errores
  private manejarError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error:', error);

    // Retorna un observable con un mensaje de error
    return new Observable<never>(subscriber => {
      subscriber.error('Error en la comunicación con la API. Inténtalo de nuevo más tarde.');
    });
  }
}
