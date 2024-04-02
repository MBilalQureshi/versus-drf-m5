# Versus API

The backend of Versus is powered by the Django REST framework. This API serves as the bridge between the frontend and backend for User authentication, authorization, management of user profiles, adding and listing of posts, and processing search queries. This API ensures seamless communication between the database and the front end to facilitate an excellent user experience.

The live site can be found here - [Versus](https://versus-bac55e8730b2.herokuapp.com/)

## Table of Contents
- [Versus API](#versus-api)
  * [Table of Contents](#table-of-contents)
  * [Other .md file links](#other-md-file-links)
    + [Frontend](#frontend)
    + [Frontend Testing](#frontend-testing)
  * [User Stories](#user-stories)
    + [Authentication](#authentication)
    + [Admin](#admin)
    + [Profile](#profile)
    + [Product(Post)](#product-post-)
    + [Vote](#vote)
    + [Comment](#comment)
    + [Navigation](#navigation)
  * [Data Model](#data-model)
  * [Security Features and Defensive Design](#security-features-and-defensive-design)
    + [Database Security](#database-security)
    + [User Authentication](#user-authentication)
  * [Future Feature](#future-feature)
  * [Testing](#testing)
    + [CI Python Linter](#ci-python-linter)
    + [Manual Testing](#manual-testing)
    + [Testing Endpoints](#testing-endpoints)
    + [Bugs](#bugs)
    + [Unfixed bugs](#unfixed-bugs)
  * [Libraries and Technologies Used](#libraries-and-technologies-used)
    + [Language](#language)
    + [Frameworks - Libraries - Programs Used - Packages Used](#frameworks---libraries---programs-used---packages-used)
  * [Credits](#credits)
    + [Code](#code)
    + [Online Documentation](#online-documentation)
    + [Acknowledgments](#acknowledgments)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Other .md file links

### Frontend

Navigate to the [FRONTEND README](/README.md) file.

### Frontend Testing

Navigate to the [FRONTEND TESTING README](/docs/md_files/FRONTEND_TESTING.md) file.

## User Stories
- The main objective for the creation of API was seamless communication of the backend with ReactJs frontend application, Hence user stories are exclusively designed for the frontend aspect of the project.

### Authentication
1. As a **user** I can **create an account** so that **I can access all the website features**.
2. As a **user** I can **login** so that **I can use all the features for already existing users**.
3. As a **user** I can **see on the drf application if I am logged in or out** so that **I know my status on the application**.
4. As a **user** I can **log out of the application** so that **I can exit my account when I don't need it**.

### Admin
1. As an **admin** I can **make changes in database directly** so that **I can secure the integrity of website**.
2. As an **admin** I can **suspend and delete accounts or posts** so that **I can keep the community safe and secure**.
3. As an **admin** I can **create other admins as well** so that **others can perform admin tasks if I am unavailable**.

### Profile
1. As a **user** I can **log in and navigate to view my profile** so that **I can make changes to it**.
2. As a **user** I can **view others profiles** so that **I can know more about them**.
3. As a **user** I can **see list of profiles** so that **I can see list of all profiles**.

### Product(Post)
1. As a **user** I can **create new posts** so that **I can post about products directly from backend**.
2. As a **user** I can **delete posts** so that **I can remove content that seems unimportant**.
3. As a **user** I can **update posts** so that **I can update content with new one**.
4. As a **user** I can **see a list of all the posts** so that **I can know more what others are posting**.

### Vote
1. As a **user** I can **vote on product posts** so that **I can either upvote or downvote on a post as per my preference**.
2. As a **user** I can **update my vote on product posts** so that **I can change my vote**.
3. As a **user** I can **see a list of all votes** so that **I can see which post has more or less votes instantly**.
4. As a **user** I can **delete my vote** so that **I can remove a vote from a specific post**.

### Comment
1. As a **user** I can **comment on product posts** so that **I can talk about that post**.
2. As a **user** I can **update my commment on product posts** so that **I can change my comment**.
3. As a **user** I can **see a list of all comments** so that **I can see what others are talking about on a post**.
4. As a **user** I can **delete my comment** so that **I can avoid participating in a discussion**.

### Navigation
1. As a **user** I can **switch to other parts of DRF API by providing a valid URL** so that **I can switch to other pages**.
2. As a **user** I can **navigate to paginated data as well** so that **I can view remaiing posts or data**.

Click [here](https://github.com/users/MBilalQureshi/projects/7) to see backend Kanban Board.

Click [here](https://github.com/users/MBilalQureshi/projects/8) to see frontend Kanban Board.

## Data Model
- The profile has a one-to-one relation with the User model and because of the signal a user object is created when a profile is created.
- The User model has a one-to-many relationship with the Friend model as one user can have many friends.
- The User model has a one-to-many relationship with the vote model as a user can have many votes on multiple posts.
- The User model has a one-to-many relationship with comments as a user can have multiple comments.
- The User model has a one-to-many relationship with the product as a user can have multiple products related posts.
- The Product has many-to-one relations as one product post can have many comments.
- The Product model has a one-to-many relationship with the vote as one product post can have many votes.


The database schema is available below.
<details>

<summary>Versus Database Schema</summary>

![Database Schema](/docs/readme_images/database_schema.webp)

</details>

The database schema is designed using [Drawio](https://app.diagrams.net/).

## Security Features and Defensive Design

### Database Security
The database URL and secret key are stored in the env file. This prevents unwanted connections to the database.

### User Authentication
- dj-rest-auth is used for Authentication purposes.
- The jwt refresh token is used for verifying if a user is still authenticated after a specified time, check if the refresh token is still valid.

## Future Feature
- The accepting or rejecting friend request feature was not integrated due to time constraints, this will be added in a later release.

## Testing
### CI Python Linter
No errors were found when running Python files through [Pep8](https://pep8ci.herokuapp.com/#).

### Manual Testing
<strong>Note: </strong>All the manual testing was performed before applying changes as mentioned in "[Ready unified projects before deployment](https://code-institute-students.github.io/advfe-unified-workspace/deployment/00-deployment)" to avoid conflicts in URL. if you want to perform manual testing kindly change the code in the following files mentioned [here](/docs/md_files/WITHOUT_DEPLOY_SETTINGS.md).

- I confirmed that the root welcome message is shown correctly.
- I confirmed all URLs are manually tested and are working correctly.
- I confirmed all the actions related to CRUD are performing their actions as they should.
- I confirmed all the pages are tested to check if they are rendered as expected.
- I confirmed all the pages are checked in both conditions
    - If the user is logged in.
    - If the user is logged out.

### Testing Endpoints

| URL | Passed |
|---|---|
| root | :white_check_mark: |
| /products/posts/ | :white_check_mark: |
| /products/posts/\<id>/ | :white_check_mark: |
| /categories/ | :white_check_mark: |
| /friends/ | :white_check_mark: |
| /friends/\<id>/ | :white_check_mark: |
| /profiles/ | :white_check_mark: |
| /profiles/\<id>/ | :white_check_mark: |
| /comments/ | :white_check_mark: |
| /comments/\<id>/ | :white_check_mark: |
| /votes/ | :white_check_mark: |
| /votes/\<id>/ | :white_check_mark: |

### Bugs

- The user was able to up and downvote on the same product post.

**Fix:** A validator was required inside the votes serializer to check if anyone from up or downvote exits, if so it provides a message "Kindly select upvote or downvote".

```
if up_vote and down_vote:
raise serializers.ValidationError(
    "Kindly select only one, upvote or downvote"
)
```

- When the user tries to vote on the same post and on the same vote for the second time.

**Fix:** This was just an integrity error, which just required simple handling if this appears mentioned below

```
try:
    return super().create(validated_data)
except IntegrityError:
    raise serializers.ValidationError(
        {
            "detail": "You cannot vote again on the same product, Kindly update or delete your current vote on the product"
        }
    )
```

- I was struggling with creating query sets in profile and product view. Following were the cases
    - Fetching profiles with the highest upvotes to the lowest.
    - Showing only those posts that are public and private to those who are friends with current users only.

**What I tried**
```
Profile
queryset = Profile.objects.annotate(posts_count=Count('owner__product', distinct=True),total_upvotes=Coalesce((Vote.objects.filter(up_vote=True).values('total_upvotes')), 0)).order_by('-total_upvotes')
```
I updated this solution multiple times, before asking chatgpt. My code for the product view was removed before the commit hence not available.


**Fix:** Chat gpt helped me in creating the querysets for this purpose. Kindly see the profile and product views for details.

### Unfixed bugs
- No known unfixed bugs.

## Libraries and Technologies Used

### Language
- Python

### Frameworks - Libraries - Programs Used - Packages Used
- [Django](https://docs.djangoproject.com/en/3.2/) is python-based web framework that runs on a web server.
- [Django REST Framework](https://pypi.org/project/djangorestframework/3.14.0/) is a powerful and flexible toolkit for building Web APIs.
- [pathlib](https://docs.python.org/3/library/pathlib.html) This module is used to work with filepaths. It provides a convenient and platform-independent way to manipulate paths, files, and directories in a Python script.
- [os](https://docs.python.org/3/library/os.html)The os module provides a portable way of using operating system dependent functionality. It offers various functions for interacting with the underlying operating system, such as file operations, environment variables, and process management. 
- [Cloudinary](https://cloudinary.com/) is used as an image hosting service. Product images are uploaded there.
- [Django Cloudinary Storage](https://pypi.org/project/django-cloudinary-storage/0.3.0/) is a Django package that facilitates integration with Cloudinary by implementing Django Storage API. With several lines of configuration, you can start using Cloudinary for both media and static files. Also, it provides management commands for removing unnecessary files, so any cleanup will be a breeze.
- [dj-database-url](https://pypi.org/project/dj-database-url/0.5.0/) allows you to utilize the 12factor inspired DATABASE_URL environment variable to configure your Django application The dj_database_url.config method returns a Django database connection dictionary, populated with all the data specified in your URL. There is also a conn_max_age argument to easily enable Django’s connection pool.
- [django-allauth](https://pypi.org/project/django-allauth/0.51.0/), Integrated set of Django applications addressing authentication, registration, account management as well as 3rd party (social) account authentication.
- [dj-rest-auth](https://pypi.org/project/dj-rest-auth/2.2.5/) Authentication and Registration in Django Rest Framework. Drop-in API endpoints for handling authentication securely in Django Rest Framework. Works especially well with SPAs (e.g React, Vue, Angular), and Mobile applications.
- [django-filter](https://pypi.org/project/django-filter/22.1/) is a reusable Django application allowing users to declaratively add dynamic QuerySet filtering from URL parameters.
- [djangorestframework-simplejwt](https://pypi.org/project/djangorestframework-simplejwt/5.2.1/), A minimal JSON Web Token authentication plugin for Django REST Framework.
- [django-cors-headers](https://pypi.org/project/django-cors-headers/4.3.1/)A Django App that adds Cross-Origin Resource Sharing (CORS) headers to responses. This allows in-browser requests to your Django application from other origins. Adding CORS headers allows your resources to be accessed on other domains. You must understand the implications before adding the headers, since you could be unintentionally opening up your site’s private data to others.
- [pillow](https://pypi.org/project/pillow/10.2.0/) is Python Imaging Library adds image processing capabilities to your Python interpreter. This library provides extensive file format support, an efficient internal representation, and fairly powerful image processing capabilities.
- [psycopg2](https://pypi.org/project/psycopg2/2.9.9/) is the most popular PostgreSQL database adapter for the Python programming language. Its main features are the complete implementation of the Python DB API 2.0 specification and the thread safety (several threads can share the same connection). It was designed for heavily multi-threaded applications that create and destroy lots of cursors and make a large number of concurrent “INSERT”s or “UPDATE”s.
- [Gunicorn](https://gunicorn.org/) is a Python WSGI HTTP Server for our project. This helps to run project on Heroku.
- [PostgreSQL](https://www.postgresql.org/) is used as the database for this project.
- [ElephantSQL](https://www.elephantsql.com/) perfectly configured and optimized PostgreSQL databases.
- [PEP8 Online](https://pep8ci.herokuapp.com/#) used to validate all the Python code.
- [Drawio](https://app.diagrams.net/) is used to make database schema.

## Credits

### Code
- The main inspiration and concepts for this project are taken from the Code Institute's Back End Course - Django REST Framework walkthrough.
- ChatGpt 3.5 helped with some advanced concepts.

### Online Documentation
- [dj-rest-auth](https://pypi.org/project/dj-rest-auth/2.2.5/) documentation helped a lot as I was using the latest version, which differed from the one taught in the course.
- [Django REST Framework](https://pypi.org/project/djangorestframework/3.14.0/) helped in understanding few core concepts.

### Acknowledgments
- Code Institute tutors helped a lot and pointed me in the right direction.
- My Mentor Antonio Rodriguez for helpful feedback during project development.

Return to the [FRONTEND README](/README.md) file.

Return to the [FRONTEND TESTING README](/docs/md_files/FRONTEND_TESTING.md) file.

[Back to top](#top)