// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
//     котра має детальну інфу про поточний пост.

let url = new URL(location.href);
let userId = url.searchParams.get('userId');

(async function() {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        let user = await response.json();

        let divInfo = document.getElementsByClassName('info')[0];
        let ul = document.createElement('ul');
        recursiveBuild(user, ul);
        divInfo.appendChild(ul);

        let divBtn = document.getElementsByClassName('btnPosts')[0];
        let btnPosts = document.createElement('button');
        btnPosts.innerText = 'post of current user';
        divBtn.appendChild(btnPosts);

        btnPosts.onclick = async () => {
            try {
                let postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
                let posts = await postsResponse.json();

                let postDiv = document.getElementById('postTitle');
                let postUl = document.createElement('ol');
                postDiv.appendChild(postUl);

                if (postDiv.childElementCount > 0) {
                    postDiv.replaceChildren();
                }

                posts.forEach(post => {
                    let postLi = document.createElement('li');
                    let postLink = document.createElement('a');
                    postLink.href = `../post-details/post-details.html?postId=${post.id}`;
                    postLink.innerText = post.title;
                    postLi.appendChild(postLink);
                    postUl.appendChild(postLi);
                });

                postDiv.appendChild(postUl);
            } catch (error) {
                console.error(error);
            }
        };
    } catch (error) {
        console.error(error);
    }
})();