-- Migration: Seed ~200 worldwide ski resorts
-- UPSERT to avoid duplicating existing French resorts

-- =========================================================================
-- FRANCE (~30 resorts)
-- =========================================================================
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Les Arcs', 'les-arcs', 45.5708, 6.8281, 1200, 3226, 'France', 'Savoie', 'les-arcs-bourg-saint-maurice'),
  ('La Plagne', 'la-plagne', 45.5058, 6.6789, 1250, 3250, 'France', 'Savoie', 'la-plagne'),
  ('Val d''Isère', 'val-disere', 45.4478, 6.9806, 1550, 3456, 'France', 'Savoie', 'val-d-isere'),
  ('Tignes', 'tignes', 45.4692, 6.9067, 1550, 3456, 'France', 'Savoie', 'tignes'),
  ('Courchevel', 'courchevel', 45.4147, 6.6347, 1300, 2738, 'France', 'Savoie', 'courchevel'),
  ('Méribel', 'meribel', 45.3967, 6.5656, 1400, 2952, 'France', 'Savoie', 'meribel'),
  ('Chamonix', 'chamonix', 45.9237, 6.8694, 1035, 3842, 'France', 'Haute-Savoie', 'chamonix-mont-blanc'),
  ('Megève', 'megeve', 45.8567, 6.6175, 1113, 2350, 'France', 'Haute-Savoie', 'megeve-saint-gervais'),
  ('La Clusaz', 'la-clusaz', 45.9047, 6.4236, 1100, 2600, 'France', 'Haute-Savoie', 'la-clusaz'),
  ('Le Grand-Bornand', 'le-grand-bornand', 45.9419, 6.4297, 1000, 2100, 'France', 'Haute-Savoie', 'le-grand-bornand'),
  ('Alpe d''Huez', 'alpe-dhuez', 45.0922, 6.0686, 1250, 3330, 'France', 'Isère', 'alpe-d-huez'),
  ('Les Deux Alpes', 'les-deux-alpes', 45.0167, 6.1222, 1300, 3600, 'France', 'Isère', 'les-2-alpes'),
  ('Les Menuires', 'les-menuires', 45.3247, 6.5331, 1400, 2850, 'France', 'Savoie', 'les-menuires'),
  ('Val Thorens', 'val-thorens', 45.2975, 6.5839, 1800, 3230, 'France', 'Savoie', 'val-thorens'),
  ('Les Gets', 'les-gets', 46.1589, 6.6686, 1172, 2002, 'France', 'Haute-Savoie', 'les-gets'),
  ('Morzine', 'morzine', 46.1792, 6.7089, 1000, 2460, 'France', 'Haute-Savoie', 'morzine-les-gets'),
  ('Avoriaz', 'avoriaz', 46.1911, 6.7739, 1100, 2466, 'France', 'Haute-Savoie', 'avoriaz'),
  ('Serre Chevalier', 'serre-chevalier', 44.9422, 6.5067, 1200, 2800, 'France', 'Hautes-Alpes', 'serre-chevalier-briancon'),
  ('La Rosière', 'la-rosiere', 45.6283, 6.8483, 1176, 2800, 'France', 'Savoie', 'la-rosiere-espace-san-bernardo'),
  ('Flaine', 'flaine', 46.0036, 6.6872, 1600, 2500, 'France', 'Haute-Savoie', 'flaine'),
  ('Samoëns', 'samoens', 46.0808, 6.7269, 700, 2500, 'France', 'Haute-Savoie', 'samoens-le-grand-massif'),
  ('Les Contamines', 'les-contamines', 45.8178, 6.7261, 1164, 2500, 'France', 'Haute-Savoie', 'les-contamines-montjoie'),
  ('Peisey-Vallandry', 'peisey-vallandry', 45.5467, 6.7622, 1250, 3250, 'France', 'Savoie', 'peisey-vallandry'),
  ('Vars', 'vars', 44.5889, 6.6917, 1650, 2750, 'France', 'Hautes-Alpes', 'vars-risoul'),
  ('Risoul', 'risoul', 44.6244, 6.6367, 1850, 2750, 'France', 'Hautes-Alpes', 'risoul-la-foret-blanche'),
  ('Isola 2000', 'isola-2000', 44.1867, 7.1622, 1800, 2610, 'France', 'Alpes-Maritimes', 'isola-2000'),
  ('Auron', 'auron', 44.2386, 6.9328, 1600, 2450, 'France', 'Alpes-Maritimes', 'auron'),
  ('Les Orres', 'les-orres', 44.5014, 6.5517, 1550, 2720, 'France', 'Hautes-Alpes', 'les-orres'),
  ('Montgenèvre', 'montgenevre', 44.9317, 6.7244, 1860, 2700, 'France', 'Hautes-Alpes', 'montgenevre'),
  ('Font-Romeu', 'font-romeu', 42.4967, 2.0322, 1700, 2213, 'France', 'Pyrénées-Orientales', 'font-romeu-pyrenees-2000')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- =========================================================================
