/***********************************************
***  Metody pro use case vypis vsech polozek ***
************************************************/
 kab.v.vypisVsechnyPomucky = {
  vytvorFormular: function () {
    var tableBodyEl = document.querySelector("table#pomuckytab>tbody");
    var klice=[], klic="", radek={}, i=0;
    // nacti vse
    Pomucka.nactiVse();
    klice = Object.keys( Pomucka.instances);
    // pro kazdy zaznam vytvor radek satributy ve sloupcich
    for (i=0; i < klice.length; i++) {
      klic = klice[i];
      radek = tableBodyEl.insertRow();
      radek.insertCell(-1).textContent = Pomucka.instances[klic].id;      
      radek.insertCell(-1).textContent = Pomucka.instances[klic].inventCislo;  
      radek.insertCell(-1).textContent = Pomucka.instances[klic].nazev;
      radek.insertCell(-1).textContent = Pomucka.instances[klic].popis;
      radek.insertCell(-1).textContent = Pomucka.instances[klic].kategorie;
      radek.insertCell(-1).textContent = Pomucka.instances[klic].datNakup;
      if (Pomucka.instances[klic].vyrazeno == false) {
         radek.insertCell(-1).textContent = "ne";
      } else {
         radek.insertCell(-1).textContent = "ano";
      }
      radek.insertCell(-1).textContent = Pomucka.instances[klic].datVyraz;
    }
  }
};