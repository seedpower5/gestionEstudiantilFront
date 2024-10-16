// cypress/e2e/listado-cursos.spec.ts

describe('Prueba del componente Listado Cursos', () => {
    beforeEach(() => {
        // Antes de cada prueba, visita la página donde se encuentra el componente listado-cursos
        cy.visit('http://localhost:4200'); // Cambia esto a la URL de tu aplicación
    });

    it('Debería mostrar la lista de cursos', () => {
        // Verifica que la tabla de cursos se esté mostrando
        cy.get('h2').should('contain', 'Lista de Cursos'); // Verifica el encabezado

        // Verifica que la tabla esté visible
        cy.get('table').should('be.visible');
    });

    it('Debería poder agregar un nuevo curso', () => {
        // Simula hacer clic en el botón "Añadir Curso"
        cy.get('.btn-success').click();

        // Completa el formulario
        cy.get('#nombreCurso').type('Matemáticas Avanzadas');
        cy.get('#duracion').type('60');
        cy.get('#profesor').type('Profesor B');
        cy.get('#fechaInicio').type('2024-10-15'); // Asegúrate de usar un formato de fecha válido
        cy.get('#fechaFinal').type('2024-12-15');

        // Envía el formulario
        cy.get('form').submit();

        // Verifica que el nuevo curso se ha agregado a la lista
        cy.get('table tbody tr').last().find('td').eq(0).should('contain', 'Matemáticas Avanzadas'); // Verifica el nombre del curso
    });

    it('Debería poder eliminar un curso', () => {
        // Suponiendo que ya hay cursos en la lista, buscamos y eliminamos uno
        cy.get('table tbody tr').first().find('.btn-danger').click(); // Click en el botón de eliminar del primer curso

        // Verifica que el curso ha sido eliminado
        cy.get('table tbody tr').should('have.length', 0); // Cambia a la longitud esperada si es necesario
    });

    it('Debería mostrar un mensaje cuando no hay cursos', () => {
        // Simula el caso donde no hay cursos
        cy.intercept('GET', '/api/cursos', []); // Cambia esto por la ruta correcta para obtener cursos
        cy.visit('http://localhost:4200'); // Revisitamos la página para aplicar el mock

        // Verifica que el mensaje "No hay cursos" o similar se muestre
        cy.contains('No hay cursos disponibles').should('be.visible'); // Cambia este texto según tu implementación
    });
});
