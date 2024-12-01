import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Login from "../../src/pages/Login/Login"; // Sesuaikan dengan path file Login
import { useAuth } from "../../src/hooks/useAuth";
import { ToastProvider } from "../../src/components/ui/toast";
import { MemoryRouter } from "react-router-dom";
import AuthService from "../../src/services/authService"

// Mock dependencies
vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

// Mocking toast hook
const mockToast = vi.fn()
vi.mock("@/hooks/use-toast", () => ({
    useToast: vi.fn(() => ({
      toast: mockToast,
    })),
    toast: vi.fn(),
}));


describe("Login Component", () => {
  const mockLogin = vi.fn();
  const setup = () => {
    return render(
        <ToastProvider>
            <MemoryRouter>
            <Login />
            </MemoryRouter>
        </ToastProvider>
    )
  }

  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      login: mockLogin,
      isAuthenticated: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  

  it("renders the Login component correctly", () => {
    setup();

    // Check for input fields and buttons
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByTestId("button-sigin")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in with google/i })
    ).toBeInTheDocument();
  });

  it("validates form inputs correctly", async () => {
    const user = userEvent.setup();
    setup();

    // Submit the form without filling any fields
    await user.click(screen.getByTestId("button-sigin"));

    // Expect validation messages
    expect(screen.getByTestId("email-error")).toBeInTheDocument();
    expect(screen.getByTestId("password-error")).toBeInTheDocument();
  });

  it("calls login function on form submit with valid inputs", async () => {
    const user = userEvent.setup();
    setup();

    // Fill in the form
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");

    // Submit the form
    await user.click(screen.getByTestId("button-sigin"));

    // Expect login to be called with the correct data
    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("displays error toast on login failure", async () => {
    const user = userEvent.setup();
    mockLogin.mockRejectedValueOnce(new Error("Invalid credentials"));

    setup();

    // Fill in the form and submit
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByTestId("button-sigin"));

    // Expect error toast
    expect(mockToast).toHaveBeenCalledWith({
      variant: "destructive",
      title: "Invalid credentials.",
      description: "Please enter valid data.",
    });
  });

  it("redirects to Google login on button click", () => {  
    
    const googleLoginSpy = vi
        .spyOn(AuthService.prototype, "googleLogin")
        .mockReturnValue("https://google.com/login");


    setup();

    // Click Google login button
    fireEvent.click(screen.getByTestId("button-sigin-google"));

       // Pastikan fungsi dipanggil
    expect(googleLoginSpy).toHaveBeenCalled();

    // Bersihkan spy
    googleLoginSpy.mockRestore();

  });

  it("toggles password visibility", async () => {
    const user = userEvent.setup();
    setup();

    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByTestId("button-eye");

    // Check initial type
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click to show password
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click again to hide password
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
