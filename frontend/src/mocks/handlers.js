import { rest } from "msw";

// The testing was done before deploying, so baseURL was removed
export const handlers = [
    rest.get(`/dj-rest-auth/user/`, (req, res, ctx) => {
        return res(
            ctx.json({
                "pk": 1,
                "username": "Admin",
                "email": "bilalqureshi.epic@gmail.com",
                "first_name": "",
                "last_name": "",
                "profile_id": 1,
                "profile_image": "https://res.cloudinary.com/dgdejjc6n/image/upload/v1/media/../default_profile_oojj4p"
            })
        );
    }),
    rest.post(`/dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];