-- AUSTRIA (~30 resorts)
-- =========================================================================
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('St. Anton am Arlberg', 'st-anton', 47.1296, 10.2683, 1304, 2811, 'Austria', 'Tyrol', 'st-anton-am-arlberg'),
  ('Kitzbühel', 'kitzbuehel', 47.4492, 12.3925, 800, 2000, 'Austria', 'Tyrol', 'kitzbuehel-kirchberg'),
  ('Ischgl', 'ischgl', 46.9697, 10.2939, 1377, 2872, 'Austria', 'Tyrol', 'ischgl-samnaun-silvretta-arena'),
  ('Sölden', 'soelden', 46.9653, 10.8761, 1350, 3340, 'Austria', 'Tyrol', 'soelden'),
  ('Lech Zürs', 'lech-zuers', 47.2075, 10.1419, 1450, 2811, 'Austria', 'Vorarlberg', 'lech-zuers-am-arlberg'),
  ('Mayrhofen', 'mayrhofen', 47.1669, 11.8617, 630, 2500, 'Austria', 'Tyrol', 'mayrhofen-hippach'),
  ('Obergurgl-Hochgurgl', 'obergurgl', 46.8678, 11.0267, 1793, 3080, 'Austria', 'Tyrol', 'obergurgl-hochgurgl'),
  ('Stubaier Gletscher', 'stubai-glacier', 46.9978, 11.3128, 1750, 3210, 'Austria', 'Tyrol', 'stubaier-gletscher-stubai-glacier'),
  ('Hintertux Glacier', 'hintertux', 47.0647, 11.6631, 1500, 3250, 'Austria', 'Tyrol', 'hintertuxer-gletscher-hintertux-glacier'),
  ('Saalbach Hinterglemm', 'saalbach', 47.3914, 12.6372, 1003, 2096, 'Austria', 'Salzburg', 'saalbach-hinterglemm-leogang-fieberbrunn'),
  ('Obertauern', 'obertauern', 47.2547, 13.5592, 1630, 2313, 'Austria', 'Salzburg', 'obertauern'),
  ('Bad Gastein', 'bad-gastein', 47.1128, 13.1339, 840, 2686, 'Austria', 'Salzburg', 'bad-gastein-bad-hofgastein'),
  ('Schladming', 'schladming', 47.3933, 13.6872, 745, 2015, 'Austria', 'Styria', 'schladming-planai-hochwurzen'),
  ('Zillertal Arena', 'zillertal-arena', 47.2306, 12.0597, 580, 2500, 'Austria', 'Tyrol', 'zillertal-arena-zell-gerlos'),
  ('Kaprun / Kitzsteinhorn', 'kaprun', 47.1847, 12.6889, 768, 3029, 'Austria', 'Salzburg', 'kitzsteinhorn-maiskogel-kaprun'),
  ('Zell am See', 'zell-am-see', 47.3256, 12.7972, 757, 2000, 'Austria', 'Salzburg', 'zell-am-see-schmittenhoehe'),
  ('Nassfeld', 'nassfeld', 46.5603, 13.2692, 600, 2020, 'Austria', 'Carinthia', 'nassfeld-hermagor'),
  ('Silvretta Montafon', 'silvretta-montafon', 46.9711, 9.9833, 700, 2430, 'Austria', 'Vorarlberg', 'silvretta-montafon'),
  ('Ski Welt Wilder Kaiser', 'skiwelt', 47.4583, 12.3089, 620, 1957, 'Austria', 'Tyrol', 'skiwelt-wilder-kaiser-brixental'),
  ('Ötztal', 'oetztal', 47.2228, 10.8600, 1400, 2272, 'Austria', 'Tyrol', 'hochoetz-oetz'),
  ('Serfaus-Fiss-Ladis', 'serfaus-fiss-ladis', 47.0392, 10.6017, 1200, 2820, 'Austria', 'Tyrol', 'serfaus-fiss-ladis'),
  ('Warth-Schröcken', 'warth-schroecken', 47.2544, 10.1831, 1495, 2811, 'Austria', 'Vorarlberg', 'warth-schroecken'),
  ('Pitztal Glacier', 'pitztal', 46.9258, 10.8539, 1740, 3440, 'Austria', 'Tyrol', 'pitztaler-gletscher-rifflsee-pitztal-glacier'),
  ('Axamer Lizum', 'axamer-lizum', 47.2000, 11.3000, 1580, 2340, 'Austria', 'Tyrol', 'axamer-lizum'),
  ('Kühtai', 'kuehtai', 47.2103, 11.0122, 2020, 2520, 'Austria', 'Tyrol', 'kuehtai'),
  ('Arlberg (Stuben)', 'stuben-arlberg', 47.1300, 10.1833, 1407, 2811, 'Austria', 'Vorarlberg', 'stuben-am-arlberg'),
  ('Damüls-Mellau', 'damuels-mellau', 47.2833, 9.8833, 700, 2100, 'Austria', 'Vorarlberg', 'damuels-mellau-faschina'),
  ('Hochkönig', 'hochkoenig', 47.3833, 13.0833, 800, 1900, 'Austria', 'Salzburg', 'hochkoenig-maria-alm-dienten-muehlbach'),
  ('Katschberg', 'katschberg', 47.0583, 13.6167, 1066, 2220, 'Austria', 'Carinthia', 'katschberg-aineck'),
  ('Alpbachtal', 'alpbachtal', 47.3500, 11.8500, 672, 2025, 'Austria', 'Tyrol', 'ski-juwel-alpbachtal-wildschoenau')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- =========================================================================
