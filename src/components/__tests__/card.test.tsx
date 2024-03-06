/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from "react";
import Card from "../card";
import { render, fireEvent, screen } from "@testing-library/react-native";
import App from "../../../App";
import { getCatInfo, getHomeData } from "../../graphQL/queries";
import { MockedProvider } from "@apollo/client/testing";
import { increaseTrackView } from "../../graphQL/mutations";

describe("testing the full functionlity of the card", () => {
  const pressFunction = jest.fn();
  const btnTestID = "card-btn";
  const imgTestID = "image-test";
  const imageURLTest = "www.google.com/img";
  const cardItem = (
    <Card
      handlePress={pressFunction}
      thumbnail={imageURLTest}
      title="title test"
      numberOfViews={1}
      description="description test"
      btnTestID={btnTestID}
      imgTestID={imgTestID}
    />
  );

  const errorMock = [
    {
      request: {
        query: getHomeData,
      },
      error: new Error("An error occurred"),
    },
  ];

  const successMocks = [
    {
      request: {
        query: getHomeData,
      },
      result: {
        data: {
          tracksForHome: [
            {
              id: "c_0",
              title: "Cat-stronomy, an introduction",
              thumbnail:
                "https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg",
              length: 2377,
              modulesCount: 10,
              numberOfViews: 8,
              description:
                "Curious to learn what Cat-stronomy is all about? Explore the planetary and celestial alignments and how they have affected our space missions.",
            },
          ],
        },
      },
    },
    {
      request: {
        query: getCatInfo,
        variables: { trackId: "c_0" },
      },
      result: {
        data: {
          track: {
            thumbnail:
              "https://res.cloudinary.com/dety84pbu/image/upload/v1598474100/famous_cats_epuqcr.jpg",
            description:
              "Be inspired by famous catstronauts who have made their names legend from across the galaxies. Special guest appearance included, so hold on to your boots!",
          },
        },
      },
    },
    {
      request: {
        query: increaseTrackView,
        variables: { incrementTrackViewsId: "c_0" },
      },
      result: {
        data: {
          incrementTrackViews: {
            track: {
              id: "c_0",
              title: "Cat-stronomy, an introduction",
              thumbnail:
                "https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg",
              length: 2377,
              modulesCount: 10,
              numberOfViews: 8,
              description:
                "Curious to learn what Cat-stronomy is all about? Explore the planetary and celestial alignments and how they have affected our space missions.",
            },
          },
        },
      },
    },
  ];

  test("Snapshot test", () => {
    const { toJSON } = render(cardItem);
    expect(toJSON()).toMatchSnapshot();
  });
  test("title rendered correct", () => {
    const { getByText } = render(cardItem);
    expect(getByText("title test")).toBeTruthy();
  });

  test("image has the right src", () => {
    const { getByTestId } = render(cardItem);
    const thumbnailImage = getByTestId("image-test");
    expect(thumbnailImage.props.source.uri).toEqual(imageURLTest);
  });

  test("numberOfViews rendered correct", () => {
    const { getByText } = render(cardItem);
    expect(getByText("Number Of Views : 1")).toBeTruthy();
  });

  test("on button press function called ", () => {
    const { getByTestId } = render(cardItem);
    fireEvent.press(getByTestId("card-btn"));
    expect(pressFunction).toHaveBeenCalledTimes(1);
  });

  test("on button press it will navigate to another screen ", async () => {
    render(
      <MockedProvider mocks={successMocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    expect(await screen.findByText("<<<< LOADING >>>>")).toBeDefined();
    expect(
      await screen.findByText("Cat-stronomy, an introduction")
    ).toBeDefined();

    fireEvent.press(await screen.findByTestId("card-btn"));
    expect(await screen.findByTestId("detailsScreenView")).toBeTruthy();
  });

  test("show an error when graphQL fail ", async () => {
    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <App />
      </MockedProvider>
    );
    expect(await screen.findByText("An error occurred")).toBeDefined();
  });


});
