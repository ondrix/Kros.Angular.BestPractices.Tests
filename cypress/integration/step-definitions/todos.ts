import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { BestPracticesHeader } from '../pages/best-practices/best-practices-header';
import { Todos } from '../pages/best-practices/todos';
import { Browser } from '../pages/browser';
import { App } from '../pages/best-practices/app';

Given('vyberiem si prvú firmu v poradí', () => {
    cy.server();
    cy.route({
        method: 'GET',
        url: /organizations/}).as('getAllOrganizations');
        cy.visit('/company/list');
    cy.wait(['@getAllOrganizations']);

    // TODO: Add data-test attribute
    cy.get(':nth-child(1) > kros-company-item > .company-grid > .actions > :nth-child(1)').click();
});

Given('kliknem na záložku poznámky', () => {
    BestPracticesHeader.clickAtTodos();
});

Given('vymažem všetky poznámky', () => {
    cy.wait(300); // Waiting for add items to DOM
    cy.get('[data-test=todo-list-all-items]').then((container) => {
        if (container.children().length) {
            // Info about multiple parameters: https://docs.cypress.io/api/commands/click.html#Click-all-buttons-found-on-the-page
            cy.get('[data-test=todo-item-delete-button]').click({ multiple: true, force: true });
            cy.get('[data-test=todo-list-group-item]').should('have.length', 0);
        }
    })
});


When('vložím poznámku {string} s popisom {string}', (todoName: string, todoDesc: string) => {
    Todos.typeInNewTodoFields(todoName, todoDesc);
});

When("vložím poznámky s týmito údajmi:", (dataTable) => {
    dataTable.rawTable.slice(1).forEach((row: string[]) => {
        Todos.typeInNewTodoFields(row[0], row[1]);
    });
});

When("poslednú poznámku nastavím ako ukončenú", () => {
    cy.wait(300); // Waiting for add items to DOM
    Todos.setIsDoneForLastTodo();
});

When("zvolím si filter {string}", (filterType: string) => {
    switch (filterType) {
        case 'All':
            Todos.setAllFilter();
            break;
        case 'Active':
            Todos.setActiveFilter();
            break;
        case 'Completed':
            Todos.setCompleteFilter();
            break;
    }
});

When("kliknem na vymazanie ukončených poznámok", () => {
    Todos.deleteCompleteTodos();
});

When("zmením poslednú poznámku tak, že názov nastavím na {string} a popis na {string}", (todoName: string, todoDesc: string) => {
    Todos.editLastTodo(todoName, todoDesc);
});




Then('v zozname sa zobrazia iba neukončené poznámky', () => {
    cy.wait(300);
    cy.get('[data-test=todo-item-is-done]')
        .each(($el) => {
            cy.wrap($el).should('not.be.checked');
        });
});

Then('počet odfiltrovaných poznámok je {string}', (todosCount: string) => {
    cy.get('[data-test=todo-list-all-items] li').should("have.length", parseInt(todosCount));
});

Then('v zozname sa zobrazia tieto nové poznámky', () => {
    Todos.existsAnyTodos();
});

Then('existujú aj po refreshnutí appky', () => {
    App.reloadAndWaitForApp();

    Todos.existsAnyTodos();
});

Then('neexistujú žiadne poznámky', () => {
    Todos.notExistsAnyTodos();
});

Then('neexistujú ani po refreshnutí appky', () => {
    App.reloadAndWaitForApp();

    Todos.notExistsAnyTodos();
});

Then('sa tieto hodnoto zmenia', () => {
    Todos.lastTodoHasNewValues();
});

Then('sú zmenené aj po refreshnutí stránky', () => {
    App.reloadAndWaitForApp();

    Todos.lastTodoHasNewValues();
});