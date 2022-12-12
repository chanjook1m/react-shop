import { beforeAll, expect, afterEach, afterAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { server } from "../src/mocks/server";

import { fetch } from "cross-fetch";

global.fetch = fetch;

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

beforeAll(() => {
  // vi.useFakeTimers();
  server.listen();
});

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  // vi.useRealTimers();
  server.resetHandlers();
  cleanup();
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {});
