
import { formatRgb, rgb } from 'd3-color';
import { csv, tsv, json } from 'd3-fetch';
import { scaleBand, scaleOrdinal } from 'd3-scale';
import { mouse, select, selectAll } from 'd3-selection';
import { arc, pie } from 'd3-shape';
import rough from 'roughjs/dist/rough.umd';

const roughCeiling = (roughness) => {
    let roughVal = roughness > 30 ? 30 : roughness;
    return  roughVal
  }

class Donut {

    constructor(opts) {
      // load in arguments from config object
      this.el = opts.element;
      // this.data = opts.data;
      this.element = opts.element;
      this.margin = opts.margin ? opts.margin : {top: 200, right: 20, bottom: 50, left: 100}
      this.title = opts.title;
      this.colors = opts.colors ? opts.colors : ['coral', 'skyblue', "#66c2a5","tan","#8da0cb",
       "#e78ac3","#a6d854","#ffd92f", 'coral', 'skyblue', 'tan', 'orange'];
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
      this.radius = Math.min(this.width, this.height) / 2;
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
            console.log(d)
            this.data = d;
            this.draw()
          })
         }
      } else if (data.includes('.json')) {
        return () => {
          json(data).then((d) => {
            console.log(d);
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
   selectAll(this.interactionG)
      .append("g")
      .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`)
        .data(this.makePie(this.data))
        .append("path")
        .attr("d", this.makeArc)
        .attr("stroke-width", "0px")
        .attr('fill', 'transparent')


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

    let that = this;
    let thisColor;

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
                            ${mousePos[1] - that.height - that.margin.bottom}px)`)
      }
      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0)
      }

      // d3 event handlers
      selectAll(this.interactionG)
        .on('mouseover', function() {
          mouseover()
          thisColor = select(this).selectAll('path').style('stroke');
          console.log('color')
          console.log(rgb(thisColor))
          console.log(rgb(thisColor).darker(1))
          // select(this).selectAll('path').style('stroke', rgb(thisColor).darker())
          select(this).selectAll('path').style('stroke', 'tan')
        })

      selectAll(this.interactionG)
      .on('mouseout', function() {
        mouseleave()
        select(this).select('path').style('stroke', thisColor)
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

    this.makePie = pie()
      .value(d => d.count)
      .sort(null);

    this.makeArc = arc()
        .innerRadius(0)
        .outerRadius(this.radius);

    this.arcs = this.makePie(this.data)

    this.arcs.forEach((d,i) => {
        let c = this.makeArc.centroid(d);
        let node = this.rc.arc(
                    this.width/2, 
                    this.height/2,
                    2 * this.radius,
                    2 * this.radius,
                    d.startAngle- Math.PI/2,
                    d.endAngle- Math.PI/2,
                    true, {
                  fill: this.colors[i],
                  stroke: this.colors[i],
                  strokeWidth: 1,
                  roughness: this.roughness,
                  bowing: this.bowing,
                  fillStyle: this.fillStyle
      });
        node.setAttribute('class', this.graphClass)
        node.setAttribute('x1', c[0])
        node.setAttribute('x2', c[1])
        node.setAttribute('label', d.data.region)
        let roughNode = this.roughSvg.appendChild(node);
    });

   // If desired, add interactivity
    if (this.interactive === true) {
      this.addInteraction()
    }

	} // draw 

}

export default Donut;