-- SWITZERLAND (~25 resorts)
-- =========================================================================
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Zermatt', 'zermatt', 46.0207, 7.7491, 1620, 3883, 'Switzerland', 'Valais', 'zermatt-matterhorn-ski-paradise'),
  ('Verbier', 'verbier', 46.0967, 7.2283, 821, 3330, 'Switzerland', 'Valais', 'verbier-4-vallees'),
  ('St. Moritz', 'st-moritz', 46.4908, 9.8381, 1720, 3303, 'Switzerland', 'Graubünden', 'st-moritz-corviglia'),
  ('Davos Klosters', 'davos', 46.8003, 9.8369, 810, 2844, 'Switzerland', 'Graubünden', 'davos-klosters-parsenn'),
  ('Jungfrau Region', 'jungfrau', 46.5958, 7.9575, 944, 2970, 'Switzerland', 'Bern', 'jungfrau-ski-region-grindelwald-wengen'),
  ('Laax', 'laax', 46.8089, 9.2581, 1100, 3018, 'Switzerland', 'Graubünden', 'laax'),
  ('Saas-Fee', 'saas-fee', 46.1078, 7.9272, 1800, 3600, 'Switzerland', 'Valais', 'saas-fee'),
  ('Crans-Montana', 'crans-montana', 46.3136, 7.4875, 1500, 3000, 'Switzerland', 'Valais', 'crans-montana'),
  ('Engelberg-Titlis', 'engelberg', 46.8219, 8.4036, 1003, 3028, 'Switzerland', 'Obwalden', 'engelberg-titlis'),
  ('Arosa Lenzerheide', 'arosa-lenzerheide', 46.7833, 9.6806, 1229, 2865, 'Switzerland', 'Graubünden', 'arosa-lenzerheide'),
  ('Andermatt-Sedrun', 'andermatt', 46.6361, 8.5944, 1444, 2961, 'Switzerland', 'Uri', 'andermatt-sedrun-disentis'),
  ('4 Vallées (Nendaz)', 'nendaz', 46.1833, 7.3000, 1400, 3330, 'Switzerland', 'Valais', 'nendaz-4-vallees'),
  ('Portes du Soleil (Swiss side)', 'portes-du-soleil-ch', 46.1833, 6.8333, 1050, 2277, 'Switzerland', 'Valais', 'les-crosets-champoussin-portes-du-soleil'),
  ('Adelboden-Lenk', 'adelboden-lenk', 46.4917, 7.5583, 1068, 2362, 'Switzerland', 'Bern', 'adelboden-lenk'),
  ('Gstaad', 'gstaad', 46.4739, 7.2861, 1000, 3000, 'Switzerland', 'Bern', 'gstaad'),
  ('Leukerbad', 'leukerbad', 46.3811, 7.6278, 1411, 2610, 'Switzerland', 'Valais', 'leukerbad-torrent'),
  ('Grimentz-Zinal', 'grimentz-zinal', 46.1833, 7.5833, 1570, 2896, 'Switzerland', 'Valais', 'grimentz-zinal'),
  ('Villars-Gryon', 'villars', 46.3000, 7.0500, 1300, 2120, 'Switzerland', 'Vaud', 'villars-gryon'),
  ('Anzère', 'anzere', 46.3000, 7.4000, 1500, 2420, 'Switzerland', 'Valais', 'anzere'),
  ('Mürren', 'muerren', 46.5597, 7.8928, 1650, 2970, 'Switzerland', 'Bern', 'muerren-schilthorn'),
  ('Hoch-Ybrig', 'hoch-ybrig', 47.0333, 8.7833, 1037, 1856, 'Switzerland', 'Schwyz', 'hoch-ybrig'),
  ('Klosters', 'klosters', 46.8667, 9.8833, 1124, 2602, 'Switzerland', 'Graubünden', 'davos-klosters-madrisa'),
  ('Champéry', 'champery', 46.1747, 6.8706, 1050, 2277, 'Switzerland', 'Valais', 'champery-les-crosets-champoussin-morgins'),
  ('Samnaun', 'samnaun', 46.9456, 10.3736, 1377, 2872, 'Switzerland', 'Graubünden', 'samnaun-ischgl'),
  ('Aletsch Arena', 'aletsch-arena', 46.3833, 8.0667, 1845, 2869, 'Switzerland', 'Valais', 'aletsch-arena')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- =========================================================================
