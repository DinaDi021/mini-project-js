// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html.
// Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання ,
// при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули

(async function() {
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        let users = await response.json();
        let div = document.getElementById('allUsers');

        for (const user of users) {
            let userDiv = document.createElement('div');
            userDiv.classList.add('userDiv');
            div.appendChild(userDiv);

            let userDivName = document.createElement('div');
            userDivName.classList.add('userDivName');
            userDivName.innerText = `id - ${user.id}, name - ${user.name}`;
            userDiv.appendChild(userDivName);

            let btnInfo = document.createElement('button');
            btnInfo.innerText = 'user details';
            userDiv.appendChild(btnInfo);

            btnInfo.onclick = () => {
                location.href = `./user-details/user-details.html?userId=${user.id}`;
            };
        }
    } catch (error) {
        console.error(error);
    }
})();