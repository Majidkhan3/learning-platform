
"use client";
import LogoBox from '@/components/LogoBox';
import React from 'react';
import HoverMenuToggle from './components/HoverMenuToggle';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import AppMenu from './components/AppMenu';
import { getMenuItems } from '@/helpers/Manu';
const page = ({isAdmin}) => {
  const adminItems=[
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'ri:home-office-line',
      url: '/admin/dashboard',
    },
    {
      key: 'story',
      label: 'Histoires',
      icon: 'ri:arrow-left-right-line',
      url: '/dashboards/story',
    },
    {
      key: 'flashcard',
      label: 'Flash Cards',
      icon: 'ri:discuss-line',
      url: '/dashboards/flashcard',
    },
  ]
  console.log('isAdmin', isAdmin)
  const menuItems = isAdmin ? adminItems:  getMenuItems();
  console.log('menuItems', menuItems)
  return <div className="main-nav" id='leftside-menu-container'>
      <LogoBox />
      <HoverMenuToggle />
      <SimplebarReactClient className="scrollbar" data-simplebar>
        <AppMenu menuItems={menuItems} />
      </SimplebarReactClient>
    </div>;
};
export default page;