export default class Noeud{

    constructor(activationFnc,id) {
        this.id = id;
        this.fonction = activationFnc;
        this.value = null;
        this.precedents = new Array();
    }

    activateFnc(){

        //On calcul notre valeur d'entrée grâce aux précédents
        let entry = 0;

        this.precedents.forEach(noeuds => {
            entry += noeuds.noeud.getValue * noeuds.poids; //On récupère la valeur d'un précédent et on multiplie par le poids, et on additionne tous les précédents * w
        })

        //On active la fonction de notre noeud actuel
        if(this.fonction === "linear"){ 
            this.value = entry;
        }

    }

    set setValue(newValue){
        this.value = newValue;
    }
    get getValue(){
        return this.value;
    }

    set setPrecedents(precedents){
        this.precedents = precedents;
    }

    get getPrecedents(){
        return this.precedents;
    }
}