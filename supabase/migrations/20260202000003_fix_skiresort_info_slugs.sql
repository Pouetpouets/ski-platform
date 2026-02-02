-- Migration: Fix 91 incorrect skiresort.info slugs
-- These slugs were causing "No data extracted" errors during scraping
-- because they redirected to the skiresort.info homepage instead of resort pages.

-- FRANCE
UPDATE resorts SET skiresort_info_slug = 'les-arcs-peisey-vallandry-paradiski' WHERE slug = 'les-arcs';
UPDATE resorts SET skiresort_info_slug = 'la-plagne-paradiski' WHERE slug = 'la-plagne';
UPDATE resorts SET skiresort_info_slug = 'tignes-val-disere' WHERE slug = 'val-disere';
UPDATE resorts SET skiresort_info_slug = 'tignes-val-disere' WHERE slug = 'tignes';
UPDATE resorts SET skiresort_info_slug = 'les-3-vallees-val-thorens-les-menuires-meribel-courchevel' WHERE slug = 'courchevel';
UPDATE resorts SET skiresort_info_slug = 'les-3-vallees-val-thorens-les-menuires-meribel-courchevel' WHERE slug = 'meribel';
UPDATE resorts SET skiresort_info_slug = 'brevent-flegere-chamonix' WHERE slug = 'chamonix';
UPDATE resorts SET skiresort_info_slug = 'la-clusaz-manigod' WHERE slug = 'la-clusaz';
UPDATE resorts SET skiresort_info_slug = 'alpe-dhuez' WHERE slug = 'alpe-dhuez';
UPDATE resorts SET skiresort_info_slug = 'les-3-vallees-val-thorens-les-menuires-meribel-courchevel' WHERE slug = 'les-menuires';
UPDATE resorts SET skiresort_info_slug = 'les-3-vallees-val-thorens-les-menuires-meribel-courchevel' WHERE slug = 'val-thorens';
UPDATE resorts SET skiresort_info_slug = 'les-portes-du-soleil-morzine-avoriaz-les-gets-chatel-morgins-champery' WHERE slug = 'les-gets';
UPDATE resorts SET skiresort_info_slug = 'les-portes-du-soleil-morzine-avoriaz-les-gets-chatel-morgins-champery' WHERE slug = 'morzine';
UPDATE resorts SET skiresort_info_slug = 'les-portes-du-soleil-morzine-avoriaz-les-gets-chatel-morgins-champery' WHERE slug = 'avoriaz';
UPDATE resorts SET skiresort_info_slug = 'serre-chevalier-briancon-chantemerle-villeneuve-la-salle-le-monetier-les-bains' WHERE slug = 'serre-chevalier';
UPDATE resorts SET skiresort_info_slug = 'espace-san-bernardo-la-rosiere-la-thuile' WHERE slug = 'la-rosiere';
UPDATE resorts SET skiresort_info_slug = 'le-grand-massif-flaine-les-carroz-morillon-samoens-sixt' WHERE slug = 'flaine';
UPDATE resorts SET skiresort_info_slug = 'le-grand-massif-flaine-les-carroz-morillon-samoens-sixt' WHERE slug = 'samoens';
UPDATE resorts SET skiresort_info_slug = 'les-arcs-peisey-vallandry-paradiski' WHERE slug = 'peisey-vallandry';
UPDATE resorts SET skiresort_info_slug = 'vars-risoul-la-foret-blanche' WHERE slug = 'vars';
UPDATE resorts SET skiresort_info_slug = 'vars-risoul-la-foret-blanche' WHERE slug = 'risoul';
UPDATE resorts SET skiresort_info_slug = 'via-lattea-sestriere-sauze-doulx-san-sicario-claviere-montgenevre' WHERE slug = 'montgenevre';
UPDATE resorts SET skiresort_info_slug = 'font-romeu-bolquere-pyrenees-2000' WHERE slug = 'font-romeu';

