// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        "getting-started",
        "new",
        "portal",
      ]
    },
    {
      type: 'category',
      label: 'Reports and Dashboards',
      items: [
        "report",
        "dashboard",
        "dataportal",
        "tableauconnector",
        "accessibility",
      ]
    },
    {
      type: 'category',
      label: 'Data and Modeling',
      items: [
        "datamodeling",
        "etl",
        "orchestration",
        "data-ingestion",
      ]
    },
    {
      type: 'category',
      label: 'Deployment',
      items: [
        "deploy",
        "docker",
        "docker-windows",
        "cloud",
        "on-premise",
      ]
    },
    {
      type: 'category',
      label: 'Administration',
      items: [
        "administration",
        "saml",
      ]
    },
    {
      type: 'category',
      label: 'Visualizations',
      items: [
        "viz/guide",
        {
          "Viz Types": [
            "viz/area",
            "viz/bar",
            "viz/boxplot",
            "viz/bullet",
            "viz/calendar",
            "viz/chord",
            "viz/circle_packing",
            "viz/column",
            "viz/combo",
            "viz/donut",
            "viz/funnel",
            "viz/gantt",
            "viz/gauge",
            "viz/heatmap",
            "viz/histogram",
            "viz/big_number",            
            "viz/line",
            "viz/map",
            "viz/parallel",
            "viz/pie",
            "viz/radar",
            "viz/sankey",
            "viz/scatter",
            "viz/stream",
            "viz/sunburst",
            "viz/table",
            "viz/treemap",
            "viz/tree",
            "viz/waterfall",
            "viz/word_cloud",
          ]
        }
        
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        "dbt",
        "dbt_semantic",
      ]
    },
  ],
};

module.exports = sidebars;
