function display_chart(){

        element = document.querySelector('.chart-radar');
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        
        ease = document.getElementById('ease').value;
        opr = document.getElementById('opr').value;
        aff = document.getElementById('aff').value;
        solm = document.getElementById('solm').value;
        deci = document.getElementById('deci').value;

        var data = [
        {
            className: 'Impact', // optional can be used for styling
            axes: [
            {axis: "Ease of Implementation", value: ease}, 
            {axis: "Operational Savings", value: opr}, 
            {axis: "Affordability", value: aff},  
            {axis: "Solution Maturity", value: solm},  
            {axis: "Decarbonization Impact", value: deci},
            ]
        }
        ];

        // Call chart function
        var chart = RadarChart.chart();
        var cfg = chart.config(); // retrieve default config
        var svg = d3.select('.chart-radar').append('svg')
        .attr('width', cfg.w + 50)
        .attr('height', cfg.h - 25);
        svg.append('g').classed('single', 1).datum(data).call(chart).attr('transform', "translate(" + ((15)) + ", " + ((0)) + ")");

        save_svg()

    }

// Wrap text function
function wrap(text, width) {
    text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.4, // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em").attr('text-anchor', 'middle').style('font-family', 'Arial');
        
    while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word).attr('text-anchor', 'middle').style('font-family', 'Arial');
        }
    }
    });
}

