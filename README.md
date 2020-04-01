# Level 0 - Čo potrebujem na vývoj
Na vývoj je odporúčaný Visual Studio Code (Odkaz na stiahnutie: https://code.visualstudio.com/).
Potrebné je mať nainštalovaný Node.js (odkaz na stiahnutie: https://nodejs.org/en/).

Spolu s ním pre lepšiu prácu s testami je odporúčaná inštalácia nasledovných rozšírení: 

 

Angular Essentials 

https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials 

Cypress Snippets 

https://marketplace.visualstudio.com/items?itemName=andrew-codes.cypress-snippets 

Cucumber (Gherkin) Full Support 

https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete 

 Najzákladnejšie nastavenia je potrebné vložiť do súboru .vs/settings.json

Ak adresár .vs neexistuje, môžeme ho vytvoriť ručne. Nastavenia sú uvedené nižšie:

 ```
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "cucumberautocomplete.steps": [
    "cypress/**/*.ts"
  ],
  "cucumberautocomplete.syncfeatures": "cypress/e2e/features/**/*feature",
  "explorer.compactFolders": false
}
 ```

 Stručný návod, ako používať Cypress je aj na našej Wiki https://krosza.sharepoint.com/:o:/s/Webovfakturcia/Eqb-iUaiiFhIll3Mg-YUzAcBq8LNoTAdOGGVhCiXT8pjaQ?e=gJA6XE