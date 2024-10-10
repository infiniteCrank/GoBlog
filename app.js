const apiUrl = 'http://localhost:8080/api/posts';
const blogPostsContainer = document.getElementById('blog-posts');

async function fetchPosts() {
    const response = await fetch(apiUrl);
    const posts = await response.json();
    renderPosts(posts);
}

function renderPosts(posts) {
    blogPostsContainer.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        blogPostsContainer.appendChild(postDiv);
    });
}

document.getElementById('post-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const isPrivate = document.getElementById('isPrivate').checked;

    const token = localStorage.getItem('token'); // Assumes you store the JWT in local storage

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, isPrivate })
    });

    if (response.ok) {
        await fetchPosts(); // Refetch posts after adding
    } else {
        alert('Error creating post. Make sure you are authenticated.');
    }
});

// Initial fetch
fetchPosts();
