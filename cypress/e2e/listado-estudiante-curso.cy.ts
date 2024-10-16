// cypress/e2e/listado-estudiante-curso.spec.ts

describe('Prueba del componente Listado Estudiantes Curso', () => {
    beforeEach(() => {
        // Antes de cada prueba, visita la página donde se encuentra el componente
        cy.visit('http://localhost:4200'); // Cambia esto a la URL de tu aplicación
    });

    it('Debería mostrar la lista de estudiantes del curso', () => {
        // Verifica que el encabezado esté visible
        cy.get('h2').should('contain', 'Lista de Estudiantes del Curso');

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

    it('Debería mostrar y ocultar el formulario para añadir un estudiante', () => {
        // Verifica que el formulario esté oculto inicialmente
        cy.get('h3').should('not.exist');

        // Haz clic en el botón para mostrar el formulario
        cy.get('.btn-success').click();

        // Verifica que el formulario ahora esté visible
        cy.get('h3').should('contain', 'Añadir nuevo estudiante');
    });

    it('Debería añadir un nuevo estudiante correctamente', () => {
        // Mostrar el formulario
        cy.get('.btn-success').click();

        // Rellena el formulario
        cy.get('#nombre').type('Juan');
        cy.get('#apellido').type('Pérez');
        cy.get('#dni').type('12345678Z'); // DNI válido
        cy.get('#telefono').type('612345678'); // Teléfono válido
        cy.get('#notaMedia').type('7.5');

        // Haz clic en el botón para guardar el estudiante
        cy.get('button[type="submit"]').click();

        // Verifica que el estudiante haya sido añadido
        cy.contains('Juan Pérez').should('be.visible');
        cy.contains('Éxito').should('be.visible');
    });

    it('No debería añadir un estudiante con un DNI no válido', () => {
        // Mostrar el formulario
        cy.get('.btn-success').click();

        // Rellena el formulario con un DNI no válido
        cy.get('#nombre').type('Ana');
        cy.get('#apellido').type('García');
        cy.get('#dni').type('12345678'); // DNI no válido
        cy.get('#telefono').type('612345678');
        cy.get('#notaMedia').type('8.0');

        // Haz clic en el botón para guardar el estudiante
        cy.get('button[type="submit"]').click();

        // Verifica que se muestre un mensaje de error
        cy.contains('Error al crear estudiante: DNI no válido').should('be.visible');
    });

    it('Debería eliminar un estudiante', () => {
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

    it('No debería añadir un estudiante con un teléfono no válido', () => {
        // Mostrar el formulario
        cy.get('.btn-success').click();

        // Rellena el formulario con un teléfono no válido
        cy.get('#nombre').type('Luis');
        cy.get('#apellido').type('Martínez');
        cy.get('#dni').type('12345678Z'); // DNI válido
        cy.get('#telefono').type('123'); // Teléfono no válido
        cy.get('#notaMedia').type('9.0');

        // Haz clic en el botón para guardar el estudiante
        cy.get('button[type="submit"]').click();

        // Verifica que se muestre un mensaje de error
        cy.contains('Error al crear estudiante: Teléfono no válido').should('be.visible');
    });

    it('No debería añadir un estudiante con un DNI duplicado', () => {
        // Mostrar el formulario
        cy.get('.btn-success').click();

        // Rellena el formulario con un DNI duplicado
        cy.get('#nombre').type('Carlos');
        cy.get('#apellido').type('Lopez');
        cy.get('#dni').type('12345678Z'); // Suponiendo que este DNI ya existe
        cy.get('#telefono').type('612345678'); // Teléfono válido
        cy.get('#notaMedia').type('7.5');

        // Haz clic en el botón para guardar el estudiante
        cy.get('button[type="submit"]').click();

        // Verifica que se muestre un mensaje de error
        cy.contains('Error: ya existe ese DNI').should('be.visible');
    });

    it('No debería añadir un estudiante con un teléfono duplicado', () => {
        // Mostrar el formulario
        cy.get('.btn-success').click();

        // Rellena el formulario con un teléfono duplicado
        cy.get('#nombre').type('Sofia');
        cy.get('#apellido').type('Gómez');
        cy.get('#dni').type('23456789Z'); // DNI válido
        cy.get('#telefono').type('612345678'); // Suponiendo que este teléfono ya existe
        cy.get('#notaMedia').type('8.5');

        // Haz clic en el botón para guardar el estudiante
        cy.get('button[type="submit"]').click();

        // Verifica que se muestre un mensaje de error
        cy.contains('Error: ya existe ese teléfono').should('be.visible');
    });

    it('Debería mostrar un mensaje cuando no hay estudiantes', () => {
        // Simula un caso donde no hay estudiantes
        cy.intercept('GET', '/api/estudiantes/curso/*', []); // Cambia esto por la ruta correcta para obtener estudiantes
        cy.visit('http://localhost:4200'); // Revisitamos la página para aplicar el mock

        // Verifica que se muestre un mensaje de "No hay estudiantes disponibles"
        cy.contains('No hay estudiantes disponibles').should('be.visible'); // Cambia este texto según tu implementación
    });
});
