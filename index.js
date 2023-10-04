// Import stylesheets
import './style.css';

var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const epochs = 150;
const pointsPerEpoch = 2000;
var data;
var xMin = -1.5,
    xMax = 0.6,
    yMin = -1.05,
    yMax = 1.05;

var svg = d3
    .select('body')
    .append('svg')
    .attr('id', 'canvas')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
makeChart(xMin, xMax, yMin, yMax);

function makeChart(xMin, xMax, yMin, yMax) {
    var xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, width]);
    svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale));

    var yScale = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);
    svg.append('g').call(d3.axisLeft(yScale));

    var uniformXshift = d3.scaleLinear().domain([0, 1]).range([xMin, xMax]);
    var uniformYshift = d3.scaleLinear().domain([0, 1]).range([yMin, yMax]);

    const clockCounter = d3.timer(addPoint, 1000);

    var currentEpoch = 0;
    var pointsTried = 0;
    var pointSuccess = 0;

    function addPoint() {
        currentEpoch = currentEpoch + 1;

        d3.select('#epochNum').text(currentEpoch);

        if (currentEpoch > epochs) {
            clockCounter.stop();
        }

        const numPoints = pointsPerEpoch;
        var outerCounter = 0;
        console.log();

        while (outerCounter < numPoints) {
            outerCounter = outerCounter + 1;
            const u = uniformXshift(Math.random()),
                v = uniformYshift(Math.random());
            var x,
                y,
                reW = 0,
                imW = 0,
                modW;

            var counter = 0,
                notFailedYet = true;

            while (counter < 100 && notFailedYet) {
                counter = counter + 1;
                x = reW;
                y = imW;
                reW = x * x - y * y + u;
                imW = 2 * x * y + v;
                modW = reW * reW + imW * imW;
                if (modW > 4) {
                    notFailedYet = false;
                }
            }

            data = [{ x: u, y: v }];
            let color;
            if (notFailedYet) {
                color = '#000';
            } else {
                if (counter < 25) {
                    color = d3.interpolateBlues(counter / 25);
                } else if (counter < 50) {
                    color = d3.interpolateGreens((counter - 25) / 25);
                } else if (counter < 75) {
                    color = d3.interpolateOranges((counter - 50) / 25);
                } else {
                    color = d3.interpolateReds((counter - 75) / 25);
                }
            }

            svg
                .append('g')
                .selectAll('dot')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', function (d) {
                    return xScale(d.x);
                })
                .attr('cy', function (d) {
                    return yScale(d.y);
                })
                .attr('r', 1)
                .style('fill', color);

            if (notFailedYet) {
                pointSuccess = pointSuccess + 1;
            }
        }

        pointsTried = pointsTried + pointsPerEpoch;
        d3.select('#proportion').text(
            Math.round((10000 * pointSuccess) / pointsTried) / 10000
        );
    }
}
