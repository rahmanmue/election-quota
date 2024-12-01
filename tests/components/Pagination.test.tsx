import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { PaginationTable } from "../../src/components/Pagination";

describe("PaginationTable Component", () => {
  it("renders correctly with pages and navigation buttons", () => {
    const mockOnPageChange = vi.fn();

    render(
      <PaginationTable currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />
    );

    // Pastikan tombol Previous dirender
    expect(screen.getByLabelText(/previous/i)).toBeInTheDocument();

    // Pastikan tombol Next dirender
    expect(screen.getByLabelText(/next/i)).toBeInTheDocument();

    // Pastikan tombol halaman dirender sesuai jumlah halaman yang diberikan
    for (let page = 1; page <= 3; page++) {
      expect(screen.getByText(page)).toBeInTheDocument();
    }
  });

  it("calls onPageChange with the correct page when a page is clicked", () => {
    const mockOnPageChange = vi.fn();

    render(
      <PaginationTable currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />
    );

    // Klik halaman kedua
    fireEvent.click(screen.getByText("2"));

    // Pastikan fungsi onPageChange dipanggil dengan halaman yang benar
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("disables Previous button on the first page", () => {
    const mockOnPageChange = vi.fn();

    render(
      <PaginationTable currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />
    );

    const previousButton = screen.getByLabelText(/previous/i);

    // Klik tombol Previous
    fireEvent.click(previousButton);

    // Pastikan onPageChange tidak dipanggil karena sudah di halaman pertama
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it("disables Next button on the last page", () => {
    const mockOnPageChange = vi.fn();

    render(
      <PaginationTable currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />
    );

    const nextButton = screen.getByLabelText(/next/i);

    // Klik tombol Next
    fireEvent.click(nextButton);

    // Pastikan onPageChange tidak dipanggil karena sudah di halaman terakhir
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it("navigates to the correct page using Next and Previous buttons", () => {
    const mockOnPageChange = vi.fn();

    render(
      <PaginationTable currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />
    );

    // Klik tombol Previous
    fireEvent.click(screen.getByLabelText(/previous/i));

    // Pastikan onPageChange dipanggil dengan halaman sebelumnya
    expect(mockOnPageChange).toHaveBeenCalledWith(2);

    // Klik tombol Next
    fireEvent.click(screen.getByLabelText(/next/i));

    // Pastikan onPageChange dipanggil dengan halaman berikutnya
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });
});
