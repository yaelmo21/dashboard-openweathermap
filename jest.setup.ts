import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import resizeObserve from 'resize-observer-polyfill';

global.ResizeObserver = resizeObserve;
