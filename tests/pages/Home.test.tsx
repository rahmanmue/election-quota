import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Home from "../../src/pages/Home"; // Sesuaikan path ke file Home

// Mock komponen child untuk testing
vi.mock('@/components/landing-page/Navbar', () => ({
  default: () => <div>Navbar Component</div>,
}));
vi.mock('@/components/landing-page/Hero', () => ({
  default: () => <div>Hero Component</div>,
}));
vi.mock('@/components/landing-page/Calculation', () => ({
  default: () => <div>Calculation Component</div>,
}));
vi.mock('@/components/landing-page/About', () => ({
  default: () => <div>About Component</div>,
}));
vi.mock('@/components/landing-page/Footer', () => ({
  default: () => <div>Footer Component</div>,
}));
vi.mock('@/components/ScrollToTop', () => ({
  default: () => <div>ScrollToTop Component</div>,
}));

describe("Home Component", () => {
  it("renders all child components", () => {
    render(<Home />);

    // Memastikan semua komponen muncul
    expect(screen.getByText("Navbar Component")).toBeInTheDocument();
    expect(screen.getByText("Hero Component")).toBeInTheDocument();
    expect(screen.getByText("Calculation Component")).toBeInTheDocument();
    expect(screen.getByText("About Component")).toBeInTheDocument();
    expect(screen.getByText("Footer Component")).toBeInTheDocument();
    expect(screen.getByText("ScrollToTop Component")).toBeInTheDocument();
  });

  it("calls window.scrollTo on mount", () => {
    const scrollToMock = vi.fn();
    // Mock window.scrollTo
    window.scrollTo = scrollToMock;

    render(<Home />);

    // Memastikan scrollTo dipanggil
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
