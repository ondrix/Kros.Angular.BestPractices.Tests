import { Given, Then } from 'cypress-cucumber-preprocessor/steps';


Given(`som všetko dobre nastavil`, () => {});

Then(`všetko funguje a otvorí mi Google!`, () => {
  cy.visit('https://www.google.com')
});