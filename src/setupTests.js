require("@testing-library/jest-dom");

// Polyfill for TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require("util");

Object.assign(global, { TextEncoder, TextDecoder });
