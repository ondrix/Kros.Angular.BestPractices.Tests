# Level 0 - Čo potrebujem na vývoj
Na vývoj je odporúčaný Visual Studio Code (Odkaz na stiahnutie: https://code.visualstudio.com/). 

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
 
# Level 1


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


# Spustenie Cypressu s jeho examples testami
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
    // process only spec files
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
