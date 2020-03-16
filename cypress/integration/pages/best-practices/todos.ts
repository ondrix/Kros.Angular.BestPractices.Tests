import { Browser } from "../browser";

export class Todos {
    private static todoName: string;
    private static todoDesc: string;

    static typeInNewTodoFields(todoName: string, todoDesc: string) {
        cy.get('[data-test=add-todo-item-name]').type(todoName);
        cy.get('[data-test=add-todo-item-description]').type(todoDesc);
    
        cy.server();
        cy.route('POST', '**ToDos').as('createRoute');
        cy.get('[data-test=add-todo-item-button]').click({force: true});
        cy.wait(['@createRoute']);
    }

    static clickAtTodoTab() {
        cy.get('[data-test=app-component-todo-list-menu]').click({ force: true });
    }

    static existsAnyTodos() {
        cy.get('[data-test=todo-list-all-items] li')
            .should('have.length.greaterThan', 0);
    }

    static notExistsAnyTodos() {
        cy.get('[data-test=todo-list-group-item]').should('have.length', 0);
    }

    static setIsDoneForLastTodo() {
        Browser.setupAwaitedRoutes([
            {method: 'PUT', url: /organizations\/\d+\/ToDos\/changeIsDoneState*/ }
        ]);
        
        cy.get('[data-test=todo-item-is-done]')
            .last()
            .check();

        Browser.waitForRoutes();

        cy.get('[data-test=todo-item-is-done]').should('be.checked');
    }

    static setActiveFilter() {
        Browser.setupAwaitedRoutes([
            {method: 'GET', url: /organizations\/\d+\/ToDos/ }
        ]);
        
        cy.get('[data-test=todo-list-filter-active]').click({force: true});

        Browser.waitForRoutes();
    }

    static setAllFilter() {
        Browser.setupAwaitedRoutes([
            {method: 'GET', url: /organizations\/\d+\/ToDos/ }
        ]);
        
        cy.get('[data-test=todo-list-filter-all]').click({force: true});

        Browser.waitForRoutes();
    }

    static setCompleteFilter() {
        Browser.setupAwaitedRoutes([
            {method: 'GET', url: /organizations\/\d+\/ToDos/ }
        ]);
        
        cy.get('[data-test=todo-list-filter-completed]').click({force: true});

        Browser.waitForRoutes();
    }

    static deleteCompleteTodos() {
        Browser.setupAwaitedRoutes([
            {method: 'DELETE', url: /organizations\/\d+\/ToDos\/deleteCompleted/ }
        ]);
        
        cy.get('[data-test=todo-list-delete-completed-button]').click({force: true});

        Browser.waitForRoutes();
    }

    static editLastTodo(todoName: string, todoDesc: string) {
        this.todoName = todoName;
        this.todoDesc = todoDesc;

        cy.get('[data-test=todo-list-all-items] [data-test=todo-list-group-item]:last-child [data-test=todo-item-edit-button]')
            .last()
            .as("lastEditButton");
        cy.get('@lastEditButton').scrollIntoView();
        cy.get('@lastEditButton').click({force: true});

        // Klik na Close button
        cy.get('[data-test=edit-todo-close-button-bottom-left]').click({force: true});
        cy.get('@lastEditButton').click({force: true});

        // Klik na horny krizik
        cy.get('[data-test=edit-todo-close-button-top-right]').click({force: true});
        cy.get('@lastEditButton').click({force: true});

        // Zeditovanie poznamky
        cy.get('[data-test=edit-todo-name-input]')
            .clear()
            .type(todoName);
        cy.get('[data-test=edit-todo-description-input]')
            .clear()
            .type(todoDesc);


        Browser.setupAwaitedRoutes([
            {method: 'PUT', url: /organizations\/\d+\/ToDos/ }
        ]);
        cy.get('[data-test=edit-todo-save-button]').click({force: true});
        Browser.waitForRoutes();
    }

    static lastTodoHasNewValues() {
        cy.get('[data-test=todo-item-name]').last().should('have.text', this.todoName);

        cy.get('[data-test=todo-list-all-items] [data-test=todo-list-group-item]:last-child [data-test=todo-item-edit-button]')
            .last()
            .as("lastEditButton");
        cy.get('@lastEditButton').scrollIntoView();
        cy.get('@lastEditButton').click({force: true});

        cy.get('[data-test=edit-todo-description-input]').should("have.value", this.todoDesc);

        cy.get('[data-test=edit-todo-close-button-top-right]').click({force: true});
    }
}