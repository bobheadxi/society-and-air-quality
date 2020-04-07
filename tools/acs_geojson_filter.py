import os, json
import pandas as pd
import geopandas as gp

# tolerance to use for geometry compression
# see https://shapely.readthedocs.io/en/latest/manual.html#object.simplify
simplify_tolerance = 0.1

acs_dir = 'docs/_data/acs/regions'
conversion_dir = 'docs/_data/epa_to_acs_cbsa'
tmp_dir = 'docs/_data/tmp'

for year_dir in [os.path.join(tmp_dir, o) for o in os.listdir(tmp_dir) if os.path.isdir(os.path.join(tmp_dir, o))]:

    target = os.path.join(year_dir, 'geojson.json')
    year = os.path.basename(year_dir).strip('acs_cbsa_')
    out = '%s/%s_geojson.json' % (acs_dir, year)
    print('converting %s and exporting to %s' % (target, out))

    try:
        conversion = pd.read_csv(os.path.join(conversion_dir, '%s.csv' % year))
        geoids = conversion['acs_geoid'].unique().tolist()
        gdf = gp.read_file(target)
        # only collect relevant geoids
        collect = pd.DataFrame()
        for geoid in geoids:
            cbsafp_key = 'CBSAFP'
            name_key = 'NAME'
            if year == '2010':
                cbsafp_key = '%s10' % cbsafp_key
                name_key = '%s10' % name_key
            region = gdf[gdf[cbsafp_key] == str(geoid)].iloc[0]
            simplified = region['geometry'].simplify(tolerance=simplify_tolerance)
            collect = collect.append({
                'geoid': region[cbsafp_key],
                'name': region[name_key],
                'geometry': simplified,
            }, ignore_index=True)
        new_gdf = gp.GeoDataFrame(collect, geometry=collect['geometry'])
        print(new_gdf)
        new_gdf.to_file(out, driver='GeoJSON')
    except Exception as err:
        print(err)
        print('failed to convert %s' % target)

print('done!')
