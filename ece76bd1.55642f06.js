(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{109:function(e,a,t){"use strict";t.r(a);var i=t(0),s=t.n(i),r=t(149),l=t.n(r),n=t(131),o=t(125),d=t(122),c=t(128),m=t(49),h=t.n(m),u=t(120);const p=[{title:s.a.createElement(s.a.Fragment,null,"Visualization Guide"),component:s.a.createElement(u.a,null),docLink:"docs/viz/guide",description:s.a.createElement(s.a.Fragment,null,"The visualization guide is a catalogue and learning source, but it is also interactive so you can get hands-on experience.")},{title:s.a.createElement(s.a.Fragment,null,"Deploy FlexIt"),imageUrl:"img/home_install.png",docLink:"docs/deploy",description:s.a.createElement(s.a.Fragment,null,"Got 3 minutes? That's all the time you need to spin up a cloud or on premises instance and check out how easy and powerful FlexIt is.")},{title:s.a.createElement(s.a.Fragment,null,"Getting Started"),imageUrl:"img/home_start.png",docLink:"docs/getting-started",description:s.a.createElement(s.a.Fragment,null,"Quick start guide to get you familiar with FlexIt. Learn how to access FlexIt and build your first report and dashboard.")},{title:s.a.createElement(s.a.Fragment,null,"Reporting Guide"),imageUrl:"img/home_analysis.png",docLink:"docs/report",description:s.a.createElement(s.a.Fragment,null,"Learn everything you need to know about creating reports in this detailed guide that walks you through all FlexIt has to offer.")}];function g({props:e}){const a=Object(c.a)(e.imageUrl);return s.a.createElement("a",{href:Object(c.a)(e.docLink)},s.a.createElement("img",{className:h.a.featureImage,src:a,alt:e.title}))}function b({props:e}){return s.a.createElement("div",{className:l()("col col--6",h.a.feature)},s.a.createElement("div",{className:h.a.featureBlock},s.a.createElement("div",{className:l()("text--center",h.a.featureText)},e.imageUrl?s.a.createElement(g,{props:e}):e.component),s.a.createElement("div",{className:h.a.featureTitle},s.a.createElement("a",{href:Object(c.a)(e.docLink)},e.title)),s.a.createElement("p",null,e.description)))}a.default=function(){const e=Object(d.a)(),{siteConfig:a={}}=e;return s.a.createElement(n.a,{title:""+a.title,description:"User guides and documentation for FlexIt Analytics"},s.a.createElement("header",{className:l()("hero hero--primary",h.a.heroBanner)},s.a.createElement("div",{className:"container"},s.a.createElement("h1",{className:"hero__title"},a.title),s.a.createElement("p",{className:"hero__subtitle"},a.tagline),s.a.createElement("div",{className:h.a.buttons},s.a.createElement(o.a,{className:l()("button button--outline button--lg",h.a.heroBtn),to:Object(c.a)("docs/getting-started")},"Get Started")))),s.a.createElement("main",null,p&&p.length&&s.a.createElement("section",{className:h.a.features},s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"row"},p.map(((e,a)=>s.a.createElement(b,{key:a,props:e}))))))))}},119:function(e,a,t){"use strict";const i={id:"x",label:"X Axis",attrtype:"dimension",min:1,max:1},s={id:"legend",label:"Legend",attrtype:"dimension",max:1},r={id:"y",label:"Values",attrtype:"measure",min:1},l={id:"y2",label:"Values (Y Axis 2)",attrtype:"measure"},n={id:"play",label:"Timeline (Play Axis)",attrtype:"dimension",max:1},o={id:"tooltip",label:"Tooltip",attrtype:"measure"},d=[i,s,r,l,n,o],c=[Object.assign({},s,{min:1}),Object.assign({},r,{max:1}),o,n];a.a={table:{label:"Data Table",dataFields:[{id:"column",label:"Columns"},{id:"group",label:"Group By",attrtype:"dimension"},{id:"pivot",label:"Pivot By",attrtype:"dimension"}],desc:"Data tables are grid-based spreadsheets organized in by columns and rows. Categories (i.e. dimensions) can be grouped and/or pivoted, while numbers (i.e. measures) can be aggregated. Data tables are great for exploring data sets before choosing a chart.",similar:[],examples:[{title:"",id:"grid-sparkline"}],regex:"(grid|table|spreadsheet)"},line:{label:"Line Chart",dataFields:d,desc:"Line charts show data over a continuous time period or interval to analyze how the data has changed over time. Measures are shown on the y-axis and date/time on the x-axis. If a second dimension (i.e. category) is chosen for a series, then each category will have one line on the chart, allowing visual analysis of changes by category.",similar:["area"],examples:[{title:"",id:"line"},{title:"",id:"timeseries"}],regex:"(line chart|line|timeseries)"},area:{label:"Area Chart",dataFields:d,desc:"Area charts are similar to line and stacked column/bar charts with the area below the line filled in to show relative amounts. Like line charts, area charts show data over a continuous time period or interval to analyze how the data has changed over time. Measures are shown on the y-axis and date/time on the x-axis. If a second dimension (i.e. category) is chosen for a series, then each category will have one line on the chart, allowing visual analysis of changes by category. When stacked or 100% stacked, relative size/proportion will be shown for the second dimension.",similar:["line"],examples:[{title:"",id:"area"}]},bar:{label:"Bar Chart",dataFields:[Object.assign({},i,{label:"Axis"}),s,r,n,o],desc:"Bar charts use horizontal bars to show how much is in each category. Categories are shown on the y-axis and amounts on the x-axis. If two categories (i.e. dimensions) are selected, then the second dimension will be shown for each category in the first dimension and will also appear in the legend. When stacked or 100% stacked, relative size/proportion will be shown for the second dimension.",similar:["column"],examples:[{title:"",id:"bar"}]},column:{label:"Column Chart",dataFields:d,desc:"Column charts use vertical bars to show how much is in each category. Categories are shown on the x-axis and amounts on the y-axis. If two categories (i.e. dimensions) are selected, then the second dimension will be shown for each category in the first dimension and will also appear in the legend. When stacked or 100% stacked, relative size/proportion will be shown for the second dimension.",similar:["bar"],examples:[{title:"",id:"column"}]},combo:{label:"Column and Line",dataFields:[i,Object.assign({},r,{label:"Column Values"}),Object.assign({},l,{label:"Line Values",min:1})],desc:'Column and Line "Combination" charts use vertical bars and horizontal lines to show how much is in each category. Categories are shown on the x-axis and amounts on the y-axis.',similar:["column","line"],examples:[{title:"",id:"column-and-line"}]},map:{label:"Map",dataFields:[{id:"location",label:"Location",attrtype:"dimension",max:1},{id:"longitude",label:"Longitude",max:1},{id:"latitude",label:"Latitude",max:1},Object.assign({},r,{max:1}),o],desc:"<p>Maps show geographic data and often come in two popular formats.</p><ol><li>Choropleth - geographic regions are colored/shaded based on amount. It often makes sense to use rates (e.g. number per 100,000) rather than totals.</li><li>Dot/Bubble - points (often latitude/longitude) on the map are sized by amount</li></ol>",similar:[],examples:[{title:"Choropleth",id:"map-choropleth"},{title:"Dot/Bubble",id:"map"}]},pie:{label:"Pie Chart",dataFields:c,desc:"Pie charts show the percentage proportion of each category where the entire circle is 100%. They are good for a quick view of general proportion and are best used with a few values.",similar:["donut","sunburst","funnel"],examples:[{title:"",id:"pie"}],regex:"(pie chart|pie)"},donut:{label:"Donut Chart",dataFields:c,desc:"Donut charts are similar to pie charts with the center area cut out. They show the percentage proportion of each category where the entire circle is 100%.",similar:["pie","sunburst","funnel"],examples:[{title:"",id:"donut"}],regex:"(donut chart|donut)"},scatter:{label:"Scatter Plot",dataFields:[{id:"x",label:"X Axis",attrtype:"measure",min:1,max:1},{id:"y",label:"Y Axis",attrtype:"measure",min:1,max:1},{id:"legend",label:"Category (Legend)",attrtype:"dimension",min:1,max:1},{id:"size",label:"Bubble Size",attrtype:"measure",max:1},n,o],desc:"Scatterplots show the relationship between two continuous values (i.e. measures) for individual categories (i.e. dimensions). A <i>regression line</i> can be added that shows the linear relationship between values using the <i>least squares methodology</i>.",similar:[],examples:[{title:"",id:"scatter"},{title:"",id:"scatter-timeline"}],regex:"(scatter plot|scatterplot|scatter)"},heatmap:{label:"Heatmap",dataFields:[i,{id:"y_dim",label:"Y Axis",attrtype:"dimension",min:1,max:1},{id:"value",label:"Value",attrtype:"measure",min:1,max:1},n,o],desc:"Heatmaps show data by color variations based on the chosen measure. Traditionally, dark red (i.e. hot) signifies the highest values while lighter (i.e. cool) signifies the lowest values. Heatmaps offer a way to quickly visualize patterns and correlations between the two categories (i.e. dimensions).",similar:["treemap","circle_packing"],examples:[{title:"",id:"heatmap"}]},funnel:{label:"Funnel",dataFields:[Object.assign({},s,{min:1}),r],desc:"Funnel charts show bars for each category (dimension) with the proportional size based on the measure value. The categories are shown in decreasing order with the largest values on top and smallest on bottom, making it look like a funnel.",similar:["pie","donut","sunburst"],examples:[{title:"",id:"funnel"}]},big_number:{label:"KPI (Rich Text)",dataFields:[r,Object.assign({},l,{label:"Compare To",max:1}),{id:"repeater",label:"Card Repeater",attrtype:"dimension",max:1}],desc:"KPI (Key Performance Indicator) cards, also called Big Number, allow you to use rich text/HTML to explain your data. You can design the card and insert measure/dimension parameters, as well as static text, anywhere on the card. KPI cards are best used on dashboards.",similar:[],examples:[{title:"",id:"big_number"}]},waterfall:{label:"Waterfall Chart",dataFields:[Object.assign({},i,{label:"Axis"}),r],desc:"Waterfall charts show the positive or negative accumulation of metrics in a sequence on the axis that can be based on time or category. The end result often looks like a waterfall, starting at the top with a total and stepping down to the bottom.",similar:[],examples:[{title:"",id:"waterfall"}]},histogram:{label:"Histogram",dataFields:[{id:"frequency",label:"Frequency (Values)",attrtype:"measure",min:1,max:1},{id:"category",label:"Category",attrtype:"dimension",max:1}],desc:"Histogram is a bar chart that shows distribution over a continuous interval. Each bar in the histogram is the frequency (count, number of occurances) at each interval.",similar:["bar"],examples:[{title:"",id:"histogram-chart"}]},treemap:{label:"Treemap",dataFields:[{id:"levels",label:"Levels",attrtype:"dimension",min:1,max:2},r,n],desc:"Treemaps show hierarchical data with category (i.e. dimension) rectangle size based on the chosen meausure. If multiple dimensions are chosen, then the first dimension (i.e. category) will have the second dimension (i.e. subcategory) nested inside of it.",similar:["heatmap","circle_packing"],examples:[{title:"",id:"treemap"}]},sankey:{label:"Sankey",dataFields:[{id:"source",label:"Source",attrtype:"dimension",min:1,max:1},{id:"target",label:"Target",attrtype:"dimension",min:1,max:1},r],desc:"Sankey Diagrams show flow between dimensions with proportional sized lines connecting them. They are often used to show the flow of energy, money, goods, or materials through a process.",similar:[],examples:[{title:"",id:"sankey"}]},sunburst:{label:"Sunburst",dataFields:[{id:"levels",label:"Levels",attrtype:"dimension",min:1,max:2},r,n],desc:"Sunburst charts are similar to donut/pie charts that show proportions, but also show hierarchy when multiple dimensions (categories) are selected. Sunburst charts allow drilling down the hierarchy by clicking on the innermost parent groups to focus on the children of that group.",similar:["pie","donut","funnel"],examples:[{title:"",id:"sunburst"}]},circle_packing:{label:"Circle Packing",dataFields:[{id:"levels",label:"Levels",attrtype:"dimension",min:1},r],desc:"Circle Packing charts show nested circles for each category level (dimension) with the size based on one measure. They are similar to Treemap charts.",similar:["heatmap","treemap"],examples:[{title:"",id:"circle"}]},word_cloud:{label:"Word Cloud",dataFields:[Object.assign({},s,{min:1}),r],desc:"Word Clouds display text with the size of each word proportional to the value. The text words are based on the selected dimension and the size is dependent upon the selected measure. Word clouds are often used to display frequency of words, but can be used to display any proportional difference between categories.",similar:[],examples:[{title:"",id:"word-cloud"}]},radar:{label:"Radar",dataFields:[Object.assign({},i,{label:"Category"}),r],desc:"<p>Also known as <i>Spider or Polar Charts</i></p><p>Radar charts compare multiple measures (typically 3 or more) to determine similarities or outliers. They are good for seeing patterns, comparisons, and relationships between variables.</p>",similar:["parallel"],examples:[{title:"",id:"radar"}]},gauge:{label:"Gauge",dataFields:[Object.assign({},s,{label:"Category"}),r],desc:'Gauge charts resemble car dashboard items like the speedometer and use the dial to display where metrics are on the guages scale. The gauge can have multiple categories with different colors, often to describe things such as "good", "neutral", "poor".',similar:["bullet"],examples:[{title:"",id:"gauge"}]},calendar:{label:"Calendar Heatmap",dataFields:[Object.assign({},i,{label:"Date Field",datatype:"date"}),r],desc:"Calendar Heatmaps appear as a calendar with individual dates showing color variation based on the measure value. They are an effective way to quickly visualize variations, patterns, and outliers based on date.",similar:["heatmap"],examples:[{title:"",id:"calendar-heatmap"}]},boxplot:{label:"Boxplot",dataFields:[Object.assign({},i,{label:"Category"}),Object.assign({},s,{label:"Axis"}),r],desc:"<p>Also known as <i>Box & Whisker Plot</i></p><p>Box Plots show data distribution through quartiles. Boxplots may have lines extending from the boxes (i.e. whiskers) that show variability outside the lower and upper quartiles. Outliers may also be shown as dots outside the boxplot.</p>",similar:[],examples:[{title:"",id:"boxplot"}]},bullet:{label:"Bullet",dataFields:[i,Object.assign({},r,{max:1}),{id:"target",label:"Target",attrtype:"measure",max:1}],desc:"Bullet Charts are similar to Bar Charts, but display additional information such as targets and performance (i.e. good, neutral, poor). The main measure is called the <strong>feature</strong> and appears as a thin bar through the middle. There is often a <strong>target</strong> measure, which appears as a thin line, allowing you to see if the feature measure falls above or below. A thicker bar can display ranges that denote performance, allowing you to see how the feature measure performs. Bullet Charts are a good alternative to Gauge Charts because they display more information and take up less space.",similar:["gauge"],examples:[{title:"",id:"bullet-chart"}]},parallel:{label:"Parallel",dataFields:[Object.assign({},s,{min:1}),Object.assign({},r,{id:"measures"})],desc:"Parallel Coordinates show multiple measures together with a line for each category that displays the relationships between them. The measures are displayed horizontally with the selected dimension categories shown at the end with a line connecting the category to each metric.",similar:["radar"],examples:[{title:"",id:"parallel"}]},tree:{label:"Tree",dataFields:[{id:"levels",label:"Levels",attrtype:"dimension",min:1,max:2},r],desc:"Tree diagrams show hieararchy relationships between dimension categories. The first/top node is called the <strong>root node</strong> and child nodes are called <strong>leaf nodes</strong> with the lines connecting them called <strong>branches</strong>. One of the most common tree diagrams is the <i>Organizational Chart</i>, which shows levels of people in an oranization that report to each-other.",similar:["sunburst"],examples:[{title:"",id:"tree"}]},chord:{label:"Chord Diagram",dataFields:[{id:"source",label:"Source",attrtype:"dimension",min:1,max:1},{id:"target",label:"Target",attrtype:"dimension",min:1,max:1},r],desc:"Chord diagrams show the relationships between categories by displaying connecting lines when there is a relationship and sizing the category based on the selected measure.",similar:["tree","sankey"],examples:[{title:"",id:"chord"}]},gantt:{label:"Gantt Chart",dataFields:[{id:"task",label:"Task Levels",attrtype:"dimension",min:1},{id:"category",label:"Category (Legend)",attrtype:"dimension",max:1},{id:"start",label:"Start Date",attrtype:"dimension",min:1,max:1},{id:"end",label:"End Date",attrtype:"dimension",max:1},{id:"duration",label:"Duration",max:1},{id:"complete",label:"% Complete",datatype:"number",max:1},{id:"resource",label:"Resource (Label)",attrtype:"dimension",max:1}],desc:"Most often used in project management, Gantt charts show tasks with duration between start and end date. Tasks are often grouped by categories and assigned % Complete, Resources (i.e. people), and colored by statuses.",similar:[],examples:[{title:"",id:"gantt"}]},stream:{label:"Stream Graph",dataFields:[Object.assign({},i,{datatype:["date","number"]}),Object.assign({},s,{min:1}),r],desc:"Similar to the Stacked Area Chart, Stream Graphs (aka Theme River) show changes in data over time for each category. The values in a stream graph are displaced around a central time-based x-axis and show a flow that resembles a stream, hence the name. Stream graphs are good for displaying high volume data over many categories to show varying trends.",similar:["area"],examples:[{title:"",id:"stream"}]}}},120:function(e,a,t){"use strict";var i=t(0),s=t.n(i),r=t(49),l=t.n(r),n=t(119),o=function(e){var a=e.vizId,t=e.vizProps;return s.a.createElement("a",{href:"/docs/viz/"+a,"aria-label":t.label+" visualization"},s.a.createElement("div",{className:l.a.vizItem},s.a.createElement("em",null,s.a.createElement("img",{src:"/img/viz/"+a+".png",alt:t.label+" visualization"})),s.a.createElement("div",{className:l.a.vizText},t.label)))};a.a=function(e){var a=e.items;return s.a.createElement(s.a.Fragment,null,Object.entries(n.a).map((function(e){return a&&-1===a.indexOf(e[0])?"":s.a.createElement(o,{key:e[0],vizId:e[0],vizProps:e[1]})})))}}}]);