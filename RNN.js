import Noeud from "./Noeud.js";

export default class RNN{

    constructor(noeuds,weigths) { //Exemple [{size:2,fnc:""} , {size:3,fnc:"linear"} , {size:2,fnc:"linear"}]
        this.reseau = new Array();
        this.profondeur = noeuds.length;
        this.sortie = [];
        this.score = 0;
        this.poids = [];
        
        let i = 1;
        
        let tableauPrec = new Array();
        let indexW = 0;

        for (let index = 0; index < noeuds.length; index++) { //depth ++

            let tableauATM = new Array();
            let sizeOfThisDeep = noeuds[index].size;
            this.reseau[index] = new Array();

            for (let j = 0; j < sizeOfThisDeep; j++) { //ligne ++

                let nNoeud = new Noeud(noeuds[index].fnc,i);
                tableauATM.push(nNoeud);

                if(index != 0){ //set up des poids et les précédents
                    let tableauPrecPoids = new Array();
                    tableauPrec.forEach(precedent => {

                        let poids;
                        
                        if(weigths.length == 0){
                            poids = Math.random();
                        }else{
                            poids = weigths[indexW];
                        }
                        
                        this.poids.push(poids);
                        tableauPrecPoids.push({noeud:precedent,poids:poids})

                        indexW++;
                    })
                    nNoeud.setPrecedents = tableauPrecPoids; //Ajout à notre noeud de ses parents et des poids le reliant
                }

                this.reseau[index].push(nNoeud);
                i++;
            }

            tableauPrec = tableauATM;

        }
    }

    calculerSorties(tab_entry){
        //tab_entry = [0.4 , 0.3]
        this.reseau.forEach((element,index) => { //Element est un tableau de noeuds

            if(index == 0){ //On set up les valeurs d'entrées

                element.forEach((noeud,i) => {
                    noeud.value = tab_entry[i];
                })

            }else{ //On fait du feedforward
                
                element.forEach((noeud,i) => {
                    noeud.activateFnc();
                })
            }

        });

        //Nous ce qu'on veut c'est un tableau de valeur
        let retour_value = new Array();

        this.reseau[this.profondeur-1].forEach(noeudSortie => {
            retour_value.push(noeudSortie.getValue);
        })

        this.sortie = retour_value;

        return retour_value;
    }

    get getW(){
        return this.poids;
    }

    set setScore(score){
        this.score = score;
    }

    get getScore(){
        return this.score;
    }

    get getDepth(){
        return this.profondeur;
    }

    

}
