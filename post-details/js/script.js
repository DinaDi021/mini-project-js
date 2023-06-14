// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

let url = new URL(location.href);
let postId = url.searchParams.get('postId');

(async function() {
    try {
        let postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        let post = await postResponse.json();

        let divPost = document.getElementsByClassName('postInfo')[0];
        let ul = document.createElement('ul');
        recursiveBuild(post, ul);
        divPost.appendChild(ul);

        let commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        let comments = await commentsResponse.json();

        let commentsDiv = document.getElementById('comments');
        let ulComments = document.createElement('ul');
        recursiveBuild(comments, ulComments);
        commentsDiv.appendChild(ulComments);
    } catch (error) {
        console.error(error);
    }
})();

let btnStartPage = document.getElementsByClassName('start')[0];
btnStartPage.onclick = () => {
    location.href = `../index.html`;
}