import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test } from "vitest";
import TurbineDetails from "./TurbineDetails";
const mockTurbines = [
  {
    id: "1",
    name: "WT-001",
    location: "Mumbai",
    power: "2.5 MW",
    status: "Operational",
  },
  {
    id: "2",
    name: "WT-002",
    location: "Pune",
    power: "3.0 MW",
    status: "Maintenance",
  },
];

describe("TurbineDetails", () => {
  test("renders the correct turbine details", () => {
    render(
      <MemoryRouter initialEntries={["/turbines/1"]}>
        <Routes>
          <Route
            path="/turbines/:id"
            element={
              <TurbineDetails
                turbines={mockTurbines}
                onUpdateTurbine={() => {}}
                onDeleteTurbine={() => {}}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    // Write your assertions here
    expect(screen.getByText("WT-001")).toBeInTheDocument()
    expect(screen.getByText("Mumbai")).toBeInTheDocument()
    expect(screen.getByText("2.5 MW")).toBeInTheDocument()
    expect(screen.getByText("Operational")).toBeInTheDocument()
    
  });
});
