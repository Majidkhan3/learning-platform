'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useLayoutContext } from '@/context/useLayoutContext';
import React from 'react';
const ThemeModeToggle = () => {
  const {
    theme,
    changeTheme
  } = useLayoutContext();
  const isDark = theme === 'dark';
  return <div className="topbar-item">
      <button type="button" onClick={() => changeTheme(isDark ? 'light' : 'dark')} className="topbar-button" id="light-dark-mode">
        {theme == 'dark' ? <IconifyIcon icon="ri:sun-line" className="fs-24 dark-mode" /> : <IconifyIcon icon="ri:moon-line" className="fs-24 light-mode" />}
      </button>
    </div>;
};
export default ThemeModeToggle;