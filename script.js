/**
 * 3 addEventListener :
 * - 1 bouton "ajouter"
 * - 1 icone "editer"
 * - 1 icone "supprimer"
 * 
 * bug : quand j'ajoute des elements, les actions de 'modif' et 'suppr' ne fonctionnent
 * plus.
 * les actions de 'modif' et de 'suppr' n'impact pas 'ajouter'
 */


//attributs
let inputSaisi = document.querySelectorAll('input');
let bouton = document.getElementById('ajouter');
let boutonResult = true;
let listeUtilisateurs = [];
let listeUtilisateursCopie = [];
let compteur = 0;

//test
let user = new Utilisateur(0, "marco", "polo", '12@test', 52);
let user1 = new Utilisateur(1, "marco", "polo", '12@mach', 52);
let user2 = new Utilisateur(2, "marco", "polo", '12@fit', 52);
listeUtilisateurs = [user, user1, user2];
listeUtilisateursCopie = listeUtilisateurs;
//eventListener
bouton.addEventListener("click", function () {
    /**
     * quand je click sur le bouton, soit j'ajoute des utilisateurs,
     * soit je modifie l'utilisateur
     */
    if(boutonResult == true){
        //j'ajoute des utilisateurs
        console.log(listeUtilisateursCopie.length + ' listeUtilisateursCopie.length');
        ajouterUtilisateur()
        clearTr();
        refreshList();
    }else{
        //je modifie des utilisateurs
        /**
         * je prend le contenue des input
         * je modifie le contenu du tableau
         * j'actualise la liste
         */
        modifierUtilisateur();
        clearTr();
        refreshList();
        bouton.textContent = 'Ajouter';
        bouton.value = "";
        boutonResult = true;
    }
}, false);

//constructeur
function Utilisateur(id, prenom, nom, email, tel){
    this.id = id;
    this.prenom = prenom;
    this.nom = nom;
    this.email = email;
    this.tel = tel;
}

//default
;(function (){
    refreshHtmlList();
})();
// liste de fonctions

/**
 * affichage de la liste dans le Html quand la listeUtilisateur n'est pas vide
 */
function refreshHtmlList(){
    if(listeUtilisateursCopie == ""){
        document.getElementById('list').style.display = 'none';
    }else{
        document.getElementById('list').style.display = 'inline';
        refreshList();
    }
};

//cellule de test


function ajouterUtilisateur() {
    /**
     * je prend la valeur des inputs et je les met dans un objet "Utilisateur"
     */
    let j = 0;

    //je verifie tous les champs des inputs
    //1er input
    if(inputSaisi[j].value != "" && inputSaisi[j].value != " " && inputSaisi[j].value != null){
        j++;
        inputSaisi[j].style.backgroundColor = 'white';

        //2e input
        if(inputSaisi[j].value != "" && inputSaisi[j].value != " " && inputSaisi[j].value != null){
            j++;
            inputSaisi[j].style.backgroundColor = 'white';
            
            //3e input
            if(inputSaisi[j].value != "" && inputSaisi[j].value != " " && inputSaisi[j].value != null
            && verifierEmail(listeUtilisateursCopie, inputSaisi[j].value) != false ){
                j++;
                inputSaisi[j].style.backgroundColor = 'white';

                //4e input
                if(inputSaisi[j].value != "" && inputSaisi[j].value != " " && inputSaisi[j].value != null){
                    inputSaisi[j].style.backgroundColor = 'white';
                    //on ajoute 1 a l'id si liste est vide
                    compteur++;
                    user = new Utilisateur(compteur, inputSaisi[0].value, inputSaisi[1].value,
                        inputSaisi[2].value, inputSaisi[3].value);
                    listeUtilisateursCopie.push(user);
                    return user;
                    
                }else{
                    inputSaisi[j].style.backgroundColor = 'red';
                    // alert("Vous n'avez rien saisi dans le champs prévu pour! Qu'est que vous attendez"+
                    //     "pour le remplir?!")
                    console.log("erreur tel");
                    return false
                }
            }else{
                inputSaisi[j].style.backgroundColor = 'red';
                // alert("Vous n'avez rien saisi dans le champs prévu pour! Qu'est que vous attendez"+
                //     "pour le remplir?!")
                console.log("erreur email");
                return false
            }
        }else{
            inputSaisi[j].style.backgroundColor = 'red';
            // alert("Vous n'avez rien saisi dans le champs prévu pour! Qu'est que vous attendez"+
            //     "pour le remplir?!")
            console.log("erreur nom");
            return false
        }
    }else{
        inputSaisi[j].style.backgroundColor = 'red';
        // alert("Vous n'avez rien saisi dans le champs prévu pour! Qu'est que vous attendez"+
        //     "pour le remplir?!")
        console.log("erreur prenom");
        return false
    }
}

