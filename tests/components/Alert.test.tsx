import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Alert } from "../../src/components/Alert";

describe("Alert Component", () => {
  it("renders and opens the alert dialog when the trigger button is clicked", () => {
    const mockDelete = vi.fn();
    
    render(<Alert onDelete={mockDelete} />);

    // Klik tombol yang memicu alert dialog dengan memilih berdasarkan role dan ikon Trash
    fireEvent.click(screen.getByTestId("alert-trigger"));


    // Verifikasi apakah dialog muncul dengan benar
    expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();
    expect(screen.getByText("This action cannot be undone. This will permanently delete your account and remove your data from our servers.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
  });

  it("calls onDelete when 'Continue' is clicked", () => {
    const mockDelete = vi.fn();
    
    render(<Alert onDelete={mockDelete} />);

    // Klik tombol untuk membuka dialog
    fireEvent.click(screen.getByTestId("alert-trigger"));


    // Klik tombol 'Continue'
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    // Pastikan fungsi onDelete dipanggil
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  it("does not call onDelete when 'Cancel' is clicked", () => {
    const mockDelete = vi.fn();
    
    render(<Alert onDelete={mockDelete} />);

    // Klik tombol untuk membuka dialog
    fireEvent.click(screen.getByTestId("alert-trigger"));


    // Klik tombol 'Cancel'
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    // Pastikan fungsi onDelete tidak dipanggil
    expect(mockDelete).not.toHaveBeenCalled();
  });
});
