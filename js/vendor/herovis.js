"use strict";
var r2d3 = r2d3 || {};
r2d3.round = function(x, n) {
  var ten_n = Math.pow(10,n);
  return Math.round(x * ten_n) / ten_n;
};
r2d3.drawXAxes = function(plot, stroke, opacity, axis, center){
  var update = plot.groups.panel.selectAll(".xAxis").data(plot.facet.data, plot.facet.id),
      enter = update.enter(),
      exit = update.exit();

  // Update selection: call axis, transform, only show text for bottom-most facets
  update
    .transition()
    .call(plot.transitions.update)
    .attr("transform", function(d){
      var x = plot.scales.fx(d.fx),
          y = plot.scales.fy(d.fy) + plot.scales.fy.rangeBand();
      if(center){
        y = y - plot.axes.y.scale()(0);
      }
      return "translate(" + x + "," + y + ")";
    })
    .attr("fill-opacity", function(d) {
      if(d.fy === d.fy_last || axis) return 1;
      else return 0;
    })
    //.attr("stroke-opacity", function(d) {
    //  if(d.fy === d.fy_last) return 1;
    //  else return 0;
    //})
    .call(plot.axes.x);

  // Set class attributes for external styling outside of transition
  update.selectAll("text").attr("class", "xTickText");
  if(axis){
    update.selectAll(".axis path")
      .attr("stroke", stroke)
      .attr("stroke-width", 1)
      .attr("stroke-opacity", opacity);
  }else{
    update.selectAll(".axis path")
      .attr("stroke-width", 0);
  }
  update.selectAll(".tick line")
    .attr("stroke", stroke)
    .attr("stroke-opacity", opacity);

  // Capture enter group separately for re-use
  var enterGroup = enter.append("g");

  // Enter selection: Set class attribute, transform, only show text for bottom-most facets
  enterGroup
    .append("g")
    .attr("class", "xAxis axis")
    .attr("transform", function(d){
      var x = plot.scales.fx(d.fx),
          y = plot.scales.fy(d.fy) + plot.scales.fy.rangeBand();
      if(center){
        y = y - plot.axes.y.scale()(0);
      }
      return "translate(" + x + "," + y + ")";
    })
    .transition()
    .call(plot.transitions.enter)
    .attr("fill-opacity", function(d) {
      if(d.fy === d.fy_last || axis) return 1;
      else return 0;
    })
    //.attr("stroke-opacity", function(d) {
    //  if(d.fy === d.fy_last) return 1;
    //  else return 0;
    //})
    .call(plot.axes.x);

  // Set class attributes for external styling outside of transition
  enterGroup.selectAll("text").attr("class", "xTickText");
  if(axis){
    enterGroup.selectAll(".axis path")
      .attr("stroke", stroke)
      .attr("stroke-width", 1)
      .attr("stroke-opacity", opacity);
  }else{
    update.selectAll(".axis path")
      .attr("stroke-width", 0);
  }
  enterGroup.selectAll(".tick line")
    .attr("stroke", stroke)
    .attr("stroke-opacity", opacity);

  // Exit selection: Remove
  exit.remove();

};
r2d3.drawYAxes = function(plot, stroke, opacity, axis, center){
  var update = plot.groups.panel.selectAll(".yAxis").data(plot.facet.data, plot.facet.id),
      enter = update.enter(),
      exit = update.exit();

  // Update selection: call axis, transform, only show text for left-most facets
  update
    .transition()
    .call(plot.transitions.update)
    .attr("transform", function(d){
      var x = plot.scales.fx(d.fx),
          y = plot.scales.fy(d.fy);
      if(center){
        x = x + plot.axes.x.scale()(0);
      }
      return "translate(" + x + "," + y + ")";
    })
    .attr("fill-opacity", function(d) {
      if(d.fx === d.fx_first || axis) return 1;
      else return 0;
    })
    .attr("stroke-opacity", function(d) {
      if(d.fx === d.fx_first || axis) return 1;
      else return 0;
    })
    .call(plot.axes.y);

  // Set class attributes for external styling outside of transition
  update
    .selectAll("text")
      .attr("class", "yTickText");
  if(axis){
    update.selectAll(".axis path")
      .attr("stroke", stroke)
      .attr("stroke-width", 1)
      .attr("stroke-opacity", opacity);
  }else{
    update.selectAll(".axis path")
      .attr("stroke-width", 0);
  }
  update.selectAll(".tick line")
    .attr("stroke", stroke)
    .attr("stroke-opacity", opacity);

  // Capture enter group separately for re-use
  var enterGroup = enter.append("g");

  // Enter selection: Set class attribute, transform, only show text for left-most facets
  enterGroup
    .append("g")
    .attr("class", "yAxis axis")
    .attr("transform", function(d){
      var x = plot.scales.fx(d.fx),
          y = plot.scales.fy(d.fy);
      if(center){
        x = x + plot.axes.x.scale()(0);
      }
      return "translate(" + x + "," + y + ")";
    })
    .transition()
    .call(plot.transitions.enter)
    .attr("fill-opacity", function(d) {
      if(d.fx === d.fx_first || axis) return 1;
      else return 0;
    })
    .attr("stroke-opacity", function(d) {
      if(d.fx === d.fx_first || axis) return 1;
      else return 0;
    })
    .call(plot.axes.y);

  // Set class attributes for external styling outside of transition
  enterGroup
    .selectAll("text")
      .attr("class", "yTickText");
  if(axis){
    enterGroup.selectAll(".axis path")
      .attr("stroke", stroke)
      .attr("stroke-width", 1)
      .attr("stroke-opacity", opacity);
  }else{
    update.selectAll(".axis path")
      .attr("stroke-width", 0);
  }
  enterGroup.selectAll(".tick line")
    .attr("stroke", stroke)
    .attr("stroke-opacity", opacity);


  // Exit selection: Remove
  exit.remove();

};


// Draws a vertical reference line for every facet in plot
r2d3.drawVLine = function(plot, x){
  // Compute selections
  var update = plot.groups.marks.selectAll(".vLine").data(plot.facet.data, plot.facet.id),
      enter = update.enter(),
      exit = update.exit();
  // Update selection
  update
    .transition()
    .call(plot.transitions.update)
    .attr("transform", function(d){
      return "translate(" + plot.scales.fx(d.fx) + "," + plot.scales.fy(d.fy) + ")";
    })
    .attr("y1", 0)
    .attr("y2", plot.scales.fy.rangeBand())
    .attr("x1", plot.scales.x.linear(x))
    .attr("x2", plot.scales.x.linear(x));
  // Enter selection
  enter
    .append("line")
    .transition()
    .call(plot.transitions.enter)
    .attr("class","vLine")
    //.style("stroke-dasharray", ("2, 2"))
    .attr("transform", function(d){
      return "translate(" + plot.scales.fx(d.fx) + "," + plot.scales.fy(d.fy) + ")";
    })
    .attr("y1", 0)
    .attr("y2", plot.scales.fy.rangeBand())
    .attr("x1", plot.scales.x.linear(x))
    .attr("x2", plot.scales.x.linear(x));
  // Exit selection
  exit.transition().call(plot.transitions.exit).remove();
};

// Constructor for a plot object.  Plot objects represent an SVG element on the page.  They can take a set of JSON specifications and draw a plot.  If the specification given is of a comparable type to the pervious specification, the plot is drawn with transitional animations.
//

