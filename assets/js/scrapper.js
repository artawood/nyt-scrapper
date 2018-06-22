$(document).ready(function () {

    const APIURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?";
    const APIKEY = "df2ccef3827e48ef9a65253c142c74d1";

    var searchTerm;
    var numRecords;
    var startYear;
    var endYear;

    $("option").on("click", function (event) {
        event.preventDefault();
        $(this).attr("selected", "selected");
    })

    $("select")
        .change(function () {
            var str = "";
            $("select option: selected").each(function () {
                str += $(this).text() + " ";
            });
            $("div").text(str);
        })
        .trigger("change");

    $(".search").on("click", function (event) {
        event.preventDefault();
        searchTerm = $("#search-term").val().trim();
        let selector = $("#record-retrieve");
        numRecord = selector.options[selector.selectedIndex].text();
        startYear = $("#start-year").val().trim();
        endYear = $("#end-year").val().trim();

        console.log(`search term: ${searchTerm}, numRecord: ${numRecords}, start year: ${startYear}, end year: ${endYear}`);

        let begin_date = startYear ? `&begin_date=${startYear}0101` : "";
        let end_date = endYear ? `&end_date=${endYear}1231` : "";
        $.ajax({
            url: `${APIURL}q=${searchTerm}&api-key=${APIKEY}${begin_date}${end_date}`,
            method: "GET",
        }).done(function (response) {
            console.log(response);
            displayResult(response, numRecords);

        }).fail(function (response) {
            console.log(response);
        })
    });


    function displayResult(obj, numRecords) {
        $(".results").empty();
        let docList = obj.response.docs;
        for (let i = 0; i < numRecords && i < docList.length; i++) {
            let currArticle = docList[i];
            let headLine = currArticle.headline;
            let pubDate = currArticle.pub_date;
            let snippet = currArticle.snippet;

            let div = $("<div>");
            div.addClass("bg-secondary");
            div.append(`<h2>${headLine}</h2>`);
            div.append(`<p>${snippet}</p>`);
            div.append(`<p><small>${pubDate}</small></p>`);
        }
    }

})