import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "../../src/components/PrivateRoute"; // Adjust the import path as needed
import {loadFromLocalStorage, decodedToken} from "../../src/lib/authUtils"; // Adjust the import path as needed
import { vi } from "vitest"; // Import vi for mocking functions
import { MemoryRouter } from "react-router-dom";

// Mock the auth utility functions
vi.mock("@/lib/authUtils", () => ({
  loadFromLocalStorage: vi.fn(),
  decodedToken: vi.fn(),
}));

describe("PrivateRoute", () => {
  it("redirects to sign-in if the user is not authenticated", async () => {
    // Simulate a user not being authenticated (no token in localStorage)
    (loadFromLocalStorage as jest.Mock).mockReturnValue(null);

    render(
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />} />
          <Route path="/sign-in" element={<div>Sign-In Page</div>} />
        </Routes>
      </Router>
    );

    // Wait for the redirect to happen
    await waitFor(() => expect(screen.getByText("Sign-In Page")).toBeInTheDocument());
  });

  it("redirects to sign-in if the user's role does not match the required roles", async () => {
    // Simulate a user being authenticated but with a mismatched role
    (loadFromLocalStorage as jest.Mock).mockReturnValue({ token: "mock-token" });
    (decodedToken as jest.Mock).mockReturnValue({ role: "user" });

    render(
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute roles={["admin"]} />} />
          <Route path="/sign-in" element={<div>Sign-In Page</div>} />
        </Routes>
      </Router>
    );


    // Wait for the redirect to happen
    await waitFor(() => expect(screen.getByText("Sign-In Page")).toBeInTheDocument());
  });

  it("renders the outlet when the user is authenticated and role matches", async () => {
    // Simulate a user being authenticated and having a matching role
    (loadFromLocalStorage as jest.Mock).mockReturnValue({ token: "mock-token" });
    (decodedToken as jest.Mock).mockReturnValue({ role: "admin" });

    render(
        <MemoryRouter initialEntries={["/dashboard"]}> {/* Gunakan MemoryRouter */}
            <Routes>
                <Route path="/" element={<PrivateRoute roles={["admin"]} />}>
                    <Route path="dashboard" element={<div>Dashboard</div>} />
                </Route>
            </Routes>
        </MemoryRouter>
      );
  
    //  screen.debug();

     await waitFor(() => expect(screen.getByText("Dashboard")).toBeInTheDocument());

  });
});