-- AUSTRIA
UPDATE resorts SET skiresort_info_slug = 'st-anton-st-christoph-stuben-lech-zuers-warth-schroecken-ski-arlberg' WHERE slug = 'st-anton';
UPDATE resorts SET skiresort_info_slug = 'kitzski-kitzbuehel-kirchberg' WHERE slug = 'kitzbuehel';
UPDATE resorts SET skiresort_info_slug = 'mayrhofen-penken-ahorn-rastkogel-eggalm-mountopolis' WHERE slug = 'mayrhofen';
UPDATE resorts SET skiresort_info_slug = 'stubai-glacier-stubaier-gletscher' WHERE slug = 'stubai-glacier';
UPDATE resorts SET skiresort_info_slug = 'hintertux-glacier-hintertuxer-gletscher' WHERE slug = 'hintertux';
UPDATE resorts SET skiresort_info_slug = 'saalbach-hinterglemm-leogang-fieberbrunn-skicircus' WHERE slug = 'saalbach';
UPDATE resorts SET skiresort_info_slug = 'schladming-planai-hochwurzen-hauser-kaibling-reiteralm-4-berge-skischaukel' WHERE slug = 'schladming';
UPDATE resorts SET skiresort_info_slug = 'zillertal-arena-zell-am-ziller-gerlos-koenigsleiten-hochkrimml' WHERE slug = 'zillertal-arena';
UPDATE resorts SET skiresort_info_slug = 'schmittenhoehe-zell-am-see' WHERE slug = 'zell-am-see';
UPDATE resorts SET skiresort_info_slug = 'pitztal-glacier-pitztaler-gletscher' WHERE slug = 'pitztal';
UPDATE resorts SET skiresort_info_slug = 'st-anton-st-christoph-stuben-lech-zuers-warth-schroecken-ski-arlberg' WHERE slug = 'stuben-arlberg';
UPDATE resorts SET skiresort_info_slug = 'damuels-mellau' WHERE slug = 'damuels-mellau';
UPDATE resorts SET skiresort_info_slug = 'katschberg' WHERE slug = 'katschberg';

-- SWITZERLAND
UPDATE resorts SET skiresort_info_slug = 'zermatt-breuil-cervinia-valtournenche-matterhorn' WHERE slug = 'zermatt';
UPDATE resorts SET skiresort_info_slug = '4-vallees-verbier-la-tzoumaz-nendaz-veysonnaz-thyon' WHERE slug = 'verbier';
UPDATE resorts SET skiresort_info_slug = 'parsenn-davos-klosters' WHERE slug = 'davos';
UPDATE resorts SET skiresort_info_slug = 'kleine-scheidegg-maennlichen-grindelwald-wengen' WHERE slug = 'jungfrau';
UPDATE resorts SET skiresort_info_slug = 'laax-flims-falera' WHERE slug = 'laax';
UPDATE resorts SET skiresort_info_slug = 'titlis-engelberg' WHERE slug = 'engelberg';
UPDATE resorts SET skiresort_info_slug = 'andermatt-oberalp-sedrun' WHERE slug = 'andermatt';
UPDATE resorts SET skiresort_info_slug = '4-vallees-verbier-la-tzoumaz-nendaz-veysonnaz-thyon' WHERE slug = 'nendaz';
UPDATE resorts SET skiresort_info_slug = 'les-portes-du-soleil-morzine-avoriaz-les-gets-chatel-morgins-champery' WHERE slug = 'portes-du-soleil-ch';
UPDATE resorts SET skiresort_info_slug = 'eggli-la-videmanette-gstaad-saanen-rougemont' WHERE slug = 'gstaad';
UPDATE resorts SET skiresort_info_slug = 'leukerbad' WHERE slug = 'leukerbad';
UPDATE resorts SET skiresort_info_slug = 'villars-gryon-les-diablerets' WHERE slug = 'villars';
UPDATE resorts SET skiresort_info_slug = 'schilthorn-muerren-lauterbrunnen' WHERE slug = 'muerren';
UPDATE resorts SET skiresort_info_slug = 'hoch-ybrig-unteriberg-oberiberg' WHERE slug = 'hoch-ybrig';
UPDATE resorts SET skiresort_info_slug = 'madrisa-davos-klosters' WHERE slug = 'klosters';
UPDATE resorts SET skiresort_info_slug = 'les-portes-du-soleil-morzine-avoriaz-les-gets-chatel-morgins-champery' WHERE slug = 'champery';
UPDATE resorts SET skiresort_info_slug = 'ischgl-samnaun-silvretta-arena' WHERE slug = 'samnaun';

