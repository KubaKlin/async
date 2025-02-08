// 1
function divideIfNotZero(firstNumber, secondNumber) {
  if (secondNumber === 0) {
    throw new Error('second number should not be zero');
  }
  return firstNumber / secondNumber;
}

try {
  console.log(divideIfNotZero(2, 0));
} catch (error) {
  console.log(error.message);
}

// 2
function parseDateIfValid(dateString) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  return date;
}

try {
  console.log(parseDateIfValid('today'));
} catch (error) {
  console.error(error.message);
}

// 3
function evaluateScript(scriptString) {
  try {
    return eval(scriptString);
  } catch {
    return null;
  }
}

console.log(evaluateScript('1 + 5'));

// 4
function getUserName(usersID) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${usersID}`)
    .then((response) => {
      if (!response.ok) {
        return null;
      }
      return response.json();
    })
    .then((user) => {
      if (user) {
        return user.name;
      }
      return null;
    })
    .catch(() => null);
}
getUserName(2).then((name) => console.log(name));

async function getUserNameAsync(usersID) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${usersID}`,
    );
    if (!response.ok) {
      return null;
    }
    const user = await response.json();
    return user.name || null;
  } catch {
    return null;
  }
}
getUserNameAsync(1).then((name) => console.log(name));

// 5
function getAllPostsFromUser(userId) {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((posts) => {
        const userPosts = posts.filter((post) => post.userId === userId);
        if (userPosts.length > 0) {
          resolve(userPosts);
        } else {
          reject(new Error(`No posts found for user with ID ${userId}`));
        }
      })
      .catch((error) => reject(error));
  });
}

getAllPostsFromUser(5)
  .then((posts) => console.log(posts))
  .catch((error) => console.error(error));

async function getAllPostsFromUserAsync(userId) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    const userPosts = posts.filter((post) => post.userId === userId);
    if (userPosts.length > 0) {
      return userPosts;
    } else {
      throw new Error(`No posts found for user with ID ${userId}`);
    }
  } catch (error) {
    throw error;
  }
}

getAllPostsFromUserAsync(1)
  .then((posts) => console.log(posts))
  .catch((error) => console.error(error));

// 6
function getAlbumsWithPhotos() {
  return Promise.all([
    fetch('https://jsonplaceholder.typicode.com/albums').then((response) =>
      response.json(),
    ),
    fetch('https://jsonplaceholder.typicode.com/photos').then((response) =>
      response.json(),
    ),
  ]).then(([albums, photos]) => {
    const photosByAlbum = photos.reduce((albumPhotos, photo) => {
      if (!albumPhotos[photo.albumId]) {
        albumPhotos[photo.albumId] = [];
      }
      albumPhotos[photo.albumId].push(photo);
      return albumPhotos;
    }, {});

    return albums.map((album) => {
      album.photos = photosByAlbum[album.id] || [];
      return album;
    });
  });
}

getAlbumsWithPhotos().then((albumsWithPhotos) => {
  console.log(albumsWithPhotos);
});

async function getAlbumsWithPhotosAsync() {
  const [albumsResponse, photosResponse] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/albums'),
    fetch('https://jsonplaceholder.typicode.com/photos'),
  ]);

  const albums = await albumsResponse.json();
  const photos = await photosResponse.json();

  const photosByAlbum = photos.reduce((albumPhotos, photo) => {
    if (!albumPhotos[photo.albumId]) {
      albumPhotos[photo.albumId] = [];
    }
    albumPhotos[photo.albumId].push(photo);
    return albumPhotos;
  }, {});

  return albums.map((album) => {
    album.photos = photosByAlbum[album.id] || [];
    return album;
  });
}

getAlbumsWithPhotosAsync().then((albumsWithPhotos) => {
  console.log(albumsWithPhotos);
});

// 7
function getUsersWithPostsAndComments() {
  return Promise.all([
    fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
      response.json(),
    ),
    fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
      response.json(),
    ),
    fetch('https://jsonplaceholder.typicode.com/comments').then((response) =>
      response.json(),
    ),
  ]).then(([users, posts, comments]) => {
    const commentsByPostId = comments.reduce((map, comment) => {
      if (!map[comment.postId]) {
        map[comment.postId] = [];
      }
      map[comment.postId].push(comment);
      return map;
    }, {});

    const postsByUserId = posts.reduce((map, post) => {
      if (!map[post.userId]) {
        map[post.userId] = [];
      }
      post.comments = commentsByPostId[post.id] || [];
      map[post.userId].push(post);
      return map;
    }, {});

    return users.map((user) => {
      user.posts = postsByUserId[user.id] || [];
      return user;
    });
  });
}

getUsersWithPostsAndComments().then((data) => console.log(data));

async function getUsersWithPostsAndCommentsAsync() {
  const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/users'),
    fetch('https://jsonplaceholder.typicode.com/posts'),
    fetch('https://jsonplaceholder.typicode.com/comments'),
  ]);

  const [users, posts, comments] = await Promise.all([
    usersResponse.json(),
    postsResponse.json(),
    commentsResponse.json(),
  ]);

  const commentsByPostId = comments.reduce((commentsByPost, comment) => {
    if (!commentsByPost[comment.postId]) {
      commentsByPost[comment.postId] = [];
    }
    commentsByPost[comment.postId].push(comment);
    return commentsByPost;
  }, {});

  const postsByUserId = posts.reduce((postsByUser, post) => {
    if (!postsByUser[post.userId]) {
      postsByUser[post.userId] = [];
    }
    post.comments = commentsByPostId[post.id] || [];
    postsByUser[post.userId].push(post);
    return postsByUser;
  }, {});

  return users.map((user) => {
    user.posts = postsByUserId[user.id] || [];
    return user;
  });
}

getUsersWithPostsAndCommentsAsync().then((data) => console.log(data));
