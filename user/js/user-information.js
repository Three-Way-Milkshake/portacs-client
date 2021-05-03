class UserInformation{
    name;
    surname;
    password;

    getInformation() {
        return this.name + "," + this.surname + "," + this.password; 
    }

    setInfo(n, c){
        this.name = n;
        this.surname = c;
    }
    
    setPassword(p) {
        this.password = p;
    }
    
}
module.exports = UserInformation;