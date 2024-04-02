# Testing

## Table of Contents
- [Testing](#testing)
  * [Table of Contents](#table-of-contents)
  * [Validator Testing](#validator-testing)
    + [HTML](#html)
    + [CSS](#css)
    + [Lighthouse Report](#lighthouse-report)
  * [Manual Testing](#manual-testing)
    + [Navigation](#navigation)
    + [Home Page](#home-page)
    + [Search bar](#search-bar)
    + [Most upvoted profiles Component](#most-upvoted-profiles-component)
    + [Category Component](#category-component)
    + [Search bar](#search-bar-1)
    + [Add Post](#add-post)
    + [Edit Post](#edit-post)
    + [Profile Page](#profile-page)
    + [Edit Profile Page](#edit-profile-page)
    + [Authentication](#authentication)
  * [Unfixed bugs](#unfixed-bugs)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


## Validator Testing

### HTML

Web site was run through [W3C HTML Validator](https://validator.w3.org/). The result can be seen below.

![HTML Validation](/docs/testing_images/html.png)

### CSS
[W3C CSS Validator](https://jigsaw.w3.org/css-validator/) found no error in the CSS files. The result can be seen below.

![CSS Validation](/docs/testing_images/css.png)

### Lighthouse Report
The deployed project was run through Lighthouse on Google Chrome.

- Home Desktop

![Light house](/docs/testing_images/home_desktop.png)

- Home Mobile

![Light house](/docs/testing_images/home_mobile.png)

- Add Post Desktop

![Light house](/docs/testing_images/post_create_desktop.png)

- Add Post Mobile

![Light house](/docs/testing_images/post_create_mobile.png)

- Edit Post Desktop

![Light house](/docs/testing_images/post_edit_desktop.png)

- Edit Post Mobile

![Light house](/docs/testing_images/post_edit_desktop.png)

- Trending Desktop

![Light house](/docs/testing_images/trending_desktop.png)

- Trending Mobile

![Light house](/docs/testing_images/trending_mobile.png)

- Voted Desktop

![Light house](/docs/testing_images/voted_desktop.png)

- Voted Mobile

![Light house](/docs/testing_images/voted_mobile.png)

- Profile Desktop

![Light house](/docs/testing_images/profile_desktop.png)

- Profile Mobile

![Light house](/docs/testing_images/profile_mobile.png)

## Manual Testing

### Navigation

| Test  | Test                                                                                                                                            | Result |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1      | The icons and text on the navbar should be clickable and must redirect the user to other pages | PASS   |
| 2      | The navbar should stick on top and remain there even if the user scrolls down the page | PASS   |
| 3      | The navbar should be responsive on different screen sizes | PASS   |

### Home Page

| Test  | Test                                                                                                    | Result |
| ------ | ------------------------------------------------------------------------------------------------------- | ------ |
| 1      | All the public posts should appear here only | PASS   |
| 2      | If a person is a friend with a logged-in user and has a private post, private posts should also be visible | PASS   |
| 3      | All posts can be voted directly from here  | PASS   |
| 4      | New data must appear continuously before the user reaches the end of the page  | PASS   |
| 5      | All post-related data should be visible | PASS   |
| 6      | Page should be responsive  | PASS   |

### Search bar

| Test  | Test                                                                                                    | Result |
| ------ | ------------------------------------------------------------------------------------------------------- | ------ |
| 1      | Search bar must be visible on home, trending, voted, and category page | PASS   |
| 2      | All the posts should be visible based on title, content, price, location, and category | PASS   |
| 3      | Searching should take a few seconds before showing data so that the user can finish typing  | PASS   |

### Most upvoted profiles Component

| Test  | Test                                                                                                    | Result |
| ------ | ------------------------------------------------------------------------------------------------------- | ------ |
| 1      | This component should be available on home, trending, category, and voted pages  | PASS   |
| 2      | All the popular profiles username should be available here and clickable | PASS   |
| 3      | Adding/removing these profiles should also be visible  | PASS   |

### Category Component

| Test  | Test                                                                                                    | Result |
| ------ | ------------------------------------------------------------------------------------------------------- | ------ |
| 1      | There should be a list of all available categories on the home page on large screens | PASS   |
| 2      | All the categories should be clickable | PASS   |
| 3      | Once a category is clicked user should be able to switch to that category-related post | PASS   |
| 4      | This component should be available on home, trending, category, and voted pages  | PASS   |

### Search bar

| Test  | Test                                                                                                    | Result |
| ------ | ------------------------------------------------------------------------------------------------------- | ------ |
| 1      | Search bar must be visible on home, trending, voted, and category page | PASS   |
| 2      | All the posts should be visible based on title, content, price, location, and category | PASS   |
| 3      | Searching should take a few seconds before showing data so that the user can finish typing  | PASS   |

### Add Post

| Test  | Test                                                                                                    | Result |
| ------ | ------------------------------------------------------------------------------------------------------- | ------ |
| 1      | All the fields should be clickable | PASS   |
| 2      | User can set posts as private or public | PASS   |
| 3      | If the category is not set it should be "Others" by default  | PASS   |
| 4      | Modal should appear and close and should be responsive  | PASS   |
| 5      | The page should be responsive  | PASS   |

### Edit Post

| Test  | Test                                                                                                              | Result |
| ------ | ----------------------------------------------------------------------------------------------------------------- | ------ |
| 1      | All the fields should be clickable | PASS   |
| 2      | User can set posts as private or public | PASS   |
| 3      | All the fields should be prepopulated with the current post data  | PASS   |
| 4      | Modal should work the same as add post  | PASS   |
| 5      | The page should be responsive  | PASS   |

### Profile Page

| Test  | Test                                                                                                              | Result |
| ------ | ----------------------------------------------------------------------------------------------------------------- | ------ |
| 1      | Logged-in user data should be visible,i.e Avtar image, bio, total posts, total vote, total votes, and username | PASS   |
| 2      | All the user's posts should also be visible just like mentioned on the home page | PASS   |
| 3      | If the profile belongs to some other user, the logged-in user can add/remove that user as a friend  | PASS   |
| 4      | The page should be responsive  | PASS   |

### Edit Profile Page

| Test  | Test                                                                                                              | Result |
| ------ | ----------------------------------------------------------------------------------------------------------------- | ------ |
| 1      | Logged-in user can edit username, password, bio, and image | PASS   |
| 2      | Password and username should be validated before submitting | PASS   |
| 3      | Image size must not exceed 2MB  | PASS   |
| 4      | All these three pages should be responsive  | PASS   |

### Authentication

| Test | Test                                                                                                               | Result |
| ------ | ------------------------------------------------------------------------------------------------------------------ | ------ |
| 1      | User should sign up before accessing all the features of the website   | PASS   |
| 2      | Signed-up data should be validated before submitting | PASS   |
| 3      | Once signed up user must sign in  | PASS   |
| 4      | Signed-in data should be validated before submitting | PASS   |
| 5      | The Signed user must only be the one who can see all the features of the website | PASS   |
| 6      | Sign-in and up pages should be responsive | PASS   |

## Unfixed bugs
- No known unfixed bugs.

Return to the [FRONTEND README](/README.md) file.

Return to the [BACKEND README](/docs/md_files/BACKEND.md) file.

[Back to top](#top)