-- ITALY (~20 resorts)
-- =========================================================================
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Cortina d''Ampezzo', 'cortina', 46.5369, 12.1353, 1224, 2930, 'Italy', 'Veneto', 'cortina-d-ampezzo'),
  ('Val Gardena', 'val-gardena', 46.5578, 11.7561, 1236, 2518, 'Italy', 'South Tyrol', 'val-gardena-groeden'),
  ('Alta Badia', 'alta-badia', 46.5600, 11.8625, 1324, 2778, 'Italy', 'South Tyrol', 'alta-badia'),
  ('Madonna di Campiglio', 'madonna-di-campiglio', 46.2289, 10.8264, 853, 2504, 'Italy', 'Trentino', 'madonna-di-campiglio-pinzolo-folgarida-marilleva'),
  ('Kronplatz / Plan de Corones', 'kronplatz', 46.7442, 11.9578, 835, 2275, 'Italy', 'South Tyrol', 'kronplatz-plan-de-corones'),
  ('Selva Val Gardena', 'selva-val-gardena', 46.5556, 11.7594, 1236, 2518, 'Italy', 'South Tyrol', 'selva-val-gardena-selva-wolkenstein'),
  ('Livigno', 'livigno', 46.5381, 10.1350, 1816, 2798, 'Italy', 'Lombardy', 'livigno'),
  ('Cervinia', 'cervinia', 45.9364, 7.6319, 1524, 3480, 'Italy', 'Aosta Valley', 'breuil-cervinia-valtournenche'),
  ('Courmayeur', 'courmayeur', 45.7967, 6.9697, 1224, 2755, 'Italy', 'Aosta Valley', 'courmayeur'),
  ('Sestriere', 'sestriere', 44.9567, 6.8789, 1350, 2823, 'Italy', 'Piedmont', 'vialattea-sestriere-sauze-d-oulx-san-sicario'),
  ('Bormio', 'bormio', 46.4683, 10.3722, 1225, 3012, 'Italy', 'Lombardy', 'bormio'),
  ('San Martino di Castrozza', 'san-martino', 46.2667, 11.8000, 1404, 2357, 'Italy', 'Trentino', 'san-martino-di-castrozza-rolle-pass'),
  ('Canazei (Dolomiti Superski)', 'canazei', 46.4767, 11.7706, 1460, 2628, 'Italy', 'Trentino', 'belvedere-canazei'),
  ('Arabba (Dolomiti)', 'arabba', 46.4972, 11.8744, 1602, 3269, 'Italy', 'Veneto', 'arabba-marmolada'),
  ('La Thuile', 'la-thuile', 45.7178, 6.9547, 1441, 2610, 'Italy', 'Aosta Valley', 'la-thuile'),
  ('Passo Tonale', 'passo-tonale', 46.2592, 10.5847, 1121, 3016, 'Italy', 'Trentino', 'pontedilegno-tonale'),
  ('Alpe di Siusi', 'alpe-di-siusi', 46.5417, 11.6250, 1680, 2350, 'Italy', 'South Tyrol', 'alpe-di-siusi-seiser-alm'),
  ('Monterosa Ski', 'monterosa', 45.8358, 7.8136, 1212, 3275, 'Italy', 'Aosta Valley', 'monterosa-ski-champoluc-gressoney-alagna'),
  ('Bardonecchia', 'bardonecchia', 45.0789, 6.7014, 1312, 2750, 'Italy', 'Piedmont', 'bardonecchia'),
  ('Aprica', 'aprica', 46.1533, 10.1492, 1181, 2300, 'Italy', 'Lombardy', 'aprica')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- =========================================================================
