const URL = "https://jsonplaceholder.typicode.com/users";

// fetch(URL)
// .then(info => info.json())
// .then((info) => console.log(info))
// .catch((e) => console.error('users error: ' + e));

async function req(url){
    const data = await fetch(url);
    if (!data.ok) throw new Error("Not 2xx response, status is " + data.status, {cause: data});
    return await data.json();
}

req(URL)
.then(data => createTable(data))
.catch((e) => alert(e));

const createTable = (data) => {
    const table = `    
        <table>
            <caption>List of users</caption>
            ${getHeader(data[0])}
            ${getBody(data)}
        </table>
        `
    document.querySelector('body').insertAdjacentHTML('beforeend',table);
}

const getHeader = (obj) => { 
    let ths = '<thead><tr>';
    Object.keys(obj).forEach(el => ths += `<th>${el}</th>`);
    return ths + '</tr></thead>';
}

const getBody = (data) => {
    let tbody ='<tbody>'
    data.forEach(user => {
        tbody += '<tr>';
        Object.values(user).forEach(field => tbody+=`<td>${typeof field == 'object' ? printObj(field) : field}</td>`);
        tbody += '</tr>';
    })
    return tbody+'</tbody>';
}

const printObj = ({name, suite, street, city}) => {
    return name ? name : street + ' ' + suite + ', ' + city;
}
