// NOTES:
// examples like
// https://www.telegraaf.nl/nieuws/847724/zorgen-om-politieke-systeem
// http://edition.cnn.com/2017/10/17/asia/china-xi-jinping-congress-speech/index.html
// or http://www.bbc.com/news/world-us-canada-41663609 work OK
// but examples like
// https://www.nu.nl/muziekinterviews/4969319/jacqueline-govaert-eigen-verbazing-nog-steeds-zangeres.html give back the cookie info or so

// temporal solution. Use literal variables once ES6 is configured.

// video preview: http://lbas2.beeldengeluid.nl:8093/viz/ + carrierreference

// TESTING API CALLS
// var termExtract = 'https://rest.spinque.com/2.4/clariah/q/TAG%3AtermExtract/p/title/Timmermans%3A%20democratie%20Polen%20is%20in%20gevaar/p/text/Volgende%20week%2C%20als%20duidelijk%20is%20welke%20wetten%20er%20precies%20zijn%20aangenomen%20in%20het%20land%2C%20neemt%20de%20commissie%20een%20besluit./results?count=8&config=default';
// var recommendSegments = 'https://rest.spinque.com/2.4/clariah/q/TAG%3ArecommendSegments/p/topic/0.57329279(timmermans)%7C0.5094997(polen)%7C0.45289529(democratie)%7C0.40560716(gevaar)%7C0.04735067(poolse)%7C0.04543474(bedreigd)%7C0.04029432(dorota)%7C0.03702371(commissie)/results?config=default';
// var urlParse = 'http://web-proxy.rdlabs.beeldengeluid.nl/parse?url=http://edition.cnn.com/2017/10/17/asia/china-xi-jinping-congress-speech/index.html';
// var videoPreview = 'http://lbas2.beeldengeluid.nl:8093/viz/NOS_JOURNAAL_-WON01590079';

// workflow:
// 1. the url is passed into the input field and a call to beeldengeluid is made for getting the json object with {url: ..., text: ..., title: ...}
// 2. Using the data returned from 1. I send a new call to spinque for getting the list of terms as an object with a list of items with  {rank:..., probability:..., tuple: []}
// 3. With the returned object build and make a final call to get the recommended segments as an object with items with the detailed data as an object
// build 2 tables with 1: the current applied terms for the search (Zoekwoorden) with the option of removing terms (causing a new call for updating the resultset)
//                             2: the resultset displayed in a table with description + a preview (if available) and a 'bestel/purchase' option per item.
// Get the value for the selected filtered term.
// make a new ajax call to retrieve the recommended segments without the removed filter.
// reload the resultset (tables). Call another fc.
$(".removeFilter").on("click", function (e) {
    console.log('value btn ', e.target.value);
});

