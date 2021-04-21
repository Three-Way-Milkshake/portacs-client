class UserInformation{
    name = "Mario";
    surname = "Rossi";
    password = "ciao";

    getInformation() {
        return this.name + "," + this.surname + "," + this.password; 
    }

    setInfo(n, c, p){
        this.name = n;
        this.surname = c;
        this.password = p;
    }
    
}
module.exports = UserInformation;