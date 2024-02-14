function gauge(user_input, color) {
    var Needle, arc, arcEndRad, arcStartRad, barWidth, chart, chartInset, degToRad, el, endPadRad, height, i, margin, needle, numSections, padRad, percToDeg, percToRad, percent, radius, ref, sectionIndx, sectionPerc, startPadRad, svg, totalPercent, width;

    percent = user_input/100
    color = color
    
    if (color == 'red'){
    colorange = ['rgba(247, 230, 216, 1)', 'rgba(241, 205, 177, 1)', 'rgba(234, 180, 138, 1)', 'rgba(222, 131, 68, 1)', 'rgba(184, 96, 41, 1)', 'rgba(123, 64, 26, 1)']
        colorneedle = 'rgba(222, 131, 68, 1)';
    }
    
        if (color == 'blue'){
    colorange = ['rgba(220, 227, 242, 1)', 'rgba(184, 198, 228, 1)', 'rgba(148, 169, 216, 1)', 'rgba(79, 113, 190, 1)', 'rgba(56, 84, 146, 1)', 'rgba(37, 55, 97, 1)'];
    colorneedle = 'rgba(106, 153, 208, 1)'
    }
    
    barWidth = 62;

    numSections = 6;

    sectionPerc = 1 / numSections / 2;

    padRad = 0.01;

    chartInset = 10;

    totalPercent = .75;

    el = d3.select('.chart-gauge');

    margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    };

    width = 600 - margin.left - margin.right;

    height = width / 2;

    radius = width / 2;

    percToDeg = function(perc) {
        return perc * 360;
    };

    percToRad = function(perc) {
        return degToRad(percToDeg(perc));
    };

    degToRad = function(deg) {
        return deg * Math.PI / 180;
    };

    svg = el.append('svg').attr('id', 'gauge-red').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom + margin.top);

    chart = svg.append('g').attr('transform', "translate(" + ((width + margin.left + margin.right) / 2) + ", " + ((height + margin.bottom)) + ")");

    for (sectionIndx = i = 1, ref = numSections; 1 <= ref ? i <= ref : i >= ref; sectionIndx = 1 <= ref ? ++i : --i) {
        arcStartRad = percToRad(totalPercent);
        arcEndRad = arcStartRad + percToRad(sectionPerc);
        totalPercent += sectionPerc;
        startPadRad = sectionIndx === 0 ? 0 : padRad / 2;
        endPadRad = sectionIndx === numSections ? 0 : padRad / 2;
        arc = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth).startAngle(arcStartRad + startPadRad).endAngle(arcEndRad - endPadRad);
        chart.append('path').attr('class', "arc chart-color" + sectionIndx).attr('d', arc).style('fill', colorange[i-1]);
    }

    Needle = (function() {
        function Needle(len, radius1) {
        this.len = len;
        this.radius = radius1;
        }

        Needle.prototype.drawOn = function(el, perc) {
        el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0).attr('r', this.radius).style('fill', colorneedle);
        return el.append('path').attr('class', 'needle').attr('d', this.mkCmd(perc)).style('fill', colorneedle);
        };

        Needle.prototype.animateOn = function(el, perc) {
        var self;
        self = this;
        return el.transition().ease('elastic').duration(1000).selectAll('.needle').tween('progress', function() {
            return function(percentOfPercent) {
            var progress;
            progress = percentOfPercent * perc;
            return d3.select(this).attr('d', self.mkCmd(progress));
            };
        });
        };

        Needle.prototype.mkCmd = function(perc) {
        var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
        thetaRad = percToRad(perc / 2);
        centerX = 0;
        centerY = 0;
        topX = centerX - this.len * Math.cos(thetaRad);
        topY = centerY - this.len * Math.sin(thetaRad);
        leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
        leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
        rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
        rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
        return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
        };

        return Needle;

    })();

    needle = new Needle(180, 25);

    needle.drawOn(chart, 0);

    needle.animateOn(chart, percent);

    }

    function display_chart() {
        element = document.querySelector('.chart-gauge');
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        user_input = document.getElementById('percentage').value;
        color = document.getElementById('color').value; 

        gauge(user_input, color);
        save_svg();
    }

    function save_svg() {
        var btn = document.querySelector('.save')
        var svg = document.querySelector('svg')

        let triggerDownload = (imgURI, fileName) => {
            let a = document.createElement('a')

            a.setAttribute('download', 'gauge-chart.svg')
            a.setAttribute('href', imgURI)
            a.setAttribute('target', '_blank')

            a.click()
        }

        let save = () => {
            let data = (new XMLSerializer()).serializeToString(svg)
            let svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'})
            let url = URL.createObjectURL(svgBlob)

            triggerDownload(url)
        }

        var btn = document.querySelector('.save')
        btn.addEventListener('click', save)
    }
    gauge(20, 'blue');
    save_svg();