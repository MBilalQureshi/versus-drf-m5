import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import { BrowserRouter as Router } from "react-router-dom";

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

test("render link to the user profile for logged in user", async () => {
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

test("renders Sign up, Sign in and Sign out buttons", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const registerLink = await screen.findByRole("link", { name: "Sign up" });
  expect(registerLink).toBeInTheDocument();
  const signInLink = await screen.findByRole("link", { name: "Sign in" });
  expect(signInLink).toBeInTheDocument();
  const signOutLink = await screen.findByRole("link", { name: "Sign out" });
  fireEvent.click(signOutLink);
});

test("renders trending link for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const feedLink = await screen.findByText("Trending");
  expect(feedLink).toBeInTheDocument();
});

test("renders voted link for a logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const likedLink = await screen.findByText("Voted");
  expect(likedLink).toBeInTheDocument();
});