// Chart function
var RadarChart = {
defaultConfig: {
containerClass: 'radar-chart',
w: 600,
h: 600,
factor: 0.75,
factorLegend: 0.9,
levels: 5,
maxValue: 5,
radians: 2 * Math.PI,
axisLine: true,
axisText: true,
circles: false,
radius: 5,
axisJoin: function(d, i) {
    return d.className || i;
},
transitionDuration: 300
},
chart: function() {
// default config
var cfg = Object.create(RadarChart.defaultConfig);

function radar(selection) {
    selection.each(function(data) {
    var container = d3.select(this);

    // allow simple notation
    data = data.map(function(datum) {
        if(datum instanceof Array) {
        datum = {axes: datum};
        }
        return datum;
    });

    var maxValue = Math.max(cfg.maxValue, d3.max(data, function(d) { 
        return d3.max(d.axes, function(o){ return o.value; });
    }));

    var allAxis = data[0].axes.map(function(i, j){ return i.axis; });
    var total = allAxis.length;
    var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);

    container.classed(cfg.containerClass, 1);

    function getPosition(i, range, factor, func){
        factor = typeof factor !== 'undefined' ? factor : 1;
        return range * (1 - factor * func(i * cfg.radians / total));
    }
    function getHorizontalPosition(i, range, factor){
        return getPosition(i, range, factor, Math.sin);
    }
    function getVerticalPosition(i, range, factor){
        return getPosition(i, range, factor, Math.cos);
    }

    // levels && axises
    var levelFactors = d3.range(0, cfg.levels).map(function(level) {
        return radius * ((level + 1) / cfg.levels);
    });

    var levelGroups = container.selectAll('g.level-group').data(levelFactors);

    levelGroups.enter().append('g');
    levelGroups.exit().remove();

    levelGroups.attr('class', function(d, i) {
        return 'level-group level-group-' + i;
    });

    var levelLine = levelGroups.selectAll('.level').data(function(levelFactor) {
        return d3.range(0, total).map(function() { return levelFactor; });
    });

    levelLine.enter().append('line');
    levelLine.exit().remove();

    levelLine
        .attr('class', 'level')
        .attr('x1', function(levelFactor, i){ return getHorizontalPosition(i, levelFactor); })
        .attr('y1', function(levelFactor, i){ return getVerticalPosition(i, levelFactor); })
        .attr('x2', function(levelFactor, i){ return getHorizontalPosition(i+1, levelFactor); })
        .attr('y2', function(levelFactor, i){ return getVerticalPosition(i+1, levelFactor); })
        .attr('transform', function(levelFactor) {
        return 'translate(' + (cfg.w/2-levelFactor) + ', ' + (cfg.h/2-levelFactor) + ')';
        }).style('stroke', 'rgb(153, 152, 156)');

    if(cfg.axisLine || cfg.axisText) {
        var axis = container.selectAll('.axis').data(allAxis);

        var newAxis = axis.enter().append('g');
        if(cfg.axisLine) {
        newAxis.append('line');
        }
        if(cfg.axisText) {
        newAxis.append('text');
        }

        axis.exit().remove();

        axis.attr('class', 'axis');

        if(cfg.axisLine) {
        axis.select('line')
            .attr('x1', cfg.w/2)
            .attr('y1', cfg.h/2)
            .attr('x2', function(d, i) { return getHorizontalPosition(i, cfg.w / 2, cfg.factor); })
            .attr('y2', function(d, i) { return getVerticalPosition(i, cfg.h / 2, cfg.factor); })
            .style('stroke', 'rgb(153, 152, 156)');
        }

        if(cfg.axisText) {
        axis.select('text')
            .attr('class', function(d, i){
            var p = getHorizontalPosition(i, 0.5);

            return 'legend ' +
                ((p < 0.4) ? 'middle' : ((p > 0.6) ? 'middle' : 'middle'));
            })
            .attr('dy', function(d, i) {
            var p = getVerticalPosition(i, 0.5);
            return ((p < 0.1) ? '1em' : ((p > 0.9) ? '0' : '-0.5em'));
            })
            .text(function(d) { return d; })
            .attr('x', function(d, i){ return getHorizontalPosition(i, cfg.w / 2, cfg.factorLegend); })
            .attr('y', function(d, i){ return getVerticalPosition(i, cfg.h / 2, cfg.factorLegend); })
            .style('font-size', 15).call(wrap, 130);
        }
    }

    // content
    data.forEach(function(d){
        d.axes.forEach(function(axis, i) {
        axis.x = getHorizontalPosition(i, cfg.w/2, (parseFloat(Math.max(axis.value, 0))/maxValue)*cfg.factor);
        axis.y = getVerticalPosition(i, cfg.h/2, (parseFloat(Math.max(axis.value, 0))/maxValue)*cfg.factor);
        });
    });

    var polygon = container.selectAll(".area").data(data, cfg.axisJoin);

    polygon.enter().append('polygon')
        .classed({area: 1, 'd3-enter': 1})
        .on('mouseover', function (d){
        container.classed('focus', 1);
        d3.select(this).classed('focused', 1);
        })
        .on('mouseout', function(){
        container.classed('focus', 0);
        d3.select(this).classed('focused', 0);
        });

    polygon.exit()
        .classed('d3-exit', 1) // trigger css transition
        .transition().duration(cfg.transitionDuration)
        .remove();

    polygon
        .each(function(d, i) {
        var classed = {'d3-exit': 0}; // if exiting element is being reused
        classed['radar-chart-serie' + i] = 1;
        if(d.className) {
            classed[d.className] = 1;
        }
        d3.select(this).classed(classed);
        })
        // styles should only be transitioned with css
        .style('stroke', 'rgba(0, 112, 192, 1)')
        .style('fill', 'rgba(0, 112, 192, 1)').style('fill-opacity', .2).style('stroke-width', 4)
        .transition().duration(cfg.transitionDuration)
        // svg attrs with js
        .attr('points',function(d) {
            return d.axes.map(function(p) {
            return [p.x, p.y].join(',');
            }).join(' ');
        })
        .each('start', function() {
            d3.select(this).classed('d3-enter', 0); // trigger css transition
        });

    if(cfg.circles && cfg.radius) {
        var tooltip = container.selectAll('.tooltip').data([1]);
        tooltip.enter().append('text').attr('class', 'tooltip');

        var circleGroups = container.selectAll('g.circle-group').data(data, cfg.axisJoin);

        circleGroups.enter().append('g').classed({'circle-group': 1, 'd3-enter': 1});
        circleGroups.exit()
        .classed('d3-exit', 1) // trigger css transition
        .transition().duration(cfg.transitionDuration).remove();

        circleGroups
        .each(function(d) {
            var classed = {'d3-exit': 0}; // if exiting element is being reused
            if(d.className) {
            classed[d.className] = 1;
            }
            d3.select(this).classed(classed);
        })
        .transition().duration(cfg.transitionDuration)
            .each('start', function() {
            d3.select(this).classed('d3-enter', 0); // trigger css transition
            });

        var circle = circleGroups.selectAll('.circle').data(function(datum, i) {
        return datum.axes.map(function(d) { return [d, i]; });
        });

        circle.enter().append('circle')
        .classed({circle: 1, 'd3-enter': 1})
        .on('mouseover', function(d){
            tooltip
            .attr('x', d[0].x - 10)
            .attr('y', d[0].y - 5)
            .text(d[0].value)
            .classed('visible', 1);

            container.classed('focus', 1);
            container.select('.area.radar-chart-serie'+d[1]).classed('focused', 1);
        })
        .on('mouseout', function(d){
            tooltip.classed('visible', 0);

            container.classed('focus', 0);
            container.select('.area.radar-chart-serie'+d[1]).classed('focused', 0);
        });

        circle.exit()
        .classed('d3-exit', 1) // trigger css transition
        .transition().duration(cfg.transitionDuration).remove();

        circle
        .each(function(d) {
            var classed = {'d3-exit': 0}; // if exit element reused
            classed['radar-chart-serie'+d[1]] = 1;
            d3.select(this).classed(classed);
        })
        // styles should only be transitioned with css
        .style('fill', function(d) { return cfg.color(d[1]); })
        .transition().duration(cfg.transitionDuration)
            // svg attrs with js
            .attr('r', cfg.radius)
            .attr('cx', function(d) {
            return d[0].x;
            })
            .attr('cy', function(d) {
            return d[0].y;
            })
            .each('start', function() {
            d3.select(this).classed('d3-enter', 0); // trigger css transition
            });

        // ensure tooltip is upmost layer
        var tooltipEl = tooltip.node();
        tooltipEl.parentNode.appendChild(tooltipEl);
    }
    });
}

radar.config = function(value) {
    if(!arguments.length) {
    return cfg;
    }
    if(arguments.length > 1) {
    cfg[arguments[0]] = arguments[1];
    }
    else {
    d3.entries(value || {}).forEach(function(option) {
        cfg[option.key] = option.value;
    });
    }
    return radar;
};

return radar;
},
draw: function(id, d, options) {
var chart = RadarChart.chart().config(options);
var cfg = chart.config();

d3.select(id).select('svg').remove();
d3.select(id)
    .append("svg")
    .attr("width", cfg.w)
    .attr("height", cfg.h)
    .datum(d)
    .call(chart);
}
};

