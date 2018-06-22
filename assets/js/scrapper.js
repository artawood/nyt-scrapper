$(document).ready(function() {

    const APIURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?";
    const APIKEY = "df2ccef3827e48ef9a65253c142c74d1";

    var searchTerm;
    var numRecords;
    var startYear;
    var endYear;

    $(".search").on("click", function() {
        let begin_date = startYear ? `&begin_date=${startYear}0101` : "";
        let end_date = endYear ? `&end_date=${endYear}1231` : "";
        $.ajax({
            url : `${APIURL}q=${searchTerm}&api-key=${APIKEY}${begin_date}${end_date}`,
            method : "GET",
        }).done(function(response) {
            console.log(response);
            displayResult(response, numRecords);

        }).fail(function(response) {
            console.log(response);
        })
    });


    function displayResult(obj, numRecords) {
        let docList = obj.response.docs;
        for (let i = 0; i < numRecords; i++) {
            let currArticle = docList[i];
            let headLine = currArticle.headline;
            let pubDate = currArticle.pub_date;
            let snippet = currArticle.snippet;
        }
    }

})