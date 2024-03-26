import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import { BrowserRouter  as Router } from "react-router-dom";

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );
  const signInLink = screen.getByRole("link", { name: "Sign in" });
  expect(signInLink).toBeInTheDocument();
});

test("renders link to user profile for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByText("Admin");
  expect(profileAvatar).toBeInTheDocument();
});

// test("renders Sign in and Sign up buttons again on log out", async () => {
//   render(
//     <Router>
//       <CurrentUserProvider>
//         <NavBar />
//       </CurrentUserProvider>
//     </Router>
//   );

//   const signOutLink = await screen.findByRole("link", { name: "logout" });
//   fireEvent.click(signOutLink);
//   const signInLink = await screen.findByRole("link", { name: "sign in" });
//   const registerLink = await screen.findByRole("link", { name: "register" });

//   expect(signInLink).toBeInTheDocument();
//   expect(registerLink).toBeInTheDocument();
// });

// test("renders feed link for a logged in user", async () => {
//   render(
//     <Router>
//       <CurrentUserProvider>
//         <NavBar />
//       </CurrentUserProvider>
//     </Router>
//   );

//   const feedLink = await screen.findByText("feed");
//   expect(feedLink).toBeInTheDocument();
// });

// test("renders liked link for a logged in user", async () => {
//   render(
//     <Router>
//       <CurrentUserProvider>
//         <NavBar />
//       </CurrentUserProvider>
//     </Router>
//   );

//   const likedLink = await screen.findByText("liked");
//   expect(likedLink).toBeInTheDocument();
// });

// test("renders recommended link for a logged in user", async () => {
//   render(
//     <Router>
//       <CurrentUserProvider>
//         <NavBar />
//       </CurrentUserProvider>
//     </Router>
//   );

//   const recommendedLink = await screen.findByText("recommended");
//   expect(recommendedLink).toBeInTheDocument();
// });