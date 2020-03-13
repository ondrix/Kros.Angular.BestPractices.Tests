import { Browser } from "../browser";

export class Todos {
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
}