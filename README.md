# Social media app by micoirvin

This is my biggest project yet, built on Vanilla JavaScript, HTML, and CSS. I want to exhibit how strong my foundations are in front-end web development through this project. There are many aspects and features of this project that challenged my problem-solving skills and creativity.

As the title goes, this project is a social media app with features like posting, messaging, search, and login. This is a front-end project, so the "database" is the browser's local storage only. Data are persistent upon closing the browser, but on that browser only.

This project was inspired by my [interactive comments section project](https://micoirvin.com/projects/interactive-comments-section/), repository [here](https://github.com/micoirvin/interactive-comments-section). I built that challenge from FrontendMentor, and from the beginning, I wanted to extend the comments section into posts and messages and a full social media app.

## Table of contents

- [Features](#features)
   - [Chat app](#chat-app)
   - [Posting, commenting, replying](#posting-commenting-replying)
   - [Login and signin](#login-and-signin)
   - [Search](#search)
   - [Time](#time)

- [Progress log](#progress-log)

- [Modules](#modules)
   - [dataOperations.js](#dataoperationsjs)
   - [getData.js](#getdatajs)
   - [initData.js](#initdatajs)
   - [elementsOperations.js](#elementsoperationsjs)
   - [svgAssets.js](#svgassetsjs)
   - [user.js](#userjs)
   - [time.js](#timejs)
   - [header.js](#headerjs)
   - [login.js](#loginjs)
   - [loginRedirect.js](#loginredirectjs)
   - [options.js](#optionsjs)
   - [search.js](#searchjs)
   - [posts.js](#postsjs)
   - [messages.js](#messagesjs)

- [Codes I'm proud of](#codes-im-proud-of)

- [Author](#author)


## Features

### Chat app

This app mimics the basic features of many existing messaging apps.

I first built the window of the chat app and its toggle buttons.

- Maximize - opens the chat app in messages.html as a full screen app.

- Minimize/restore - collapses the chat app to the bottom of the screen.

- Close - closes the chat app.

- Inbox toggle - collapses the side bar, keeping only the active conversation.

There are also buttons on the side bar.

- Contacts - opens the list of contacts.

- Settings - opens list of settings.

- New message - opens an interface to create a new message.

Clicking on a message preview on the inbox must also open the corresponding chat thread on the main panel.

I first hooked up the toggling functionalities of the buttons and the inbox previews. I first made sure that clicking them result in their intended actions on the window, before adding the contents inside the window.

Next, I added some default convos to the data, and then fetched them to the inbox and the main panel.

I built the interface of the chat thread. I can now create and send new messages. The next issue is how to initiate a new conversation to a person not on the inbox.

- Send message

I built the interface of the contacts, so that the user can click on the contact, and allow a new conversation to start.

Then, I thought of how can the user find non-contacts and chat them, so I built the search feature.

- Search chat - searches all previous chats in the inbox.

- Search contacts - searches all contacts.

- Search settings - not working yet.

- Search for a recipient - searches all saved users as possible recipient of new message.


I also added timestamps to the messages, which can be toggle by clicking the message or the info button.

- Timestamp.

Then I fixed many bugs all throughout to make sure that everything works fine.

### Posting, commenting, replying

This feature mimics the posting, comment, and replying features common in social media apps.

I first changed some UI elements from the interactive comments section project. I reduced margins, changed the layout of nesting, added some distinctions between posts, comments, and replies, changed some button layouts and other minor UI stuff.

I thought of a way to make the nested comments thread line an active element instead of simply being a border (my previous approach). This is inspired by hoverable Reddit thread lines.

As for the features, they were almost complete from way before, so minor changes were only added.

- Post, comment, reply.

- Votes.

- Update and delete post, comment, or reply.

- New: Timestamp (same with chat app).

There is still the problem of controlling the vote history, so I'll fix that next time.

### Login and signin

I believe that the ability to change user is essential to test if things work properly, so I prioritized this. Although the mechanism is simple, and there are no password verifications, this feature still offers nice capabilities, especially to test messaging for example.

The approach is simple as this is a simple string-matching for checking if a username exists and/or available as a new username.

I also added some simple RegEx to limit valid usernames.

### Search

This feature was made in the later part of the project. This is also essential to test other features especially the messaging feature.

There is a search bar at the header and two search bars in the chat app.

- Header search bar - checks all existing users based on the search query and gives the capability to add users to the contacts.

- Discover people - the default mode of the header search bar when clicked. It suggests possible (non-contact) users that the current user may want to add to his/her contacts.

- Chat searches
   - Search chat - searches only people who has previous history of conversation with the current user, in other words, searches the inbox.
   - Search contacts - searches all contacts of the user.
   - Search settings - not used yet.
   - Search for recipient - search all saved users as possible recipient of new message.

I first built Discover people mode, which is quite simple because it only iterates over all saved users and checks whether it is not a contact yet.

Then I built the Header search. It is a simple string-matching. The problem is how to show the results. 

I thought of a way, and I was able to simplify the displaying of results of all search modes (chat and header search), and somehow unify the sequence to prevent repetitive codes.

### Time

This is a minor feature, but I loved solving it. Basically, the main function of this feature is to get the relative date of a post or message. Relative date is what I describe as the smallest value of the greatest unit possible to describe the distance of a date+time to the current date+time. For example, today is August 27, 2022 16:10, and the post was posted on August 21, 2022 16:20, so the relative date is 5 days, since I consider the floor value and not rounding off.

This feature also solves the problem of how to constantly update the displayed date. The problem is also how to optimally do this, instead of constantly checking every second or every period. So I solved a wait time value, when the calculation will be called again, and the displayed relative date will be updated.


## Progress log

Week 1 (July 5 - 11): This week was slow with some decision-making and UI makeover. I reduced some margins, paddings, and changed the look of nesting.

Week 2 (July 12 - 18): There were still a lot of UI work. I also had to go through a CSS mess. I also built the toggling ability of the header element buttons. I had a side work during this week, so I was not able to code much.

Week 3 (July 19 - 25): I built the chat app UI, its working buttons working, and the userflow. I learned things like the hover media query, event delegation, and bubbling. I was able to avoid too much event handlers.

Week 4 (July 26 - August 1): I had to do some decision-making on the data structure. At first, messages and posts belong to a single object `posts`, but I decided to split them up. I also had some experiments and changes on nested post threads. I also learned some things about Promises. I took the time to reorganize my files by modularizing. Lastly, I also built a login page and implemented a simple login flow.

Week 5 (August 2 - August 8): Logging in and signing in were done. I also thought of a way to add svg codes through Javascript, but in the header element only. I integrated the `readPost` and `createPost` for messages, so messages can now be created and sent. I was also able to read convos and display them in the inbox. I also finished the auto-scrolling function for the chat box. Contacts were also available on the messages.

Week 6 (August 9 - August 15): I took some time fixing the more options button for posts. Deleting and editing posts were also okay. I also added discover people feature in the header search box. I also added some way to read and properly update the inbox when new messages come in. Search feature was almost complete.

Week 7 (August 16 - August 22): The chat app was pretty much complete, as the user can now search people (contacts or non-contacts), and message them. I unified the method to add all SVGs in the document. I also added method to get relative dates, and update their display. I also finalized some things and fixed some bugs.

Week 8 (August 23 - August 29): Some minor fixes for relative dates and chat app auto-scroll. Right now, I am currently reviewing my code and writing the documentation.


## Modules

### dataOperations.js

This module is a little but essential component that keeps things running. 

#### `data`

- Object where all information about users, posts, messages are retrieved from. 

- Properties:
   - `currentUser` determines the user currently logged in.
   - `globalCurrentId` is a simple incrementing counter that is used to set a unique id to each new post, message, or convo.
   - `changed` is needed to know if new post, message, or convo came in that needs to be read in the DOM.
   - `users` contains all users (to be explained later)
   - `posts` contains all posts, comments, and replies under the umbrella term post and the object `post` (to be explained later)
   - `messages` contains all messages and convos  under the umbrella term message and the object `message` (to be explained later)

- `users` is an object with each string key that is a username of a corresponding user.
   - Each user is an object with string keys `image`, `contacts`, `convosIds`, and `openConvo`.
   - `image` contains URLs of the user's photo.
   - `contacts` is an array containing the usernames of the contacts of the user.
   - `convosIds` is an array of ids of convos in the user inbox.
   - `openConvo` is a string of the id that corresponds to the convo shown by the chat app upon initialization.

- The data structuring of the `posts` can be thought of like a tree data structure. Each `post` object has a reference to their parent and children `post`s. Same goes for `messages`.

- `posts` is an object with each string key that is the id of a post, comment, or reply.
   - The root `post` is `x0`.
   - Each key corresponds to a DOM element with the same id.
   - Each `post` except for `x0` has the properties:
      - `parentId` is the id of their parent `post`.
      - `content` is the text content of the post (post/comment/reply).
      - `createdAt` contains a string or number that is a valid parameter to the `new Date()` constructor, that is the date of `post` creation.
      - `score` is the net sum of upvotes and downvotes to a post.
      - `user` is the username of the user that sent the post.
      - `childrenIds` is an array of ids of children `post`s of the `post`.
      
- `messages` is an object with each string key that is the id of a message or a convo.
   - The root `message` is `x1`.
   - Same properties from `post` apply to `message` except for those with id starting with `k`.
   - An id starting with `k` corresponds to a convo (the root of a chat thread).
   - Convos has properties:
      - `convoName` is a name that can be set to a chat thread, usually `null` for two-person convo.
      - `convoImage` is an image URL that can be set to a chat thread.
      - `parentId` similar to as previously described.
      - `users` is an array with usernames of users talking in the conversation.
      - `childrenIds` similar to as previously described.

#### `updateLocalStorage`

- Saves `data` into the local storage

#### `clearLocalStorage`

- Clears `data` from the local storage

The code is short and readable, so it is not further described here.

It gets data by importing `getData` from `getData.js`.

### getData.js

This module handles the asynchronous `fetch`ing of data from a json file in the case that the local storage has no data yet.

After the `fetch`, it saves the date into the browser's local storage, which serves as a "database" for this project (since this is a front-end project).

#### `getData`

- a promise object that is the default export used by `dataOperations.js`.

- uses `fetch` if the needed data does not exist in the browser's local storage yet.

So far, the module is simple. In the future, if data fetching becomes more complicated, this module will become more useful because it abstracts data fetching from other parts of the code.

The code is short and readable, so it is not further described here.

### initData.js

This module contains an object `initData` that serves as a very simple fallback, in case `fetch` will not work in `getData.js`.

#### `initData`

- Explained above.

This should be deleted in the future, as it will become an unnecessary usage of memory.

### elementsOperations.js

This module is an assortment of DOM- and element-related functions.

#### `getElementById` and `memoizedElements`

- Try to optimize DOM access by memoizing elements we want to access by id .

- `getElementById` saves a key-value pair of an id and corresponding element into the object `memoizedElements`.

- Parameter `clear = true` sets a memoized element to `null` as needed by `clearElement` function also in this module.

#### `clearElement`

- Removes every child of an element.

#### `toggle` and `zIndexStack`

- Toggles the `style.display` of an element.

- Uses `zIndexStack` as `style.zIndex` of the element to ensure that the every next element `toggle`d has higher z-index.

- Issues: 

   - `zIndexStack` does not guarantee that an element will place on top of others when its parent element has low z-index.
   - The developer needs to be familiar with the CSS style of the element, otherwise, `style.display` will be toggled to be `block`.

#### `autoScrollDown`

- As needed by the chat feature of the app, the chat box is automatically scrolled down, so that most recent messages are seen.

- Can be used by other elements as well.

- Parameters `firstTime` and `child` are necessary for the chat box.

- `firstTime = true` by default, as we assume that any element that will use this needs to auto-scroll down right away, no other conditions.

- `firstTime` is set to `false` when the chat box has been opened before and a new message comes in.

- `child` is the new message and should have already been appended to the `cntner` element.

- When `firstTime = false`, the algorithm checks if the container is scrolled all the way to the bottom before the `child`.

- This can also be described by: the user is not trying to scroll upward. If the user is not trying to scroll upward, then it's okay to automatically scroll down to show the `child`.

#### `actvFloatingBox`

- First, I describe an element as floating when it is on the foreground, and clicking on the background will cause it to disappear.

- For example, on Facebook web desktop version, when you click on notifications, it is "floating" because clicking outside will cause it to disappear.

- `actvFloatingBox` is an object used to save the current floating element that has the "floating" effect I described.

- I attached a click event listener to the document body that will pop the current floating element.


- Say, there is a button and a floating box, such that clicking the button will open the floating box. 

- But the button also triggers the click event listener of this module, which should instantly pop the floating box.

- Upon opening the floating box, `setElem` needs to be called to update the `actvFloatingBox.element` and (importantly) to set `actvFloatingBox.closable` to `false` which will prevent premature popping.

- The click event listener handles the rest.

### svgAssets.js

This module includes all svg codes used in this document. I could have gone for fontawesome or using `img` tag, but using `svg` tags are more flexible for the CSS manipulation.

Simply, I added empty `svg` elements to the document with CSS class with format `svg-{key}` where `{key}` is used to retrieve the desired svg code in the `svgAssets` object.

The retrieved svg code is set to the outerHTML of the `svg` element.


### user.js

This module handles user-related functions as needed by other modules.


#### `createUserLi`

- Eases the creation of lists of users as needed by some of other modules.

- User creation can be repetitive, so packing it to this function is helpful.


#### `addUser` 

- Adds a user to the contacts of the current user.

#### `addAddUserBtn`

- Appends a button to the element specified by parameter `li`.

-  Responds with `addUser` function as used primarily by the click event listener in `search.js`


### time.js

This module is used primarily for calculating and updating relative date and time of posts and messages. 

#### `getRelativeDate`

- Parameter `ms` is any legal parameter for the `new Date()` constructor.

- A reference date `refDate` is created using `ms`, then calculates how much time has passed since `refDate` until the current time.

- `message` and `waitTime` are important variables used by this function.

- `message` returns a string which best describes the distance of the current time to the `refDate`.

- `message` is in terms of 10 seconds, minutes, hours, days, weeks, months, years.

- `waitTime` is the delay in milliseconds needed to again call the `getRelativeDate` function (through a `setTimeout`) to update the `message`.

- `waitTime` is calculated such that the `message` is expected to change in the next call, hence we minimize the number of `setTimeout` calls.

- For the most part, `waitTime` and `message` have straightforward calculations, so no further explanations there.

- Parameter `elem` is an element that displays a date and needs constant updating, like post or message.

- The `elem` element needs to have `.time-rel-date`, `.time-full`, `.time-full-full`, and `.time-time` elements, so that it can be called in this function.

- `.time-rel-date` element primarily takes the `message` (relative date) as its text content.

- `.time-full` element takes the best date + time format possible depending on the distance of the date.

- `.time-full-full` element takes the longest possible date format.

-  `.time-time` takes the milliseconds since January 1, 1970.

- There is a limit for `setTimeout` delay, and passing that limit can cause erratic behavior, so I limited the `waitTime` to 1 week. 

- As the program further calls the function, it will converge to the total desired wait time.


### header.js

This module handles clicks on the header buttons. This is an important reason for the `actvFloatingBox` object from `elementsOperations.js`.

The code is readable, commented, and understandable enough.

#### `mediumMq`

- Just an arbitrary media query based on my CSS decisions which satisfies if I want to float a header target box or simply link to their own HTML.

#### `headerToggle` and `actvBtn`

- The main handler of clicks on header buttons.

- `actvBtn` was previously very much needed, but not doing much now. It is basically the last-clicked button corresponding to the current active floating object.

#### `setCurrentUserAvtr`

- Sets the avatar on the header.

#### Some notes

- A button must have an id that has a format of `headr-btn-{target}-{f|u|x}` where `{target}` is the element to be toggled, `f` means floating, `u` means unfloating, and `x` closes a box.

- `{f|u|x}` is useful for the `headerToggle` flow. See code.


### login.js

This module handles login verification. The login verification methods are very simple and not meant for security purposes.

#### Event listeners

- The first event listener is a click listener which listens to button clicks of login or signin, and also clicks from saved users.

- The second event listener is a keydown listener which listens to keydown of Enter key which means that the login or signin input field is submitted.

- Primarily followed by `loginFlow`.

#### `loginFlow`

- The code has useful comments.

- The flow is pretty much straightforward and there are no unusual variables or definitions.

- The sequence is `checkInput` -> `loginVerify` -> `login`.

- There is an error message triggered for wrong logins.

#### `checkInput`

- Checks if there is a value in the input field.

- Uses a `checkUsername` function to check if the value satisfies the username checker RegEx.

#### `checkUsername`

- Uses a RegEx that checks the conditions:

   - 3 - 20 characters
   - starts with a letter only
   - _ and digits are allowed

#### `loginVerify`

- Checks whether a user exists for login, or a user does not yet exist for signin.

- For signin, creates the user when the username is available.

#### `login`

- Changes the `data["currentUser"]`, and then links to the index page.

#### `shakeInputField`

- Simply triggers an animation of "shaking" motion through a CSS class.

- Primarily used for empty input fields.

#### `addSomeUsers`

- Simply populates some dummy users (for development purposes)


#### `fetchUsers`

- Fetches all users and adds it to the `#saved-users` element (for easy login and development purposes)

- Should not be used for serious login pages.

### loginRedirect.js

This module is just a simple test if there is an active user, so that we can redirect to the login page if necessary.


### options.js

This module handles the page or floating box that corresponds to the header burger menu button.

#### `listOptions`

- At the moment, this function only adds the current user on the options box.

#### `openOption`

- Response to the click inside the options box.

- At the moment, the only option is logout.

### search.js

This module handles searches on all input fields inside `.srch-form` elements on the document.

The floating element with id `search` needs this module. We call this header search box.

The chat app also needs this module in its `.srch-form`s. There are two `.srch-form`s in the chat app. The first one has three modes: Search chat, Search contacts, and Search settings. At the moment, only Search chat and Search contacts work.

The second `.srch-form` in the chat app is Search for recipient which is used when sending a new message.

#### Event listeners

- There are three event listeners.

- The first is a click event listener which responds to any button inside the header search box. There is only one response at the moment, which is `addUser` as described by `user.js`.

- The second event listener is a keyup event listener that detects the active element in the document and if it is a valid search input field.

- Every key press means a change in the search  query keyword and initiates a search to give a new search suggestion.

- The third event listener is a focus event listener which works almost the same way as the keyup event listener.

- If the focused input field is inside the header search box, it initiates `discoverPeople()`, which serves as a default content to the header search box results. More explanation later.

#### `discoverPeople`

- Suggests possible users that the current user want to add in their contacts.

- Uses `discoverPeopleAlgo` to determine the users to suggest.

#### `discoverPeopleAlgo`

- At the moment, the implementation is simple, and only finds users that are not yet contacts of the current user.

- In the future, I will add an algorithm that will narrow down the suggestions based on certain factors like mutual contacts and search history.

#### `search`

- Handles the flow and display of search results.

- There are three main cases that determine the flow because there are three `.srch-forms` - one in header search box and two in the chat app.

- Each `.srch-form` must contain a `.srch-rslts` element where the results are displayed.

- There should also be a default element box that is displayed in the `.srch-form` in the case that the query keyword is empty.

- Important variables:
   - `results` is an object that has key-value pairs of results that come from the `searchAlgo` function.
   - `kw` is simply the value in the search input field.
   - `listKey` takes valid values: `users` | `convos` | `contacts`. This determines whether to search in all users, in current user convos, or in current user contacts.
   - `location` takes valid values: `messages` | `search`. This can be used for further decision-making in the processing of the `results`. At the moment, a value `messages` determines the id of the element created from processed result.
   - `resultsBox` is simply the proper corresponding `.srch-rslts`.
   - `defaultElem` is the default element box described above.

#### `searchAlgo`

- The vital algorithm that does the search.

- Takes parameters `kw` and `listKey` from the `search` function.

- First, uses the `listKey` with valid values: `users` | `convos` | `contacts` to determine the object (variable `list`) to search into.

- Other `listKey`s are straighforward, but `convos` is not as much.

- For `listKey = "convos"`, we import the `getConvoDetails` function from `messages.js` to get important details. This is due to the fact that `convos` give ids of convos which can't be directly matched to the `kw`.

- Then we iterate over the `list`, and use a straightforward algorithm of testing if the `kw` is a substring of each `list` key.

- Returns `results` which is an object that contains all matching keys.

- For `listKey = "convos"`, we return `results` with key-value pairs acquired from `getConvoDetails`. This will be used for the processing of display in `search` function.

### posts.js

This module is the main module that makes posting and messaging work. Majority of its content is derived from the script I used in the interactive comments section project before this project.

#### `createPost`

- Gets the value from the textarea of `.post.form` element.

- Saves the necessary values to a `post` or `message` object into the `data`.

- Finally calls `readPost` to read the `post` or `message` and append to the DOM.

#### `createPostForm`

- Creates a `.post.form.create` element that acts as a form.

- The form is where the user will type a new child `post` or `message` that can be sent to the `data`.

#### `readPost`

- Reads a `post` or a `message` and appends to the DOM.

- Contains some HTML structure where the developer needs to be aware of the corresponding CSS before editing.

- A `post` or a `message` is appended to the `postSection`.
   - `postSection` is the box where the `post` or `message` and its siblings are all inside.
   - For example, the `post` is a comment, then its `postSection` is `.comments` element (or comments section).

- `childrenSection` is the box where all children of the `post` or `message` will be appended to in the future.
   - `postSection` is the `childrenSection` of the `parentPost`.

- Uses the `getRelativeDate` function from `time.js` module.

- Uses the `autoScrollDown` function from `elementsOperations.js` module to auto-scroll a convo.


#### `readChildren`

- Contains a simple iteration where all children of a `post` or a `message` is read via `readPost`.

- Also creates a form via `createPostForm` (if the form does not exist yet).

- The return value is used by `toggleChildren` function.

#### `toggleChildren`

- Shows/hides the `childrenSection` and the form created via `createPostForm`.

- If the return value of `readChildren` is `false`, it means that the form already exists before `readChildren` call. We simply decide to show/hide the form and `childrenSection`.

- In the case that the return value of `readChildren` is `"fresh"`, the form is newly created and the children are also newly read, so the they are both not hidden by default. No further decision-making.


#### `updatePost`

- Updates the content of the `post` or `message` in the DOM and in the `data`.

#### `closeEditForm` 

- Cancels the editing of a `post` or `message`.

#### `createEditForm`

- Creates a form to edit a `post` or `message`.

#### `toggleDelModal`

- Simply toggles the modal for the deletion of `post` or `message`.

#### `deletePost`

- Deletes a `post` or `message` and its corresponding DOM element.

- Uses `deleteFamily` function to delete all children of the `post` or `message`.

- Also removes its own id from the `childrenIds` property of its parent.

#### `deleteFamily`

- Uses a recursive algorithm to delete all nested children `posts` or `messages` from the `data`.

#### `addScore`

- Responds to the add score buttons in the posts.

- Need to add something in the future to control vote history.


### messages.js

This module handles the functionalities needed for the chat app.

#### `msgsToggle`

- Handles buttons related to the window of the chat app on desktop.

- The code is well-commented and easily understood.

#### `msgsSideToggle`

- Handles buttons that toggle the contents of `.msgs-side` element.

- The code is well-commented and easily understood.

#### `msgsMainToggle`

- Handles buttons that toggle the contents of `.msgs-main` element.

- There are two possibilities for the `.msgs-main` element, either it's a specific chat thread or the box for new convo.

- The code is well-commented and easily understood.

#### `createMsg`

- Simply calls `createPost` from `posts.js` to create a message.

- Originally made with an extra feature, but later removed.

#### `createNewConvo`

- Takes in a parameter `user` to initialize a convo between the current user and the specified `user`, and pushes it to the `data`.

#### `getConvoDetails`

- Takes in a convo id, and returns details regarding that convo.

- This function sets an effective `convoName` and `convoImage` that can be used for the display of the convo in the inbox. 

- It does not change the properties of the convo object.


- Usual convos (`message` object with id starting at `k`) have `convoName` and `convoImage` properties set to `null`.

- In this case, usually for two-person convos, the effective `convoName` in the current user's perspective is the username of the person on the other side.

- The same goes for `convoImage`.

- The inbox preview (`convoPreview`) of the convo is also returned by checking the content of the last message appended to the convo.

- The date of the last message is also returned as `convoPreviewDate` to be used by `getRelativeDate`.

#### `readContact`

- Reads a contact by opening their convo.

- Iterates over all convos of the current user, and finds the convo where the users are the current user and the contact.

- If the convo does not exist yet, calls `createNewConvo`.

#### `readContacts`

- Populates the contact list on the sidebar.

- Uses the `createUserLi` to easily create a list item element of the corresponding user.

#### `readInbox`

- Populates the inbox on the sidebar, and initiates the reading of the messages.

- First uses the `getConvoDetails` to get the necessary details described in the `getConvoDetails` section.

- Then creates the list item and appends to a document fragment.

- Then uses the `readPost` and `readChildren` from the `posts.js` module to read the convo, read the messages inside it, and append to the DOM.

- For newly created convos with no messages yet, a `cancelConvoBtn` is available to delete the convo from the DOM and the `data`.

- After all convos are read, and their inbox list items are created, the document fragment is appended to the inbox element.

- Finally, the last opened convo or `openConvo` is displayed in the `.msgs-main` box.

- If the screen is small, and in the full page mode, the `openConvo` is not opened, and only the inbox is seen.


## Codes I'm proud of

- `getRelativeDate` function from `time.js` constantly updates the displayed relative date while minimizing `setTimeout` calls. It does so by computing how much time to wait before calling the same function again to update the displayed time. A simple approach would be to use `setInterval` to periodically check changes in relative date, but this is inefficient especially when posts and messages get too many to keep up with.

- `deletePost` and `deleteFamily` functions from `posts.js` recursively delete posts and their children comments/replies from the `data`.

- Keyup event listener from `search.js` listens to every keyup to progressively give a search query suggestion while adding a letter.

- CSS selector `.field-is-empty` and animation `fieldIsEmpty` is my first time to try making an animation, so I kind of liked it. It simply shakes the input field of the login page when value is invalid.

- CSS selector `.post.cmmnt .avtr` has a position set to absolute and has margins that work well with the margins of `.comments .thread`. These two actually make the reply nesting look nice.


## Author

- Website - [micoirvin](https://www.micoirvin.com)
- Github - [micoirvin](https://github.com/micoirvin)
- FrontendMentor - [@micoirvin](https://www.frontendmentor.io/profile/micoirvin)
- Twitter - [@micoirvin](https://www.twitter.com/micoirvin)