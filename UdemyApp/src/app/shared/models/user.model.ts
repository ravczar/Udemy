export class User {
    constructor(
        public email: string, 
        public id: string, 
        private _token: string, 
        private _tokenExpirationDate: Date
    ){}    

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        console.log("USER zwraca token: " + this._token);
        return this._token;
    }
    
}