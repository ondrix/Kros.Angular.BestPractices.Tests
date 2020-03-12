import { Browser } from './../pages/browser';
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
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
    Organizations.clickAdd();
});

When('zadám názov firmy {string} a IČO {string}', (companyName: string, bussinesId: string) => {
    Organizations.typeInNewCompanyFields(companyName, bussinesId);
});

When('kliknem na tlačidlo uložiť', () => {
    Organizations.clickSave();
});

Then('v zozname sa zobrazí novo pridaná firma', () => {
    Organizations.shouldIncludeNewCompany();
});