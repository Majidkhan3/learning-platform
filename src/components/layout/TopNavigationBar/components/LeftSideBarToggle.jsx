'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLayoutContext } from '@/context/useLayoutContext';
const LeftSideBarToggle = () => {
  const {
    menu: {
      size
    },
    changeMenu: {
      size: changeMenuSize
    },
    toggleBackdrop
  } = useLayoutContext();
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const handleMenuSize = () => {
    if (size === 'hidden') toggleBackdrop();
    if (size === 'condensed') changeMenuSize('default');else if (size === 'default') changeMenuSize('condensed');
  };
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else if (size === 'hidden') {
      toggleBackdrop();
    }
  }, [pathname]);
  return <div className="topbar-item">
      <button type="button" onClick={handleMenuSize} className="button-toggle-menu topbar-button">
        <IconifyIcon icon="ri:menu-2-line" width={24} height={24} className="fs-24" />
      </button>
    </div>;
};
export default LeftSideBarToggle;