-- USA (~30 resorts)
-- =========================================================================
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Vail', 'vail', 39.6403, -106.3742, 2457, 3527, 'USA', 'Colorado', 'vail'),
  ('Aspen Snowmass', 'aspen-snowmass', 39.2084, -106.9490, 2473, 3813, 'USA', 'Colorado', 'aspen-snowmass'),
  ('Park City', 'park-city', 40.6514, -111.5080, 2080, 3048, 'USA', 'Utah', 'park-city'),
  ('Mammoth Mountain', 'mammoth', 37.6308, -119.0326, 2424, 3369, 'USA', 'California', 'mammoth-mountain-ski-area'),
  ('Jackson Hole', 'jackson-hole', 43.5877, -110.8279, 1924, 3185, 'USA', 'Wyoming', 'jackson-hole'),
  ('Breckenridge', 'breckenridge', 39.4817, -106.0384, 2926, 3914, 'USA', 'Colorado', 'breckenridge'),
  ('Telluride', 'telluride', 37.9375, -107.8123, 2659, 3831, 'USA', 'Colorado', 'telluride'),
  ('Steamboat Springs', 'steamboat', 40.4572, -106.8045, 2103, 3221, 'USA', 'Colorado', 'steamboat'),
  ('Big Sky', 'big-sky', 45.2833, -111.4014, 2072, 3403, 'USA', 'Montana', 'big-sky-resort'),
  ('Sun Valley', 'sun-valley', 43.6978, -114.3511, 1752, 2789, 'USA', 'Idaho', 'sun-valley'),
  ('Deer Valley', 'deer-valley', 40.6375, -111.4783, 2003, 2917, 'USA', 'Utah', 'deer-valley'),
  ('Alta', 'alta', 40.5884, -111.6386, 2600, 3216, 'USA', 'Utah', 'alta-ski-area'),
  ('Snowbird', 'snowbird', 40.5830, -111.6508, 2365, 3353, 'USA', 'Utah', 'snowbird'),
  ('Squaw Valley (Palisades Tahoe)', 'palisades-tahoe', 39.1968, -120.2354, 1890, 2757, 'USA', 'California', 'palisades-tahoe'),
  ('Heavenly', 'heavenly', 38.9353, -119.9400, 1996, 3060, 'USA', 'California', 'heavenly'),
  ('Killington', 'killington', 43.6045, -72.8201, 325, 1293, 'USA', 'Vermont', 'killington'),
  ('Stowe', 'stowe', 44.5303, -72.7814, 390, 1116, 'USA', 'Vermont', 'stowe'),
  ('Copper Mountain', 'copper-mountain', 39.5022, -106.1497, 2926, 3753, 'USA', 'Colorado', 'copper-mountain'),
  ('Winter Park', 'winter-park', 39.8841, -105.7625, 2743, 3676, 'USA', 'Colorado', 'winter-park'),
  ('Keystone', 'keystone', 39.5792, -105.9475, 2835, 3651, 'USA', 'Colorado', 'keystone'),
  ('Crested Butte', 'crested-butte', 38.8986, -106.9653, 2775, 3707, 'USA', 'Colorado', 'crested-butte-mountain-resort'),
  ('Taos Ski Valley', 'taos', 36.5964, -105.4542, 2804, 3804, 'USA', 'New Mexico', 'taos-ski-valley'),
  ('Sugarbush', 'sugarbush', 44.1356, -72.9011, 427, 1244, 'USA', 'Vermont', 'sugarbush'),
  ('Snowbasin', 'snowbasin', 41.2160, -111.8569, 1956, 2896, 'USA', 'Utah', 'snowbasin'),
  ('Mt. Bachelor', 'mt-bachelor', 43.9790, -121.6886, 1775, 2763, 'USA', 'Oregon', 'mt-bachelor'),
  ('Crystal Mountain', 'crystal-mountain', 46.9350, -121.5047, 1341, 2134, 'USA', 'Washington', 'crystal-mountain-washington'),
  ('Arapahoe Basin', 'arapahoe-basin', 39.6425, -105.8719, 3286, 3978, 'USA', 'Colorado', 'arapahoe-basin'),
  ('Beaver Creek', 'beaver-creek', 39.6042, -106.5164, 2255, 3488, 'USA', 'Colorado', 'beaver-creek'),
  ('Northstar California', 'northstar', 39.2746, -120.1211, 1929, 2624, 'USA', 'California', 'northstar-california-resort'),
  ('Whiteface Mountain', 'whiteface', 44.3658, -73.9028, 362, 1417, 'USA', 'New York', 'whiteface-mountain-lake-placid')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- =========================================================================
