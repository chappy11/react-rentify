type Name = {
    firstName:string;
    middleName?:string;
    lastName:string;
}

export const formatFullName = (params:Name) =>{

    return params.firstName +' '+params?.middleName +' '+params.lastName;
} 


export const generateSixDigitNumber = () =>{
    return Math.floor(100000 + Math.random() * 900000);
}


export function generateNonce() {
    var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var combination = '';
  
    for (var i = 0; i < 6; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      combination += characters.charAt(randomIndex);
    }
  
    return combination;
  }

export function displayMonth(noMonth:string){
    const months = parseInt(noMonth);

    return months < 2 ? 'month' : 'months';
}

export const containsSpecialCharacters = (input: string): boolean => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return regex.test(input);
   };

export function hasNumber(str:string) {
    return /\d/.test(str);
}