r2d3.plot = function(parent, margin){
  // capture reference to this that can safely be used in callsbacks.
  var that = this;
  // Define properies
  that.spec = null;
  that.queue = null;
  that.parent = parent;
  that.id = parent.id;
  that.busy = false;
  that.lock = function(){
    that.busy = true;
    setTimeout(that.unlock, 1200);
  };
  that.unlock = function(){
    that.busy = false;
  };
  // Generate an id number which works to append a unqiue CSS class for each chart's tooltips
  // Don't like this solution, but you'd at least hope the odds of a collision on this are low...
  that.idNum = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 0 + 1) + 0);
  that.margin = margin;
  that.width = $("#" + that.id).width() - that.margin.left - that.margin.right;
  that.height = $("#" + that.id).height() - that.margin.top - that.margin.bottom;
  that.svg = d3.select("#" + that.id).append("svg")
    .attr("height", $("#" + that.id).height())
    .attr("width", $("#" + that.id).width());
  that.tooltips = d3.tip().attr('class', "d3-tip" + (that.idNum) + " d3-tip");
  that.groups = {
    marks: that.svg.append("g")
      .attr(
        "transform",
        "translate(" + that.margin.left + "," + that.margin.top + ")"
      ),
    panel : that.svg.append("g")
      .attr(
        "transform",
        "translate(" + that.margin.left + "," + that.margin.top + ")"
      ),
    legend: that.svg.append("g")
      .attr("class", "legendLinear")
      .attr("transform", "translate(" + (that.width + that.margin.right/5 + that.margin.left) + "," + (that.height / 3) + ")")
  };
  that.scales = {
    x: {
      linear: d3.scale.linear(),
      ordinal: d3.scale.ordinal()
    },
    y: {
      linear: d3.scale.linear(),
      ordinal: d3.scale.ordinal()
    },
    color: {
      linear: d3.scale.linear(),
      ordinal: d3.scale.category10()
    },
    group: d3.scale.ordinal(),
    fx: d3.scale.ordinal(),
    fy: d3.scale.ordinal(),
    legend: d3.scale.ordinal()
  };
  that.labels = {
    x: that.groups.panel.append("text").attr("class","xAxisText"),
    y: that.groups.panel.append("text").attr("class","yAxisText")
  };
  that.axes = {
    x: d3.svg.axis(),
    y: d3.svg.axis()
  };
  that.transitions = {
    enter: function(selection){
      return selection.delay(250).duration(0);
    },
    exit: function(selection){
      return selection.delay(0).duration(0);
    },
    update: function(selection){
      return selection.delay(0).duration(1000);
    },
    updateDelayed: function(selection){
      return selection.delay(1000).duration(0);
    }
  };
  that.facet = {
    data: {
      id: [],
      fx: [],
      fy: []
    },
    predraw: function() {},
    draw: function(){
      // Facet title text
      var ftUpdate = that.groups.panel
            .selectAll(".facetTitle")
            .data(that.facet.data, that.facet.id),
          ftEnter = ftUpdate.enter(),
          ftExit = ftUpdate.exit();

      ftUpdate
        .transition()
        .call(that.transitions.update)
        .attr("x", function(d){
          return that.scales.fx(d.fx) + that.scales.fx.rangeBand() / 2;
        })
        .attr("y", function(d){
          return that.scales.fy(d.fy) - 12.5;
        })
        .text(function(d){ return d.id; });
      ftEnter.append("text")
        .transition()
        .call(that.transitions.enter)
        .attr("class", "facetTitle")
        .attr("x", function(d){
          return that.scales.fx(d.fx) + that.scales.fx.rangeBand() / 2;
        })
        .attr("y", function(d){
          return that.scales.fy(d.fy) - 12.5;
        })
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .text(function(d){ return d.id; });
      ftExit.transition().call(that.transitions.exit).remove();
    },
    id: function(d){
      return d.id;
    }
  };
  that.barMulti = {
    data: {
      x: [],
      fx: [],
      fy: []
    },
    predraw: function() {},
    draw: function(){
      var flatData = [],
          nestData = [],
          aggData = [],
          plotData = [];

      // Capture groups
      var groups = d3.keys(that.barMulti.data[0]).filter(function(key) {
        return key !== "x" && key !== "fx" && key !== "fy";
      });

      // Arrange data according to layout
      if(that.spec.layout == "Waterfall"){
        // Nest by facet
        nestData = d3.nest()
          .key(function(d){ return d.fx + "~" + d.fy; })
          .entries(that.barMulti.data);


        // Flatten data
        nestData.forEach(function(d){
          var cumulative = 0;
          d.values.forEach(function(e){
            groups.forEach(function(group){
              flatData.push({
                fx: e.fx,
                fy: e.fy,
                x: e.x,
                group: group,
                y: e[group],
                y0: cumulative,
                y1: cumulative += e[group]
              });
            });
            flatData.push({
              fx: e.fx,
              fy: e.fy,
              x: e.x,
              group: "Total",
              y: cumulative,
              y0: 0,
              y1: cumulative
            });
          });
        });
      }
      else if(that.spec.layout == "Stacked"){
        that.barMulti.data.forEach(function(e){
          var pos_cum = 0;
          var neg_cum = 0;
          groups.forEach(function(group){
            if(e[group] >= 0) flatData.push({
              fx: e.fx,
              fy: e.fy,
              x: e.x,
              group: group,
              y: e[group],
              y0: pos_cum,
              y1: pos_cum += e[group]
            });
            else flatData.push({
              fx: e.fx,
              fy: e.fy,
              x: e.x,
              group: group,
              y: e[group],
              y0: neg_cum,
              y1: neg_cum += e[group]
            });
          });
        });
      }
      else if(that.spec.layout == "Grouped"){
        that.barMulti.data.forEach(function(e){
          groups.forEach(function(group){
            flatData.push({
              fx: e.fx,
              fy: e.fy,
              x: e.x,
              group: group,
              y: e[group],
              y0: 0,
              y1: e[group]
            });
          });
        });
      }

      // Update scales and get axis ticks
      var xSpacing = 0.25;
      if(that.spec.layout == "Waterfall") xSpacing = 0.25;
      that.scales.color.ordinal.domain(flatData.map(function(d){ return d.group; }));
      that.scales.x.ordinal.domain( flatData.map(function(d){ return d.x; }));
      that.scales.x.ordinal.rangeRoundBands([0, that.scales.fx.rangeBand()], xSpacing);
      that.scales.group.domain(flatData.map(function(d){ return d.group; }));
      that.scales.group.rangeRoundBands([0, that.scales.x.ordinal.rangeBand()], 0.05);
      var yTicks = r2d3.pretty(
            d3.min( flatData, function(d){ return Math.min(d.y0, d.y1); }),
            d3.max( flatData, function(d){ return Math.max(d.y0, d.y1); }),
            6
          ),
          yDom = r2d3.expandDomain(yTicks, 0, 0.05);
      that.scales.y.linear.domain(yDom);
      that.scales.y.linear.range([that.scales.fy.rangeBand(), 25]);
      that.scales.legend.domain(flatData.map(function(d){ return d.group; }));
      that.scales.legend.rangeRoundBands([0, that.width], 0.2, 1);

      // Prepare tooltips
      that.tooltips.html(function(d){
        return r2d3.locales[that.spec.locale].numberFormat(that.spec.formats.y)(d.y);
      }).offset([-5, 0]);
      that.groups.marks.call(that.tooltips);
      $(".d3-tip" + (that.idNum)).on("touchstart", that.tooltips.hide);

      // Bars
      var barUpdate = that.groups.marks
            .selectAll(".bar")
            .data(flatData,that.barMulti.id),
          barEnter = barUpdate.enter(),
          barExit = barUpdate.exit();
      var xCallback = function(d){ return that.scales.fx(d.fx) + that.scales.x.ordinal(d.x); },
          widthCallback = that.scales.x.ordinal.rangeBand();
      if(that.spec.layout !== "Stacked"){
        xCallback = function(d){ return that.scales.fx(d.fx) + that.scales.x.ordinal(d.x) + that.scales.group(d.group); };
        widthCallback = that.scales.group.rangeBand();
      }
      barUpdate
        .transition()
        .call(that.transitions.update)
        .attr("x", xCallback)
        .attr("width", widthCallback)
        .attr("y", function(d){ return that.scales.fy(d.fy) + that.scales.y.linear(Math.max(d.y0, d.y1)); })
        .attr("height", function(d){ return Math.abs(that.scales.y.linear(d.y0) - that.scales.y.linear(d.y1)); })
        .attr("fill", function(d){ return that.scales.color.ordinal(d.group); });
      barEnter
        .append("rect")
        .attr("class", "bar")
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("touchstart", that.tooltips.show)
        .on("mouseenter", that.tooltips.show)
        .on("mouseleave", that.tooltips.hide)
        .transition()
        .call(that.transitions.enter)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("x", xCallback)
        .attr("width", widthCallback)
        .attr("y", function(d){ return that.scales.fy(d.fy) + that.scales.y.linear(Math.max(d.y0, d.y1)); })
        .attr("height", function(d){ return Math.abs(that.scales.y.linear(d.y0) - that.scales.y.linear(d.y1)); })
        .attr("fill", function(d){ return that.scales.color.ordinal(d.group); });

      barExit.transition().call(that.transitions.exit).remove();

      r2d3.drawHLine(that, 0);

      // Update x-axis
      that.axes.x
        .orient("bottom")
        .scale(that.scales.x.ordinal)
        .innerTickSize(that.scales.fy.rangeBand())
        .outerTickSize(0);
      that.grids.x
        .orient("bottom")
        .scale(that.scales.x.ordinal)
        .innerTickSize(that.scales.fy.rangeBand())
        .outerTickSize(0);

      r2d3.drawXAxes(that, "#666666", 0.1, false);


      // Update y-axis
      that.axes.y
        .orient("left")
        .scale(that.scales.y.linear)
        .outerTickSize(0)
        .tickFormat(r2d3.locales[that.spec.locale].numberFormat(that.spec.formats.y))
        .tickValues(yTicks);
      that.grids.y
        .orient("left")
        .scale(that.scales.y.linear)
        .innerTickSize(-that.scales.fx.rangeBand())
        .outerTickSize(0)
        .tickValues(yTicks);

      r2d3.drawYAxes(that, "#666666", 1, false);


    },
    id: function(d){ return d.fx + ", " + d.fy + ", " + d.group + ", " + d.x ; }
  };
  that.bar = {
    data: {
      x: [],
      y: [],
      fx: [],
      fy: []
    },
    predraw: function() {},
    draw: function(){
      var flatData = [],
          nestData = [],
          aggData = [],
          plotData = [],
          lineData = [];

      nestData = d3.nest()
        .key(function(d){ return d.fx + "~" + d.fy; })
        .entries(that.bar.data);
      // Arrange data according to layout
      if(that.spec.layout == "Waterfall"){
        // Flatten data
        nestData.forEach(function(d){
          var cumulative = 0;
          d.values.forEach(function(e){
            flatData.push({
              fx: e.fx,
              fy: e.fy,
              x: e.x,
              y: e.y,
              x0: cumulative,
              x1: cumulative += e.x
            });
            lineData.push({
              fx: e.fx,
              fy: e.fy,
              x: cumulative,
              y: e.y
            });
          });
          flatData.push({
            fx: d.values[0].fx,
            fy: d.values[0].fy,
            x: cumulative,
            y: "Total",
            x0: 0,
            x1: cumulative
          });
        });
      }
      else{
        // Nest by facet
        nestData = d3.nest()
          .key(function(d){ return d.fx + "~" + d.fy; })
          .entries(that.bar.data);

        nestData.forEach(function(d){
          var cumulative = 0;
          d.values.forEach(function(e){
            cumulative += e.x;
            flatData.push({
              fx: e.fx,
              fy: e.fy,
              x: e.x,
              y: e.y,
              x0: 0,
              x1: e.x
            });
          });
          flatData.push({
            fx: d.values[0].fx,
            fy: d.values[0].fy,
            x: cumulative,
            y: "Total",
            x0: 0,
            x1: cumulative
          });
        });
      }
      // Update scales and get axis ticks
      var colorScheme = ["#e74c3c", "#f7c1bb","#fbedb7", "#c1f1d5", "#2ecc71"];
      if(that.spec.reverseColor){
        colorScheme.reverse();
      }
      var ySpacing = 0.5;
      var xMax = d3.max(flatData, function(d){ return d.x; }),
          xMin = d3.min(flatData, function(d){ return d.x; }),
          absMax = Math.max(xMax, -xMin, 0),
          absMin = Math.min(-xMax, xMin, 0);
      that.scales.color.linear
        .domain([absMin,0.001,0,0.001,absMax])
        .range(colorScheme);
      that.scales.y.ordinal.domain(flatData.map(function(d){ return d.y; }));
      that.scales.y.ordinal.rangeRoundBands([0, that.scales.fy.rangeBand()], ySpacing, 0.05);
      var numTicks = Math.round(that.width / 75);
      var xTicks = r2d3.pretty(
            d3.min( flatData, function(d){ return Math.min(d.x0, d.x1); }),
            d3.max( flatData, function(d){ return Math.max(d.x0, d.x1); }),
            numTicks
          ),
          xDom = r2d3.expandDomain(xTicks, 0, 0.001),
          xRng = xDom[1] - xDom[0];
      var colorTicks = r2d3.pretty(
            -d3.max( flatData, function(d){ return Math.abs(d.x); }),
            d3.max( flatData, function(d){ return Math.abs(d.x); }),
            6
          );
      var locale =  jQuery.extend(true, {}, r2d3.locales[that.spec.locale]),
          divisor = 1;

      var largest = d3.max( flatData, function(d){ return Math.abs(d.x); });
      if(largest > 10E7){
        locale.currency[1] = "M" + locale.currency[1];
        divisor = 1000000;
      }
      else if(largest > 10E4){
        locale.currency[1] = "K" + locale.currency[1];
        divisor = 1000;
      }
      locale = d3.locale(locale);
      that.scales.x.linear.domain(xDom);
      that.scales.x.linear.range([0, that.scales.fx.rangeBand()]);
      that.scales.legend.domain(flatData.map(function(d){ return d.group; }));
      that.scales.legend.rangeRoundBands([0, that.width], 0.2, 1);

      // Prepare tooltips
      that.tooltips.html(function(d){
        return locale.numberFormat(that.spec.formats.x)(d.x/divisor);
      }).offset([-5, 0]);
      that.groups.marks.call(that.tooltips);
      $(".d3-tip" + (that.idNum)).on("touchstart", that.tooltips.hide);

      // Bars
      var barUpdate = that.groups.marks
            .selectAll(".bar")
            .data(flatData,that.bar.id),
          barEnter = barUpdate.enter(),
          barExit = barUpdate.exit();
      var yCallback = function(d){
            return that.scales.fy(d.fy) + that.scales.y.ordinal(d.y);
          },
          heightCallback = that.scales.y.ordinal.rangeBand();

      barUpdate
        .transition()
        .call(that.transitions.update)
        .attr("y", yCallback)
        .attr("height", heightCallback)
        .attr("x", function(d){ return that.scales.fx(d.fx) + that.scales.x.linear(Math.min(d.x0, d.x1)); })
        .attr("width", function(d){ return Math.max(1, Math.abs(that.scales.x.linear(d.x0) - that.scales.x.linear(d.x1))); })
        .attr("fill", function(d){ return that.scales.color.linear(d.x); });
      barEnter
        .append("rect")
        .attr("class", "bar")
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("touchstart", function(d) {
          d3.selectAll(".d3-tip" + (that.idNum)).style("border-color", that.scales.color.linear(d.x));
          $(".d3-tip" + (that.idNum)).after().css("color", that.scales.color.linear(d.x));
          that.tooltips.show(d);
        })
        .on("mouseenter", function(d) {
         d3.selectAll(".d3-tip" + (that.idNum)).style("border-color", that.scales.color.linear(d.x));
          $(".d3-tip" + (that.idNum)).after().css("color", that.scales.color.linear(d.x));
          that.tooltips.show(d);
        })
        .on("mouseleave", that.tooltips.hide)
        .transition()
        .call(that.transitions.enter)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1)
        .attr("stroke", "#aaaaaa")
        .attr("stroke-width", 1)
        .attr("y", yCallback)
        .attr("height", heightCallback)
        .attr("x", function(d){ return that.scales.fx(d.fx) + that.scales.x.linear(Math.min(d.x0, d.x1)); })
        .attr("width", function(d){ return Math.max(1, Math.abs(that.scales.x.linear(d.x0) - that.scales.x.linear(d.x1))); })
        .attr("fill", function(d){ return that.scales.color.linear(d.x); });

      barExit.transition().call(that.transitions.exit).remove();

      // Lines
      var lineUpdate = that.groups.marks
            .selectAll(".barLine")
            .data(lineData, that.bar.id),
          lineEnter = lineUpdate.enter(),
          lineExit = lineUpdate.exit();

      lineUpdate
        .transition()
        .call(that.transitions.update)
        .attr("y1", function(d){ return that.scales.fy(d.fy) + that.scales.y.ordinal(d.y) + that.scales.y.ordinal.rangeBand(); })
        .attr("y2", function(d){ return that.scales.fy(d.fy) + that.scales.y.ordinal(d.y) + that.scales.y.ordinal.rangeBand() + that.scales.y.ordinal.rangeBand() * ySpacing / (1 - ySpacing)})
        .attr("x1", function(d){ return that.scales.fx(d.fx) + that.scales.x.linear(d.x); })
        .attr("x2", function(d){ return that.scales.fx(d.fx) + that.scales.x.linear(d.x); });

      lineEnter
        .append("line")
        .attr("class", "barLine")
        .attr("y1", function(d){ return that.scales.fy(d.fy) + that.scales.y.ordinal(d.y) + that.scales.y.ordinal.rangeBand(); })
        .attr("y2", function(d){ return that.scales.fy(d.fy) + that.scales.y.ordinal(d.y) + that.scales.y.ordinal.rangeBand(); })
        .attr("x1", function(d){ return that.scales.fx(d.fx) + that.scales.x.linear(d.x); })
        .attr("x2", function(d){ return that.scales.fx(d.fx) + that.scales.x.linear(d.x); })
        .transition()
        .call(that.transitions.enter)
        .style("stroke-dasharray", ("2, 2"))
        .attr("y1", function(d){ return that.scales.fy(d.fy) + that.scales.y.ordinal(d.y) + that.scales.y.ordinal.rangeBand(); })
        .attr("y2", function(d){ return that.scales.fy(d.fy) + that.scales.y.ordinal(d.y) + that.scales.y.ordinal.rangeBand() + that.scales.y.ordinal.rangeBand() * ySpacing / (1 - ySpacing)})
        .attr("x1", function(d){ return that.scales.fx(d.fx) + that.scales.x.linear(d.x); })
        .attr("x2", function(d){ return that.scales.fx(d.fx) + that.scales.x.linear(d.x); });

      lineExit.transition().call(that.transitions.exit).remove();
      r2d3.drawVLine(that, 0);
      // Update y-axis
      that.axes.y
        .orient("left")
        .scale(that.scales.y.ordinal)
        .innerTickSize(0)
        //.innerTickSize(-that.scales.fx.rangeBand())
        .outerTickSize(0);

      r2d3.drawYAxes(that, "#666666", 0.1, false);

      that.groups.panel.selectAll(".yAxis text")[0]
        .forEach(function(d){
          var el = d3.select(d);
          if(el.text() == "Total"){
            el.attr("font-weight", "bold");
          }else{
            el.attr("font-weight", "normal");
          }
      });

      // Update x-axis
      that.axes.x
        .orient("bottom")
        .scale(that.scales.x.linear)
        .innerTickSize(-that.scales.fy.rangeBand())
        .tickFormat(function(d) { return locale.numberFormat(that.spec.formats.x)(d/divisor); })
        .tickValues(xTicks);

      r2d3.drawXAxes(that, "#666666", 0.1, false);

      // Update legend

      var linear = d3.scale.linear()
          .domain([0,10])
          .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"]);

      var svg = d3.select("svg");

      var legendLinear = d3.legend.color()
        .shapeWidth(30)
        .orient('vertical')
        //.title("Legend")
        .shapeHeight(20)
        .shapeWidth(20)
        .ascending(true)
        .cells(colorTicks)
        .labelFormat(function(d) { return locale.numberFormat(that.spec.formats.x)(d/divisor); })
        .scale(that.scales.color.linear);

      that.groups.legend
        .call(legendLinear)
        .selectAll(".swatch")
          .attr("stroke", "#666666")
          .attr("stroke-width", 1)
          .attr("fill-opacity", 0.5);


    },
    id: function(d){ return d.fx + ", " + d.fy + ", " + d.y ; }
  };
  that.area = {
    data: [],
    pathData: {
      current: [],
      last: [],
      tweenStart: [],
      tweenEnd: []
    },
    lineGenerator: d3.svg.line()
      .x(function(d){
        return that.scales.x.linear(d.x) + that.scales.fx(d.fx);
      })
      .y(function(d){
        return that.scales.y.linear(d.y0 + d.y) + that.scales.fy(d.fy);
      })
      .interpolate("linear"),
    generator: d3.svg.area()
      .x(function(d){
        return that.scales.x.linear(d.x) + that.scales.fx(d.fx);
      })
      .y0(function(d){
        return that.scales.y.linear(d.y0) + that.scales.fy(d.fy);
      })
      .y1(function(d){
        return that.scales.y.linear(d.y0 + d.y) + that.scales.fy(d.fy);
      })
      .interpolate("linear"),
    stacker: d3.layout.stack()
      .values(function(d){ return d.values; }),
    predraw: function() {

      // Take first entry and populate the set of data series
      that.scales.color.ordinal
        .domain(d3.keys(that.area.data[0]).filter(
          function(key){
            // Take only the leftover variables (those that represent data values)
            var notKey = key !== "x" && key !== "fx" && key !== "fy";
            return notKey;
          }
        )
      );

      var nestedData = d3.nest()
        .key(function(d){ return d.fx + "~" + d.fy; })
        .entries(that.area.data)
        .map(function(d){
          return that.area.stacker(that.scales.color.ordinal.domain().map(
              function(name){
                return {
                  name: name,
                  key: d.key + "~" + name,
                  values: d.values.map(function(d1){
                    var tempObj = {};
                    tempObj.x = d1.x;
                    tempObj.fx = d1.fx;
                    tempObj.fy = d1.fy;
                    tempObj.y = d1[name];
                    return tempObj;
                  })
                };
              }
            )
          );
      });

      that.area.pathData.current = d3.merge(nestedData);

      // Setup tween datasets
      var newKeys = d3.set(that.area.pathData.current.map(function(d){ return d.key; })),
          oldKeys = d3.set(that.area.pathData.last.map(function(d){ return d.key; }));

      that.area.pathData.tweenStart = jQuery.extend(true, [], that.area.pathData.last).map(
        function(d){
          if(newKeys.has(d.key)){
            var oldData = d.values,
                newData = that.area.pathData.current.filter(function(d){ return d.key; })[0].values;
            d.values = r2d3.tweenAreaStart(oldData, newData, "x");
          }
          return d;
        }
      );

      that.area.pathData.tweenEnd = jQuery.extend(true, [], that.area.pathData.current).map(
        function(d){
          if(oldKeys.has(d.key)){
            var newData = d.values,
                oldData = that.area.pathData.last.filter(function(d){ return d.key; })[0].values;

            d.values = r2d3.tweenAreaEnd(oldData, newData, "x");
          }
          return d;
        }
      );

      that.area.pathData.last = jQuery.extend(true, [], that.area.pathData.current);
      // First action: Swap in the start tween

      // Define area selections
      var areaUpdateStart = that.groups.marks
            .selectAll(".area")
            .data(that.area.pathData.tweenStart, that.area.id),
          areaEnterStart = areaUpdateStart.enter(),
          areaExitStart = areaUpdateStart.exit();

      areaExitStart.remove();

      // Update selection
      areaUpdateStart
        .attr("fill", function(d) { return that.scales.color.ordinal(d.name); })
        .attr("fill-opacity", 0.5)
        .attr("d", function(d) { return that.area.generator(d.values); });

      // Enter selection
      areaEnterStart.append("path")
        .transition()
        .call(that.transitions.enter)
        .attr("class", "area")
        .attr("fill-opacity", 0.5)
        .attr("fill", function(d) { return that.scales.color.ordinal(d.name); })
        .attr("d", function(d) {return that.area.generator(d.values); });

      var lineData = that.area.pathData.tweenStart;//.filter(
     //   function(d){
  //        return d.name !== that.scales.color.ordinal.domain().slice(-1).pop();
  //      }
  //    );

      // Define line selections
      var lineUpdateStart = that.groups.marks
            .selectAll(".areaLine")
            .data(lineData, that.area.id),
          lineEnterStart = lineUpdateStart.enter(),
          lineExitStart = lineUpdateStart.exit();

      lineExitStart.remove();

      // Update selection
      lineUpdateStart
        .attr("stroke-width", 1)
        .attr("stroke", function(d) { return that.scales.color.ordinal(d.name); })
        .attr("d", function(d) { return that.area.lineGenerator(d.values); });

      // Enter selection
      lineEnterStart.append("path")
        .transition()
        .call(that.transitions.enter)
        .attr("class", "areaLine")
        .attr("stroke-width", 1)
        .attr("stroke", function(d) { return that.scales.color.ordinal(d.name); })
        .attr("d", function(d) {return that.area.lineGenerator(d.values); });
    },
    draw: function(){
      var xMax = d3.max(that.area.data, function(d){ return d.x; }),
          xMin = d3.min(that.area.data, function(d){ return d.x; }),
          absMax = Math.max(xMax, -xMin, 0),
          absMin = Math.min(-xMax, xMin, 0);

      var numTicks = Math.round(that.width / 80);
      var xTicks = r2d3.pretty(
            0,
            xMax,
            numTicks
          ).map(function(d) { return r2d3.round(d, 5); });

      that.scales.x.linear
        .domain(d3.extent(xTicks))
        .range([0, that.scales.fx.rangeBand()]);

      that.scales.y.linear
        .domain([0,1])
        .range([that.scales.fy.rangeBand(), 0]);

      var locale = d3.locale(r2d3.locales[that.spec.locale]);

      // Second action: Transition from start tween to end tween

      // Define area selections
      var areaUpdateEnd = that.groups.marks
            .selectAll(".area")
            .data(that.area.pathData.tweenEnd, that.area.id),
          //areaEnterEnd = areaUpdateEnd.enter(),
          areaExitEnd = areaUpdateEnd.exit();

      areaExitEnd.remove();

      // Update selection
      areaUpdateEnd
        .transition()
        .call(that.transitions.update)
        .attr("fill-opacity", 0.5)
        .attr("fill", function(d) { return that.scales.color.ordinal(d.name); })
        .attr("d", function(d) { return that.area.generator(d.values); });


      var lineDataEnd = that.area.pathData.tweenEnd;//.filter(
     //   function(d){
    //      return d.name !== that.scales.color.ordinal.domain().slice(-1).pop();
    //    }
    //  );

      // Define line selections
      var lineUpdateEnd = that.groups.marks
            .selectAll(".areaLine")
            .data(lineDataEnd, that.area.id),
          lineEnterEnd = lineUpdateEnd.enter(),
          lineExitEnd = lineUpdateEnd.exit();

      lineExitEnd.remove();

      // Update selection
      lineUpdateEnd
        .transition()
        .call(that.transitions.update)
        .attr("stroke-width", 1)
        .attr("stroke", function(d) { return that.scales.color.ordinal(d.name); })
        .attr("d", function(d) { return that.area.lineGenerator(d.values); });

      // Third action: swap in the final data

      // Define area selections
      var areaUpdate = that.groups.marks
            .selectAll(".area")
            .data(that.area.pathData.current, that.area.id),
          areaEnter = areaUpdate.enter(),
          areaExit = areaUpdate.exit();

      areaExit.remove();

      // Update selection
      areaUpdate
        .transition()
        .call(that.transitions.updateDelayed)
        .attr("fill-opacity", 0.5)
        .attr("fill", function(d) { return that.scales.color.ordinal(d.name); })
        .attr("d", function(d) { return that.area.generator(d.values); });

      // Enter selection
      areaEnter.append("path")
        .transition()
        .call(that.transitions.enter)
        .attr("class", "area")
        .attr("fill-opacity", 0.5)
        .attr("fill", function(d) { return that.scales.color.ordinal(d.name); })
        .attr("d", function(d) {return that.area.generator(d.values); });



      var lineData = that.area.pathData.current;//.filter(
  //      function(d){
   //       return d.name !== that.scales.color.ordinal.domain().slice(-1).pop();
    //    }
    //  );

      // Define line selections
      var lineUpdate = that.groups.marks
            .selectAll(".areaLine")
            .data(lineData, that.area.id),
          lineEnter = lineUpdate.enter(),
          lineExit = lineUpdate.exit();

      lineExit.remove();

      // Update selection
      lineUpdate
        .transition()
        .call(that.transitions.updateDelayed)
        .attr("stroke-width", 1)
        .attr("stroke", function(d) { return that.scales.color.ordinal(d.name); })
        .attr("d", function(d) { return that.area.lineGenerator(d.values); });

      // Enter selection
      lineEnter.append("path")
        .transition()
        .call(that.transitions.enter)
        .attr("class", "areaLine")
        .attr("stroke-width", 1)
        .attr("stroke", function(d) { return that.scales.color.ordinal(d.name); })
        .attr("d", function(d) {return that.area.lineGenerator(d.values); });

      // Define line selections
/*      var lineUpdate = that.groups.marks
            .selectAll(".areaLine")
            .data(lineData, that.area.id),
          lineEnter = lineUpdate.enter(),
          lineExit = lineUpdate.exit();

      lineExit.remove();

      // Update selection
      lineUpdate
        .transition()
        .call(that.transitions.update)
        .attr("stroke", "#000000")
        .attr("stroke-width", 1)
        .attr("fill-opacity", 0)
        .attr("d", function(d) { return that.area.lineGenerator(d.values); });

      // Enter selection
      lineEnter.append("path")
        .attr("class", "areaLine")
        .transition()
        .call(that.transitions.enter)
        .attr("fill-opacity", 0)
        .attr("stroke", "#000000")
        .attr("stroke-width", 1)
        .attr("d", function(d) {return that.area.lineGenerator(d.values); });*/

      var legendOrdinal = d3.legend.color()
        //.shapeWidth(30)
        .orient("vertical")
        //.title("Legend")
        .shapeHeight(20)
        .shapeWidth(20)
        .scale(that.scales.color.ordinal);

      that.groups.legend
        .call(legendOrdinal)
        .selectAll(".swatch")
          .attr("stroke", "#666666")
          .attr("stroke-width", 1)
          .attr("fill-opacity", 0.5);

      // Update y-axis
      that.axes.y
        .orient("left")
        .scale(that.scales.y.linear)
        //.innerTickSize(0)
        //.innerTickSize(-that.scales.fx.rangeBand())
        .tickFormat(function(d) { return locale.numberFormat(that.spec.formats.y)(d); })
        .outerTickSize(0)
        .tickValues([0,0.2,0.4,0.6,0.8,1]);

      r2d3.drawYAxes(that, "#666666", 1, true);

      // Update x-axis
      that.axes.x
        .orient("bottom")
        .scale(that.scales.x.linear)
        //.innerTickSize(-that.scales.fy.rangeBand())
        .tickFormat(function(d) { return locale.numberFormat(that.spec.formats.x)(d); })
        .tickValues(xTicks);

      r2d3.drawXAxes(that, "#666666", 1, true);

    },
    id: function(d){ return d.key; }
  };
  that.cePlane = {
    data: [],
    arrow: that.svg.append("defs").append("marker")
        .attr("id", "arrowhead" + that.idNum)
        .attr("refX", 13.5)
        .attr("refY", 3)
        .attr("markerWidth", 9)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0,0 V 6 L9,3 Z"),
    lineGenerator: d3.svg.line()
      .x(function(d){
        return that.scales.x.linear(d.x) + that.scales.fx(d.fx);
      })
      .y(function(d){
        return that.scales.y.linear(d.y) + that.scales.fy(d.fy);
      })
      .interpolate("linear"),
    generator: d3.svg.area()
      .x(function(d){
        return that.scales.x.linear(d.x) + that.scales.fx(d.fx);
      })
      .y0(function(d){
        return that.scales.y.linear(d.y0) + that.scales.fy(d.fy);
      })
      .y1(function(d){
        return that.scales.y.linear(d.y) + that.scales.fy(d.fy);
      })
      .interpolate("linear"),
    predraw: function(){

    },
    draw: function(){
      var xMax = d3.max(that.cePlane.data, function(d){ return d.x; }),
          xMin = d3.min(that.cePlane.data, function(d){ return d.x; }),
          yMax = d3.max(that.cePlane.data, function(d){ return d.y; }),
          yMin = d3.min(that.cePlane.data, function(d){ return d.y; }),
          absXMax = Math.max(xMax, -xMin, 0),
          absXMin = Math.min(-xMax, xMin, 0),
          absYMax = Math.max(yMax, -yMin, 0),
          absYMin = Math.min(-yMax, yMin, 0);

      var xDataLower = Math.min(0,xMin),
          xDataUpper = Math.max(0,xMax),
          yDataLower = Math.min(0,yMin),
          yDataUpper = Math.max(0,yMax);
      if(that.spec.layout == "Plane"){
        xDataLower =  Math.min(xDataLower, -xDataUpper);
        xDataUpper = Math.max(xDataUpper, -xDataLower);
        yDataLower =  Math.min(yDataLower, -yDataUpper);
        yDataUpper = Math.max(yDataUpper, -yDataLower);
      }

      that.scales.color.ordinal
        .domain(that.cePlane.data.map(function(d){ return d.group; }));

      var xDataBounds = [xDataLower, xDataUpper],
          yDataBounds = [yDataLower, yDataUpper],
          xChartBounds = r2d3.expandDomain(xDataBounds, 0, 0.25),
          yChartBounds = r2d3.expandDomain(yDataBounds, 0, 0.25);

      var numTicksX = Math.round(that.width / 80);
      var xTicks = r2d3.pretty(
            xChartBounds[0],
            xChartBounds[1],
            numTicksX
          ).filter(function(d) { return that.spec.layout == "Frontier" || Math.round(d*1000)/1000 != 0; }),
          numTicksY = Math.round(that.height / 50);
      var yTicks = r2d3.pretty(
            yChartBounds[0],
            yChartBounds[1],
            numTicksY
          ).filter(function(d) { return that.spec.layout == "Frontier" || Math.round(d*1000)/1000 != 0; });

      var xBounds = d3.extent(xTicks),
          yBounds = d3.extent(yTicks);
      var areaData = [];
      if(that.cePlane.data.length > 1){
        var areaXMin = xBounds[0];
        if(that.spec.misc.threshold > 0){
          areaXMin = Math.max(xBounds[0],yBounds[0]/ that.spec.misc.threshold + that.cePlane.data[1].x - that.cePlane.data[1].y / that.spec.misc.threshold);
        }

        areaData.push({
          x: areaXMin,
          y0: yBounds[0],
          y: that.spec.misc.threshold * (areaXMin - that.cePlane.data[1].x) + that.cePlane.data[1].y,
          fx: that.cePlane.data[1].fx,
          fy: that.cePlane.data[1].fy
        });
        areaData.push({
          x: xBounds[1],
          y0: yBounds[0],
          y: that.spec.misc.threshold * (xBounds[1] - that.cePlane.data[1].x) +that.cePlane.data[1].y,
          fx: that.cePlane.data[1].fx,
          fy: that.cePlane.data[1].fy
        });
      }

      that.scales.x.linear
        .domain(xBounds)
        .range([0, that.scales.fx.rangeBand()]);

      that.scales.y.linear
        .domain(yBounds)
        .range([that.scales.fy.rangeBand(), 0]);

      var locale =  jQuery.extend(true, {}, r2d3.locales[that.spec.locale]),
          divisor = 1;

      var largest = d3.max(that.cePlane.data, function(d){ return Math.abs(d.y); });
      if(largest > 10E7){
        locale.currency[1] = "M" + locale.currency[1];
        divisor = 1000000;
      }
      else if(largest > 10E4){
        locale.currency[1] = "K" + locale.currency[1];
        divisor = 1000;
      }

      var xTranslate = 0,
          yTranslate = 0,
          anchor =  "start";
      // Depending on difference in Costs/QALYs, determine appropriate translation
      if(that.cePlane.data[0].x > that.cePlane.data[1].x){
        // More effective
        if(that.cePlane.data[0].y > that.cePlane.data[1].y){
          // More costly
          xTranslate = 7;
          yTranslate = -5;
          anchor = "start";
        }else{
          // Less costly
          xTranslate = 7;
          yTranslate = 5;
          anchor = "start";
        }
      }else{
        // Less effective
        if(that.cePlane.data[0].y > that.cePlane.data[1].y){
          // More costly
          xTranslate = -7;
          yTranslate = 5;
          anchor = "end";
        }else{
          // Less costly
          xTranslate = -7;
          yTranslate = 5;
          anchor = "end";
        }
      }



      // Define area selections
      var areaUpdate = that.groups.marks
            .selectAll(".area")
            .data([areaData], that.area.id),
          areaEnter = areaUpdate.enter(),
          areaExit = areaUpdate.exit();

      areaExit.remove();

      // Update selection
      areaUpdate
        .transition()
        .call(that.transitions.update)
        .attr("fill-opacity", 0.5)
        .attr("fill", "#2ecc71")
        .attr("d", function(d) { return that.cePlane.generator(d); });

      // Enter selection
      areaEnter.append("path")
        .transition()
        .call(that.transitions.enter)
        .attr("class", "area")
        .attr("fill-opacity", 0.5)
        .attr("fill", "#2ecc71")
        .attr("d", function(d) {return that.cePlane.generator(d); });

      // Define area line selections
      var areaLineUpdate = that.groups.marks
            .selectAll(".areaLine")
            .data([areaData], that.area.id),
          areaLineEnter = areaLineUpdate.enter(),
          areaLineExit = areaLineUpdate.exit();

      areaLineExit.remove();

      // Update selection
      areaLineUpdate
        .transition()
        .call(that.transitions.update)
        .attr("stroke-width", 1)
        .attr("stroke", "#2ecc71")
        .attr("d", function(d) { return that.cePlane.lineGenerator(d); });

      // Enter selection
      areaLineEnter.append("path")
        .transition()
        .call(that.transitions.enter)
        .attr("class", "areaLine")
        .attr("stroke-width", 1)
        .attr("stroke", "#2ecc71")
        .attr("d", function(d) {return that.cePlane.lineGenerator(d); });


      // Define line selections
      var linesUpdate = that.groups.marks
            .selectAll(".pointLines")
            .data([that.cePlane.data.slice().reverse()], that.cePlane.id),
          linesEnter = linesUpdate.enter(),
          linesExit = linesUpdate.exit();

      linesExit.remove();

      // Update selection
      linesUpdate
        .transition()
        .call(that.transitions.update)
        .attr("d", that.cePlane.lineGenerator)
        .attr("stroke", "#666666")
        .attr("stroke-width", 1);

      linesEnter
        .append("path")
        .transition()
        .call(that.transitions.enter)
        .attr("class", "pointLines")
        .attr("marker-end", "url(#arrowhead" + that.idNum + ")")
        .attr("d", that.cePlane.lineGenerator)
        .attr("stroke", "#666666")
        .attr("stroke-width", 1);

      // Define area selections
      var pointsUpdate = that.groups.marks
            .selectAll(".points")
            .data(that.cePlane.data, that.cePlane.id),
          pointsEnter = pointsUpdate.enter(),
          pointsExit = pointsUpdate.exit();

      pointsExit.remove();

      // Update selection
      pointsUpdate
        .transition()
        .call(that.transitions.update)
        .attr("r", 5)
        .attr("stroke", "#666666")
        .attr("fill", function(d) { return that.scales.color.ordinal(d.group); })
        .attr("cx", function(d) { return that.scales.x.linear(d.x) + that.scales.fx(d.fx); })
        .attr("cy", function(d) { return that.scales.y.linear(d.y) + that.scales.fy(d.fy); });

      pointsEnter
        .append("circle")
        .transition()
        .call(that.transitions.enter)
        .attr("class", "points")
        .attr("r", 5)
        .attr("stroke", "#666666")
        .attr("fill", function(d) { return that.scales.color.ordinal(d.group); })
        .attr("cx", function(d) {
          return that.scales.x.linear(d.x) + that.scales.fx(d.fx);
        })
        .attr("cy", function(d) { return that.scales.y.linear(d.y) + that.scales.fy(d.fy); });


      var labelUpdate = that.groups.marks
        .selectAll(".icerLabel")
        .data([that.spec.misc.icer]),
        labelEnter = labelUpdate.enter(),
        labelExit = labelUpdate.exit();

      labelExit.remove();

      labelUpdate
        .transition()
        .call(that.transitions.update)
        .attr("transform", "translate(" + xTranslate + "," + yTranslate + ")")
        .attr("text-anchor", anchor)
        .attr("font-size", 11)
        .attr("x", that.scales.x.linear(that.cePlane.data[0].x) + that.scales.fx(that.cePlane.data[0].fx))
        .attr("y", that.scales.y.linear(that.cePlane.data[0].y) + that.scales.fy(that.cePlane.data[0].fy))
        .text(function(d){ return d; });

      labelEnter
        .append("text")
        .attr("class", "icerLabel")
        .transition()
        .call(that.transitions.enter)
        .attr("transform", "translate(" + xTranslate + "," + yTranslate + ")")
        .attr("text-anchor", anchor)
        .attr("font-size", 11)
        .attr("x", that.scales.x.linear(that.cePlane.data[0].x) + that.scales.fx(that.cePlane.data[0].fx))
        .attr("y", that.scales.y.linear(that.cePlane.data[0].y) + that.scales.fy(that.cePlane.data[0].fy))
        .text(function(d){ return d; });

      locale = d3.locale(locale);



      var legendOrdinal = d3.legend.color()
        //.shapeWidth(30)
        .orient("vertical")
        .shapeHeight(20)
        .shapeWidth(20)
        //.shape("circle")
        //.title("Legend")
        //.shapeRadius(10)
        .scale(that.scales.color.ordinal);

      that.groups.legend
        .call(legendOrdinal)
        .selectAll(".swatch")
          .attr("stroke", "#666666")
          .attr("stroke-width", 1);

      // Update y-axis
      that.axes.y
        .orient("left")
        .scale(that.scales.y.linear)
        .tickFormat(function(d) { return locale.numberFormat(that.spec.formats.y)(d/divisor); })
        .tickValues(yTicks)
        .outerTickSize(0);

      r2d3.drawYAxes(that, "#666666", 1, true, that.spec.layout == "Plane");

      // Update x-axis
      that.axes.x
        .orient("bottom")
        .scale(that.scales.x.linear)
        .tickFormat(function(d) { return locale.numberFormat(that.spec.formats.x)(d); })
        .tickValues(xTicks)
        .outerTickSize(0);

      r2d3.drawXAxes(that, "#666666", 1, true, that.spec.layout == "Plane");
    },
    id: function(d){
      return d.fx + ", " + d.fy + ", " + d.id + ", "  + d.group ;
    }
  };
  that.vbp = {
    data: [],
    pathData: {
      current: [],
      last: [],
      tweenStart: [],
      tweenEnd: []
    },
    arrow: that.svg.append("defs").append("marker")
        .attr("id", "arrowhead" + that.idNum)
        .attr("refX", 13.5)
        .attr("refY", 3)
        .attr("markerWidth", 9)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0,0 V 6 L9,3 Z"),
    lineGenerator: d3.svg.line()
      .x(function(d){
        return that.scales.x.linear(d.x) + that.scales.fx(d.fx);
      })
      .y(function(d){
        return that.scales.y.linear(d.y) + that.scales.fy(d.fy);
      })
      .interpolate("linear"),
    generator: d3.svg.area()
      .x(function(d){
        return that.scales.x.linear(d.x) + that.scales.fx(d.fx);
      })
      .y0(function(d){
        return that.scales.y.linear(d.y0) + that.scales.fy(d.fy);
      })
      .y1(function(d){
        return that.scales.y.linear(d.y) + that.scales.fy(d.fy);
      })
      .interpolate("linear"),
    predraw: function(){

      // Setup tween datasets
      that.vbp.pathData.current = that.vbp.data;
      if(that.vbp.pathData.last.length > 0){
      that.vbp.pathData.tweenStart = jQuery.extend(true, [], r2d3.tweenAreaStart(that.vbp.pathData.last, that.vbp.pathData.current, "x"));
      that.vbp.pathData.tweenEnd = jQuery.extend(true, [], r2d3.tweenAreaEnd(that.vbp.pathData.last, that.vbp.pathData.current, "x"));
      }else{
        that.vbp.pathData.tweenStart = that.vbp.pathData.last;
        that.vbp.pathData.tweenEnd = that.vbp.pathData.current;
      }

      // Define line selections
      var lineUpdateStart = that.groups.marks
            .selectAll(".pointLines")
            .data([that.vbp.pathData.tweenStart]),
          lineEnterStart = lineUpdateStart.enter(),
          lineExitStart = lineUpdateStart.exit();

      lineExitStart.remove();

      // Update selection
      lineUpdateStart
        .attr("d", that.vbp.lineGenerator)
        .attr("stroke", "#666666")
        .attr("marker-end", "")
        .attr("fill-opacity", "0")
        .attr("stroke-width", 1);

      // Enter selection
      lineEnterStart.append("path")
        .transition()
        .call(that.transitions.enter)
        .attr("class", "pointLines")
        .attr("marker-end", "")
        .attr("d", that.vbp.lineGenerator)
        .attr("fill-opacity", "0")
        .attr("stroke", "#666666")
        .attr("stroke-width", 1);


      that.vbp.pathData.last = jQuery.extend(true, [], that.vbp.pathData.current);
    },
    draw: function(){
      var xMax = d3.max(that.vbp.data, function(d){ return d.x; }),
          xMin = d3.min(that.vbp.data, function(d){ return d.x; }),
          yMax = d3.max(that.vbp.data, function(d){ return d.y; }),
          yMin = d3.min(that.vbp.data, function(d){ return d.y; }),
          absXMax = Math.max(xMax, -xMin, 0),
          absXMin = Math.min(-xMax, xMin, 0),
          absYMax = Math.max(yMax, -yMin, 0),
          absYMin = Math.min(-yMax, yMin, 0);

      var xDataLower = Math.min(0,xMin),
          xDataUpper = Math.max(0,xMax),
          yDataLower = Math.min(0,yMin),
          yDataUpper = Math.max(0,yMax);

      var xDataBounds = r2d3.expandDomain([xDataLower, xDataUpper],0,0.025),
          yDataBounds = r2d3.expandDomain([yDataLower, yDataUpper],0,0.025);

      var numTicksX = Math.round(that.width / 80);
      var xTicks = r2d3.pretty(
            xDataBounds[0],
            xDataBounds[1],
            numTicksX
          ),
          numTicksY = Math.round(that.height / 50);
      var yTicks = r2d3.pretty(
            yDataBounds[0],
            yDataBounds[1],
            numTicksY
          );

      var xBounds = d3.extent(xTicks),
          yBounds = d3.extent(yTicks);

      that.scales.x.linear
        .domain(xBounds)
        .range([0, that.scales.fx.rangeBand()]);

      that.scales.y.linear
        .domain(yBounds)
        .range([that.scales.fy.rangeBand(), 0]);

      var locale =  jQuery.extend(true, {}, r2d3.locales[that.spec.locale]),
          divisor = 1;

      var largest = d3.max(that.vbp.data, function(d){ return Math.abs(d.y); });
      if(largest > 10E7){
        locale.currency[1] = "M" + locale.currency[1];
        divisor = 1000000;
      }
      else if(largest > 10E4){
        locale.currency[1] = "K" + locale.currency[1];
        divisor = 1000;
      }


      // Define area selections
      var areaUpdate = that.groups.marks
            .selectAll(".area")
            .data([[
              {x: xBounds[0], y: that.spec.misc.threshold, y0: yBounds[0], fx: "", fy: ""},
              {x: xBounds[1], y: that.spec.misc.threshold, y0: yBounds[0], fx: "", fy: ""}
            ]]),
          areaEnter = areaUpdate.enter(),
          areaExit = areaUpdate.exit();

      areaExit.remove();

      // Update selection
      areaUpdate
        .transition()
        .call(that.transitions.update)
        .attr("fill-opacity", 0.5)
        .attr("fill", "#2ecc71")
        .attr("d", that.vbp.generator);

      // Enter selection
      areaEnter.append("path")
        .transition()
        .call(that.transitions.enter)
        .attr("class", "area")
        .attr("fill-opacity", 0.5)
        .attr("fill", "#2ecc71")
        .attr("d", that.vbp.generator);

      // Define area line selections
      var areaLineUpdate = that.groups.marks
            .selectAll(".areaLine")
            .data([[
              {x: xBounds[0], y: that.spec.misc.threshold, y0: yBounds[0], fx: "", fy: ""},
              {x: xBounds[1], y: that.spec.misc.threshold, y0: yBounds[0], fx: "", fy: ""}
            ]]),
          areaLineEnter = areaLineUpdate.enter(),
          areaLineExit = areaLineUpdate.exit();

      areaLineExit.remove();

      // Update selection
      areaLineUpdate
        .transition()
        .call(that.transitions.update)
        .attr("stroke-width", 1)
        .attr("stroke", "#2ecc71")
        .attr("d", that.vbp.lineGenerator);

      // Enter selection
      areaLineEnter.append("path")
        .transition()
        .call(that.transitions.enter)
        .attr("class", "areaLine")
        .attr("stroke-width", 1)
        .attr("stroke", "#2ecc71")
        .attr("d", that.vbp.lineGenerator);

      // Define line selections
      var linesUpdate = that.groups.marks
            .selectAll(".pointLines")
            .data([that.vbp.pathData.tweenEnd]),
          linesEnter = linesUpdate.enter(),
          linesExit = linesUpdate.exit();

      linesExit.remove();

      // Update selection
      linesUpdate
        .transition()
        .call(that.transitions.update)
        .attr("d", that.vbp.lineGenerator)
        .attr("marker-end", "")
        .attr("stroke", "#666666")
        .attr("fill-opacity", "0")
        .attr("stroke-width", 1);

      // Define line selections
      var lineUpdate = that.groups.marks
            .selectAll(".pointLines")
            .data([that.vbp.pathData.current]),
          lineEnter = lineUpdate.enter(),
          lineExit = lineUpdate.exit();

      lineExit.remove();

      // Update selection
      lineUpdate
        .transition()
        .call(that.transitions.updateDelayed)
        .attr("d", that.vbp.lineGenerator)
        .attr("marker-end", "url(#arrowhead" + that.idNum + ")")
        .attr("stroke", "#666666")
        .attr("fill-opacity", "0")
        .attr("stroke-width", 1);

      // Enter selection
      lineEnter.append("path")
        .transition()
        .call(that.transitions.enter)
        .attr("class", "pointLines")
        .attr("marker-end", "url(#arrowhead" + that.idNum + ")")
        .attr("d", that.vbp.lineGenerator)
        .attr("fill-opacity", "0")
        .attr("stroke", "#666666")
        .attr("stroke-width", 1);

      var pointsData = [];
      if(that.vbp.data.length > 2){
        pointsData.push(that.vbp.data[0]);
        pointsData.push(that.vbp.data[that.vbp.data.length-1]);
      }else{
        pointsData = that.vbp.data;
      }
      // Define area selections
      var pointsUpdate = that.groups.marks
            .selectAll(".points")
            .data(pointsData),
          pointsEnter = pointsUpdate.enter(),
          pointsExit = pointsUpdate.exit();

      pointsExit.remove();

      // Update selection
      pointsUpdate
        .transition()
        .call(that.transitions.update)
        .attr("r", 5)
        .attr("stroke", "#666666")
        .attr("fill", "#e74c3c")
        .attr("cx", function(d) { return that.scales.x.linear(d.x) + that.scales.fx(d.fx); })
        .attr("cy", function(d) { return that.scales.y.linear(d.y) + that.scales.fy(d.fy); });

      pointsEnter
        .append("circle")
        .transition()
        .call(that.transitions.enter)
        .attr("class", "points")
        .attr("r", 5)
        .attr("stroke", "#666666")
        .attr("fill", "#e74c3c")
        .attr("cx", function(d) {
          return that.scales.x.linear(d.x) + that.scales.fx(d.fx);
        })
        .attr("cy", function(d) { return that.scales.y.linear(d.y) + that.scales.fy(d.fy); });

      var yTransform = 7;
      if(pointsData[0].y > pointsData[1].y){
        yTransform = -7;
      }

      var labelUpdate = that.groups.marks
        .selectAll(".icerLabel")
        .data(pointsData),
        labelEnter = labelUpdate.enter(),
        labelExit = labelUpdate.exit();

      labelExit.remove();

      labelUpdate
        .transition()
        .call(that.transitions.update)
        .attr("transform", function(d, i){
          var xTransform = 7,
              yTransform = 7;
          if(i == 1){
            xTransform = -7;
            if(pointsData[1].y > pointsData[0].y){
              yTransform = -7;
            }
          }else{
            if(pointsData[0].y > pointsData[1].y){
              yTransform = -7;
            }
          }
          return "translate(" + xTransform + "," + yTransform + ")";
        })
        .attr("text-anchor", function(d,i){
          var anchor = "start";
          if(i == 1){
            anchor = "end";
          }
          return anchor;
        })
        .attr("font-size", 11)
        .attr("x", function(d){ return that.scales.x.linear(d.x) + that.scales.fx(d.fx); })
        .attr("y", function(d){ return that.scales.y.linear(d.y) + that.scales.fy(d.fy); })
        .text(function(d){ return d.label; });

      labelEnter
        .append("text")
        .attr("class", "icerLabel")
        .transition()
        .call(that.transitions.enter)
        .attr("transform", function(d, i){
          var xTransform = 7,
              yTransform = 7;
          if(i == 1){
            xTransform = -7;
            if(pointsData[1].y > pointsData[0].y){
              yTransform = -7;
            }
          }else{
            if(pointsData[0].y > pointsData[1].y){
              yTransform = -7;
            }
          }
          return "translate(" + xTransform + "," + yTransform + ")";
        })
        .attr("text-anchor", function(d,i){
          var anchor = "start";
          if(i == 1){
            anchor = "end";
          }
          return anchor;
        })
        .attr("font-size", 11)
        .attr("x", function(d){ return that.scales.x.linear(d.x) + that.scales.fx(d.fx); })
        .attr("y", function(d){ return that.scales.y.linear(d.y) + that.scales.fy(d.fy); })
        .text(function(d){ return d.label; });

      locale = d3.locale(locale);

      // Update y-axis
      that.axes.y
        .orient("left")
        .scale(that.scales.y.linear)
        .tickFormat(function(d) { return locale.numberFormat(that.spec.formats.y)(d/divisor); })
        .tickValues(yTicks)
        .outerTickSize(0);

      r2d3.drawYAxes(that, "#666666", 1, true);

      // Update x-axis
      that.axes.x
        .orient("bottom")
        .scale(that.scales.x.linear)
        .tickFormat(function(d) { return locale.numberFormat(that.spec.formats.x)(d); })
        .tickValues(xTicks)
        .outerTickSize(0);

      r2d3.drawXAxes(that, "#666666", 1, true);
    },
    id: function(d){
      return d.fx + ", " + d.fy + ", "+ d.group ;
    }
  };
  that.update = function(spec){
    if(that.busy){
      if(spec) that.queue = spec;
      setTimeout(function() { that.update(); }, 250);
    }else{
      if(spec){
        that.spec = spec;
        delete that.queue;
      }else{
        if(that.queue){
          that.spec = that.queue;
          delete that.queue;
        }
      }
      that.lock();
      // Hide existing tooltips
      that.tooltips.hide();
      $(".d3-tip" + (that.idNum)).remove();

      // Run pre-draw before updating anything

      // Draw facets
      that.facet.predraw();
      // Draw data for appropriate tpe
      if(that.spec.type === "barMulti"){
        that.barMulti.data = that.spec.data;
        that.barMulti.predraw();
      }
      if(that.spec.type === "bar"){
        that.bar.data = that.spec.data;
        that.bar.predraw();
      }
      if(that.spec.type === "area"){
        that.area.data = that.spec.data;
        that.area.predraw();
      }
      if(that.spec.type === "cePlane"){
        that.cePlane.data = that.spec.data;
        that.cePlane.predraw();
      }
      if(that.spec.type === "vbp"){
        that.vbp.data = that.spec.data;
        that.vbp.predraw();
      }
      // Update plot dimensions
      if(that.spec.margin){
        that.margin.left = that.spec.margin.left;
        that.margin.right = that.spec.margin.right;
        that.margin.top = that.spec.margin.top;
        that.margin.bottom = that.spec.margin.bottom;
      }

      that.width = $("#" + that.id).width() - that.margin.left - that.margin.right;
      that.height = $("#" + that.id).height() - that.margin.top - that.margin.bottom;
      that.svg
        .attr("height", $("#" + that.id).height())
        .attr("width", $("#" + that.id).width());

      that.groups.panel
        .attr("transform","translate(" + that.margin.left + "," + that.margin.top + ")");
      that.groups.marks
        .attr("transform","translate(" + that.margin.left + "," + that.margin.top + ")");

      // Grab the x and y facet variables
      var xFacets = d3.set(that.spec.data.map(function(d){ return d.fx; })).values(),
          yFacets = d3.set(that.spec.data.map(function(d){ return d.fy; })).values();
      // Update labels
      that.labels.x
        .attr("transform", function(d){
          var x = that.width / 2,
              y = that.height + 35;
          return "translate(" + x + "," + y + ")";
        })
        .attr("text-anchor", "middle")
        .text(that.spec.labs.x);
      that.labels.y
        .attr("transform", function(d){
          var y = that.height / 2,
              x = -that.margin.left + 15;
          return "translate(" + x + "," + y + ") rotate(-90)";
        })
        .attr("text-anchor", "middle")
        .text(that.spec.labs.y);

      // Update scales
      that.scales.fx.domain(xFacets);
      that.scales.fy.domain(yFacets);
      that.scales.fx.rangeRoundBands([0, that.width], 0.15, 0);
      that.scales.fy.rangeRoundBands([0, that.height], 0.15, 0);

      // Compute the cartesian product of x and y facets
      that.facet.data = d3.merge(
        xFacets.map(
          function(fx_value) {
           return yFacets.map(
             function(fy_value){
               var tempObj = {};
               tempObj.fx = fx_value;
               tempObj.fy = fy_value;
               tempObj.fx_first = xFacets[0];
               tempObj.fy_last = yFacets[yFacets.length - 1];
               if(yFacets.length == 1 && fy_value === "") tempObj.id = fx_value;
               else if(xFacets.length == 1 && fx_value === "") tempObj.id = fy_value;
               else tempObj.id = fx_value + ": " + fy_value;
               return tempObj;
              }
            );
          }
        )
      );

      // Draw facets
      that.facet.draw();
      // Draw data for appropriate tpe
      if(that.spec.type === "barMulti"){
        that.barMulti.draw();
      }
      if(that.spec.type === "bar"){
        that.bar.draw();
      }
      if(that.spec.type === "area"){
        that.area.draw();
      }
      if(that.spec.type === "cePlane"){
        that.cePlane.draw();
      }
      if(that.spec.type === "vbp"){
        that.vbp.draw();
      }


      var legendWidth = that.groups.legend.node().getBBox().width;
      if(that.spec.legend === "Right"){
        that.groups.legend
          .attr(
            "transform",
            "translate(" + (that.width + that.margin.right/5 + that.margin.left) + "," + (that.height / 3) + ")");
      }else{
        that.groups.legend
          .attr(
            "transform",
            "translate(" + (that.margin.left + that.width/2 - legendWidth/2) + "," + (that.height + 75) + ")");
      }
    }
  };
};
