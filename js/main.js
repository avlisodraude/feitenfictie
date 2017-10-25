var feitFixie = (function () {

    var privateTermsList;
    var objectOfTerms;

    function getPrivateObjectOfTerms() {
        return objectOfTerms;
    }

    function urlencode(text) {
        return encodeURIComponent(text).replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A')
            .replace(/%20/g, '+');
    }

    function parseSpingeURL(data) {
        var parsedData = JSON.parse(data);
        var trunkedString = parsedData.text.substring(0, 128);

        return 'http://web-proxy.rdlabs.beeldengeluid.nl/' + 'termextract?title=' + encodeURIComponent(urlencode(parsedData.title)) + '&text=' + encodeURIComponent(urlencode(trunkedString)) + '&c=8';
    }

    function getTitleDescriptionFromURL(url) {
        $.when($.ajax('http://web-proxy.rdlabs.beeldengeluid.nl/' + 'parse?url=' + url)).then(function (data, textStatus, jqXHR) {
            // By passing a URL we get an object with {url: <url>, title: <title>, text: <text>}
            // Retrieve the object and build the url for the extractedTerms.

            privateTermsList = parseSpingeURL(data);
            callSearchTermsAndSegments(privateTermsList);
        });
    }

    function callSearchTermsAndSegments(privateTermsList, removeTerm) {
        // zoekwooden. Load search terms table.
        // build API url for on success get suggested segments
        $.ajax({
            url: privateTermsList,
            context: document.body
        }).done(function (termsObject) {
            loadSearchTerms(termsObject.items);

            var partialUrlTerms = '';
            $.each(termsObject.items, function (i, item) {
                partialUrlTerms += item.probability + "(" + item.tuple[0] + ")" + encodeURIComponent(urlencode("|"));
            });

            var temp = 'http://web-proxy.rdlabs.beeldengeluid.nl/' + "recommend?tuplelist=" + partialUrlTerms;

            $.ajax({
                url: temp,
                context: document.body
            }).done(function (e) {
                getSegmentsTable(e);
            });
        });
    }

    function getSegmentsTable(e) {
        var segmentsTable = '<table summary="This table shows how to create responsive tables using Bootstrap\'s default functionality"' +
            '  class="table table-bordered table-hover"><thead><tr><th><span class="glyphicon glyphicon-shopping-cart"></span></th>' +
            '<th>Description</th><th>View</th> </tr></thead><tbody>';

        $.each(e.items, function (key, item) {
            segmentsTable += '<tr><td><input id="checkBox" type="checkbox"></td><td>' + item.tuple[0].attributes.description + '</td>\n' +
                '<td><a href="http://lbas2.beeldengeluid.nl:8093/viz/NOS_JOURNAAL_-WON01590079"><span class="glyphicon glyphicon-film"></span></a></td></tr>';
        });

        segmentsTable += '</tbody></table>';
        $('#recommendedSegments').html(segmentsTable);
    }

    // It recives an object with the search terms and formats and load it into the corresponding container as a table.
    function loadSearchTerms(loadSearchTerms) {
        var searchTermsTable = '<table summary="This table shows how to create responsive tables using Bootstrap\'s default functionality"' +
            ' class="table table-bordered table-hover"><thead><tr><th>Zoekwoorden</th></tr></thead><tbody>';

        $.each(loadSearchTerms, function (i, item) {
            searchTermsTable += '<tr><td><span class="searchTerm">' + item.tuple[0] + '</span>' +
                '<button type="button" class="btn btn-danger btn-xs pull-right removeFilter" value="' + item.tuple[0] + '">\n' +
                '<span class="glyphicon glyphicon-remove"></span> Remove</button></p></td></tr>';
        });
        searchTermsTable += '</tbody></table>';
        $('#searchTerms').html(searchTermsTable);
    }

    return {
        getTitleDescriptionFromURL: getTitleDescriptionFromURL,
        // getPrivateTermsList: getPrivateTermsList,
        getPrivateObjectOfTerms: getPrivateObjectOfTerms
    };

})();

$("document").ready(function () {
    $("#search_article").on("click", function (e) {
        var input_field = $('#search_input_field').val();

        if (input_field) {
            feitFixie.getTitleDescriptionFromURL(input_field);

        }
    });
});

// after clicking the remove btn the lists should be updated
$(document).on("click", '.removeFilter', function (e) {
    // var text = feitFixie.getPrivateTermsList().replace(e.target.value, "");
    // callSearchTermsAndSegments(privateTermsList, removeTerm);
});