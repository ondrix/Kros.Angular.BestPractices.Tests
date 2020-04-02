import { Browser } from "../browser";
import { Todos } from "./todos";

export class BestPracticesHeader {

    public static clickAtOgranizations() {
        Browser.setupAwaitedRoutes([
            {method: 'GET', url: /organizations/ }
        ]);

        cy.get('[data-test=app-component-todo-organizations-menu]').click({ force: true });

        Browser.waitForRoutes();
    }

    public static clickAtTodos() {
        Browser.setupAwaitedRoutes([
            {method: 'GET', url: /organizations\/\d+\/ToDos/ }
        ]);
        Todos.clickAtTodoTab();
        Browser.waitForRoutes();
    }
}