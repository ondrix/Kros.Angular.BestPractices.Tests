# language: sk

Požiadavka: Manažment organizácií

  Pozadie:
    Pokiaľ som prihlásený
    A navštívim stránku best practices
    A kliknem na tlačidlo organizácií

  Scenár: Pridanie organizácie s korektnými údajmi
    Keď kliknem na tlačidlo pridať organizáciu
    A zadám údaje
      | Názov              | IČO     | Ulica     | Číslo | PSČ   | Mesto       |
      | Moja organizacia 2 | 9588884 | Dlhocizna | 7     | 01001 | Žilina      |
    A kliknem na tlačidlo uložiť
    Tak v zozname sa zobrazí novo pridaná firma

  Scenár: Pridanie organizácie s nekorektnými údajmi
    Keď kliknem na tlačidlo pridať organizáciu
    A zadám údaje
      | Názov              | IČO     | Ulica     | Číslo | PSČ   | Mesto       |
      | Moja organizacia 3 |         | Kratka    | 9     | 95801 | Partizánske |
    Tak danú firmu neuložím




