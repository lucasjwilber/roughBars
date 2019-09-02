
import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { csv, tsv } from 'd3-fetch';
import { scaleBand, scaleLinear } from 'd3-scale';
import { mouse, select, selectAll } from 'd3-selection';
import rough from 'roughjs/dist/rough.umd';

const roughCeiling = (roughness) => {
    let roughVal = roughness > 20 ? 20 : roughness;
    return  roughVal
  }

class BarH {

  // same methods
  // roughCeiling
  // initChartValues
  // setSvg
  // resolveData
  // setTitle
  // initRoughObjects

    constructor(opts) {
      // load in arguments from config object
      this.el = opts.element;
      // this.data = opts.data;
      this.element = opts.element;
      this.margin = opts.margin ? opts.margin : {top: 50, right: 20, bottom: 50, left: 100}
      this.title = opts.title;
      this.color = opts.color ? opts.color : 'skyblue';
      this.highlight = opts.highlight ? opts.highlight : 'coral';
      this.roughness = opts.roughness ? roughCeiling(opts.roughness) : 1;
      this.stroke = opts.stroke ? opts.stroke : 'black';
      this.strokeWidth = opts.strokeWidth ? opts.strokeWidth : 0.6;
      this.labels = opts.labels; //label
      this.values = opts.values; //column
      this.fillStyle = opts.fillStyle;
      this.bowing = opts.bowing ? opts.bowing : 0;
      this.interactive = (typeof opts.interactive  === 'undefined') ? true : opts.interactive;
      // new width
      this.initChartValues(opts)
      // create the chart
      this.drawChart = this.resolveData(opts.data)
      this.drawChart()
      if (opts.title !== 'undefined') this.setTitle(opts.title)
  }

  initChartValues(opts) {
  	  let width = opts.width ? opts.width : 350;
      let height = opts.height ? opts.height : 450;
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
    console.log(this.graphClass, this.height)

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
    const that = this;
    this.yScale = scaleBand()
      .rangeRound([0, this.height])
      .padding(0.1)
      .domain(this.data.map(function (d) { return d[that.labels]; }));

    this.xScale = scaleLinear()
      .rangeRound([0, this.width])
        .domain([0, max(this.data, function (d) { return +d[that.values]; })]);
  }


  addAxes() {
  	    // AXES
    const xAxis = axisBottom()
      .scale(this.xScale);
    const yAxis = axisLeft()
      .scale(this.yScale);
        // x-axis
    this.svg.append("g")
    .attr("transform", `translate(0, ${this.height})`)
    .call(axisBottom(this.xScale))
    .attr('class', `xAxis${this.graphClass}`)
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style('font-family', 'Gaegu')
      .style('font-size', '.95rem')
      .style('opacity', .85);

    // y-axis
    this.svg.append("g")
      .call(axisLeft(this.yScale))
      .attr('class', `yAxis${this.graphClass}`)
      .selectAll('text')
      .style('font-family', 'Gaegu')
      .style('font-size', '.95rem')
      .style('opacity', .85);

    
    // hide original axes
    selectAll('path.domain')
      .attr('stroke', 'transparent')
  }


 makeAxesRough(roughSvg, rcAxis) {

  let xAxisClass = `xAxis${this.graphClass}`
  let yAxisClass = `yAxis${this.graphClass}`
  let roughXAxisClass = `rough-${xAxisClass}`
  let roughYAxisClass = `rough-${yAxisClass}`

    select(`.${xAxisClass}`)
    .selectAll('path.domain').each(function(d, i) {
      let pathD = select(this).node().getAttribute('d');
      let roughXAxis = rcAxis.path(pathD, {
        stroke: 'black',
        fillStyle: 'hachure',
        roughness: 1.,
        });
      roughXAxis.setAttribute('class', roughXAxisClass);
      roughSvg.appendChild(roughXAxis);
    })
  selectAll(`.${roughXAxisClass}`)
    .attr('transform', `translate(0, ${this.height})`)

  select(`.${yAxisClass}`)
    .selectAll('path.domain').each(function(d, i) {
      let pathD = select(this).node().getAttribute('d');
      let roughYAxis = rcAxis.path(pathD, {
        stroke: 'black',
        fillStyle: 'hachure',
        roughness: 2,
        });
      roughYAxis.setAttribute('class', roughYAxisClass);
      roughSvg.appendChild(roughYAxis);
    })
 }

setTitle(title) {
  this.svg.append("text")
    .attr("x", (this.width / 2))             
    .attr("y", 0 - (this.margin.top / 2))
    .attr('class', 'title')
    .attr("text-anchor", "middle")  
    .style("font-size", "2rem")
    .style('font-family', 'Gaegu')
    .style('opacity', .8)
    .text(title);
}

addInteraction() {
   // add highlight helper dom nodes
  selectAll(this.interactionG)
    .data(this.data)
    .append('rect')
    .attr('x', 0)
    .attr('y', d => this.yScale(d[this.labels]))
    .attr('width', d => this.xScale(+d[this.values]))
    .attr('height', this.yScale.bandwidth())
    .attr('fill', 'transparent');


  // create tooltip
  const Tooltip = select(this.el)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style('position', 'absolute')
    .style("background-color", 'white')
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "3px")
    .style('font-family', 'Gaegu')
    .style('font-size', '.9rem')
    .style('pointer-events', 'none');

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
        .html(`${attrX}: ${attrY}`)
        .style('opacity', .95)
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
          select(this).select('path').style('stroke', that.highlight)
        })

      selectAll(this.interactionG)
      .on('mouseout', function() {
        mouseleave()
        select(this).select('path').style('stroke', that.color)
      })

      selectAll(this.interactionG)
        .on('mousemove', mousemove)
  }

  initRoughObjects() {
    this.roughSvg = document.getElementById(this.roughId);
    this.rcAxis = rough.svg(this.roughSvg, {options: {strokeWidth: this.strokeWidth >=  3 ? 3 : this.strokeWidth}});
    this.rc = rough.svg(this.roughSvg, {
      options: {
      fill: this.color,
      stroke: this.stroke,
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

    // Add barplot
    this.data.forEach((d) => {
      let node = this.rc.rectangle(
                  0,
                  this.yScale(d[this.labels]),
                  this.xScale(+d[this.values]), 
                  this.yScale.bandwidth());
      let roughNode = this.roughSvg.appendChild(node);
      roughNode.setAttribute('class', this.graphClass);
      roughNode.setAttribute('attrX', d[this.labels])
      roughNode.setAttribute('attrY', +d[this.values]) 
    });

   // If desired, add interactivity
    if (this.interactive === true) {
      this.addInteraction()
    }

	} // draw 

}

export default BarH;