'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
const OwnProperty = () => {
  const OwnPropertyOptions = {
    chart: {
      height: 343,
      type: 'radialBar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: 'transparent',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: 'rgba(170,184,197, 0.4)',
          strokeWidth: '67%',
          margin: 0
        },
        dataLabels: {
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px'
          },
          value: {
            color: '#111',
            fontSize: '36px',
            show: true
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#7f56da', '#4697ce'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    series: [27],
    stroke: {
      lineCap: 'round'
    },
    labels: ['Own']
  };
  return <Card>
      <CardHeader>
        <CardTitle as={'h4'}>Own Property</CardTitle>
      </CardHeader>
      <CardBody>
        <ReactApexChart options={OwnPropertyOptions} series={OwnPropertyOptions.series} height={343} type="radialBar" className="apex-charts" />
        <div className="d-flex justify-content-between align-content-center">
          <div className="d-flex align-items-center gap-3">
            <div className="avatar flex-shrink-0">
              <span className="avatar-title bg-danger-subtle text-danger fw-bold rounded">
                <IconifyIcon icon="ri:arrow-up-line" width={20} height={20} className="fs-20" />
              </span>
            </div>
            <div>
              <h4 className="text-dark fw-semibold mb-1">{currency}928,128</h4>
              <p className="mb-0 text-muted">Total Invest On Property</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="avatar flex-shrink-0">
              <span className="avatar-title bg-success-subtle text-success fw-bold rounded">
                <IconifyIcon icon="ri:arrow-down-line" width={20} height={20} className="fs-20" />
              </span>
            </div>
            <div>
              <h4 className="text-dark fw-semibold mb-1">{currency}613,321.12</h4>
              <p className="mb-0 text-muted">Income</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>;
};
export default OwnProperty;