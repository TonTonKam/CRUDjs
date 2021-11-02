/**
 * 3 addEventListener :
 * - 1 bouton "ajouter"
 * - 1 icone "editer"
 * - 1 icone "supprimer"
 */

//attributs
let inputSaisi = document.querySelectorAll('input');
let bouton = document.getElementById('ajouter');
let boutonResult = true;
let listeUtilisateurs = [];
let compteur = 0;
let nombreLine = 6;
let compteLine = -1;

//test
let user = new Utilisateur("ted", "marco", "polo", 12, 52);
let user1 = new Utilisateur("ted1", "marco", "polo", '12@mach', 52);
let user2 = new Utilisateur("ted2", "marco", "polo", '12@fit', 52);
listeUtilisateurs = [user, user1, user2];
//eventListener
bouton.addEventListener("click", function () {
    /**
     * quand je click sur le bouton, soit j'ajoute des utilisateurs,
     * soit je modifie l'utilisateur
     */
    if(boutonResult == true){
        //j'ajoute des utilisateurs
        console.log(listeUtilisateurs.length);
        ajouterUtilisateur()
        refreshHtmlList();
        refreshList();
    }else{
        //je modifie des utilisateurs
    }
});

//constructeur
function Utilisateur(id, prenom, nom, email, tel){
    this.id = id;
    this.prenom = prenom;
    this.nom = nom;
    this.email = email;
    this.tel = tel;
}

//default
refreshHtmlList();
// liste de fonctions

/**
 * affichage de la liste dans le Html quand la listeUtilisateur n'est pas vide
 */
function refreshHtmlList(){
    if(listeUtilisateurs == ""){
        document.getElementById('list').style.display = 'none';
    }else{
        document.getElementById('list').style.display = 'inline';
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
            && verifierEmail(listeUtilisateurs) == true ){
                j++;
                inputSaisi[j].style.backgroundColor = 'white';

                //4e input
                if(inputSaisi[j].value != "" && inputSaisi[j].value != " " && inputSaisi[j].value != null){
                    inputSaisi[j].style.backgroundColor = 'white';
                    //on ajoute 1 a l'id
                    compteur++;
                    user = new Utilisateur(compteur, inputSaisi[0].value, inputSaisi[1].value,
                        inputSaisi[2].value, inputSaisi[3].value);
                    listeUtilisateurs.push(user);
                    return user;
                }else{
                    inputSaisi[j].style.backgroundColor = 'red';
                    // alert("Vous n'avez rien saisi dans le champs prévu pour! Qu'est que vous attendez"+
                    //     "pour le remplir?!")
                    console.log("vague tel");
                    return false
                }
            }else{
                inputSaisi[j].style.backgroundColor = 'red';
                // alert("Vous n'avez rien saisi dans le champs prévu pour! Qu'est que vous attendez"+
                //     "pour le remplir?!")
                console.log("vague email");
                return false
            }
        }else{
            inputSaisi[j].style.backgroundColor = 'red';
            // alert("Vous n'avez rien saisi dans le champs prévu pour! Qu'est que vous attendez"+
            //     "pour le remplir?!")
            console.log("vague nom");
            return false
        }
    }else{
        inputSaisi[j].style.backgroundColor = 'red';
        // alert("Vous n'avez rien saisi dans le champs prévu pour! Qu'est que vous attendez"+
        //     "pour le remplir?!")
        console.log("vague prenom");
        return false
    }
}

/**
 * je verifie si il y a un tableau, si il y a un tableau alors
 * je verif la longueur du tableau et je créé une ligne par objet qu'il contient
 */

function refreshList() {
    //je prend le nombre de ligne deja cree
    
    // let valueTableau = 0; 
    // while (valueTableau < listeUtilisateurs.length) {
    //     ajouterLigne(listeUtilisateurs[valueTableau]);
    //     valueTableau++
    // }
    ajouterLigne(listeUtilisateurs[0]);
    
}

//cellule de test

function ajouterLigne(user) {
    // compteLine++;
    // let ajoutElement = (compteLine * nombreLine);
    
    // let ligne = document.createElement('tr');
    // for (let i = 0; i < 5; i++) {
    //     let cellule = document.createElement('td');
    //     cellule.classList.add('addLine');
    //     ligne.append(cellule);
    // }
    // let iconeModif = document.createElement('td');
    // iconeModif.classList.add('boutonModif');
    // let iconeSuppr = document.createElement('td');
    // iconeSuppr.classList.add('addLine');
    // ligne.append(iconeModif);
    // ligne.append(iconeSuppr);

    // //integration de la ligne dans le tbody
    // document.querySelector('tbody').appendChild(ligne);
    
    // let allLine = document.querySelectorAll('.addLine');
    // // for (let j = ajoutElement; j < (allLine.length + nombreLine); j++) {
    //     allLine[0] = allLine[(ajoutElement + 0)].textContent = user.id;
    //     allLine[1] = allLine[(ajoutElement + 1)].textContent = user.prenom;
    //     allLine[2] =  allLine[(ajoutElement + 2)].textContent = user.nom;
    //     allLine[3] =  allLine[(ajoutElement + 3)].textContent = user.email;
    //     allLine[4] =  allLine[(ajoutElement + 4)].textContent = user.tel;
    // // }

    let table = document.querySelector('.table');
    let newLine = table.insertRow();
    let compteur = (table.rows.length-1);

    newLine.insertCell(0).innerHTML = compteur;
    newLine.insertCell(1).innerHTML = user.prenom;
    newLine.insertCell(2).innerHTML = user.nom;
    newLine.insertCell(3).innerHTML = user.email;
    newLine.insertCell(4).innerHTML = user.tel;
    newLine.insertCell(5).innerHTML = "<i class='bi bi-pencil-square' id='"+compteur+"' onclick='modif(this);'></i>";
    newLine.insertCell(6).innerHTML = "<i class='bi bi-trash'></i>";
}

//cellule de test
function verifierEmail(liste) {
    if(liste != ""){
        let listEmail = [];
        let j = 0;

        liste.forEach(element => {
            listEmail.push(element.email);
        });
        if(j != listEmail.length){
            /**
             * je fais une boucle pour verifier toutes les valeurs
             */
            while(listEmail[j] != inputSaisi[2].value && j <= listEmail.length){
                j++;
                if(j == (listEmail.length)){
                    return true;
                }
            }
        }else{
            console.log("a atteind la longueur de la liste");
            return true;
        }
    }else{
        console.log("n'a pas de liste a verifier");
        return true;
    }
}



function modifierUtilisateur() {
    
}

function supprimerUtilisateur() {
    
}