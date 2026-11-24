import { render, screen } from "@testing-library/react";

import { describe, expect, test } from "vitest";
import MetricCard from "./MetricCard";




describe("MetricCard", ()=> {

    test("Check if text is visible", ()=>{

    render(<MetricCard title="Total Turbines" value={10}></MetricCard>)

    expect(screen.getByText("Total Turbines")).toBeInTheDocument();
    expect(screen.getByText(10)).toBeInTheDocument();
})

test("render different metric values", ()=>{
    render(<MetricCard title="Offline Turbines" value={3} />)

    expect(screen.getByText("Offline Turbines")).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();
})

test("check if text is visible",()=>{
     render(<MetricCard title="Total Turbines" value={10}></MetricCard>)

    expect(screen.getByRole("heading", {name: "Total Turbines"})).toBeInTheDocument();
} )

})