-- CANADA (~15 resorts)
-- =========================================================================
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Whistler Blackcomb', 'whistler', 50.1163, -122.9574, 653, 2284, 'Canada', 'British Columbia', 'whistler-blackcomb'),
  ('Lake Louise', 'lake-louise', 51.4414, -116.1524, 1645, 2637, 'Canada', 'Alberta', 'lake-louise'),
  ('Banff Sunshine', 'banff-sunshine', 51.0714, -115.7833, 1660, 2730, 'Canada', 'Alberta', 'banff-sunshine-village'),
  ('Revelstoke', 'revelstoke', 50.9583, -118.1614, 512, 2225, 'Canada', 'British Columbia', 'revelstoke-mountain-resort'),
  ('Big White', 'big-white', 49.7258, -118.9314, 1508, 2319, 'Canada', 'British Columbia', 'big-white'),
  ('Sun Peaks', 'sun-peaks', 50.8831, -119.8925, 1200, 2080, 'Canada', 'British Columbia', 'sun-peaks'),
  ('Tremblant', 'tremblant', 46.2142, -74.5856, 265, 875, 'Canada', 'Quebec', 'mont-tremblant'),
  ('Kicking Horse', 'kicking-horse', 51.2972, -117.0478, 1190, 2450, 'Canada', 'British Columbia', 'kicking-horse'),
  ('Fernie', 'fernie', 49.4614, -115.0878, 1082, 1925, 'Canada', 'British Columbia', 'fernie'),
  ('Silver Star', 'silver-star', 50.3614, -119.0619, 1155, 1915, 'Canada', 'British Columbia', 'silverstar'),
  ('Marmot Basin', 'marmot-basin', 52.8024, -118.0822, 1698, 2601, 'Canada', 'Alberta', 'marmot-basin'),
  ('Panorama', 'panorama', 50.4600, -116.2350, 1160, 2365, 'Canada', 'British Columbia', 'panorama'),
  ('Red Mountain', 'red-mountain', 49.1050, -117.8439, 1185, 2075, 'Canada', 'British Columbia', 'red-mountain-resort-rossland'),
  ('Nakiska', 'nakiska', 50.9417, -115.1500, 1525, 2258, 'Canada', 'Alberta', 'nakiska-ski-area'),
  ('Le Massif de Charlevoix', 'le-massif', 47.2642, -70.6236, 3, 806, 'Canada', 'Quebec', 'le-massif-de-charlevoix')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- =========================================================================
