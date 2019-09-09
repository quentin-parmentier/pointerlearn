export default class Noeud{

    constructor(activationFnc,id) {
        this.id = id;
        this.fonction = activationFnc;
        this.entry = 0;
    }

    activateFnc(){
        if(this.activateFnc === "linear"){
            return this.entry
        }
        
    }
}