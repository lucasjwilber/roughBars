import roughBars from '../src';


new roughBars.Bar(
  {
      element: '#lucasPractice',
      data: "https://raw.githubusercontent.com/jwilber/random_data/master/owTanks.csv",
      width: 600,
      height: 600,
      title: "OW Tank Health",
      labels: 'name',
      values: 'health',
      roughness: 5,
      margin: {top: 50, right: 20, bottom: 150, left: 100},
      highlight: 'gold',
      fillStyle: 'zigzag-line'
  }
);










new roughBars.Donut(
    {
      element: '#vis0',
        data: "https://raw.githubusercontent.com/jwilber/jenkem_data/master/regions.json",
        title: `Regions`,
        labels: 'region',
        values: 'count',
        width: 200,
        roughness: 0,
        radius: 'petal_width',
        colors: ['pink', 'coral', 'teal', 'skyblue'],
        bowing: .1,
        highlight: 'gold',
        // stroke: 'black',
        // strokeWidth: 2,
        fillStyle: 'zigzag-line',
        height: 450,
        curbZero: false,
    }
  );
new roughBars.Pie(
    {
      element: '#vis1',
        data: "https://raw.githubusercontent.com/jwilber/random_data/master/flavors.csv",
        title: `Pie Chart`,
        labels: 'flavor',
        values: 'price',
        width: 250,
        roughness: 11,
        radius: 'petal_width',
        colors: ['pink', 'coral', 'teal', 'skyblue', 'red', 'green', 'black', 'grey'],
        bowing: .1,
        // stroke: 'black',
        highlight: 'gold',
        strokeWidth: .5,
        fillStyle: 'cross-hatch',
        height: 350,
        curbZero: false,
    }
  );

new roughBars.Pie(
    {
      element: '#vis11',
        data: "https://raw.githubusercontent.com/jwilber/random_data/master/flavors.csv",
        title: `Pie Chart`,
        labels: 'flavor',
        values: 'price',
        width: 450,
        roughness: 1,
        radius: 'petal_width',
        colors: ['pink', 'coral', 'teal', 'skyblue', 'red', 'green', 'black', 'grey'],
        bowing: .1,
        // stroke: 'black',
        highlight: 'gold',
        strokeWidth: .5,
        fillStyle: 'cross-hatch',
        height: 450,
        curbZero: false,
    }
  );

// new roughBars.Pie(
//     {
//       element: '#vis2',
//         data: "https://raw.githubusercontent.com/jwilber/jenkem_data/master/regions.json",
//         title: `Pie Chart`,
//         labels: 'region',
//         values: 'count',
//         width: 600,
//         roughness: 5,
//         radius: 'petal_width',
//         colors: ['red', 'green', 'yellow', 'blue'],
//         bowing: .1,
//         // stroke: 'black',
//         strokeWidth: 2,
//         fillStyle: 'zigzag-line',
//         height: 650,
//         curbZero: false,
//     }
//   );


new roughBars.BarH (
{
  element: '#vis2',
    // data: [[1,2], [5, 6], [8,8], [5, 100], [200, 10], [50, 50]],
    data: "https://gist.githubusercontent.com/mbostock/3310560/raw/98311dc46685ed02588afdcb69e5fa296febc1eb/letter-frequency.tsv",
    title: `Pradeep`,
    labels: 'letter',
    values: 'frequency',
    color: 'orange',
    highlight: 'red',
    strokeWidth: 1,
    width: 600,
    height: 900,
    fillStyle: 'solid',
    margin: {left: 150, top: 50, right: 10, bottom: 90},
    roughness: 1.5,
}
);

new roughBars.Bar(
    {
      element: '#vis3',
        data: "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv",
        title: `Olympic Medals by Country`,
        labels: 'Country',
        values: 'Value',
        width: 700,
        roughness: 4.5,
        color: 'red',
        strokeWidth: 2.5,
        // bowing: 1,
        fillStyle: '',
        height: 500,
        margin: {bottom: 90, top: 50, right: 40, left: 90},
        highlight: 'yellow'
        // interactive
    }
  );


new roughBars.BarH (
{
  element: '#vis4',
    // data: [[1,2], [5, 6], [8,8], [5, 100], [200, 10], [50, 50]],
    data: "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv",
    title: `Country Count`,
    labels: 'Country',
    values: 'Value',
    width: 400,
    height: 500,
    margin: {left: 150, top: 50, right: 10, bottom: 90},
    roughness: 1.75,
}
);


new roughBars.Scatter(
    {
      element: '#vis5',
        data: "https://raw.githubusercontent.com/uiuc-cse/data-fa14/gh-pages/data/iris.csv",
        title: `Iris Scatter Plot`,
        x: 'sepal_length',
        y: 'sepal_width',
        width: 1000,
        roughness: 0,
        radius: 'petal_width',
        color: 'grey',
        bowing: .1,
        // stroke: 'black',
        strokeWidth: .75,
        fillStyle: 'cross-hatch',
        height: 450,
        curbZero: false,
    }
  );

new roughBars.Bar(
    {
      element: '#vis6',
        data: "https://gist.githubusercontent.com/mbostock/3310560/raw/98311dc46685ed02588afdcb69e5fa296febc1eb/letter-frequency.tsv",
        title: `Letter Frequency`,
        labels: 'letter',
        values: 'frequency',
        width: 700,
        roughness: 2.5,
        color: 'tan',
        strokeWidth: 1.5,
        // bowing: 1,
        fillStyle: 'solid',
        height: 500,
        margin: {bottom: 90, top: 50, right: 40, left: 90}
        // interactive
    }
  );
new roughBars.BarH (
{
  element: '#vis7',
    // data: [[1,2], [5, 6], [8,8], [5, 100], [200, 10], [50, 50]],
    data: "https://gist.githubusercontent.com/mbostock/3310560/raw/98311dc46685ed02588afdcb69e5fa296febc1eb/letter-frequency.tsv",
    title: `Letters`,
    labels: 'letter',
    values: 'frequency',
    width: 400,
    height: 500,
    color: 'black',
    margin: {left: 150, top: 50, right: 10, bottom: 90},
    roughness: 0.5,
}
);


new roughBars.BarH(
    {
      element: '#vis8',
        data: "https://raw.githubusercontent.com/plotly/datasets/master/2010_alcohol_consumption_by_country.csv",
        title: `Alcohol Rate by Country`,
        values: 'alcohol',
        labels: 'location',
        width: screen.width * .8,
        roughness: 0,
        color: 'green',
        strokeWidth: 1.,
        // bowing: 1,
        fillStyle: 'cross-hatch',
        highlight: 'blue',
        height: 3800,
        margin: {bottom: 90, top: 50, right: 40, left: 140}
        // interactive
    }
  );
