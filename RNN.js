import Noeud from "./noeud.js";

export default class RNN{

    constructor(noeuds) {
        this.reseau = new Array();
        
        for (let index = 0; index < noeuds.length; index++) {

            let sizeOfThisDeep = noeuds[index].size;
            reseau[index] = new Array();

            for (let j = 0; j < sizeOfThisDeep; j++) {
                reseau[index].push(new Noeud())
            }

        }
    }

    activateFnc(){
        if(this.activateFnc === "linear"){
            return this.entry
        }
        
    }
}