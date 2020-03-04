# Proposal

### 🔎 Research Question

<!-- What is your research question? -->

Is there any correlation between change in demographics and residential trends in communities versus changes in air quality in the United States, and if so, what are some likely predictors for air pollutant changes?

### 📦 Data

<!-- What is the data that you will use? How many observations? How many variables? -->

We'll primarily leverage two datasets for our research:

* [**Historical Air Quality**](https://console.cloud.google.com/marketplace/details/epa/historical-air-quality?filter=solution-type%3Adataset&filter=category%3Ascience-research&id=198c2178-3986-4182-a7c7-4c9ae81dfc5d) dataset provided by the Environmental Protection Agency, which contains "annual summary data as well as hourly and daily data in the categories of criteria gases, particulates, meteorological, and toxics."
  * **Observations:** annual summary data for 39 years (1980 to 2019) at 490 sites
    * note: also includes hourly, daily summaries
  * **Variables:** 564 (measurements for various air quality metrics)

* [**American Community Survey**](https://console.cloud.google.com/marketplace/details/united-states-census-bureau/acs?filter=solution-type:dataset&q=census&id=1282ab4c-78a4-4da5-8af8-cd693fe390ab) dataset provided by the United States Census Bureau, which contains "vital information on a yearly basis about [the United States] and its people by contacting over 3.5 million households across the country”.
  * **Observations:** annual summary data since for 11 years (2007 to 2018) at ~519 delineations (using Core Based Statistical Area)
    * note: also includes 3, 5 year projections, and other regional dilineations are available (county, state, etc.)
  * **Variables:** 251 (parameters collected in survey)

### 📈 Methodology

<!-- What methods will you use? Why it is suitable for this dataset and question? -->

TODO
