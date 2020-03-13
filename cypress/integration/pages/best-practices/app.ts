import { Browser } from "../browser";

export class App {

    public static visitAndWaitForApp() {
        Browser.setupAwaitedRoutes([
            {method: 'GET', url: /organizations/ }
        ]);
        Browser.visit('/company/list');
        Browser.waitForRoutes();
    }

    public static reloadAndWaitForApp() {
        Browser.setupAwaitedRoutes([
            {method: 'GET', url: /organizations/ }
        ]);
        Browser.reload();
        Browser.waitForRoutes();
    }
}