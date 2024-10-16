// cypress/e2e/lista-estudiantes.spec.ts

describe('Prueba del componente Lista Estudiantes', () => {
    beforeEach(() => {
        // Antes de cada prueba, visita la página donde se encuentra el componente lista-estudiantes
        cy.visit('http://localhost:4200'); // Cambia esto a la URL de tu aplicación
    });

    it('Debería mostrar la lista de estudiantes', () => {
        // Verifica que el encabezado esté visible
        cy.get('h2').should('contain', 'Lista de todos Estudiantes del centro');

        // Verifica que la tabla de estudiantes esté visible
        cy.get('table').should('be.visible');

        // Verifica que la tabla tenga las cabeceras correctas
        cy.get('th').eq(0).should('contain', 'Nombre');
        cy.get('th').eq(1).should('contain', 'Apellido');
        cy.get('th').eq(2).should('contain', 'DNI');
        cy.get('th').eq(3).should('contain', 'Teléfono');
        cy.get('th').eq(4).should('contain', 'Nota media');
        cy.get('th').eq(5).should('contain', 'Eliminar');
    });

    it('Debería poder eliminar un estudiante', () => {
        // Supongamos que ya hay estudiantes en la lista
        // Busca y elimina el primer estudiante de la lista
        cy.get('table tbody tr').first().find('.btn-danger').click(); // Click en el botón de eliminar

        // Confirma la eliminación en el modal de SweetAlert
        cy.on('window:alert', (text) => {
            expect(text).to.contains('¿Estás seguro?');
        });
        cy.get('.swal2-confirm').click(); // Confirma la eliminación en SweetAlert

        // Verifica que el estudiante ha sido eliminado
        cy.get('table tbody tr').should('have.length', 0); // Cambia a la longitud esperada si es necesario
    });

    it('Debería mostrar un mensaje de error al intentar eliminar un estudiante que no existe', () => {
        // Simulamos una respuesta de error cuando se intenta eliminar un estudiante
        cy.intercept('DELETE', '/api/estudiantes/*', {
            statusCode: 404,
            body: { error: 'Estudiante no encontrado' },
        }).as('deleteEstudiante');

        // Supongamos que ya hay estudiantes en la lista
        cy.get('table tbody tr').first().find('.btn-danger').click(); // Click en el botón de eliminar

        // Confirma la eliminación en el modal de SweetAlert
        cy.on('window:alert', (text) => {
            expect(text).to.contains('¿Estás seguro?');
        });
        cy.get('.swal2-confirm').click(); // Confirma la eliminación en SweetAlert

        // Verifica que se muestre un mensaje de error
        cy.contains('No se pudo eliminar el estudiante').should('be.visible');
    });

    it('Debería mostrar un mensaje cuando no hay estudiantes', () => {
        // Simula un caso donde no hay estudiantes
        cy.intercept('GET', '/api/estudiantes', []); // Cambia esto por la ruta correcta para obtener estudiantes
        cy.visit('http://localhost:4200'); // Revisitamos la página para aplicar el mock

        // Verifica que se muestre un mensaje de "No hay estudiantes"
        cy.contains('No hay estudiantes disponibles').should('be.visible'); // Cambia este texto según tu implementación
    });
});
