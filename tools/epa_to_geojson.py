import os, json
import pandas as pd
import geopandas as gp

epa_to_acs_cbsa_dir = '_data/epa_to_acs_cbsa'
epa_dir = '_data/epa/stations'

for filename in os.listdir(epa_to_acs_cbsa_dir):
    if not filename.endswith('.csv'): 
        continue

    year = filename.strip('.csv')
    out = '%s/%s_geojson.json' % (epa_dir, year)
    f = os.path.join(epa_to_acs_cbsa_dir, filename)
    print('converting %s and exporting to %s' % (f, out))
    try:
        df = pd.read_csv(f)
        gdf = gp.GeoDataFrame(df, geometry=gp.points_from_xy(df.longitude, df.latitude))
        gdf.to_file(out, driver='GeoJSON')
    except Exception as err:
        print(err)
        print('failed to convert %s' % f)

print('done!')
