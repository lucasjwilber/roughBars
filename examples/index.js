import roughBars from '../src';

console.log(roughBars)

new roughBars.BarH (
{
  element: '#vis0',
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

new roughBars.Bar(
    {
      element: '#vis1',
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

new roughBars.Bar(
    {
      element: '#vis2',
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
  element: '#vis3',
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
      element: '#vis4',
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


// new roughBars.BarH (
// {
//   element: '#vis5',
//     // data: [[1,2], [5, 6], [8,8], [5, 100], [200, 10], [50, 50]],
//     data: "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv",
//     title: `Country Count`,
//     labels: 'Country',
//     values: 'Value',
//     width: 400,
//     height: 500,
//     margin: {left: 150, top: 50, right: 10, bottom: 90},
//     roughness: 2.5,
// }
// );