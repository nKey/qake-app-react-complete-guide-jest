import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  test("renders posts if request succeeds", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "First post" }],
    });
    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);

    // I use a `forEach` to make the test dynamic in case we decide
    // to generate items dynamically in the future
    // This method is also implicitly testing the order
    listItemElements.forEach((item, index) => {
      // You can import wihthin from @testing-library/react
      const { getByText, queryByText } = within(item);
      const { id, title } = items[index];
      console.log({ id, title });
      // expect(getByText(name)).toBeInTheDocument()
      // isActive
      //   ? expect(getByText('Active!')).toBeInTheDocument()
      //   : expect(queryByText('Active!')).not.toBeInTheDocument()
    });
  });
});
