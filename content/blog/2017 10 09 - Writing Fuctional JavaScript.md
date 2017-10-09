---
title: How to start writing functional JavaScript
concept: true
---

Say you have this piece of code

```javascript

let blogPosts = [
  { id: 1, title: 'Foo', content: '....' },
  { id: 2, title: 'Bar', content: '....' },
  { id: 3, title: 'Baz', content: '....' }
]

let currentPost;

blogPosts.forEach(function(post) {
  if (post.id === 2) {
    currentPost = post;
  }
});

```

In this example, it's still pretty clear what happens. All the blogposts are looped, and when the current post is found, it is stored in a variable outside the loop. 

But, what happens when more code will be added to that loop, or between the loop and the variable declaration? Chances are high 