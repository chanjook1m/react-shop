import { setupServer } from "msw/node";
import handlers from "./handlers";
import vi from "vitest";
// This configures a request mocking server with the given request handlers.

export const server = setupServer(...handlers);

// Start server before all tests
// beforeAll(() => {
//   vi.useFakeTimers();
//   server.listen({ onUnhandledRequest: "error" });
// });

// //  Close server after all tests
// afterAll(() => server.close());

// // Reset handlers after each test `important for test isolation`
// afterEach(() => {
//   vi.useRealTimers();
//   server.resetHandlers();
// });
