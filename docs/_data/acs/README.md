# ACS

Generated by the notebook [4. ACS Data](../../../exploration/4_epa_data.ipynb).

- [ACS](#acs)
  - [Files](#files)
  - [Combined ID](#combined-id)

## Files

* `timeseries_flat.csv`: years x metrics
* `timeseries_vert.csv`: metrics x years
* `timeseries_vert_alt.csv`: metric
* `raw.csv`: data collected as-is from BigQuery

## Combined ID

This is tracked as `combined_id` in the `_/data/acs` data.

```
[geoid]    [metric]
 13820.acs.total_pop
```

* `geoid`: ACS CBSA region identifier
* `metric`: string identifier for a ACS metric
