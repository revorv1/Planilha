const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciais = require('./credentials.json');
const arquivo = require('./arquivo.json');
const { JWT } = require('google-auth-library');

const SCOPES = [
   'https://www.googleapis.com/auth/spreadsheets'
];

const jwt = new JWT({
   email: credenciais.client_email,
   key: credenciais.private_key,
   scopes: SCOPES,
});
const getDoc = async () => {
   const doc = new GoogleSpreadsheet(arquivo.id, jwt)
   await doc.loadInfo()
   return doc


}

const ReadWorkSheet = async () => {
   let doc =  await getDoc()
   let firstSheet = doc.sheetsByIndex[0]
   let rows = await firstSheet.getRows()

   let array = rows.map(row => {
     
      return row.toObject()
   })
   
   return array 
}
async function AddUser( data = {}) {

   const response = await fetch( "https://apigenerator.dronahq.com/api/1ZsUVbzd/exercicio", {
 
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
 
     mode: 'cors',
 
     cache: 'no-cache',
 
     credentials: 'same-origin',
 
     headers: {
 
       'Content-Type': 'application/json'
 
     },
 
     redirect: 'follow',
 
     referrerPolicy: 'no-referrer',
 
     body: JSON.stringify(data)
 
   });
 
   return response.json();
 
 }
 async function LerPlanilha() {
   const array = await ReadWorkSheet();
   array.forEach(async(element) => {
      let response =  await AddUser(element)
      console.log(response)
   });
   



 }
 LerPlanilha()