-- JAPAN (~10 resorts)
-- =========================================================================
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Niseko United', 'niseko', 42.8628, 140.6989, 260, 1308, 'Japan', 'Hokkaido', 'niseko-united-grand-hirafu-hanazono-niseko-village-annupuri'),
  ('Hakuba Valley', 'hakuba', 36.6983, 137.8322, 760, 1831, 'Japan', 'Nagano', 'hakuba-valley'),
  ('Furano', 'furano', 43.3378, 142.3617, 245, 1074, 'Japan', 'Hokkaido', 'furano'),
  ('Shiga Kogen', 'shiga-kogen', 36.7986, 138.5253, 1340, 2307, 'Japan', 'Nagano', 'shiga-kogen-yakebitai-yama-okushiga'),
  ('Nozawa Onsen', 'nozawa-onsen', 36.9261, 138.6292, 565, 1650, 'Japan', 'Nagano', 'nozawa-onsen'),
  ('Myoko Kogen', 'myoko-kogen', 36.8814, 138.6389, 450, 1500, 'Japan', 'Niigata', 'myoko-kogen-akakura'),
  ('Rusutsu', 'rusutsu', 42.7419, 140.5764, 350, 994, 'Japan', 'Hokkaido', 'rusutsu'),
  ('Kiroro', 'kiroro', 43.0750, 140.9800, 570, 1180, 'Japan', 'Hokkaido', 'kiroro-snow-world'),
  ('Tomamu', 'tomamu', 43.0617, 142.6333, 530, 1239, 'Japan', 'Hokkaido', 'hoshino-resorts-tomamu'),
  ('Naeba', 'naeba', 36.8478, 138.7750, 900, 1789, 'Japan', 'Niigata', 'naeba-mt-naeba')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- =========================================================================
-- SCANDINAVIA (~10 resorts)
-- =========================================================================
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Åre', 'are', 63.3972, 13.0806, 380, 1274, 'Sweden', 'Jämtland', 'aare'),
  ('Sälen (Lindvallen)', 'salen', 61.1600, 13.2700, 440, 890, 'Sweden', 'Dalarna', 'lindvallen-hoegfjaellet-saelen'),
  ('Hemsedal', 'hemsedal', 60.8592, 8.3958, 620, 1450, 'Norway', 'Buskerud', 'hemsedal'),
  ('Trysil', 'trysil', 61.3147, 12.2814, 415, 1132, 'Norway', 'Innlandet', 'trysil'),
  ('Levi', 'levi', 67.7997, 24.8136, 200, 531, 'Finland', 'Lapland', 'levi'),
  ('Ruka', 'ruka', 66.1653, 29.1622, 200, 492, 'Finland', 'Lapland', 'ruka'),
  ('Geilo', 'geilo', 60.5342, 8.2050, 800, 1178, 'Norway', 'Viken', 'geilo'),
  ('Hafjell', 'hafjell', 61.2333, 10.4167, 195, 1030, 'Norway', 'Innlandet', 'hafjell'),
  ('Myrkdalen', 'myrkdalen', 60.8833, 6.5333, 284, 1060, 'Norway', 'Vestland', 'myrkdalen'),
  ('Ylläs', 'yllas', 67.5556, 24.2222, 200, 718, 'Finland', 'Lapland', 'yllaes')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- =========================================================================
-- SPAIN & ANDORRA (~10 resorts)
-- =========================================================================
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Grandvalira', 'grandvalira', 42.5556, 1.7344, 1710, 2640, 'Andorra', 'Andorra', 'grandvalira'),
  ('Vallnord Pal-Arinsal', 'vallnord', 42.5700, 1.4800, 1550, 2560, 'Andorra', 'Andorra', 'vallnord-pal-arinsal'),
  ('Ordino Arcalís', 'ordino-arcalis', 42.6183, 1.4878, 1940, 2625, 'Andorra', 'Andorra', 'ordino-arcalis'),
  ('Baqueira-Beret', 'baqueira-beret', 42.6944, 0.9500, 1500, 2610, 'Spain', 'Catalonia', 'baqueira-beret'),
  ('Sierra Nevada', 'sierra-nevada', 37.0956, -3.3964, 2100, 3300, 'Spain', 'Andalusia', 'sierra-nevada'),
  ('Formigal-Panticosa', 'formigal', 42.7597, -0.3547, 1500, 2250, 'Spain', 'Aragon', 'formigal-panticosa'),
  ('Cerler', 'cerler', 42.5578, 0.5264, 1500, 2630, 'Spain', 'Aragon', 'cerler'),
  ('La Molina', 'la-molina', 42.3372, 1.9422, 1700, 2445, 'Spain', 'Catalonia', 'la-molina'),
  ('Masella', 'masella', 42.3356, 1.8878, 1600, 2535, 'Spain', 'Catalonia', 'masella'),
  ('Boí Taüll', 'boi-taull', 42.4722, 0.8222, 2020, 2751, 'Spain', 'Catalonia', 'boi-taull')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- =========================================================================
