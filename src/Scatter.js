import { extent, max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { csv, tsv } from 'd3-fetch';
import { scaleLinear } from 'd3-scale';
import { mouse, select, selectAll } from 'd3-selection';
import rough from 'roughjs/dist/rough.umd';


class Scatter {
    constructor(opts) {
      // load in arguments from config object
      this.el = opts.element;
      // this.data = opts.data;
      this.element = opts.element;
      this.margin = opts.margin ? opts.margin : {top: 50, right: 20, bottom: 50, left: 100}
      this.title = opts.title;
      this.color = opts.color ? opts.color : 'red';
      this.roughness = opts.roughness ? this.roughCeiling(opts.roughness) : 1;
      this.x = opts.x;
      this.y = opts.y;
      this.highlight = opts.highlight ? opts.highlight : 'coral';
      this.radius = opts.radius ? opts.radius : 3;
      this.fillStyle = opts.fillStyle;
      this.bowing = opts.bowing ? opts.bowing : 0;
      this.interactive = (typeof opts.interactive  === 'undefined') ? true : opts.interactive;
      this.curbZero = (typeof opts.curbZero  === 'undefined') ? true : opts.curbZero;
      this.strokeWidth = opts.strokeWidth ? opts.strokeWidth : 1;
      // new width
      this.initChartValues(opts)
      // create the chart
      this.drawChart = this.resolveData(opts.data)
      this.drawChart()
      if (opts.title !== 'undefined') this.setTitle(opts.title)
  }

  roughCeiling(roughness) {
    let roughVal = roughness > 20 ? 20 : roughness;
    return  roughVal
  }

  initChartValues(opts) {
  	  let width = opts.width ? opts.width : 300;
      let height = opts.height ? opts.height : 400;
      this.width = width - this.margin.left - this.margin.right;
      this.height = height - this.margin.top - this.margin.bottom;
      this.roughId = this.el + "_svg";
      this.graphClass = this.el.substring(1, this.el.length);
      this.interactionG = "g." + this.graphClass;
      this.setSvg()
  }

  setSvg() {
    this.svg = select(this.el)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr('id', this.roughId)
        .attr("transform",
              "translate(" + this.margin.left + "," + this.margin.top + ")")
  }

  // add this to abstract base
  resolveData(data) {
    if (typeof data === 'string') {
      if (data.includes('.csv')) {
        return () => {
          csv(data).then(d => {
          console.log(d)
            this.data = d;
          this.draw()
          })
         }
      } else if (data.includes('.tsv')) {
        return () => {
          tsv(data).then(d => {
            this.data = d;
          this.draw()
          })
         }
      }
    } else {
      return () => {
        this.data = data.map(elem => {
          return {
            'x': elem[0],
            'y': elem[1]
          }
        });
        this.x = "x";
        this.y = "y";
        this.draw()
      }
    }
  }

  addScales() {
    console.log('sca', this.data)
	  const xExtent = extent(this.data, d => +d[this.x]);
	  const yExtent = extent(this.data, d => +d[this.y]);
    const radiusExtent = extent(this.data, d => +d[this.radius])
    // force zero baseline if all data is positive
    if (this.curbZero === true) {
      if (yExtent[0] > 0) { yExtent[0] = 0; };
      if (xExtent[0] > 0) { xExtent[0] = 0; };
    }

    this.xScale = scaleLinear()
                    .range([0, this.width])
                    .domain(xExtent);

    this.yScale = scaleLinear()
                    .range([this.height, 0])
                    .domain(yExtent);

    this.radiusScale = scaleLinear()
                    .range([10, 30])
                    .domain(radiusExtent);
  }


  addAxes() {
  	    // AXES
    const xAxis = axisBottom()
                .scale(this.xScale);
    const yAxis = axisLeft()
                    .scale(this.yScale);
        // x-axis
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(axisBottom(this.xScale))
    .attr('class', 'x-axis')
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style('font-family', 'Indie Flower')
      .style('font-size', '1rem');

    // y-axis
    this.svg.append("g")
      .call(axisLeft(this.yScale))
      .attr('class', 'y-axis')
      .selectAll('text')
      .style('font-family', 'Indie Flower')
      .style('font-size', '1rem');
    
    // hide original axes
    selectAll('path.domain')
      .attr('stroke', 'transparent')
  }


 makeAxesRough(roughSvg, rcAxis) {
    select('.x-axis')
    .selectAll('path.domain').each(function(d, i) {
      let pathD = select(this).node().getAttribute('d');
      let roughXAxis = rcAxis.path(pathD, {
        stroke: 'black',
        fillStyle: 'hachure',
        strokeWidth: 1,
        roughness: 1.,
        });
      roughXAxis.setAttribute('class', 'rough-xaxis');
      roughSvg.appendChild(roughXAxis);
    })
  selectAll('.rough-xaxis')
    .attr('transform', `translate(0, ${this.height})`)

  select('.y-axis')
    .selectAll('path.domain').each(function(d, i) {
      let pathD = select(this).node().getAttribute('d');
      let roughYAxis = rcAxis.path(pathD, {
        stroke: 'black',
        fillStyle: 'hachure',
        roughness: 2,
        });
      roughYAxis.setAttribute('class', 'rough-yaxis');
      roughSvg.appendChild(roughYAxis);
    })
 }

setTitle(title) {
  this.svg.append("text")
    .attr("x", (this.width / 2))             
    .attr("y", 0 - (this.margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "2rem")
    .style('font-family', 'Indie Flower')
    .text(title);
}

addInteraction() {
   // add highlight helper dom nodes
    selectAll(this.interactionG)
    .data(this.data)
    .append('circle')
      .attr('cx', d => this.xScale(+d[this.x]))
      .attr('cy', d => this.yScale(+d[this.y]))
      .attr('r', d => this.radiusScale(+d[this.radius]) * 0.6)
      // .attr('r', this.radiusScale())
      // .attr('r', this.radius + (this.roughness / 6))
      .attr('fill', 'transparent');

  // create tooltip
  var Tooltip = select(this.el)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style('position', 'absolute')
    .style("background-color", 'white')
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "3px")
    .style('font-family', 'Indie Flower')
    .style('font-size', '.95rem')
    .style('pointer-events', 'none')

   // event functions
   var mouseover = function(d) {
      Tooltip
        .style("opacity",  1)
    }
    let that = this

    var mousemove = function(d) {
      let attrX = select(this).attr('attrX');
      let attrY = select(this).attr('attrY')
      let mousePos = mouse(this);
      // get size of enclosing div
      Tooltip
        .html(`${attrX}, ${attrY}`)
        .attr('class', function(d) {
        })
        .style('transform', `translate(${mousePos[0] + that.margin.left}px, 
                            ${mousePos[1] - (that.height + that.margin.top + that.margin.bottom)}px)`)
      }
      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0)
      }

      // d3 event handlers
      selectAll(this.interactionG)
        .on('mouseover', function() {
          mouseover()
          select(this).selectAll('path').style('stroke', that.highlight)
        })

      selectAll(this.interactionG)
      .on('mouseout', function() {
        mouseleave()
        select(this).selectAll('path').style('stroke', that.color)
      })

      selectAll(this.interactionG)
        .on('mousemove', mousemove)
  }

  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId);
    this.rcAxis = rough.svg(this.roughSvg);
    this.rc = rough.svg(this.roughSvg, {
      options: {
      fill: this.color,
      stroke: this.color,
      strokeWidth: this.strokeWidth,
      roughness: this.roughness,
      bowing: this.bowing,
      fillStyle: this.fillStyle
      }
    });
  }

  draw() {

    this.initRoughObjects()
    this.addScales()
    this.addAxes()
    this.makeAxesRough(this.roughSvg, this.rcAxis)
    console.log('rscale', this.radiusScale)
		// Add scatterplot
   this.data.forEach((d, i)=>{
     let node = this.rc.circle(
                  this.xScale(+d[this.x]),
                  this.yScale(+d[this.y]),
                  this.radiusScale(+d[this.radius])) 
     let roughNode = this.roughSvg.appendChild(node);
     roughNode.setAttribute('class', this.graphClass);
    roughNode.setAttribute('attrX', d[this.x])
    roughNode.setAttribute('attrY', d[this.y])
   }) 
   // If desired, add interactivity
    if (this.interactive === true) {
      this.addInteraction()
    }

	} 
}

export default Scatter;