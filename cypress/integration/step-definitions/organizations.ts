import { Browser } from './../pages/browser';
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { Organizations } from '../pages/best-practices/organizations';
import { BestPracticesHeader } from '../pages/best-practices/best-practices-header';

Given('kliknem na tlačidlo organizácií', () => {
    BestPracticesHeader.clickAtOgranizations();
});

Given('existuje firma {string}', (comapnyName: string) => {
    Organizations.shouldContainCompanyInList(comapnyName);
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

When('kliknem na tlačidlo vymazať', () => {
    Organizations.clickRemove();
});

Then('v zozname sa zobrazí novo pridaná firma', () => {
    Organizations.shouldIncludeNewCompany();
});