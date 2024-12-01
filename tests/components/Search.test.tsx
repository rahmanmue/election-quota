import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Search } from "../../src/components/Search";

describe("Search Component", () => {
  it("renders input and button correctly", () => {
    render(<Search placeholder="Search here..." onSearch={vi.fn()} />);

    // Pastikan input dan tombol dirender
    const input = screen.getByPlaceholderText("Search here...");
    const button = screen.getByRole("button", { name: /cari/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("allows text input and calls onSearch when the button is clicked", () => {
    const mockOnSearch = vi.fn();
    render(<Search placeholder="Search here..." onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Search here...");
    const button = screen.getByRole("button", { name: /cari/i });

    // Simulasi pengguna memasukkan teks
    fireEvent.change(input, { target: { value: "test search" } });
    expect(input).toHaveValue("test search");

    // Simulasi klik tombol
    fireEvent.click(button);

    // Pastikan onSearch dipanggil dengan nilai yang benar
    expect(mockOnSearch).toHaveBeenCalledWith("test search");

    // Pastikan input dikosongkan setelah pencarian
    expect(input).toHaveValue("");
  });

  it("does not call onSearch if input is empty", () => {
    const mockOnSearch = vi.fn();
    render(<Search placeholder="Search here..." onSearch={mockOnSearch} />);

    const button = screen.getByRole("button", { name: /cari/i });

    // Klik tombol tanpa teks input
    fireEvent.click(button);

    // Pastikan onSearch tidak dipanggil
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
