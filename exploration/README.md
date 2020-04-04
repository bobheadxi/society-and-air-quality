# Exploration

Notebooks used during the exploration part of this project are tracked here. They should generate
the data used in the final presentation when executed in order under `../_data`, with intermediary
files being stored in the untracked `../_data/tmp`.

This document outlines what's going on here.

- [Data](#data)
  - [BigQuery Data Setup](#bigquery-data-setup)
  - [BigQuery Authentication](#bigquery-authentication)

## Data

* [**Historical Air Quality**](https://console.cloud.google.com/marketplace/details/epa/historical-air-quality?filter=solution-type%3Adataset&filter=category%3Ascience-research&id=198c2178-3986-4182-a7c7-4c9ae81dfc5d) dataset provided by the Environmental Protection Agency, which contains "annual summary data as well as hourly and daily data in the categories of criteria gases, particulates, meteorological, and toxics". We'll call this the EPA dataset.
  * **Observations:** annual summary data for 39 years (1980 to 2019) at 490 sites
    * note: also includes hourly, daily summaries
  * **Variables:** 564 (measurements for various air quality metrics)

* [**American Community Survey**](https://console.cloud.google.com/marketplace/details/united-states-census-bureau/acs?filter=solution-type:dataset&q=census&id=1282ab4c-78a4-4da5-8af8-cd693fe390ab) dataset provided by the United States Census Bureau, which contains "vital information on a yearly basis about [the United States] and its people by contacting over 3.5 million households across the country”. We'll call this the ACS dataset.
  * **Observations:** annual summary data since for 11 years (2007 to 2018) at ~519 delineations (using Core Based Statistical Area)
    * note: also includes 3, 5 year projections, and other regional dilineations are available (county, state, etc.)
  * **Variables:** 251 (parameters collected in survey)

### BigQuery Data Setup

Data outlined above should be imported into the following tables on a personal Google Cloud account:

```sh
acs_cbsa_2007_1yr
acs_cbsa_2008_1yr
# ...
acs_cbsa_2018_1yr
epa_air_quality_annual
```

The notebooks assume these are present under `eosc410-project.data`.

### BigQuery Authentication

Refer to the [official documenation](https://cloud.google.com/bigquery/docs/reference/libraries#setting_up_authentication)
for setting up authentication.