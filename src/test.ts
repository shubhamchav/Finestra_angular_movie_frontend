// This file is required by karma.conf.js to load all the tests.

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Find all the tests.
const allTestFiles = (window as any).__karma__ ? (window as any).__karma__.files : {};
Object.keys(allTestFiles)
  .filter(file => /\.spec\.ts$/.test(file))
  .forEach(file => {
    require(file);
  });
