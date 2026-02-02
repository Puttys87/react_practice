import '@testing-library/jest-dom'

// jsdom does not provide ResizeObserver (required by @radix-ui/react-slider)
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
