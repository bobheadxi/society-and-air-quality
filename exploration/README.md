# Exploration

Notebooks used during the exploration part of this project are tracked here. They should generate
the data used in the final presentation when executed in order under `../_data`, with intermediary
files being stored in the untracked `../_data/tmp`.

This document outlines what's going on here.

- [Data](#data)
  - [BigQuery](#bigquery)
    - [Database Setup](#database-setup)
    - [Authentication](#authentication)
  - [Generated Data](#generated-data)
  - [Persisted Data](#persisted-data)
- [Notebooks](#notebooks)

## Data

### BigQuery

We leverage the following datasets on Google BigQuery for this exploration:

* [**Historical Air Quality**](https://console.cloud.google.com/marketplace/details/epa/historical-air-quality?filter=solution-type%3Adataset&filter=category%3Ascience-research&id=198c2178-3986-4182-a7c7-4c9ae81dfc5d) dataset provided by the Environmental Protection Agency, which contains "annual summary data as well as hourly and daily data in the categories of criteria gases, particulates, meteorological, and toxics". We'll call this the EPA dataset.

* [**American Community Survey**](https://console.cloud.google.com/marketplace/details/united-states-census-bureau/acs?filter=solution-type:dataset&q=census&id=1282ab4c-78a4-4da5-8af8-cd693fe390ab) dataset provided by the United States Census Bureau, which contains "vital information on a yearly basis about [the United States] and its people by contacting over 3.5 million households across the country”. We'll call this the ACS dataset.

#### Database Setup

Data outlined above should be imported into the following tables on a personal Google Cloud account:

```sh
acs_cbsa_2007_1yr
acs_cbsa_2008_1yr
# ...
acs_cbsa_2018_1yr
epa_air_quality_annual
```

The notebooks assume these are present under `eosc410-project.data`.

#### Authentication

Refer to the [official documenation](https://cloud.google.com/bigquery/docs/reference/libraries#setting_up_authentication)
for setting up authentication. Relevant notebooks have a code block that initializes a BigQuery client
with the expectation that you have a `google_app_credentials.json` in the root directory:

```py
# set up path to app credentials - see exploration/README.md
%env GOOGLE_APPLICATION_CREDENTIALS=../google_app_credentials.json

# set up bigquery client
from google.cloud import bigquery
bq = bigquery.Client()
```

### Generated Data

The first 4 notebooks pull from BigQuery and other sources, and dumps intermediary data in `_data/tmp/`.
This data is not persisted.

### Persisted Data

Persisted data is tracked in `_data/`, outside of `_data/tmp/`. Refer to each subdirectory's `README.md`
for more details.

## Notebooks

1. [ACS Boundaries](1_acs_boundaries.ipynb)
2. [Aligning ACS and EPA Data](2_aligning_acs_and_epa.ipynb)
3. [EPA Data](3_epa_data.ipynb)
4. [ACS Data](4_acs_data.ipynb)