-- OTHER (~20 resorts)
-- =========================================================================

-- Germany
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Garmisch-Partenkirchen', 'garmisch', 47.4347, 11.0875, 708, 2050, 'Germany', 'Bavaria', 'garmisch-classic'),
  ('Oberstdorf-Kleinwalsertal', 'oberstdorf', 47.4128, 10.2789, 820, 2224, 'Germany', 'Bavaria', 'oberstdorf-kleinwalsertal'),
  ('Zugspitze', 'zugspitze', 47.4211, 10.9847, 2000, 2720, 'Germany', 'Bavaria', 'zugspitze')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- Slovenia
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Kranjska Gora', 'kranjska-gora', 46.4847, 13.7856, 800, 1215, 'Slovenia', 'Upper Carniola', 'kranjska-gora'),
  ('Vogel', 'vogel', 46.2639, 13.8386, 569, 1800, 'Slovenia', 'Upper Carniola', 'vogel')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- Bulgaria
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Bansko', 'bansko', 41.8186, 23.4886, 990, 2560, 'Bulgaria', 'Blagoevgrad', 'bansko')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- Romania
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Poiana Brasov', 'poiana-brasov', 45.5956, 25.5556, 1020, 1775, 'Romania', 'Transylvania', 'poiana-brasov')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- Georgia
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Gudauri', 'gudauri', 42.4617, 44.4672, 1990, 3307, 'Georgia', 'Mtskheta-Mtianeti', 'gudauri')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- South Korea
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Yongpyong', 'yongpyong', 37.6439, 128.6797, 700, 1458, 'South Korea', 'Gangwon', 'yongpyong')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- New Zealand
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('The Remarkables', 'the-remarkables', -45.0472, 168.8181, 1585, 1943, 'New Zealand', 'Otago', 'the-remarkables'),
  ('Coronet Peak', 'coronet-peak', -45.0869, 168.7278, 1168, 1649, 'New Zealand', 'Otago', 'coronet-peak'),
  ('Mt Hutt', 'mt-hutt', -43.4989, 171.5389, 1500, 2086, 'New Zealand', 'Canterbury', 'mt-hutt')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- Chile
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Valle Nevado', 'valle-nevado', -33.3647, -70.2472, 2860, 3670, 'Chile', 'Santiago', 'valle-nevado'),
  ('Portillo', 'portillo', -32.8358, -70.1311, 2590, 3330, 'Chile', 'Valparaiso', 'portillo')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- Argentina
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Cerro Catedral', 'cerro-catedral', -41.1647, -71.4411, 1030, 2100, 'Argentina', 'Rio Negro', 'catedral-alta-patagonia'),
  ('Las Leñas', 'las-lenas', -35.1375, -70.0778, 2240, 3430, 'Argentina', 'Mendoza', 'las-lenas')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- Turkey
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Uludağ', 'uludag', 40.1019, 29.1203, 1767, 2543, 'Turkey', 'Bursa', 'uludag')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- Poland
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Zakopane (Kasprowy Wierch)', 'zakopane', 49.2319, 19.9811, 1014, 1987, 'Poland', 'Lesser Poland', 'kasprowy-wierch-zakopane')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- Czech Republic
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Špindlerův Mlýn', 'spindleruv-mlyn', 50.7261, 15.6094, 702, 1235, 'Czech Republic', 'Hradec Králové', 'spindleruv-mlyn')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;

-- Slovakia
INSERT INTO resorts (name, slug, latitude, longitude, altitude_min, altitude_max, country, region, skiresort_info_slug) VALUES
  ('Jasná Nízke Tatry', 'jasna', 48.9478, 19.5839, 943, 2024, 'Slovakia', 'Žilina', 'jasna-nizke-tatry')
ON CONFLICT (slug) DO UPDATE SET
  country = EXCLUDED.country,
  region = EXCLUDED.region,
  skiresort_info_slug = EXCLUDED.skiresort_info_slug,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  altitude_min = EXCLUDED.altitude_min,
  altitude_max = EXCLUDED.altitude_max;
