import { Curso } from "./curso";

export class Estudiante {
    id!: number; // Asegúrate de que siempre tendrá un valor
    nombre: string | undefined;
    apellido: string | undefined;
    dni!: string;
    telefono!: string ;
    notaMedia!: number;
    curso: Curso | undefined; // Ahora 'curso' es un objeto del tipo Curso
}
