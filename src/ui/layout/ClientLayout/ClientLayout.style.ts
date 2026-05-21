import React from 'react';

export const styles: {
  mainArea: (isCanvas: boolean) => React.CSSProperties;
} = {
  mainArea: (isCanvas: boolean) => ({
    minHeight: '100vh',
    position: 'relative',
  })
};
