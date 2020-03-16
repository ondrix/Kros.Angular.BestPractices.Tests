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

Given('kliknem na tlačidlo organizácií', () => {
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

When('zadám názov firmy {string} a Ulicu {string}', (companyName: string, street: string) => {
    Organizations.typeInAnotherCompanyFields(companyName, street);
});

Then('v zozname sa zobrazí novo pridaná firma', () => {
    Organizations.shouldIncludeNewCompany();
});

Then('danú firmu neuložím', () => {
    Organizations.shouldNotBeAbleToSaveNewCompany();
});