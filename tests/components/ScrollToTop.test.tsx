import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi } from "vitest";
import ScrollToTop from "../../src/components/ScrollToTop"; // Sesuaikan path sesuai lokasi file

describe("ScrollToTop Component", () => {
  beforeEach(() => {
    // Mock scroll behavior
    Object.defineProperty(window, "scroll", {
      value: vi.fn(),
      writable: true,
    });

    // Mock scrollY
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 0,
    });

    // Mock addEventListener untuk event scroll
    window.addEventListener = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should not render the button when scrollY is less than 400", () => {
    render(<ScrollToTop />);

    // Tombol tidak terlihat pada awal render
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

//   it("should render the button when scrollY is greater than 400", () => {
//     render(<ScrollToTop />);

//     act(() => {
//         window.scrollY = 500; // Simulasikan posisi scroll
//         window.dispatchEvent(new Event("scroll")); // Trigger event scroll
//       });

//     screen.debug()
//     // Tombol terlihat setelah scroll
//     expect(screen.getByText("↑")).toBeInTheDocument();
// });

//   it("should call window.scroll to scroll to top when button is clicked", () => {
//     render(<ScrollToTop />);

   
//     // Simulate scrolling
//     window.scrollY = 500;
//     fireEvent.scroll(window);

//     // Tombol terlihat setelah scroll
//     const button = screen.getByRole("button");
//     expect(button).toBeInTheDocument();

//     // Klik tombol
//     fireEvent.click(button);

//     // Periksa apakah window.scroll dipanggil dengan parameter yang benar
//     expect(window.scroll).toHaveBeenCalledWith({ top: 0, left: 0 });
//   });
});
