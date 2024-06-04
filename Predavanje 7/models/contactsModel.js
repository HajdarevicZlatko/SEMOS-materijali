const fs = require('fs').promises;
const filepath = './contacts.json';

function getAllContacts(){
    return fs.readFile(filepath, 'utf-8')
            .then(data => JSON.parse(data))
            .catch(err => {
                if(err.code === 'ENOENT') return [];
                throw err;
            });

}

function saveContacts(contacts){
    return fs.writeFile(filepath, JSON.stringify(contacts, null,2), 'utf-8')
    .catch(err => {throw err})

}

module.exports = {
    getAllContacts,
    saveContacts
}

/* 
Model_EXT
{
    id : string
    name: string
    phone: string
    da_li_je_platio_racun
    DLTZK : bool

}
Model_DTO
{

    id
    name
    phone
}

Baza
{
    id
    name
    phone
    da_li_je_platio_racun
    da_li_pokrenuti_tuzbu : bool
}

*/