var feitFixie = (function () {
    var BASE_SPINQUE_URL = 'https://rest.spinque.com/2.4/clariah/q';
    var privateCounter = 0;
    var termExtract = 'https://rest.spinque.com/2.4/clariah/q/TAG%3AtermExtract/p/title/Timmermans%3A%20democratie%20Polen%20is%20in%20gevaar/p/text/Volgende%20week%2C%20als%20duidelijk%20is%20welke%20wetten%20er%20precies%20zijn%20aangenomen%20in%20het%20land%2C%20neemt%20de%20commissie%20een%20besluit./results?count=8&config=default';
    var recommendSegments = 'https://rest.spinque.com/2.4/clariah/q/TAG%3ArecommendSegments/p/topic/0.57329279(timmermans)%7C0.5094997(polen)%7C0.45289529(democratie)%7C0.40560716(gevaar)%7C0.04735067(poolse)%7C0.04543474(bedreigd)%7C0.04029432(dorota)%7C0.03702371(commissie)/results?config=default';
    var urlParse = 'http://web-proxy.rdlabs.beeldengeluid.nl/parse?url=http://edition.cnn.com/2017/10/17/asia/china-xi-jinping-congress-speech/index.html';
    var videoPreview = 'http://lbas2.beeldengeluid.nl:8093/viz/NOS_JOURNAAL_-WON01590079';

    // video preview: http://lbas2.beeldengeluid.nl:8093/viz/ + carrierreference

    function parseSpingeURL(data) {
        var parsedData = JSON.parse(data);
        console.log('title text 123434', parsedData.title);
        //while I fix the url send this hard-coded one:
        // return "https://rest.spinque.com/2.4/clariah/q/TAG%3ArecommendSegments/p/topic/0.57329279(timmermans)%7C0.5094997(polen)%7C0.45289529(democratie)%7C0.40560716(gevaar)%7C0.04735067(poolse)%7C0.04543474(bedreigd)%7C0.04029432(dorota)%7C0.03702371(commissie)/results?config=default";
        return "https://rest.spinque.com/2.4/clariah/q/TAG%3AtermExtract/p/title/Trump%20denies%20'insensitive'%20remarks%20to%20soldier's%20widow/p/text/Image%20copyright%20Getty%20Images%20Image%20caption%20Mr%20Trump%20has%20been%20criticised%20for%20the%20alleged%20remarks%0A%0AUS%20President%20Donald%20Trump%20says%20a%20claim%20that%20he%20made%20insensitive%20remarks%20to%20the%20recently%20bereaved%20widow%20of%20a%20soldier%20is%20%22totally%20fabricated%22.%0A%0ACongresswoman%20Frederica%20Wilson%20said%20he%20had%20told%20the%20widow%20of%20Sgt%20La%20David%20Johnson%3A%20%22He%20knew%20what%20he%20was%20signing%20up%20for%2C%20but%20I%20guess%20it%20hurts%20anyway.%22%0A%0AThe%20Democratic%20lawmaker%20said%20she%20was%20shocked%20by%20the%20alleged%20comments.%0A%0ASgt%20Johnson%20was%20among%20four%20US%20special%20service%20soldiers%20killed%20in%20Niger%20by%20Islamist%20militants%20this%20month.%0A%0AMr%20Trump%20had%20already%20been%20criticised%20for%20not%20contacting%20the%20families%20of%20the%20dead%20servicemen%20right%20after%20the%20fatal%20ambush%20on%204%20October.%0A%0AConsoler-in-chief%3F%0A%0ABy%20Anthony%20Zurcher%2C%20senior%20North%20America%20reporter%2C%20BBC%20News%0A%0AIn%20US%20politics%2C%20nothing%20is%20off-limits%20any%20more.%0A%0AAfter%20(inaccurately)%20swiping%20at%20his%20predecessors%20for%20not%20calling%20the%20family%20members%20of%20US%20soldiers%20killed%20in%20combat%2C%20Mr%20Trump%20is%20on%20the%20defensive%20over%20allegations%20he%20mishandled%20a%20call%20with%20a%20grieving%20widow.%0A%0AThe%20accuser%20is%20a%20partisan%20Democratic%20congresswoman%20and%20the%20president%2C%20not%20surprisingly%2C%20is%20pushing%20back%20hard.%20This%20controversy%20is%20spiralling%20towards%20the%20gutter.%0A%0AMr%20Trump%20made%20this%20bed%2C%20however.%20He%20was%20quick%20to%20cite%20the%20slain%20son%20of%20chief%20of%20staff%20John%20Kelly%20to%20justify%20his%20contention%20that%20Barack%20Obama%20didn't%20always%20make%20phone%20calls.%20Then%20there%20were%20the%20disparaging%20comments%20candidate%20Mr%20Trump%20made%20last%20summer%20about%20the%20Iraq%20in%202004./results?count=8&config=default";
        // return 'https://rest.spinque.com/2.4/clariah/q/TAG%3AtermExtract/p/title/' + encodeURIComponent(parsedData.title) + '/p/text/' + encodeURIComponent(parsedData.text).substring(0, 120); + '/results?count=8&config=default';
    }


    function getTitleDescriptionFromURL(url) {
        var API_PROXY_URL = 'http://web-proxy.rdlabs.beeldengeluid.nl/parse?url=' + url;

        $.when($.ajax(API_PROXY_URL)).then(function (data, textStatus, jqXHR) {
            var treatedURL = parseSpingeURL(data);
            // zoekwooden. Load search terms table.
            // build API url for on success get suggested segments
            // TODO: make another fc for readibility
            $.ajax({
                url: 'js/extractedTerms.json',
                context: document.body
            }).done(function (termsObject) {
                // console.log('terms back', termsObject);
                //TODO: validate object and content.
                // $.each(termsObject.items, function(key,value) {
                //     console.log('key/value', key, value);
                // });
                // getting the segments
                loadSearchTerms(termsObject.items);

                //after getting search terms build the url to get the suggested articles.
                $.ajax({
                    url: "js/sampleResults.json",
                    context: document.body
                }).done(function (e) {
                    console.log('data from segments', e);
                    //    build the table of resultset
                    //    TODO: fc to do this.
                    getSegmentsTable(e);
                });
            });
        });
    }

    function getSegmentsTable(e) {
        var segmentsTable = '<table summary="This table shows how to create responsive tables using Bootstrap\'s default functionality"' +
            '  class="table table-bordered table-hover"><thead><tr><th><span class="glyphicon glyphicon-shopping-cart"></span></th>' +
            '<th>Description</th><th>View</th> </tr></thead><tbody>';

        console.log('segments are www ', e);
        $.each(e.items, function (key, item) {
            console.log('key/value tuple', item.tuple[0].attributes.description);
            segmentsTable += '<tr><td><input id="checkBox" type="checkbox"></td><td>' + item.tuple[0].attributes.description + '</td>\n' +
                '<td><a href="http://lbas2.beeldengeluid.nl:8093/viz/NOS_JOURNAAL_-WON01590079"><span class="glyphicon glyphicon-film"></span></a></td></tr>';

        });

        segmentsTable += '</tbody></table>';

        $('#recommendedSegments').html(segmentsTable);

    }

    // It recives an object with the search terms and formats and load it into the corresponding container as a table.
    function loadSearchTerms(loadSearchTerms) {
        // console.log('search terms to format', loadSearchTerms);
        var searchTermsTable = '<table summary="This table shows how to create responsive tables using Bootstrap\'s default functionality"' +
            ' class="table table-bordered table-hover"><thead><tr><th>Zoekwoorden</th></tr></thead><tbody>';
        //looping tr

        $.each(loadSearchTerms, function (i, item) {
            console.log('value :::: ', item.tuple[0]);
            searchTermsTable += '<tr><td><span class="searchTerm">' + item.tuple[0] + '</span>' +
                '<button type="button" class="btn btn-danger btn-xs pull-right removeFilter" value="' + item.tuple[0] + '">\n' +
                '<span class="glyphicon glyphicon-remove"></span> Remove</button></p></td></tr>';
        });

        searchTermsTable += '</tbody><tfoot><tr><td colspan="5" class="text-center">Footer only if it is necessary</td>' +
            '</tr></tfoot></table>';
        console.log('tablee ', searchTermsTable);
        $('#searchTerms').html(searchTermsTable);
    }

    function getTerms() {
        //     //https://rest.spinque.com/2.4/clariah/q/TAG:termExtract/p/title/{TITLE}/p/text/{TEXT}/results
//     // var title = '';
//     // var text = '';
    }

    return {
        getTitleDescriptionFromURL: getTitleDescriptionFromURL
    };

})();

$("document").ready(function () {
    // Starting a search.
    $("#search_article").on("click", function (e) {
        var input_field = $('#search_input_field').val();

        if (input_field) {
            console.log('non empty field, the url value is ', input_field);
            feitFixie.getTitleDescriptionFromURL(input_field);
        }

        console.log('registering click event');
    });
});