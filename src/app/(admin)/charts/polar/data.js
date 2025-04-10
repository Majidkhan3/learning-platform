export const basicPolarAreaOpts = {
  series: [14, 23, 21, 17, 15, 10],
  chart: {
    height: 380,
    type: 'polarArea'
  },
  stroke: {
    colors: ['#fff']
  },
  fill: {
    opacity: 0.8
  },
  labels: ['Vote A', 'Vote B', 'Vote C', 'Vote D', 'Vote E', 'Vote F'],
  legend: {
    position: 'bottom'
  },
  colors: ['#4697ce', '#53389f', '#7f56da', '#ff86c8', '#e06d94', '#63b7e6'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
};
export const monochromePolarAreaOpts = {
  series: [42, 47, 52, 58, 65],
  chart: {
    height: 380,
    type: 'polarArea'
  },
  labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
  fill: {
    opacity: 1
  },
  stroke: {
    width: 1
  },
  yaxis: {
    show: false
  },
  legend: {
    position: 'bottom'
  },
  plotOptions: {
    polarArea: {
      rings: {
        strokeWidth: 0
      },
      spokes: {
        strokeWidth: 0
      }
    }
  },
  theme: {
    monochrome: {
      enabled: true,
      shadeTo: 'light',
      color: '#727cf5',
      shadeIntensity: 0.6
    }
  }
};