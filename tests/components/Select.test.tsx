import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import { vi } from "vitest";
import { SelectDemo } from "../../src/components/Select";

describe("SelectDemo Component", () => {
  const options = [
    { value: "1", item: "Option 1" },
    { value: "2", item: "Option 2" },
    { value: "3", item: "Option 3" },
  ];

  const mockOnChange = vi.fn();

  it("renders placeholder text correctly", () => {
    render(
      <SelectDemo placeholder="Select an option" select={options} onChange={mockOnChange} />
    );

    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("does not call onChange if no option is selected", () => {
    const mockOnChange = vi.fn();

    render(
      <SelectDemo placeholder="Select an option" select={options} onChange={mockOnChange} />
    );

    // Open and close the select dropdown without selecting an option
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.keyDown(document, { key: "Escape" }); // Close dropdown

    // Verify onChange is not called
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  //   it("renders all options", async () => {
//     render(
//       <SelectDemo placeholder="Select an option" select={options} onChange={mockOnChange} />
//     );

//     // Open the select dropdown
//     const combobox = screen.getByRole("combobox");
//     expect(combobox).toHaveAttribute("aria-expanded", "false");

//     // Klik untuk membuka dropdown
//     await userEvent.click(combobox);
//     screen.debug();

//     // Tunggu hingga dropdown terbuka
//     await waitFor(() => expect(combobox).toHaveAttribute("aria-expanded", "true"));

//     // Verifikasi semua opsi dirender
//     options.forEach((option) => {
//       expect(screen.getByText(option.item)).toBeVisible();
//     });

//   });
});

