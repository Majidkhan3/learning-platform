
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
      key: 'users',
      label: 'Users',
      icon: 'ri:discuss-line',
      url: '/admin/dashboard/users',
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