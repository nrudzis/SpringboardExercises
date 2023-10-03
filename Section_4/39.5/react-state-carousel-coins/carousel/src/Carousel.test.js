import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test
it("renders without crashing", function() {
  render(<Carousel />);
});

//snapshot test
it("matches snapshot", function() {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("moves to the first image when clicking left arrow from the second image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />)

  // move to the second image in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // move to the first image in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("should not have the left arrow with the first image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />)

  // expect no left arrow with the first image in the carousel
  const leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).toBeNull();
});

it("should not have the right arrow with the third image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />)

  // move to the third image in the carousel
  let rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect no right arrow
  rightArrow = queryByTestId("right-arrow");
  expect(rightArrow).toBeNull();
});
