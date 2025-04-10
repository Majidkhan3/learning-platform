'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useLayoutContext } from '@/context/useLayoutContext';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
const ThemeCustomizer = dynamic(() => import('@/components/ThemeCustomizer'));
const ThemeCustomizerToggle = () => {
  const {
    themeCustomizer: {
      open,
      toggle
    }
  } = useLayoutContext();
  const [hasOpenedOnce, setHasOpenedOnce] = useState(open);
  const toggleThemeCustomizerOffcanvas = () => {
    if (!hasOpenedOnce) setHasOpenedOnce(true);
    toggle();
  };
  return <>
      <div className="topbar-item d-none d-md-flex">
        <button onClick={toggleThemeCustomizerOffcanvas} type="button" className="topbar-button" id="theme-settings-btn" data-bs-toggle="offcanvas" data-bs-target="#theme-settings-offcanvas" aria-controls="theme-settings-offcanvas">
          <IconifyIcon icon="ri:settings-4-line" className=" fs-24" />
        </button>
      </div>
      {hasOpenedOnce && <ThemeCustomizer open={open} toggle={toggleThemeCustomizerOffcanvas} />}
    </>;
};
export default ThemeCustomizerToggle;