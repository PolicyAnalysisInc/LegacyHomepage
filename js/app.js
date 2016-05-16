"use strict";

$(document).foundation();
$("#carousel").slick({
  dots: true,
  infinite: false,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1
});


var chart1 = c3.generate({
    bindto: '#chart1',
    data: {
        columns: [
            ['data1', 10000 + Math.random() * 40000, 10000 + Math.random() * 50000, 10000 + Math.random() * 60000, 10000 + Math.random() * 70000, 10000 + Math.random() * 80000],
            ['data2', 10000 + Math.random() * 40000, 10000 + Math.random() * 50000, 10000 + Math.random() * 60000, 10000 + Math.random() * 70000, 10000 + Math.random() * 80000],
            ['data3', 10000 + Math.random() * 40000, 10000 + Math.random() * 50000, 10000 + Math.random() * 60000, 10000 + Math.random() * 70000, 10000 + Math.random() * 80000]
        ],
        order: null,
        type: 'bar',
        groups: [
            ['data1', 'data2', 'data3']
        ]
    },
    bar: {
        width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    },
    axis: {
        x: {
          type: "category",
          categories: ["2016","2017","2018","2019","2020"]
        },
        y: {
          show: false
        }
    },
    transition: {
        duration: 800
    },
    size: {
        height: 200,
        width: 300
    },
    tooltip: {
        show: false
    },
    legend: {
      show: false
    }
});


setInterval(function () {
    chart1.load({
        columns: [
            ['data1', 10000 + Math.random() * 40000, 10000 + Math.random() * 50000, 10000 + Math.random() * 60000, 10000 + Math.random() * 70000, 10000 + Math.random() * 80000],
            ['data2', 10000 + Math.random() * 40000, 10000 + Math.random() * 50000, 10000 + Math.random() * 60000, 10000 + Math.random() * 70000, 10000 + Math.random() * 80000],
            ['data3', 10000 + Math.random() * 40000, 10000 + Math.random() * 50000, 10000 + Math.random() * 60000, 10000 + Math.random() * 70000, 10000 + Math.random() * 80000]
        ],
    });
}, 5000);