import { render, screen } from "../../Utils/test-utils";
import Login from ".";

describe("Login Component", () => {
  test("renders login form with email input and login button", () => {
    render(<Login />);

    const textField = screen.getByLabelText(/Email/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    expect(textField).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
