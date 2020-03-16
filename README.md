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
  "explorer.compactFolders": false,
}
 ```

Stručný návod, ako používať Cypress je aj na našej Wiki https://krosza.sharepoint.com/:o:/s/Webovfakturcia/Eqb-iUaiiFhIll3Mg-YUzAcBq8LNoTAdOGGVhCiXT8pjaQ?e=gJA6XE


# Level 1 - Založenie projektu a nakonfigurovanie Cypress + Cucumber + Typescript

### Založenie projektu
V konzole sa nastav na adresár určený pre nový projekt, zadaj príkaz `npm init` a vyplň vlastnosti pre projekt. 


### Pridanie Cypressu
Inštalácia prebehne po zadaní príkazu `npm install cypress`. 
Pridanie Cypress súborov prebehne po zadaní príkazu `npx cypress open`. 


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
Inštalácia balíčka `cypress-cucumber-preprocessor`. Stačí spustiť `npm install cypress-cucumber-preprocessor`. 
Inštalácia balíčka `@cypress/webpack-preprocessor`. Stačí spustiť `npm install @cypress/webpack-preprocessor`. 
Inštalácia balíčka `webpack`. Stačí spustiť `npm install webpack`. 
Inštalácia balíčka `ts-loader`. Stačí spustiť `npm install ts-loader`. 
Inštalácia balíčka `typescript`. Stačí spustiť `npm install typescript`. 
Inštalácia balíčka `@types/cypress-cucumber-preprocessor`. Stačí spustiť `npm install @types/cypress-cucumber-preprocessor`. 

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


# Level 2 - Registrácia užívateľov
Pre pokrytie oblasti registrovania užívateľov budem postupovať takto:
- vytvorím súbor `registration.feature` (pre scenáre) v cypress/integration/
- vytovrím súbor `registration.ts` (definície krokov scenárov) v cypress/integration/step-definitions/
- vytvorím všetky súbory v adresáry cypress/integration/pages/
- vytvorím súbor `constants.ts` (konštanty celého projektu) v cypress/support/
- do súboru `cypress.json` pridám nastavenie pre testovaciu appku
  ```json
  {
    "baseUrl": "https://demo.todos.kros.wtf",
  }
  ```


# Level 3 - Môj prvý test
Pre napísanie prvého testu potrebujeme 2 vytvoriť súbory:
- first.feature súbor (scenár) v cypress/integration/
- first.ts súbor (definície krokov scenára) v cypress/integration/step-definitions 

Začneme písaním scenára v .feature súbori


# Level 4 - Scenáre 
Napíšeme si komplikovanejšie scenáre a ukážeme si, čo všetko cucumber dokáže.
Zároveň už využijeme aj Page Object Pattern.

Všetky scenáre sú v súbore `cypress/integration/features/organizations.feature`

## 4.1  Scenár s parametrom

V oraganizations.feature vytvoríme prvý scenár, 
v ktorom založíme novú firmu s ľubovolným názvom a IČOm.

## 4.2 Pozadie scenára

K požiadavke pridáme ďalší scenár, ktorý nám našu pridanú firmu vymaže. V tomto prípade
si zavedieme pozadie scenára.

## 4.3 Scenár s množstvom parametrov

Ak máme veľa parametrov v kroku scenára, dokážeme ich uložiť do prehľadnej tabuľky.

## 4.4 Náčrt scenára a príklady

Ak sa nám scenár opakuje viackrát s rôznymi hodnotami, môžeme využiť náčrt scenára.


# Level 5 - Scenáre pre Todos
Skúste teraz sami pokryt testami Todos v appke. Čo treba pokryt?
- vytvorenie nových Todos (s rôznymi hodnotami)
- načítanie všetkých Todos
- zmena názvu, description a stavu pre Todo
- odfiltrovanie poznámok podľa ich stavu
- vymazanie všetkých Todos, ktoré majú stav `Completed`
- vymazanie všetkých Todos

Výsledné scenáre sú v súbore `cypress/integration/features/todos.feature`


