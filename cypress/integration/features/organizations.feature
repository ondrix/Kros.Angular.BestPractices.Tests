# language: sk

Požiadavka: Manažment organizácií

  Pozadie:
    Pokiaľ som prihlásený
    A navštívim stránku best practices
    A kliknem na tlačidlo organizácií

  Scenár: Pridanie organizácie
    A kliknem na tlačidlo pridať organizáciu
    A zadám názov firmy "Moja firm222" a IČO "5698741"
    A kliknem na tlačidlo uložiť
    Tak v zozname sa zobrazí novo pridaná firma

  Náčrt Scenáru: Pridanie organizácie s nekorektnými údajmi
    Keď kliknem na tlačidlo pridať organizáciu
    A zadám "<Názov>" "<IČO>" "<Ulica>" "<Číslo>" "<PSČ>" "<Mesto>"
    Tak danú firmu neuložím

    Príklady:
      | Názov              | IČO     | Ulica     | Číslo | PSČ   | Mesto       |
      |                    | 9588884 | Dlhocizna | 7     | 01001 | Žilina      |
      | Moja organizacia 3 |         | Kratka    | 9     | 95801 | Partizánske |




