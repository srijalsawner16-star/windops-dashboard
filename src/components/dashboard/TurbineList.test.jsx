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
  {
    id: "3",
    name: "WT-003",
    location: "Nashik",
    power: "2.0 MW",
    status: "Offline",
  },
];

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import TurbineList from "./TurbineList";

import { describe, expect, test } from "vitest";

describe("TurbineList", ()=> {


    test("renders all turbines", ()=>{


        render(<MemoryRouter><TurbineList turbines={mockTurbines}/></MemoryRouter>)
        expect(screen.getByText("WT-001")).toBeInTheDocument();
        expect(screen.getByText("WT-002")).toBeInTheDocument();
        expect(screen.getByText("WT-003")).toBeInTheDocument();
    })

    test("search by turbine name", async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <TurbineList turbines={mockTurbines} />
    </MemoryRouter>
  );

  const searchInput = screen.getByPlaceholderText(
    "Search by turbine name or location.."
  );

  await user.type(searchInput, "WT-001");

  expect(screen.getByText("WT-001")).toBeInTheDocument();

  expect(screen.queryByText("WT-002")).not.toBeInTheDocument();

  expect(screen.queryByText("WT-003")).not.toBeInTheDocument();
});


    test("filters turbine by Offline status", async()=> {

        const user = userEvent.setup();

        render(<MemoryRouter><TurbineList turbines={mockTurbines}/></MemoryRouter>)

        const offlineBtn = screen.getByRole("button", {
            name:"Offline"
        })

        await user.click(offlineBtn);

        expect(screen.getByText("WT-003")).toBeInTheDocument();
    })
})
