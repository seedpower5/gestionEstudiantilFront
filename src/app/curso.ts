export class Curso 
{
    id!: number;              // El identificador del curso
    nombreCurso!: string;     // El nombre del curso
    duracion!: number;        // Duración del curso (en horas o como se maneje)
    profesor!: string;        // Nombre del profesor
    descripcion?: string;     // Descripción opcional del curso
    fechaInicio!: string;     // Fecha de inicio (en formato ISO string)
    fechaFinal!: string;      // Fecha de finalización (en formato ISO string)
    estudiantes?: any[];      // Lista opcional de estudiantes
  }
  