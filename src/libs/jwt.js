// const TOKEN_SECRET = require('../config')

// function createAccessToken(payload){
// 	jwt.sign(
// 		payload,
// 		TOKEN_SECRET,
//     { 
//         id : newUserSaved._id 
//     }, 
//     'secret123',
//     {
//         expiresIn:'1d', 
//     },
//     (err, token) => {
//         if(err) console.log(err)
// 		}
// 	)
// }

//Funcion que genera los tokens de acceso

const TOKEN_SECRET = require('../config')
const jwt = require("jsonwebtoken") 

	//El payload es el id de un usuario medianto ello creara el token de acceso
  const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { 
      expiresIn: "1d" 
  }, 
    (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

module.exports = createAccessToken