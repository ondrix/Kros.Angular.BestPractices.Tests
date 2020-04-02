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


Najzákladnejšie nastavenia je potrebné vložiť do súboru `.vscode/settings.json`

Ak adresár `.vscode` neexistuje, môžeme ho vytvoriť ručne. Nastavenia sú uvedené nižšie:

 ```
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "cucumberautocomplete.steps": [
    "cypress/**/*.ts"
  ],
  "cucumberautocomplete.syncfeatures": "cypress/**/*feature",
  "explorer.compactFolders": false,
}
 ```

Stručný návod, ako používať Cypress je aj na našej Wiki https://krosza.sharepoint.com/:o:/s/Webovfakturcia/Eqb-iUaiiFhIll3Mg-YUzAcBq8LNoTAdOGGVhCiXT8pjaQ?e=gJA6XE


# Level 1 - Založenie projektu a nakonfigurovanie Cypress + Cucumber + Typescript

### Založenie projektu
V konzole sa nastav na adresár určený pre nový projekt, zadaj príkaz `npm init` a vyplň vlastnosti pre projekt. 


### Pridanie Cypressu
Inštalácia prebehne po zadaní príkazu `npm install cypress`. 


### Nakonfigurovanie proxy pre Cypress (iba ak si za firemnou proxy)
Vytvorenie PowerShell súboru `cypress-open.ps1` s týmto obsahom:
```powershell
Write-Output "Setting Proxy..."

$env:HTTP_PROXY = "http://192.168.1.3:3128"
$env:HTTPS_PROXY = "http://192.168.1.3:3128"

Write-Output "Opening Cypress..."

npx cypress open
```

Pridanie shortcut skriptu do `package.json` súboru.
```json
"scripts": {
    "cypress": "@powershell -NoProfile -ExecutionPolicy Unrestricted -Command ./cypress-open.ps1"
},
```


### Spustenie Cypressu s jeho examples testami
Ak si za firemnou proxy:
`npm run cypress`

Ak nie:
`npx cypress open`


### Nakonfigurovanie Cypress + Cucumber + Typescript
Inštalácia balíčka `cypress-cucumber-preprocessor`. Stačí spustiť `npm install cypress-cucumber-preprocessor`. <br />
Inštalácia balíčka `@cypress/webpack-preprocessor`. Stačí spustiť `npm install @cypress/webpack-preprocessor`. <br />
Inštalácia balíčka `webpack`. Stačí spustiť `npm install webpack`. <br />
Inštalácia balíčka `ts-loader`. Stačí spustiť `npm install ts-loader`. <br />
Inštalácia balíčka `typescript`. Stačí spustiť `npm install typescript`. <br />
Inštalácia balíčka `@types/cypress-cucumber-preprocessor`. Stačí spustiť `npm install @types/cypress-cucumber-preprocessor`. <br />

Pridanie podpory pre features do súboru `cypress.json`:
```json
{
  "testFiles": "**/*.feature"
}
```


Vytvorenie config súboru `tsconfig.json` s týmto obsahom:
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "skipLibCheck": true,
    "strict": true,
    "types": [
      "cypress"
    ]
  },
  "include": [
    "**/*.ts"
  ]
}
```

Pridanie tohto kódu do súboru `cypress/plugins/index.js` s týmto obsahom:
```javascript
const cucumber = require('cypress-cucumber-preprocessor').default
const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  const options = {
    webpackOptions: require('../webpack.config'),
  }

  on('file:preprocessor', cucumber())
  on('file:preprocessor', webpack(options))
}
```

Vytvorenie súboru `webpack.config.js` v adresári `cypress` s týmto obsahom:
```javascript
module.exports = {
    resolve: {
      extensions: [".ts", ".js"]
    },
    node: { fs: "empty", child_process: "empty", readline: "empty" },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: "ts-loader"
            }
          ]
        },
        {
          test: /\.feature$/,
          use: [
            {
              loader: "cypress-cucumber-preprocessor/loader"
            }
          ]
        },
        {
          test: /\.features$/,
          use: [
            {
              loader: "cypress-cucumber-preprocessor/lib/featuresLoader"
            }
          ]
        }
      ]
    }
};  
```

Vytvorenie súboru `cypress/integration/first.feature` s prvým scenárom:
```
# language: sk

Požiadavka: Prvá požiadavka

  Scenár: Prvý scenár
    Pokiaľ som všetko dobre nastavil
    Tak všetko funguje a otvorí mi Google!
```

Vytvorenie súboru `cypress/integration/step-definitions/first.ts` s krokmi scenáru:
```typescript
import { Given, Then } from 'cypress-cucumber-preprocessor/steps';


Given(`som všetko dobre nastavil`, () => {});

Then(`všetko funguje a otvorí mi Google!`, () => {
  cy.visit('https://www.google.com')
});
```


# Level 2 - Registrácia užívateľov
Pre pokrytie oblasti registrovania užívateľov budem postupovať takto:
- vytvorím súbor `registration.feature` (pre scenáre) v cypress/integration/
- vytvorím súbor `registration.ts` (definície krokov scenárov) v cypress/integration/step-definitions/
- vytvorím všetky súbory v adresári cypress/integration/pages/
- vytvorím súbor `constants.ts` (konštanty celého projektu) v cypress/support/
- do súboru `cypress.json` pridám nastavenie pre testovaciu appku
  ```json
  {
    "baseUrl": "https://demo.todos.kros.wtf",
  }
  ```