var data = [
    {
        className: 'Impact', // optional can be used for styling
        axes: [
        {axis: "Ease of Implementation", value: 1}, 
        {axis: "Operational Savings", value: 3}, 
        {axis: "Affordability", value: 2},  
        {axis: "Solution Maturity", value: 4},  
        {axis: "Decarbonization Impact", value: 4},
        ]
    }
    ];


// Call chart function
var chart = RadarChart.chart();
var cfg = chart.config(); // retrieve default config
var svg = d3.select('.chart-radar').append('svg')
.attr('width', cfg.w + 50)
.attr('height', cfg.h - 25);
svg.append('g').classed('single', 1).datum(data).call(chart).attr('transform', "translate(" + ((15)) + ", " + ((0)) + ")");
save_svg()

// Save SVG
function save_svg(){
var btn = document.querySelector('.save')
var svg = document.querySelector('svg')

let triggerDownload = (imgURI, fileName) => {
let a = document.createElement('a')

a.setAttribute('download', 'radar-chart.svg')
a.setAttribute('href', imgURI)
a.setAttribute('target', '_blank')

a.click()
}

let save = () => {
let data = (new XMLSerializer()).serializeToString(svg);
let svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
let url = URL.createObjectURL(svgBlob);

triggerDownload(url)
}

var btn = document.querySelector('.save')
btn.addEventListener('click', save)
}