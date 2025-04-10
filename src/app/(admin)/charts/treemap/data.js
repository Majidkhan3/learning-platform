export const basicTreemapOpts = {
  series: [{
    data: [{
      x: 'New Delhi',
      y: 218
    }, {
      x: 'Kolkata',
      y: 149
    }, {
      x: 'Mumbai',
      y: 184
    }, {
      x: 'Ahmedabad',
      y: 55
    }, {
      x: 'Bangaluru',
      y: 84
    }, {
      x: 'Pune',
      y: 31
    }, {
      x: 'Chennai',
      y: 70
    }, {
      x: 'Jaipur',
      y: 30
    }, {
      x: 'Surat',
      y: 44
    }, {
      x: 'Hyderabad',
      y: 68
    }, {
      x: 'Lucknow',
      y: 28
    }, {
      x: 'Indore',
      y: 19
    }, {
      x: 'Kanpur',
      y: 29
    }]
  }],
  colors: ['#4697ce'],
  legend: {
    show: false
  },
  chart: {
    height: 350,
    type: 'treemap'
  },
  title: {
    text: 'Basic Treemap',
    align: 'center'
  }
};
export const multipleSeriesTreemapOpts = {
  series: [{
    name: 'Desktops',
    data: [{
      x: 'ABC',
      y: 10
    }, {
      x: 'DEF',
      y: 60
    }, {
      x: 'XYZ',
      y: 41
    }]
  }, {
    name: 'Mobile',
    data: [{
      x: 'ABCD',
      y: 10
    }, {
      x: 'DEFG',
      y: 20
    }, {
      x: 'WXYZ',
      y: 51
    }, {
      x: 'PQR',
      y: 30
    }, {
      x: 'MNO',
      y: 20
    }, {
      x: 'CDE',
      y: 30
    }]
  }],
  legend: {
    show: false
  },
  chart: {
    height: 350,
    type: 'treemap'
  },
  colors: ['#f9b931', '#1bb394'],
  title: {
    text: 'Multi-dimensional Treemap',
    align: 'center'
  }
};
export const distributedTreemapOpts = {
  series: [{
    data: [{
      x: 'New Delhi',
      y: 218
    }, {
      x: 'Kolkata',
      y: 149
    }, {
      x: 'Mumbai',
      y: 184
    }, {
      x: 'Ahmedabad',
      y: 55
    }, {
      x: 'Bangaluru',
      y: 84
    }, {
      x: 'Pune',
      y: 31
    }, {
      x: 'Chennai',
      y: 70
    }, {
      x: 'Jaipur',
      y: 30
    }, {
      x: 'Surat',
      y: 44
    }, {
      x: 'Hyderabad',
      y: 68
    }, {
      x: 'Lucknow',
      y: 28
    }, {
      x: 'Indore',
      y: 19
    }, {
      x: 'Kanpur',
      y: 29
    }]
  }],
  legend: {
    show: false
  },
  chart: {
    height: 350,
    type: 'treemap'
  },
  title: {
    text: 'Distibuted Treemap (different color for each cell)',
    align: 'center'
  },
  colors: ['#4697ce', '#53389f', '#7f56da', '#ff86c8', '#ed5565', '#23c6c8', '#f9b931', '#1bb394', '#2a668b', '#35ba44', '#4ccedd', '#23c880', '#ed8055'],
  plotOptions: {
    treemap: {
      distributed: true,
      enableShades: false
    }
  }
};
const colors = ['#4697ce', '#1bb394'];
export const colorRangeTreemapOpts = {
  series: [{
    data: [{
      x: 'INTC',
      y: 1.2
    }, {
      x: 'GS',
      y: 0.4
    }, {
      x: 'CVX',
      y: -1.4
    }, {
      x: 'GE',
      y: 2.7
    }, {
      x: 'CAT',
      y: -0.3
    }, {
      x: 'RTX',
      y: 5.1
    }, {
      x: 'CSCO',
      y: -2.3
    }, {
      x: 'JNJ',
      y: 2.1
    }, {
      x: 'PG',
      y: 0.3
    }, {
      x: 'TRV',
      y: 0.12
    }, {
      x: 'MMM',
      y: -2.31
    }, {
      x: 'NKE',
      y: 3.98
    }, {
      x: 'IYT',
      y: 1.67
    }]
  }],
  legend: {
    show: false
  },
  chart: {
    height: 350,
    type: 'treemap'
  },
  title: {
    text: 'Treemap with Color scale',
    align: 'center'
  },
  dataLabels: {
    enabled: true,
    formatter: function (text, opts) {
      return text + '  ' + opts.value;
    },
    style: {
      fontSize: '12px'
    },
    offsetY: -4
  },
  plotOptions: {
    treemap: {
      enableShades: true,
      shadeIntensity: 0.5,
      reverseNegativeShade: true,
      colorScale: {
        ranges: [{
          from: -6,
          to: 0,
          color: colors[0]
        }, {
          from: 0.001,
          to: 6,
          color: colors[1]
        }]
      }
    }
  }
};