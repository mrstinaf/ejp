function on() {
                t = "Seminární práce z předmětu TWA\n";
                t += "František Mrština, 3. ročník";
                document.getElementById("text_overlay").innerText=t;
                t = "Obrázek na pozadí je knihovna z Rijskmuseum v Amsterodamu. Je použit ze zdroje:\n";
                t += "https://www.jenprocestovatele.cz/nejvetsi-ci-nejstarsi-knihovna-na-svete-kde-je-najdete/";
                document.getElementById("text_overlay2").innerText=t;
                document.getElementById("overlay").style.display = "block";
            }

function on_hlaska(n,o) {
                t = n;
                document.getElementById("text_overlay").innerText=t;
                t = o;
                document.getElementById("text_overlay2").innerText=t;
                document.getElementById("overlay").style.display = "block";
            }
            
function off() {
                document.getElementById("overlay").style.display = "none";
            }

function testPrihlaseni(u,p) {

    var klic = "", klice = [], pomuckyLogin="", pomucky={}, i=0;
    try {
       if (localStorage.getItem("pomuckyLogin")) {
        pomuckyLogin = localStorage.getItem("pomuckyLogin");
       } 
    } catch (e) {
        alert("CHYBA!!! - Chyba při čtení localStorage.\n" + e);
    }
    if (pomuckyLogin) {
        pomucky = JSON.parse( pomuckyLogin);
        klice = Object.keys( pomucky);
        console.log(klice.length + " pomucek nacteno.");
        for(i=0; i< klice.length; i++){
            klic = klice[i];
            Pomucka.instances[klic] = Pomucka.radekNaObj ( pomucky[klic]);
            if (maxId < Pomucka.instances[klic].id ) maxId = parseInt(Pomucka.instances[klic].id);
        }
    }

                            
}