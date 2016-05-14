$(document).foundation();
$("#carousel").slick({
  dots: true,
  infinite: false,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1
});

var chart = c3.generate({
    bindto: '#chart1',
    data: {
        columns: [
            ['data', 50000]
        ],
        type: 'gauge'
    },
    tooltip: {
        show: false
    },
    gauge: {
        label: {
            format: function(value, ratio) {
                return d3.format("$0,000.0f")(value) + " / QALY";
            },
            show: false // to turn off the min/max labels.
        },
    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    max: 300000, // 100 is default
    units: '$',
//    width: 39 // for adjusting arc thickness
    },
    color: {
        pattern: ['#00FF49', '#FFC400', '#FF002F'], // the three color levels for the percentage values.
        threshold: {
//            unit: 'value', // percentage is default
//            max: 200, // 100 is default
            values: [100000, 150000, 200000]
        }
    },
    transition: {
        duration: 800
    },
    size: {
        height: 200,
        width: 300
    }
});

setInterval(function () {
    chart.load({
        columns: [['data', Math.round(50000 + Math.random() * 180000,0)]]
    });
}, 5000);