/**
 * je verifie si il y a un tableau, si il y a un tableau alors
 * je verif la longueur du tableau et je créé une ligne par objet qu'il contient
 */
function refreshList() {
    //je prend le nombre de ligne deja cree
    listeUtilisateursCopie.forEach(element => {
        ajouterLigne(element);
    });
}

//clear la liste de tr
function clearTr() {
    let nbLigne = document.querySelectorAll('tr');
    for (let i = 1; i < nbLigne.length; i++) {
        nbLigne[i].remove();
    }
}

function ajouterLigne(user) {

    let table = document.querySelector('tbody');
    let newLine = table.insertRow();
    let compteur = (table.rows.length-1);

    newLine.insertCell(0).innerHTML = compteur;
    newLine.insertCell(1).innerHTML = user.prenom;
    newLine.insertCell(2).innerHTML = user.nom;
    newLine.insertCell(3).innerHTML = user.email;
    newLine.insertCell(4).innerHTML = user.tel;
    newLine.insertCell(5).className = 'modif';
    newLine.insertCell(6).className = 'suppr';
}

function verifierEmail(liste, valeurDiff) {
    /** 
     * le probleme est que la valeur est indefini en sorti
    */
    for (let i = 0; i < liste.length; i++) {
        if(valeurDiff === liste[i].email){
            return false;
        }
    }
}

//cellule de test
// ajout des addEventListener sur les td 
//modif
let modif = document.querySelectorAll('.modif');
for (let i = 0; i < modif.length; i++) {
    modif[i].addEventListener('click', function () {
         /**
         * quand je clic sur une ligne
         * je prend l'id du tableau html
         * je les inserts dans les imputs
         * et je reinject dans le tableau la nouvelle valeur
         */
        boutonResult = false;
        bouton.textContent = 'Editer';
        bouton.value = i;
        afficheSelection(selectionnerUtilisateur(i));

    }, false);
}

//-------------------------------------
//suppr
let suppr = document.querySelectorAll('.suppr');
for (let j = 0; j < suppr.length; j++) {
    suppr[j].addEventListener('click', function () {
        // supprimerUtilisateur(selectionnerUtilisateur(j));
        console.log(listeUtilisateursCopie);
        clearTr();
        refreshList();

    }, false);
}

function selectionnerUtilisateur(index) {
    return listeUtilisateursCopie[index];
}

function afficheSelection(params) {
    inputSaisi[0].value = params.prenom; 
    inputSaisi[1].value = params.nom; 
    inputSaisi[2].value = params.email; 
    inputSaisi[3].value = params.tel;
}

function modifierUtilisateur(){
    let indValue = bouton.value;
    let user = new Utilisateur(indValue, inputSaisi[0].value, inputSaisi[1].value,
        inputSaisi[2].value, inputSaisi[3].value);
    listeUtilisateurs[indValue] = user;
}

function supprimerUtilisateur(user) {
    listeUtilisateursCopie.splice(user);
}