-- ITALY
UPDATE resorts SET skiresort_info_slug = 'cortina-dampezzo' WHERE slug = 'cortina';
UPDATE resorts SET skiresort_info_slug = 'val-gardena-groeden' WHERE slug = 'selva-val-gardena';
UPDATE resorts SET skiresort_info_slug = 'zermatt-breuil-cervinia-valtournenche-matterhorn' WHERE slug = 'cervinia';
UPDATE resorts SET skiresort_info_slug = 'courmayeur-checrouit-val-veny' WHERE slug = 'courmayeur';
UPDATE resorts SET skiresort_info_slug = 'via-lattea-sestriere-sauze-doulx-san-sicario-claviere-montgenevre' WHERE slug = 'sestriere';
UPDATE resorts SET skiresort_info_slug = 'bormio-cima-bianca' WHERE slug = 'bormio';
UPDATE resorts SET skiresort_info_slug = 'san-martino-di-castrozza' WHERE slug = 'san-martino';
UPDATE resorts SET skiresort_info_slug = 'belvedere-col-rodella-ciampac-buffaure-canazei-campitello-alba-pozza-di-fassa' WHERE slug = 'canazei';
UPDATE resorts SET skiresort_info_slug = 'espace-san-bernardo-la-rosiere-la-thuile' WHERE slug = 'la-thuile';
UPDATE resorts SET skiresort_info_slug = 'ponte-di-legno-tonale-presena-glacier-temu-pontedilegno-tonale' WHERE slug = 'passo-tonale';
UPDATE resorts SET skiresort_info_slug = 'alagna-valsesia-gressoney-la-trinite-champoluc-frachey-monterosa-ski' WHERE slug = 'monterosa';

-- USA
UPDATE resorts SET skiresort_info_slug = 'snowmass' WHERE slug = 'aspen-snowmass';
UPDATE resorts SET skiresort_info_slug = 'mammoth-mountain' WHERE slug = 'mammoth';
UPDATE resorts SET skiresort_info_slug = 'bald-mountain-sun-valley' WHERE slug = 'sun-valley';
UPDATE resorts SET skiresort_info_slug = 'alta' WHERE slug = 'alta';
UPDATE resorts SET skiresort_info_slug = 'crested-butte' WHERE slug = 'crested-butte';
UPDATE resorts SET skiresort_info_slug = 'taos' WHERE slug = 'taos';
UPDATE resorts SET skiresort_info_slug = 'crystal-mountain-wa' WHERE slug = 'crystal-mountain';
UPDATE resorts SET skiresort_info_slug = 'whiteface-lake-placid' WHERE slug = 'whiteface';

-- CANADA
UPDATE resorts SET skiresort_info_slug = 'sunshine-village' WHERE slug = 'banff-sunshine';
UPDATE resorts SET skiresort_info_slug = 'kicking-horse-golden' WHERE slug = 'kicking-horse';
UPDATE resorts SET skiresort_info_slug = 'marmot-basin-jasper' WHERE slug = 'marmot-basin';
UPDATE resorts SET skiresort_info_slug = 'nakiska' WHERE slug = 'nakiska';

-- JAPAN
UPDATE resorts SET skiresort_info_slug = 'niseko-united-annupuri-grand-hirafu-hanazono-niseko-village' WHERE slug = 'niseko';
UPDATE resorts SET skiresort_info_slug = 'happo-one-hakuba' WHERE slug = 'hakuba';
UPDATE resorts SET skiresort_info_slug = 'shigakogen-mountain-resort' WHERE slug = 'shiga-kogen';
UPDATE resorts SET skiresort_info_slug = 'myoko-akakura' WHERE slug = 'myoko-kogen';

-- SPAIN & ANDORRA
UPDATE resorts SET skiresort_info_slug = 'pal-arinsal-la-massana-vallnord' WHERE slug = 'vallnord';
UPDATE resorts SET skiresort_info_slug = 'sierra-nevada-pradollano' WHERE slug = 'sierra-nevada';
UPDATE resorts SET skiresort_info_slug = 'formigal' WHERE slug = 'formigal';
UPDATE resorts SET skiresort_info_slug = 'la-molina-masella-alp2500' WHERE slug = 'la-molina';
UPDATE resorts SET skiresort_info_slug = 'la-molina-masella-alp2500' WHERE slug = 'masella';
UPDATE resorts SET skiresort_info_slug = 'boi-tauell' WHERE slug = 'boi-taull';

-- OTHER
UPDATE resorts SET skiresort_info_slug = 'garmisch-classic-garmisch-partenkirchen' WHERE slug = 'garmisch';
UPDATE resorts SET skiresort_info_slug = 'fellhorn-kanzelwand-oberstdorf-riezlern' WHERE slug = 'oberstdorf';
UPDATE resorts SET skiresort_info_slug = 'vogel-bohinj' WHERE slug = 'vogel';
UPDATE resorts SET skiresort_info_slug = 'uludag-bursa' WHERE slug = 'uludag';
UPDATE resorts SET skiresort_info_slug = 'jasna-nizke-tatry-chopok' WHERE slug = 'jasna';
