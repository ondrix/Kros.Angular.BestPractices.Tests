import { Browser } from "../browser";
import { BestPracticesHeader } from "./best-practices-header";

export class App {

    public static visitAndWaitForApp() {
        Browser.setupAwaitedRoutes([
            {method: 'GET', url: /organizations/ }
        ]);
        Browser.visit('/company/list');
        Browser.waitForRoutes();
    }
}