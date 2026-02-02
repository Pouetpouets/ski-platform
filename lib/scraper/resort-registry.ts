/**
 * Worldwide Resort Registry
 * Curated list of ~200 top ski resorts worldwide with skiresort.info slugs
 */

export interface ResortRegistryEntry {
  name: string;
  slug: string;
  skiresort_info_slug: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
  altitude_min: number;
  altitude_max: number;
}

export const RESORT_REGISTRY: ResortRegistryEntry[] = [
  // =========================================================================
  // FRANCE (~30 resorts)
  // =========================================================================
  { name: 'Les Arcs', slug: 'les-arcs', skiresort_info_slug: 'les-arcs-peisey-vallandry-paradiski', country: 'France', region: 'Savoie', latitude: 45.5708, longitude: 6.8281, altitude_min: 1200, altitude_max: 3226 },
  { name: 'La Plagne', slug: 'la-plagne', skiresort_info_slug: 'la-plagne-paradiski', country: 'France', region: 'Savoie', latitude: 45.5058, longitude: 6.6789, altitude_min: 1250, altitude_max: 3250 },
  { name: "Val d'Isère", slug: 'val-disere', skiresort_info_slug: 'tignes-val-disere', country: 'France', region: 'Savoie', latitude: 45.4478, longitude: 6.9806, altitude_min: 1550, altitude_max: 3456 },
  { name: 'Tignes', slug: 'tignes', skiresort_info_slug: 'tignes-val-disere', country: 'France', region: 'Savoie', latitude: 45.4692, longitude: 6.9067, altitude_min: 1550, altitude_max: 3456 },
  { name: 'Courchevel', slug: 'courchevel', skiresort_info_slug: 'les-3-vallees-val-thorens-les-menuires-meribel-courchevel', country: 'France', region: 'Savoie', latitude: 45.4147, longitude: 6.6347, altitude_min: 1300, altitude_max: 2738 },
  { name: 'Méribel', slug: 'meribel', skiresort_info_slug: 'les-3-vallees-val-thorens-les-menuires-meribel-courchevel', country: 'France', region: 'Savoie', latitude: 45.3967, longitude: 6.5656, altitude_min: 1400, altitude_max: 2952 },
  { name: 'Chamonix', slug: 'chamonix', skiresort_info_slug: 'brevent-flegere-chamonix', country: 'France', region: 'Haute-Savoie', latitude: 45.9237, longitude: 6.8694, altitude_min: 1035, altitude_max: 3842 },
  { name: 'Megève', slug: 'megeve', skiresort_info_slug: 'megeve-saint-gervais', country: 'France', region: 'Haute-Savoie', latitude: 45.8567, longitude: 6.6175, altitude_min: 1113, altitude_max: 2350 },
  { name: 'La Clusaz', slug: 'la-clusaz', skiresort_info_slug: 'la-clusaz-manigod', country: 'France', region: 'Haute-Savoie', latitude: 45.9047, longitude: 6.4236, altitude_min: 1100, altitude_max: 2600 },
  { name: 'Le Grand-Bornand', slug: 'le-grand-bornand', skiresort_info_slug: 'le-grand-bornand', country: 'France', region: 'Haute-Savoie', latitude: 45.9419, longitude: 6.4297, altitude_min: 1000, altitude_max: 2100 },
  { name: "Alpe d'Huez", slug: 'alpe-dhuez', skiresort_info_slug: 'alpe-dhuez', country: 'France', region: 'Isère', latitude: 45.0922, longitude: 6.0686, altitude_min: 1250, altitude_max: 3330 },
  { name: 'Les Deux Alpes', slug: 'les-deux-alpes', skiresort_info_slug: 'les-2-alpes', country: 'France', region: 'Isère', latitude: 45.0167, longitude: 6.1222, altitude_min: 1300, altitude_max: 3600 },
  { name: 'Les Menuires', slug: 'les-menuires', skiresort_info_slug: 'les-3-vallees-val-thorens-les-menuires-meribel-courchevel', country: 'France', region: 'Savoie', latitude: 45.3247, longitude: 6.5331, altitude_min: 1400, altitude_max: 2850 },
  { name: 'Val Thorens', slug: 'val-thorens', skiresort_info_slug: 'les-3-vallees-val-thorens-les-menuires-meribel-courchevel', country: 'France', region: 'Savoie', latitude: 45.2975, longitude: 6.5839, altitude_min: 1800, altitude_max: 3230 },
  { name: 'Les Gets', slug: 'les-gets', skiresort_info_slug: 'les-portes-du-soleil-morzine-avoriaz-les-gets-chatel-morgins-champery', country: 'France', region: 'Haute-Savoie', latitude: 46.1589, longitude: 6.6686, altitude_min: 1172, altitude_max: 2002 },
  { name: 'Morzine', slug: 'morzine', skiresort_info_slug: 'les-portes-du-soleil-morzine-avoriaz-les-gets-chatel-morgins-champery', country: 'France', region: 'Haute-Savoie', latitude: 46.1792, longitude: 6.7089, altitude_min: 1000, altitude_max: 2460 },
  { name: 'Avoriaz', slug: 'avoriaz', skiresort_info_slug: 'les-portes-du-soleil-morzine-avoriaz-les-gets-chatel-morgins-champery', country: 'France', region: 'Haute-Savoie', latitude: 46.1911, longitude: 6.7739, altitude_min: 1100, altitude_max: 2466 },
  { name: 'Serre Chevalier', slug: 'serre-chevalier', skiresort_info_slug: 'serre-chevalier-briancon-chantemerle-villeneuve-la-salle-le-monetier-les-bains', country: 'France', region: 'Hautes-Alpes', latitude: 44.9422, longitude: 6.5067, altitude_min: 1200, altitude_max: 2800 },
  { name: 'La Rosière', slug: 'la-rosiere', skiresort_info_slug: 'espace-san-bernardo-la-rosiere-la-thuile', country: 'France', region: 'Savoie', latitude: 45.6283, longitude: 6.8483, altitude_min: 1176, altitude_max: 2800 },
  { name: 'Flaine', slug: 'flaine', skiresort_info_slug: 'le-grand-massif-flaine-les-carroz-morillon-samoens-sixt', country: 'France', region: 'Haute-Savoie', latitude: 46.0036, longitude: 6.6872, altitude_min: 1600, altitude_max: 2500 },
  { name: 'Samoëns', slug: 'samoens', skiresort_info_slug: 'le-grand-massif-flaine-les-carroz-morillon-samoens-sixt', country: 'France', region: 'Haute-Savoie', latitude: 46.0808, longitude: 6.7269, altitude_min: 700, altitude_max: 2500 },
  { name: 'Les Contamines', slug: 'les-contamines', skiresort_info_slug: 'les-contamines-montjoie', country: 'France', region: 'Haute-Savoie', latitude: 45.8178, longitude: 6.7261, altitude_min: 1164, altitude_max: 2500 },
  { name: 'Peisey-Vallandry', slug: 'peisey-vallandry', skiresort_info_slug: 'les-arcs-peisey-vallandry-paradiski', country: 'France', region: 'Savoie', latitude: 45.5467, longitude: 6.7622, altitude_min: 1250, altitude_max: 3250 },
  { name: 'Vars', slug: 'vars', skiresort_info_slug: 'vars-risoul-la-foret-blanche', country: 'France', region: 'Hautes-Alpes', latitude: 44.5889, longitude: 6.6917, altitude_min: 1650, altitude_max: 2750 },
  { name: 'Risoul', slug: 'risoul', skiresort_info_slug: 'vars-risoul-la-foret-blanche', country: 'France', region: 'Hautes-Alpes', latitude: 44.6244, longitude: 6.6367, altitude_min: 1850, altitude_max: 2750 },
  { name: 'Isola 2000', slug: 'isola-2000', skiresort_info_slug: 'isola-2000', country: 'France', region: 'Alpes-Maritimes', latitude: 44.1867, longitude: 7.1622, altitude_min: 1800, altitude_max: 2610 },
  { name: 'Auron', slug: 'auron', skiresort_info_slug: 'auron', country: 'France', region: 'Alpes-Maritimes', latitude: 44.2386, longitude: 6.9328, altitude_min: 1600, altitude_max: 2450 },
  { name: 'Les Orres', slug: 'les-orres', skiresort_info_slug: 'les-orres', country: 'France', region: 'Hautes-Alpes', latitude: 44.5014, longitude: 6.5517, altitude_min: 1550, altitude_max: 2720 },
  { name: 'Montgenèvre', slug: 'montgenevre', skiresort_info_slug: 'via-lattea-sestriere-sauze-doulx-san-sicario-claviere-montgenevre', country: 'France', region: 'Hautes-Alpes', latitude: 44.9317, longitude: 6.7244, altitude_min: 1860, altitude_max: 2700 },
  { name: 'Font-Romeu', slug: 'font-romeu', skiresort_info_slug: 'font-romeu-bolquere-pyrenees-2000', country: 'France', region: 'Pyrénées-Orientales', latitude: 42.4967, longitude: 2.0322, altitude_min: 1700, altitude_max: 2213 },

  // =========================================================================
  // AUSTRIA (~30 resorts)
  // =========================================================================
  { name: 'St. Anton am Arlberg', slug: 'st-anton', skiresort_info_slug: 'st-anton-st-christoph-stuben-lech-zuers-warth-schroecken-ski-arlberg', country: 'Austria', region: 'Tyrol', latitude: 47.1296, longitude: 10.2683, altitude_min: 1304, altitude_max: 2811 },
  { name: 'Kitzbühel', slug: 'kitzbuehel', skiresort_info_slug: 'kitzski-kitzbuehel-kirchberg', country: 'Austria', region: 'Tyrol', latitude: 47.4492, longitude: 12.3925, altitude_min: 800, altitude_max: 2000 },
  { name: 'Ischgl', slug: 'ischgl', skiresort_info_slug: 'ischgl-samnaun-silvretta-arena', country: 'Austria', region: 'Tyrol', latitude: 46.9697, longitude: 10.2939, altitude_min: 1377, altitude_max: 2872 },
  { name: 'Sölden', slug: 'soelden', skiresort_info_slug: 'soelden', country: 'Austria', region: 'Tyrol', latitude: 46.9653, longitude: 10.8761, altitude_min: 1350, altitude_max: 3340 },
  { name: 'Lech Zürs', slug: 'lech-zuers', skiresort_info_slug: 'lech-zuers-am-arlberg', country: 'Austria', region: 'Vorarlberg', latitude: 47.2075, longitude: 10.1419, altitude_min: 1450, altitude_max: 2811 },
  { name: 'Mayrhofen', slug: 'mayrhofen', skiresort_info_slug: 'mayrhofen-penken-ahorn-rastkogel-eggalm-mountopolis', country: 'Austria', region: 'Tyrol', latitude: 47.1669, longitude: 11.8617, altitude_min: 630, altitude_max: 2500 },
  { name: 'Obergurgl-Hochgurgl', slug: 'obergurgl', skiresort_info_slug: 'obergurgl-hochgurgl', country: 'Austria', region: 'Tyrol', latitude: 46.8678, longitude: 11.0267, altitude_min: 1793, altitude_max: 3080 },
  { name: 'Stubaier Gletscher', slug: 'stubai-glacier', skiresort_info_slug: 'stubai-glacier-stubaier-gletscher', country: 'Austria', region: 'Tyrol', latitude: 46.9978, longitude: 11.3128, altitude_min: 1750, altitude_max: 3210 },
  { name: 'Hintertux Glacier', slug: 'hintertux', skiresort_info_slug: 'hintertux-glacier-hintertuxer-gletscher', country: 'Austria', region: 'Tyrol', latitude: 47.0647, longitude: 11.6631, altitude_min: 1500, altitude_max: 3250 },
  { name: 'Saalbach Hinterglemm', slug: 'saalbach', skiresort_info_slug: 'saalbach-hinterglemm-leogang-fieberbrunn-skicircus', country: 'Austria', region: 'Salzburg', latitude: 47.3914, longitude: 12.6372, altitude_min: 1003, altitude_max: 2096 },
  { name: 'Obertauern', slug: 'obertauern', skiresort_info_slug: 'obertauern', country: 'Austria', region: 'Salzburg', latitude: 47.2547, longitude: 13.5592, altitude_min: 1630, altitude_max: 2313 },
  { name: 'Bad Gastein', slug: 'bad-gastein', skiresort_info_slug: 'bad-gastein-bad-hofgastein', country: 'Austria', region: 'Salzburg', latitude: 47.1128, longitude: 13.1339, altitude_min: 840, altitude_max: 2686 },
  { name: 'Schladming', slug: 'schladming', skiresort_info_slug: 'schladming-planai-hochwurzen-hauser-kaibling-reiteralm-4-berge-skischaukel', country: 'Austria', region: 'Styria', latitude: 47.3933, longitude: 13.6872, altitude_min: 745, altitude_max: 2015 },
  { name: 'Zillertal Arena', slug: 'zillertal-arena', skiresort_info_slug: 'zillertal-arena-zell-am-ziller-gerlos-koenigsleiten-hochkrimml', country: 'Austria', region: 'Tyrol', latitude: 47.2306, longitude: 12.0597, altitude_min: 580, altitude_max: 2500 },
  { name: 'Kaprun / Kitzsteinhorn', slug: 'kaprun', skiresort_info_slug: 'kitzsteinhorn-maiskogel-kaprun', country: 'Austria', region: 'Salzburg', latitude: 47.1847, longitude: 12.6889, altitude_min: 768, altitude_max: 3029 },
  { name: 'Zell am See', slug: 'zell-am-see', skiresort_info_slug: 'schmittenhoehe-zell-am-see', country: 'Austria', region: 'Salzburg', latitude: 47.3256, longitude: 12.7972, altitude_min: 757, altitude_max: 2000 },
  { name: 'Nassfeld', slug: 'nassfeld', skiresort_info_slug: 'nassfeld-hermagor', country: 'Austria', region: 'Carinthia', latitude: 46.5603, longitude: 13.2692, altitude_min: 600, altitude_max: 2020 },
  { name: 'Silvretta Montafon', slug: 'silvretta-montafon', skiresort_info_slug: 'silvretta-montafon', country: 'Austria', region: 'Vorarlberg', latitude: 46.9711, longitude: 9.9833, altitude_min: 700, altitude_max: 2430 },
  { name: 'Ski Welt Wilder Kaiser', slug: 'skiwelt', skiresort_info_slug: 'skiwelt-wilder-kaiser-brixental', country: 'Austria', region: 'Tyrol', latitude: 47.4583, longitude: 12.3089, altitude_min: 620, altitude_max: 1957 },
  { name: 'Ötztal', slug: 'oetztal', skiresort_info_slug: 'hochoetz-oetz', country: 'Austria', region: 'Tyrol', latitude: 47.2228, longitude: 10.8600, altitude_min: 1400, altitude_max: 2272 },
  { name: 'Serfaus-Fiss-Ladis', slug: 'serfaus-fiss-ladis', skiresort_info_slug: 'serfaus-fiss-ladis', country: 'Austria', region: 'Tyrol', latitude: 47.0392, longitude: 10.6017, altitude_min: 1200, altitude_max: 2820 },
  { name: 'Warth-Schröcken', slug: 'warth-schroecken', skiresort_info_slug: 'warth-schroecken', country: 'Austria', region: 'Vorarlberg', latitude: 47.2544, longitude: 10.1831, altitude_min: 1495, altitude_max: 2811 },
  { name: 'Pitztal Glacier', slug: 'pitztal', skiresort_info_slug: 'pitztal-glacier-pitztaler-gletscher', country: 'Austria', region: 'Tyrol', latitude: 46.9258, longitude: 10.8539, altitude_min: 1740, altitude_max: 3440 },
  { name: 'Axamer Lizum', slug: 'axamer-lizum', skiresort_info_slug: 'axamer-lizum', country: 'Austria', region: 'Tyrol', latitude: 47.2000, longitude: 11.3000, altitude_min: 1580, altitude_max: 2340 },
  { name: 'Kühtai', slug: 'kuehtai', skiresort_info_slug: 'kuehtai', country: 'Austria', region: 'Tyrol', latitude: 47.2103, longitude: 11.0122, altitude_min: 2020, altitude_max: 2520 },
  { name: 'Arlberg (Stuben)', slug: 'stuben-arlberg', skiresort_info_slug: 'st-anton-st-christoph-stuben-lech-zuers-warth-schroecken-ski-arlberg', country: 'Austria', region: 'Vorarlberg', latitude: 47.1300, longitude: 10.1833, altitude_min: 1407, altitude_max: 2811 },
  { name: 'Damüls-Mellau', slug: 'damuels-mellau', skiresort_info_slug: 'damuels-mellau', country: 'Austria', region: 'Vorarlberg', latitude: 47.2833, longitude: 9.8833, altitude_min: 700, altitude_max: 2100 },
  { name: 'Hochkönig', slug: 'hochkoenig', skiresort_info_slug: 'hochkoenig-maria-alm-dienten-muehlbach', country: 'Austria', region: 'Salzburg', latitude: 47.3833, longitude: 13.0833, altitude_min: 800, altitude_max: 1900 },
  { name: 'Katschberg', slug: 'katschberg', skiresort_info_slug: 'katschberg', country: 'Austria', region: 'Carinthia', latitude: 47.0583, longitude: 13.6167, altitude_min: 1066, altitude_max: 2220 },
  { name: 'Alpbachtal', slug: 'alpbachtal', skiresort_info_slug: 'ski-juwel-alpbachtal-wildschoenau', country: 'Austria', region: 'Tyrol', latitude: 47.3500, longitude: 11.8500, altitude_min: 672, altitude_max: 2025 },

  // =========================================================================
  // SWITZERLAND (~25 resorts)
  // =========================================================================
  { name: 'Zermatt', slug: 'zermatt', skiresort_info_slug: 'zermatt-breuil-cervinia-valtournenche-matterhorn', country: 'Switzerland', region: 'Valais', latitude: 46.0207, longitude: 7.7491, altitude_min: 1620, altitude_max: 3883 },
  { name: 'Verbier', slug: 'verbier', skiresort_info_slug: '4-vallees-verbier-la-tzoumaz-nendaz-veysonnaz-thyon', country: 'Switzerland', region: 'Valais', latitude: 46.0967, longitude: 7.2283, altitude_min: 821, altitude_max: 3330 },
  { name: 'St. Moritz', slug: 'st-moritz', skiresort_info_slug: 'st-moritz-corviglia', country: 'Switzerland', region: 'Graubünden', latitude: 46.4908, longitude: 9.8381, altitude_min: 1720, altitude_max: 3303 },
  { name: 'Davos Klosters', slug: 'davos', skiresort_info_slug: 'parsenn-davos-klosters', country: 'Switzerland', region: 'Graubünden', latitude: 46.8003, longitude: 9.8369, altitude_min: 810, altitude_max: 2844 },
  { name: 'Jungfrau Region', slug: 'jungfrau', skiresort_info_slug: 'kleine-scheidegg-maennlichen-grindelwald-wengen', country: 'Switzerland', region: 'Bern', latitude: 46.5958, longitude: 7.9575, altitude_min: 944, altitude_max: 2970 },
  { name: 'Laax', slug: 'laax', skiresort_info_slug: 'laax-flims-falera', country: 'Switzerland', region: 'Graubünden', latitude: 46.8089, longitude: 9.2581, altitude_min: 1100, altitude_max: 3018 },
  { name: 'Saas-Fee', slug: 'saas-fee', skiresort_info_slug: 'saas-fee', country: 'Switzerland', region: 'Valais', latitude: 46.1078, longitude: 7.9272, altitude_min: 1800, altitude_max: 3600 },
  { name: 'Crans-Montana', slug: 'crans-montana', skiresort_info_slug: 'crans-montana', country: 'Switzerland', region: 'Valais', latitude: 46.3136, longitude: 7.4875, altitude_min: 1500, altitude_max: 3000 },
  { name: 'Engelberg-Titlis', slug: 'engelberg', skiresort_info_slug: 'titlis-engelberg', country: 'Switzerland', region: 'Obwalden', latitude: 46.8219, longitude: 8.4036, altitude_min: 1003, altitude_max: 3028 },
  { name: 'Arosa Lenzerheide', slug: 'arosa-lenzerheide', skiresort_info_slug: 'arosa-lenzerheide', country: 'Switzerland', region: 'Graubünden', latitude: 46.7833, longitude: 9.6806, altitude_min: 1229, altitude_max: 2865 },
  { name: 'Andermatt-Sedrun', slug: 'andermatt', skiresort_info_slug: 'andermatt-oberalp-sedrun', country: 'Switzerland', region: 'Uri', latitude: 46.6361, longitude: 8.5944, altitude_min: 1444, altitude_max: 2961 },
  { name: '4 Vallées (Nendaz)', slug: 'nendaz', skiresort_info_slug: '4-vallees-verbier-la-tzoumaz-nendaz-veysonnaz-thyon', country: 'Switzerland', region: 'Valais', latitude: 46.1833, longitude: 7.3000, altitude_min: 1400, altitude_max: 3330 },
  { name: 'Portes du Soleil (Swiss side)', slug: 'portes-du-soleil-ch', skiresort_info_slug: 'les-portes-du-soleil-morzine-avoriaz-les-gets-chatel-morgins-champery', country: 'Switzerland', region: 'Valais', latitude: 46.1833, longitude: 6.8333, altitude_min: 1050, altitude_max: 2277 },
  { name: 'Adelboden-Lenk', slug: 'adelboden-lenk', skiresort_info_slug: 'adelboden-lenk', country: 'Switzerland', region: 'Bern', latitude: 46.4917, longitude: 7.5583, altitude_min: 1068, altitude_max: 2362 },
  { name: 'Gstaad', slug: 'gstaad', skiresort_info_slug: 'eggli-la-videmanette-gstaad-saanen-rougemont', country: 'Switzerland', region: 'Bern', latitude: 46.4739, longitude: 7.2861, altitude_min: 1000, altitude_max: 3000 },
  { name: 'Leukerbad', slug: 'leukerbad', skiresort_info_slug: 'leukerbad', country: 'Switzerland', region: 'Valais', latitude: 46.3811, longitude: 7.6278, altitude_min: 1411, altitude_max: 2610 },
  { name: 'Grimentz-Zinal', slug: 'grimentz-zinal', skiresort_info_slug: 'grimentz-zinal', country: 'Switzerland', region: 'Valais', latitude: 46.1833, longitude: 7.5833, altitude_min: 1570, altitude_max: 2896 },
  { name: 'Villars-Gryon', slug: 'villars', skiresort_info_slug: 'villars-gryon-les-diablerets', country: 'Switzerland', region: 'Vaud', latitude: 46.3000, longitude: 7.0500, altitude_min: 1300, altitude_max: 2120 },
  { name: 'Anzère', slug: 'anzere', skiresort_info_slug: 'anzere', country: 'Switzerland', region: 'Valais', latitude: 46.3000, longitude: 7.4000, altitude_min: 1500, altitude_max: 2420 },
  { name: 'Mürren', slug: 'muerren', skiresort_info_slug: 'schilthorn-muerren-lauterbrunnen', country: 'Switzerland', region: 'Bern', latitude: 46.5597, longitude: 7.8928, altitude_min: 1650, altitude_max: 2970 },
  { name: 'Hoch-Ybrig', slug: 'hoch-ybrig', skiresort_info_slug: 'hoch-ybrig-unteriberg-oberiberg', country: 'Switzerland', region: 'Schwyz', latitude: 47.0333, longitude: 8.7833, altitude_min: 1037, altitude_max: 1856 },
  { name: 'Klosters', slug: 'klosters', skiresort_info_slug: 'madrisa-davos-klosters', country: 'Switzerland', region: 'Graubünden', latitude: 46.8667, longitude: 9.8833, altitude_min: 1124, altitude_max: 2602 },
  { name: 'Champéry', slug: 'champery', skiresort_info_slug: 'les-portes-du-soleil-morzine-avoriaz-les-gets-chatel-morgins-champery', country: 'Switzerland', region: 'Valais', latitude: 46.1747, longitude: 6.8706, altitude_min: 1050, altitude_max: 2277 },
  { name: 'Samnaun', slug: 'samnaun', skiresort_info_slug: 'ischgl-samnaun-silvretta-arena', country: 'Switzerland', region: 'Graubünden', latitude: 46.9456, longitude: 10.3736, altitude_min: 1377, altitude_max: 2872 },
  { name: 'Aletsch Arena', slug: 'aletsch-arena', skiresort_info_slug: 'aletsch-arena', country: 'Switzerland', region: 'Valais', latitude: 46.3833, longitude: 8.0667, altitude_min: 1845, altitude_max: 2869 },

  // =========================================================================
  // ITALY (~20 resorts)
  // =========================================================================
  { name: 'Cortina d\'Ampezzo', slug: 'cortina', skiresort_info_slug: 'cortina-dampezzo', country: 'Italy', region: 'Veneto', latitude: 46.5369, longitude: 12.1353, altitude_min: 1224, altitude_max: 2930 },
  { name: 'Val Gardena', slug: 'val-gardena', skiresort_info_slug: 'val-gardena-groeden', country: 'Italy', region: 'South Tyrol', latitude: 46.5578, longitude: 11.7561, altitude_min: 1236, altitude_max: 2518 },
  { name: 'Alta Badia', slug: 'alta-badia', skiresort_info_slug: 'alta-badia', country: 'Italy', region: 'South Tyrol', latitude: 46.5600, longitude: 11.8625, altitude_min: 1324, altitude_max: 2778 },
  { name: 'Madonna di Campiglio', slug: 'madonna-di-campiglio', skiresort_info_slug: 'madonna-di-campiglio-pinzolo-folgarida-marilleva', country: 'Italy', region: 'Trentino', latitude: 46.2289, longitude: 10.8264, altitude_min: 853, altitude_max: 2504 },
  { name: 'Kronplatz / Plan de Corones', slug: 'kronplatz', skiresort_info_slug: 'kronplatz-plan-de-corones', country: 'Italy', region: 'South Tyrol', latitude: 46.7442, longitude: 11.9578, altitude_min: 835, altitude_max: 2275 },
  { name: 'Selva Val Gardena', slug: 'selva-val-gardena', skiresort_info_slug: 'val-gardena-groeden', country: 'Italy', region: 'South Tyrol', latitude: 46.5556, longitude: 11.7594, altitude_min: 1236, altitude_max: 2518 },
  { name: 'Livigno', slug: 'livigno', skiresort_info_slug: 'livigno', country: 'Italy', region: 'Lombardy', latitude: 46.5381, longitude: 10.1350, altitude_min: 1816, altitude_max: 2798 },
  { name: 'Cervinia', slug: 'cervinia', skiresort_info_slug: 'zermatt-breuil-cervinia-valtournenche-matterhorn', country: 'Italy', region: 'Aosta Valley', latitude: 45.9364, longitude: 7.6319, altitude_min: 1524, altitude_max: 3480 },
  { name: 'Courmayeur', slug: 'courmayeur', skiresort_info_slug: 'courmayeur-checrouit-val-veny', country: 'Italy', region: 'Aosta Valley', latitude: 45.7967, longitude: 6.9697, altitude_min: 1224, altitude_max: 2755 },
  { name: 'Sestriere', slug: 'sestriere', skiresort_info_slug: 'via-lattea-sestriere-sauze-doulx-san-sicario-claviere-montgenevre', country: 'Italy', region: 'Piedmont', latitude: 44.9567, longitude: 6.8789, altitude_min: 1350, altitude_max: 2823 },
  { name: 'Bormio', slug: 'bormio', skiresort_info_slug: 'bormio-cima-bianca', country: 'Italy', region: 'Lombardy', latitude: 46.4683, longitude: 10.3722, altitude_min: 1225, altitude_max: 3012 },
  { name: 'San Martino di Castrozza', slug: 'san-martino', skiresort_info_slug: 'san-martino-di-castrozza', country: 'Italy', region: 'Trentino', latitude: 46.2667, longitude: 11.8000, altitude_min: 1404, altitude_max: 2357 },
  { name: 'Canazei (Dolomiti Superski)', slug: 'canazei', skiresort_info_slug: 'belvedere-col-rodella-ciampac-buffaure-canazei-campitello-alba-pozza-di-fassa', country: 'Italy', region: 'Trentino', latitude: 46.4767, longitude: 11.7706, altitude_min: 1460, altitude_max: 2628 },
  { name: 'Arabba (Dolomiti)', slug: 'arabba', skiresort_info_slug: 'arabba-marmolada', country: 'Italy', region: 'Veneto', latitude: 46.4972, longitude: 11.8744, altitude_min: 1602, altitude_max: 3269 },
  { name: 'La Thuile', slug: 'la-thuile', skiresort_info_slug: 'espace-san-bernardo-la-rosiere-la-thuile', country: 'Italy', region: 'Aosta Valley', latitude: 45.7178, longitude: 6.9547, altitude_min: 1441, altitude_max: 2610 },
  { name: 'Passo Tonale', slug: 'passo-tonale', skiresort_info_slug: 'ponte-di-legno-tonale-presena-glacier-temu-pontedilegno-tonale', country: 'Italy', region: 'Trentino', latitude: 46.2592, longitude: 10.5847, altitude_min: 1121, altitude_max: 3016 },
  { name: 'Alpe di Siusi', slug: 'alpe-di-siusi', skiresort_info_slug: 'alpe-di-siusi-seiser-alm', country: 'Italy', region: 'South Tyrol', latitude: 46.5417, longitude: 11.6250, altitude_min: 1680, altitude_max: 2350 },
  { name: 'Monterosa Ski', slug: 'monterosa', skiresort_info_slug: 'alagna-valsesia-gressoney-la-trinite-champoluc-frachey-monterosa-ski', country: 'Italy', region: 'Aosta Valley', latitude: 45.8358, longitude: 7.8136, altitude_min: 1212, altitude_max: 3275 },
  { name: 'Bardonecchia', slug: 'bardonecchia', skiresort_info_slug: 'bardonecchia', country: 'Italy', region: 'Piedmont', latitude: 45.0789, longitude: 6.7014, altitude_min: 1312, altitude_max: 2750 },
  { name: 'Aprica', slug: 'aprica', skiresort_info_slug: 'aprica', country: 'Italy', region: 'Lombardy', latitude: 46.1533, longitude: 10.1492, altitude_min: 1181, altitude_max: 2300 },

  // =========================================================================
  // USA (~30 resorts)
  // =========================================================================
  { name: 'Vail', slug: 'vail', skiresort_info_slug: 'vail', country: 'USA', region: 'Colorado', latitude: 39.6403, longitude: -106.3742, altitude_min: 2457, altitude_max: 3527 },
  { name: 'Aspen Snowmass', slug: 'aspen-snowmass', skiresort_info_slug: 'snowmass', country: 'USA', region: 'Colorado', latitude: 39.2084, longitude: -106.9490, altitude_min: 2473, altitude_max: 3813 },
  { name: 'Park City', slug: 'park-city', skiresort_info_slug: 'park-city', country: 'USA', region: 'Utah', latitude: 40.6514, longitude: -111.5080, altitude_min: 2080, altitude_max: 3048 },
  { name: 'Mammoth Mountain', slug: 'mammoth', skiresort_info_slug: 'mammoth-mountain', country: 'USA', region: 'California', latitude: 37.6308, longitude: -119.0326, altitude_min: 2424, altitude_max: 3369 },
  { name: 'Jackson Hole', slug: 'jackson-hole', skiresort_info_slug: 'jackson-hole', country: 'USA', region: 'Wyoming', latitude: 43.5877, longitude: -110.8279, altitude_min: 1924, altitude_max: 3185 },
  { name: 'Breckenridge', slug: 'breckenridge', skiresort_info_slug: 'breckenridge', country: 'USA', region: 'Colorado', latitude: 39.4817, longitude: -106.0384, altitude_min: 2926, altitude_max: 3914 },
  { name: 'Telluride', slug: 'telluride', skiresort_info_slug: 'telluride', country: 'USA', region: 'Colorado', latitude: 37.9375, longitude: -107.8123, altitude_min: 2659, altitude_max: 3831 },
  { name: 'Steamboat Springs', slug: 'steamboat', skiresort_info_slug: 'steamboat', country: 'USA', region: 'Colorado', latitude: 40.4572, longitude: -106.8045, altitude_min: 2103, altitude_max: 3221 },
  { name: 'Big Sky', slug: 'big-sky', skiresort_info_slug: 'big-sky-resort', country: 'USA', region: 'Montana', latitude: 45.2833, longitude: -111.4014, altitude_min: 2072, altitude_max: 3403 },
  { name: 'Sun Valley', slug: 'sun-valley', skiresort_info_slug: 'bald-mountain-sun-valley', country: 'USA', region: 'Idaho', latitude: 43.6978, longitude: -114.3511, altitude_min: 1752, altitude_max: 2789 },
  { name: 'Deer Valley', slug: 'deer-valley', skiresort_info_slug: 'deer-valley', country: 'USA', region: 'Utah', latitude: 40.6375, longitude: -111.4783, altitude_min: 2003, altitude_max: 2917 },
  { name: 'Alta', slug: 'alta', skiresort_info_slug: 'alta', country: 'USA', region: 'Utah', latitude: 40.5884, longitude: -111.6386, altitude_min: 2600, altitude_max: 3216 },
  { name: 'Snowbird', slug: 'snowbird', skiresort_info_slug: 'snowbird', country: 'USA', region: 'Utah', latitude: 40.5830, longitude: -111.6508, altitude_min: 2365, altitude_max: 3353 },
  { name: 'Squaw Valley (Palisades Tahoe)', slug: 'palisades-tahoe', skiresort_info_slug: 'palisades-tahoe', country: 'USA', region: 'California', latitude: 39.1968, longitude: -120.2354, altitude_min: 1890, altitude_max: 2757 },
  { name: 'Heavenly', slug: 'heavenly', skiresort_info_slug: 'heavenly', country: 'USA', region: 'California', latitude: 38.9353, longitude: -119.9400, altitude_min: 1996, altitude_max: 3060 },
  { name: 'Killington', slug: 'killington', skiresort_info_slug: 'killington', country: 'USA', region: 'Vermont', latitude: 43.6045, longitude: -72.8201, altitude_min: 325, altitude_max: 1293 },
  { name: 'Stowe', slug: 'stowe', skiresort_info_slug: 'stowe', country: 'USA', region: 'Vermont', latitude: 44.5303, longitude: -72.7814, altitude_min: 390, altitude_max: 1116 },
  { name: 'Copper Mountain', slug: 'copper-mountain', skiresort_info_slug: 'copper-mountain', country: 'USA', region: 'Colorado', latitude: 39.5022, longitude: -106.1497, altitude_min: 2926, altitude_max: 3753 },
  { name: 'Winter Park', slug: 'winter-park', skiresort_info_slug: 'winter-park', country: 'USA', region: 'Colorado', latitude: 39.8841, longitude: -105.7625, altitude_min: 2743, altitude_max: 3676 },
  { name: 'Keystone', slug: 'keystone', skiresort_info_slug: 'keystone', country: 'USA', region: 'Colorado', latitude: 39.5792, longitude: -105.9475, altitude_min: 2835, altitude_max: 3651 },
  { name: 'Crested Butte', slug: 'crested-butte', skiresort_info_slug: 'crested-butte', country: 'USA', region: 'Colorado', latitude: 38.8986, longitude: -106.9653, altitude_min: 2775, altitude_max: 3707 },
  { name: 'Taos Ski Valley', slug: 'taos', skiresort_info_slug: 'taos', country: 'USA', region: 'New Mexico', latitude: 36.5964, longitude: -105.4542, altitude_min: 2804, altitude_max: 3804 },
  { name: 'Sugarbush', slug: 'sugarbush', skiresort_info_slug: 'sugarbush', country: 'USA', region: 'Vermont', latitude: 44.1356, longitude: -72.9011, altitude_min: 427, altitude_max: 1244 },
  { name: 'Snowbasin', slug: 'snowbasin', skiresort_info_slug: 'snowbasin', country: 'USA', region: 'Utah', latitude: 41.2160, longitude: -111.8569, altitude_min: 1956, altitude_max: 2896 },
  { name: 'Mt. Bachelor', slug: 'mt-bachelor', skiresort_info_slug: 'mt-bachelor', country: 'USA', region: 'Oregon', latitude: 43.9790, longitude: -121.6886, altitude_min: 1775, altitude_max: 2763 },
  { name: 'Crystal Mountain', slug: 'crystal-mountain', skiresort_info_slug: 'crystal-mountain-wa', country: 'USA', region: 'Washington', latitude: 46.9350, longitude: -121.5047, altitude_min: 1341, altitude_max: 2134 },
  { name: 'Arapahoe Basin', slug: 'arapahoe-basin', skiresort_info_slug: 'arapahoe-basin', country: 'USA', region: 'Colorado', latitude: 39.6425, longitude: -105.8719, altitude_min: 3286, altitude_max: 3978 },
  { name: 'Beaver Creek', slug: 'beaver-creek', skiresort_info_slug: 'beaver-creek', country: 'USA', region: 'Colorado', latitude: 39.6042, longitude: -106.5164, altitude_min: 2255, altitude_max: 3488 },
  { name: 'Northstar California', slug: 'northstar', skiresort_info_slug: 'northstar-california-resort', country: 'USA', region: 'California', latitude: 39.2746, longitude: -120.1211, altitude_min: 1929, altitude_max: 2624 },
  { name: 'Whiteface Mountain', slug: 'whiteface', skiresort_info_slug: 'whiteface-lake-placid', country: 'USA', region: 'New York', latitude: 44.3658, longitude: -73.9028, altitude_min: 362, altitude_max: 1417 },

  // =========================================================================
  // CANADA (~15 resorts)
  // =========================================================================
  { name: 'Whistler Blackcomb', slug: 'whistler', skiresort_info_slug: 'whistler-blackcomb', country: 'Canada', region: 'British Columbia', latitude: 50.1163, longitude: -122.9574, altitude_min: 653, altitude_max: 2284 },
  { name: 'Lake Louise', slug: 'lake-louise', skiresort_info_slug: 'lake-louise', country: 'Canada', region: 'Alberta', latitude: 51.4414, longitude: -116.1524, altitude_min: 1645, altitude_max: 2637 },
  { name: 'Banff Sunshine', slug: 'banff-sunshine', skiresort_info_slug: 'sunshine-village', country: 'Canada', region: 'Alberta', latitude: 51.0714, longitude: -115.7833, altitude_min: 1660, altitude_max: 2730 },
  { name: 'Revelstoke', slug: 'revelstoke', skiresort_info_slug: 'revelstoke-mountain-resort', country: 'Canada', region: 'British Columbia', latitude: 50.9583, longitude: -118.1614, altitude_min: 512, altitude_max: 2225 },
  { name: 'Big White', slug: 'big-white', skiresort_info_slug: 'big-white', country: 'Canada', region: 'British Columbia', latitude: 49.7258, longitude: -118.9314, altitude_min: 1508, altitude_max: 2319 },
  { name: 'Sun Peaks', slug: 'sun-peaks', skiresort_info_slug: 'sun-peaks', country: 'Canada', region: 'British Columbia', latitude: 50.8831, longitude: -119.8925, altitude_min: 1200, altitude_max: 2080 },
  { name: 'Tremblant', slug: 'tremblant', skiresort_info_slug: 'mont-tremblant', country: 'Canada', region: 'Quebec', latitude: 46.2142, longitude: -74.5856, altitude_min: 265, altitude_max: 875 },
  { name: 'Kicking Horse', slug: 'kicking-horse', skiresort_info_slug: 'kicking-horse-golden', country: 'Canada', region: 'British Columbia', latitude: 51.2972, longitude: -117.0478, altitude_min: 1190, altitude_max: 2450 },
  { name: 'Fernie', slug: 'fernie', skiresort_info_slug: 'fernie', country: 'Canada', region: 'British Columbia', latitude: 49.4614, longitude: -115.0878, altitude_min: 1082, altitude_max: 1925 },
  { name: 'Silver Star', slug: 'silver-star', skiresort_info_slug: 'silverstar', country: 'Canada', region: 'British Columbia', latitude: 50.3614, longitude: -119.0619, altitude_min: 1155, altitude_max: 1915 },
  { name: 'Marmot Basin', slug: 'marmot-basin', skiresort_info_slug: 'marmot-basin-jasper', country: 'Canada', region: 'Alberta', latitude: 52.8024, longitude: -118.0822, altitude_min: 1698, altitude_max: 2601 },
  { name: 'Panorama', slug: 'panorama', skiresort_info_slug: 'panorama', country: 'Canada', region: 'British Columbia', latitude: 50.4600, longitude: -116.2350, altitude_min: 1160, altitude_max: 2365 },
  { name: 'Red Mountain', slug: 'red-mountain', skiresort_info_slug: 'red-mountain-resort-rossland', country: 'Canada', region: 'British Columbia', latitude: 49.1050, longitude: -117.8439, altitude_min: 1185, altitude_max: 2075 },
  { name: 'Nakiska', slug: 'nakiska', skiresort_info_slug: 'nakiska', country: 'Canada', region: 'Alberta', latitude: 50.9417, longitude: -115.1500, altitude_min: 1525, altitude_max: 2258 },
  { name: 'Le Massif de Charlevoix', slug: 'le-massif', skiresort_info_slug: 'le-massif-de-charlevoix', country: 'Canada', region: 'Quebec', latitude: 47.2642, longitude: -70.6236, altitude_min: 3, altitude_max: 806 },

  // =========================================================================
  // JAPAN (~10 resorts)
  // =========================================================================
  { name: 'Niseko United', slug: 'niseko', skiresort_info_slug: 'niseko-united-annupuri-grand-hirafu-hanazono-niseko-village', country: 'Japan', region: 'Hokkaido', latitude: 42.8628, longitude: 140.6989, altitude_min: 260, altitude_max: 1308 },
  { name: 'Hakuba Valley', slug: 'hakuba', skiresort_info_slug: 'happo-one-hakuba', country: 'Japan', region: 'Nagano', latitude: 36.6983, longitude: 137.8322, altitude_min: 760, altitude_max: 1831 },
  { name: 'Furano', slug: 'furano', skiresort_info_slug: 'furano', country: 'Japan', region: 'Hokkaido', latitude: 43.3378, longitude: 142.3617, altitude_min: 245, altitude_max: 1074 },
  { name: 'Shiga Kogen', slug: 'shiga-kogen', skiresort_info_slug: 'shigakogen-mountain-resort', country: 'Japan', region: 'Nagano', latitude: 36.7986, longitude: 138.5253, altitude_min: 1340, altitude_max: 2307 },
  { name: 'Nozawa Onsen', slug: 'nozawa-onsen', skiresort_info_slug: 'nozawa-onsen', country: 'Japan', region: 'Nagano', latitude: 36.9261, longitude: 138.6292, altitude_min: 565, altitude_max: 1650 },
  { name: 'Myoko Kogen', slug: 'myoko-kogen', skiresort_info_slug: 'myoko-akakura', country: 'Japan', region: 'Niigata', latitude: 36.8814, longitude: 138.6389, altitude_min: 450, altitude_max: 1500 },
  { name: 'Rusutsu', slug: 'rusutsu', skiresort_info_slug: 'rusutsu', country: 'Japan', region: 'Hokkaido', latitude: 42.7419, longitude: 140.5764, altitude_min: 350, altitude_max: 994 },
  { name: 'Kiroro', slug: 'kiroro', skiresort_info_slug: 'kiroro-snow-world', country: 'Japan', region: 'Hokkaido', latitude: 43.0750, longitude: 140.9800, altitude_min: 570, altitude_max: 1180 },
  { name: 'Tomamu', slug: 'tomamu', skiresort_info_slug: 'hoshino-resorts-tomamu', country: 'Japan', region: 'Hokkaido', latitude: 43.0617, longitude: 142.6333, altitude_min: 530, altitude_max: 1239 },
  { name: 'Naeba', slug: 'naeba', skiresort_info_slug: 'naeba-mt-naeba', country: 'Japan', region: 'Niigata', latitude: 36.8478, longitude: 138.7750, altitude_min: 900, altitude_max: 1789 },

  // =========================================================================
  // SCANDINAVIA (~10 resorts)
  // =========================================================================
  { name: 'Åre', slug: 'are', skiresort_info_slug: 'aare', country: 'Sweden', region: 'Jämtland', latitude: 63.3972, longitude: 13.0806, altitude_min: 380, altitude_max: 1274 },
  { name: 'Sälen (Lindvallen)', slug: 'salen', skiresort_info_slug: 'lindvallen-hoegfjaellet-saelen', country: 'Sweden', region: 'Dalarna', latitude: 61.1600, longitude: 13.2700, altitude_min: 440, altitude_max: 890 },
  { name: 'Hemsedal', slug: 'hemsedal', skiresort_info_slug: 'hemsedal', country: 'Norway', region: 'Buskerud', latitude: 60.8592, longitude: 8.3958, altitude_min: 620, altitude_max: 1450 },
  { name: 'Trysil', slug: 'trysil', skiresort_info_slug: 'trysil', country: 'Norway', region: 'Innlandet', latitude: 61.3147, longitude: 12.2814, altitude_min: 415, altitude_max: 1132 },
  { name: 'Levi', slug: 'levi', skiresort_info_slug: 'levi', country: 'Finland', region: 'Lapland', latitude: 67.7997, longitude: 24.8136, altitude_min: 200, altitude_max: 531 },
  { name: 'Ruka', slug: 'ruka', skiresort_info_slug: 'ruka', country: 'Finland', region: 'Lapland', latitude: 66.1653, longitude: 29.1622, altitude_min: 200, altitude_max: 492 },
  { name: 'Geilo', slug: 'geilo', skiresort_info_slug: 'geilo', country: 'Norway', region: 'Viken', latitude: 60.5342, longitude: 8.2050, altitude_min: 800, altitude_max: 1178 },
  { name: 'Hafjell', slug: 'hafjell', skiresort_info_slug: 'hafjell', country: 'Norway', region: 'Innlandet', latitude: 61.2333, longitude: 10.4167, altitude_min: 195, altitude_max: 1030 },
  { name: 'Myrkdalen', slug: 'myrkdalen', skiresort_info_slug: 'myrkdalen', country: 'Norway', region: 'Vestland', latitude: 60.8833, longitude: 6.5333, altitude_min: 284, altitude_max: 1060 },
  { name: 'Ylläs', slug: 'yllas', skiresort_info_slug: 'yllaes', country: 'Finland', region: 'Lapland', latitude: 67.5556, longitude: 24.2222, altitude_min: 200, altitude_max: 718 },

  // =========================================================================
  // SPAIN & ANDORRA (~10 resorts)
  // =========================================================================
  { name: 'Grandvalira', slug: 'grandvalira', skiresort_info_slug: 'grandvalira', country: 'Andorra', region: 'Andorra', latitude: 42.5556, longitude: 1.7344, altitude_min: 1710, altitude_max: 2640 },
  { name: 'Vallnord Pal-Arinsal', slug: 'vallnord', skiresort_info_slug: 'pal-arinsal-la-massana-vallnord', country: 'Andorra', region: 'Andorra', latitude: 42.5700, longitude: 1.4800, altitude_min: 1550, altitude_max: 2560 },
  { name: 'Ordino Arcalís', slug: 'ordino-arcalis', skiresort_info_slug: 'ordino-arcalis', country: 'Andorra', region: 'Andorra', latitude: 42.6183, longitude: 1.4878, altitude_min: 1940, altitude_max: 2625 },
  { name: 'Baqueira-Beret', slug: 'baqueira-beret', skiresort_info_slug: 'baqueira-beret', country: 'Spain', region: 'Catalonia', latitude: 42.6944, longitude: 0.9500, altitude_min: 1500, altitude_max: 2610 },
  { name: 'Sierra Nevada', slug: 'sierra-nevada', skiresort_info_slug: 'sierra-nevada-pradollano', country: 'Spain', region: 'Andalusia', latitude: 37.0956, longitude: -3.3964, altitude_min: 2100, altitude_max: 3300 },
  { name: 'Formigal-Panticosa', slug: 'formigal', skiresort_info_slug: 'formigal', country: 'Spain', region: 'Aragon', latitude: 42.7597, longitude: -0.3547, altitude_min: 1500, altitude_max: 2250 },
  { name: 'Cerler', slug: 'cerler', skiresort_info_slug: 'cerler', country: 'Spain', region: 'Aragon', latitude: 42.5578, longitude: 0.5264, altitude_min: 1500, altitude_max: 2630 },
  { name: 'La Molina', slug: 'la-molina', skiresort_info_slug: 'la-molina-masella-alp2500', country: 'Spain', region: 'Catalonia', latitude: 42.3372, longitude: 1.9422, altitude_min: 1700, altitude_max: 2445 },
  { name: 'Masella', slug: 'masella', skiresort_info_slug: 'la-molina-masella-alp2500', country: 'Spain', region: 'Catalonia', latitude: 42.3356, longitude: 1.8878, altitude_min: 1600, altitude_max: 2535 },
  { name: 'Boí Taüll', slug: 'boi-taull', skiresort_info_slug: 'boi-tauell', country: 'Spain', region: 'Catalonia', latitude: 42.4722, longitude: 0.8222, altitude_min: 2020, altitude_max: 2751 },

  // =========================================================================
  // OTHER (~20 resorts)
  // =========================================================================
  // Germany
  { name: 'Garmisch-Partenkirchen', slug: 'garmisch', skiresort_info_slug: 'garmisch-classic-garmisch-partenkirchen', country: 'Germany', region: 'Bavaria', latitude: 47.4347, longitude: 11.0875, altitude_min: 708, altitude_max: 2050 },
  { name: 'Oberstdorf-Kleinwalsertal', slug: 'oberstdorf', skiresort_info_slug: 'fellhorn-kanzelwand-oberstdorf-riezlern', country: 'Germany', region: 'Bavaria', latitude: 47.4128, longitude: 10.2789, altitude_min: 820, altitude_max: 2224 },
  { name: 'Zugspitze', slug: 'zugspitze', skiresort_info_slug: 'zugspitze', country: 'Germany', region: 'Bavaria', latitude: 47.4211, longitude: 10.9847, altitude_min: 2000, altitude_max: 2720 },

  // Slovenia
  { name: 'Kranjska Gora', slug: 'kranjska-gora', skiresort_info_slug: 'kranjska-gora', country: 'Slovenia', region: 'Upper Carniola', latitude: 46.4847, longitude: 13.7856, altitude_min: 800, altitude_max: 1215 },
  { name: 'Vogel', slug: 'vogel', skiresort_info_slug: 'vogel-bohinj', country: 'Slovenia', region: 'Upper Carniola', latitude: 46.2639, longitude: 13.8386, altitude_min: 569, altitude_max: 1800 },

  // Bulgaria
  { name: 'Bansko', slug: 'bansko', skiresort_info_slug: 'bansko', country: 'Bulgaria', region: 'Blagoevgrad', latitude: 41.8186, longitude: 23.4886, altitude_min: 990, altitude_max: 2560 },

  // Romania
  { name: 'Poiana Brasov', slug: 'poiana-brasov', skiresort_info_slug: 'poiana-brasov', country: 'Romania', region: 'Transylvania', latitude: 45.5956, longitude: 25.5556, altitude_min: 1020, altitude_max: 1775 },

  // Georgia
  { name: 'Gudauri', slug: 'gudauri', skiresort_info_slug: 'gudauri', country: 'Georgia', region: 'Mtskheta-Mtianeti', latitude: 42.4617, longitude: 44.4672, altitude_min: 1990, altitude_max: 3307 },

  // South Korea
  { name: 'Yongpyong', slug: 'yongpyong', skiresort_info_slug: 'yongpyong', country: 'South Korea', region: 'Gangwon', latitude: 37.6439, longitude: 128.6797, altitude_min: 700, altitude_max: 1458 },

  // New Zealand
  { name: 'The Remarkables', slug: 'the-remarkables', skiresort_info_slug: 'the-remarkables', country: 'New Zealand', region: 'Otago', latitude: -45.0472, longitude: 168.8181, altitude_min: 1585, altitude_max: 1943 },
  { name: 'Coronet Peak', slug: 'coronet-peak', skiresort_info_slug: 'coronet-peak', country: 'New Zealand', region: 'Otago', latitude: -45.0869, longitude: 168.7278, altitude_min: 1168, altitude_max: 1649 },
  { name: 'Mt Hutt', slug: 'mt-hutt', skiresort_info_slug: 'mt-hutt', country: 'New Zealand', region: 'Canterbury', latitude: -43.4989, longitude: 171.5389, altitude_min: 1500, altitude_max: 2086 },

  // Chile & Argentina
  { name: 'Valle Nevado', slug: 'valle-nevado', skiresort_info_slug: 'valle-nevado', country: 'Chile', region: 'Santiago', latitude: -33.3647, longitude: -70.2472, altitude_min: 2860, altitude_max: 3670 },
  { name: 'Portillo', slug: 'portillo', skiresort_info_slug: 'portillo', country: 'Chile', region: 'Valparaiso', latitude: -32.8358, longitude: -70.1311, altitude_min: 2590, altitude_max: 3330 },
  { name: 'Cerro Catedral', slug: 'cerro-catedral', skiresort_info_slug: 'catedral-alta-patagonia', country: 'Argentina', region: 'Rio Negro', latitude: -41.1647, longitude: -71.4411, altitude_min: 1030, altitude_max: 2100 },
  { name: 'Las Leñas', slug: 'las-lenas', skiresort_info_slug: 'las-lenas', country: 'Argentina', region: 'Mendoza', latitude: -35.1375, longitude: -70.0778, altitude_min: 2240, altitude_max: 3430 },

  // Turkey
  { name: 'Uludağ', slug: 'uludag', skiresort_info_slug: 'uludag-bursa', country: 'Turkey', region: 'Bursa', latitude: 40.1019, longitude: 29.1203, altitude_min: 1767, altitude_max: 2543 },

  // Poland
  { name: 'Zakopane (Kasprowy Wierch)', slug: 'zakopane', skiresort_info_slug: 'kasprowy-wierch-zakopane', country: 'Poland', region: 'Lesser Poland', latitude: 49.2319, longitude: 19.9811, altitude_min: 1014, altitude_max: 1987 },

  // Czech Republic
  { name: 'Špindlerův Mlýn', slug: 'spindleruv-mlyn', skiresort_info_slug: 'spindleruv-mlyn', country: 'Czech Republic', region: 'Hradec Králové', latitude: 50.7261, longitude: 15.6094, altitude_min: 702, altitude_max: 1235 },

  // Slovakia
  { name: 'Jasná Nízke Tatry', slug: 'jasna', skiresort_info_slug: 'jasna-nizke-tatry-chopok', country: 'Slovakia', region: 'Žilina', latitude: 48.9478, longitude: 19.5839, altitude_min: 943, altitude_max: 2024 },
];
