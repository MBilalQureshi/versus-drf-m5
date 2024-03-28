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

![Database Schema](docs/readme_images/database_schema.webp)

</details>

The database schema is designed using [Drawio](https://app.diagrams.net/).

## Security Features and Defensive Design

### Database Security
The database URL and secret key are stored in the env file. This prevents unwanted connections to the database.

### User Authentication
- dj-rest-auth is used for Authentication purposes.
- jwt refresh token is used for verifying if a user is still authenticated after a specified time, check if the refresh token is still valid.