# language: sk

Požiadavka: Plnohodnotná práca s poznámkami
  Ako užívateľ
  chcem vytvárať, upravovať, filtrovať a mazať poznámky

  Pozadie:
    Pokiaľ som prihlásený
    A navštívim stránku best practices
    A vyberiem si prvú firmu v poradí
    A kliknem na záložku poznámky
    A vymažem všetky poznámky
    Keď vložím poznámky s týmito údajmi:
      | TodoName        | TodoDescription |
      | Moja poznámka 1 | popis 1         |
      | Moja poznámka 2 | popis 2         |
      | Moja poznámka 3 | popis 3         |


  Scenár: Pridanie viacerých poznámok
    Tak v zozname sa zobrazia tieto nové poznámky
    A existujú aj po refreshnutí appky

  Náčrt Scenáru: Filtrovanie podľa stavu poznámky
    A poslednú poznámku nastavím ako ukončenú
    A zvolím si filter "<FilterType>"
    Tak počet odfiltrovaných poznámok je "<TodosCount>"

    Príklady:
      | FilterType            | TodosCount    |
      | Active                | 2             |  
      | Completed             | 1             |  
      | All                   | 3             | 

  Scenár: Vymazanie hotových poznámok
    A poslednú poznámku nastavím ako ukončenú
    A kliknem na vymazanie ukončených poznámok
    Tak v zozname sa zobrazia iba neukončené poznámky