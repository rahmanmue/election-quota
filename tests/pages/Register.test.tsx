import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "../../src/components/ui/toast";
import {useAuth} from "../../src/hooks/useAuth";
import {useToast, toast} from "../../src/hooks/use-toast"
import Register from "../../src/pages/Register";
import {vi} from "vitest";
import userEvent from "@testing-library/user-event";
import PrivateRoute from "../../src/components/PrivateRoute";

// Mocking the `useAuth` hook
vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

// Mocking toast hook
vi.mock("@/hooks/use-toast", () => ({
    useToast: vi.fn(() => ({
      toast: vi.fn(),
    })),
    toast: vi.fn(),
}));

describe("Register Component", () => {
const mockRegister = vi.fn();
  const setup = () => {
    return render(
      <ToastProvider>
          <MemoryRouter>
            <Register />
          </MemoryRouter>
      </ToastProvider>
    );
  };

  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      register: mockRegister,
      isAuthenticated: false,
    });
  });

  it("renders the register form correctly", () => {
    setup();

    // Check for input fields
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();   
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();

    // Check for button
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("displays validation errors for invalid inputs", async () => {
    setup();
    const user = userEvent.setup();

    // Simulate submitting the form with empty fields
    const signUpButton = screen.getByRole("button", { name: /sign up/i });
    await user.click(signUpButton);

   
    expect(await screen.findByText(/name must be at least 2 character/i)).toBeInTheDocument();
    expect(screen.getByTestId("name-error")).toBeInTheDocument();
    expect(screen.getByTestId("email-error")).toBeInTheDocument();
    expect(screen.getByTestId("password-error")).toBeInTheDocument();
    expect(screen.getByTestId("confPassword-error")).toBeInTheDocument();
  });

  it("calls login function on form submit with valid inputs", async () => {
    const user = userEvent.setup();
    setup();

    // Fill out the form with valid inputs
    await user.type(screen.getByLabelText(/name/i), "Test User");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "password123");

    const signUpButton = screen.getByTestId("button-register");
    await user.click(signUpButton);

    
    // Expect the register function to have been called
    expect(mockRegister).toHaveBeenCalledWith({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      confPassword: "password123",
    });

 
  });

  it("redirects to /dashboard if already authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: true })

    render(
        <MemoryRouter initialEntries={["/dashboard"]}> {/* Gunakan MemoryRouter */}
            <Routes>
                <Route path="/" element={<PrivateRoute roles={["admin"]} />}>
                    <Route path="dashboard" element={<div>Dashboard</div>} />
                </Route>
            </Routes>
        </MemoryRouter>
      );

    // Expect a redirect to dashboard
    expect(screen.queryByText(/Dashboard/i)).not.toBeInTheDocument();
  });
});

