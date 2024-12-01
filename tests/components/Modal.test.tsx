import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Modal } from "../../src/components/Modal";
import { Trash } from "lucide-react";

describe("Modal Component", () => {
  it("renders and opens the modal when the trigger button is clicked", () => {
    const mockSubmit = vi.fn();

    render(
      <Modal title="Test Modal" icon={<Trash />} submitForm={mockSubmit}>
        <p>Modal content goes here</p>
      </Modal>
    );

    // Pastikan tombol untuk membuka modal dirender
    const triggerButton = screen.getByRole("button");
    expect(triggerButton).toBeInTheDocument();

    // Klik tombol untuk membuka modal
    fireEvent.click(triggerButton);

    // Verifikasi apakah modal terbuka dan konten modal dirender
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal content goes here")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument();
  });

  it("calls submitForm and closes the modal on form submission", () => {
    const mockSubmit = vi.fn();

    render(
      <Modal title="Test Modal" icon={<Trash />} submitForm={mockSubmit}>
        <p>Modal content goes here</p>
      </Modal>
    );

    // Buka modal
    fireEvent.click(screen.getByRole("button"));

    // Pastikan modal terbuka
    expect(screen.getByText("Test Modal")).toBeInTheDocument();

    // Klik tombol submit
    const submitButton = screen.getByRole("button", { name: /save changes/i });
    fireEvent.click(submitButton);

    // Verifikasi apakah fungsi submitForm dipanggil
    expect(mockSubmit).toHaveBeenCalledTimes(1);

    // Pastikan modal tertutup setelah submit
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });
});
