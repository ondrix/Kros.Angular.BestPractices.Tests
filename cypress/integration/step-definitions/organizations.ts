import { Browser } from './../pages/browser';
import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import { Organizations } from '../pages/best-practices/organizations';
import { BestPracticesHeader } from '../pages/best-practices/best-practices-header';

Given('som prihlásený', () => {
    Browser.login();
});

Given('navštívim stránku best practices', () => {
    Browser.visit('/');
});

When('kliknem na tlačidlo organizácií', () => {
    BestPracticesHeader.clickAtOgranizations();
});

When('kliknem na tlačidlo pridať organizáciu', () => {
});