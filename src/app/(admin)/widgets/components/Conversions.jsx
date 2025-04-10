'use client';

import { Button, Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
const Conversions = () => {
  const chartOptions = {
    chart: {
      height: 292,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: '14px',
            color: 'undefined',
            offsetY: 100
          },
          value: {
            offsetY: 55,
            fontSize: '20px',
            color: undefined,
            formatter: function (val) {
              return val + '%';
            }
          }
        },
        track: {
          background: 'rgba(170,184,197, 0.2)',
          margin: 0
        }
      }
    },
    fill: {
      gradient: {
        // enabled: true,
        shade: 'dark',
        shadeIntensity: 0.2,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91]
      }
    },
    stroke: {
      dashArray: 4
    },
    colors: ['#7f56da', '#22c55e'],
    series: [65.2],
    labels: ['Returning Customer'],
    responsive: [{
      breakpoint: 380,
      options: {
        chart: {
          height: 180
        }
      }
    }],
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    }
  };
  const chartOptions2 = {
    series: [{
      name: 'Page Views',
      type: 'bar',
      data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67]
    }, {
      name: 'Clicks',
      type: 'area',
      data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35]
    }],
    chart: {
      height: 313,
      type: 'line',
      toolbar: {
        show: false
      }
    },
    stroke: {
      dashArray: [0, 0],
      width: [0, 2],
      curve: 'smooth'
    },
    fill: {
      opacity: [1, 1],
      type: ['solid', 'gradient'],
      gradient: {
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90]
      }
    },
    markers: {
      size: [0, 0],
      strokeWidth: 2,
      hover: {
        size: 4
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      min: 0,
      axisBorder: {
        show: false
      }
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 0,
        right: -2,
        bottom: 0,
        left: 10
      }
    },
    legend: {
      show: true,
      horizontalAlign: 'center',
      offsetX: 0,
      offsetY: 5,
      markers: {},
      itemMargin: {
        horizontal: 10,
        vertical: 0
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
        barHeight: '70%',
        borderRadius: 3
      }
    },
    colors: ['#7f56da', '#22c55e'],
    tooltip: {
      shared: true,
      y: [{
        formatter: function (y) {
          if (typeof y !== 'undefined') {
            return y.toFixed(1) + 'k';
          }
          return y;
        }
      }, {
        formatter: function (y) {
          if (typeof y !== 'undefined') {
            return y.toFixed(1) + 'k';
          }
          return y;
        }
      }]
    }
  };
  return <Card>
      <CardBody className="p-0">
        <Row className="g-0">
          <Col lg={4}>
            <div className="p-3 d-flex flex-column justify-content-between h-100">
              <CardTitle as={'h5'}>Conversions</CardTitle>
              <ReactApexChart options={chartOptions} series={chartOptions.series} height={292} type="radialBar" className="apex-charts mb-2 mt-n2" />
              <Row className="text-center">
                <Col xs={6}>
                  <p className="text-muted mb-2">This Week</p>
                  <h3 className="text-dark mb-3">23.5k</h3>
                </Col>
                <Col xs={6}>
                  <p className="text-muted mb-2">Last Week</p>
                  <h3 className="text-dark mb-3">41.05k</h3>
                </Col>
              </Row>
              <div className="text-center">
                <Button variant="light" type="button" className="shadow-none w-100">
                  View Details
                </Button>
              </div>
            </div>
          </Col>
          <Col lg={8} className="border-start border-5">
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center">
                <CardTitle>Performance</CardTitle>
                <div>
                  <Button variant="outline-light" size="sm" type="button" className="me-1">
                    ALL
                  </Button>
                  <Button variant="outline-light" size="sm" type="button" className="me-1">
                    1M
                  </Button>
                  <Button variant="outline-light" size="sm" type="button" className="me-1">
                    6M
                  </Button>
                  <Button variant="outline-light" size="sm" type="button" active>
                    1Y
                  </Button>
                </div>
              </div>
              <div className="alert alert-info mt-3 text text-truncate mb-0" role="alert">
                We regret to inform you that our server is currently experiencing technical difficulties.
              </div>
              <div dir="ltr">
                <ReactApexChart options={chartOptions2} series={chartOptions2.series} height={313} type="line" className="apex-charts" />
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>;
};
export default Conversions;