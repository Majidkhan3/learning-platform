import React from 'react'
import { Row } from 'react-bootstrap'
import BalanceCard from './components/BalanceCard';
import SalesChart from './components/SalesChart';
import SocialSource from './components/SocialSource';
import Statistics from './components/Statistics';
import Transaction from './components/Transaction';
const page = () => {
  return (
    <>
      <Statistics />
      <Row>
        <SalesChart />
        <BalanceCard />
      </Row>
      <SocialSource />
      <Transaction /> 
    </>
  )
}

export default page
