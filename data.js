// Not ideal. Only for file-based access.
let initData = 
{
  "currentUser": "juliusomo",

  "users": {
    "amyrobson": {
      "image": { 
        "png": "./images/avatars/image-amyrobson.png",
        "webp": "./images/avatars/image-amyrobson.webp"
      }
    },
    "maxblagun": {
      "image": { 
        "png": "./images/avatars/image-maxblagun.png",
        "webp": "./images/avatars/image-maxblagun.webp"
      }
    },
    "ramsesmiron": {
      "image": { 
        "png": "./images/avatars/image-ramsesmiron.png",
        "webp": "./images/avatars/image-ramsesmiron.webp"
      }
    },
    "juliusomo": {
      "image": { 
        "png": "./images/avatars/image-juliusomo.png",
        "webp": "./images/avatars/image-juliusomo.webp"
      }
    }
  },
  
  "posts": {
    "c1": {
      "parentId": "p0",
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "1 month ago",
      "score": 12,
      "user": "amyrobson",
      "childrenIds": []
    },
    "r3": {
      "parentId": "c2",
      "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      "createdAt": "1 week ago",
      "score": 4,
      "user":  "ramsesmiron",
      "childrenIds": []
    },
    "c2": {
      "parentId": "p0",
      "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      "createdAt": "2 weeks ago",
      "score": 5,
      "user": "maxblagun",
      "childrenIds": ["r3", "r4"]
    },
    "r4": {
      "parentId": "c2", 
      "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
      "createdAt": "2 days ago",
      "score": 2,
      "user": "juliusomo",
      "childrenIds": []
    }
  },

  "globalCurrentId": 4
}