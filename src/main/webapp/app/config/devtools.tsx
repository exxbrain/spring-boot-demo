import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
// You can toggle visibility of devTools with ctrl + H
// and change their position with ctrl + Q
export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={false}>
    <LogMonitor />
  </DockMonitor>
);
