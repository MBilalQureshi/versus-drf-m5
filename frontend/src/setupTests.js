import '@testing-library/jest-dom';
import {setupServer} from 'msw/node'
import { handlers } from './mocks/handlers';

// Create a mock server using the setupServer function with the specified request handlers..
const server = setupServer (...handlers)

// Set up the mock server before running the tests.
beforeAll(() => server.listen())

// Reset the handlers between each test to ensure a clean state.
afterEach(()=> server.resetHandlers())

// Close the server after all tests are completed.
afterAll(() => server.close());