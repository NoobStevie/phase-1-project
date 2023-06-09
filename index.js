let apikey = "En1FPwAxA9aLYNEJx6SOu0GAcxn3PrES"
let queryURLBase="https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";//election&api-key="En1FPwAxA9aLYNEJx6SOu0GAcxn3PrES";
//
let searchTerm="";
let searchCount="";
let startYear="";
let endYear="";

let searchObject="";


$(document).ready(function(){
    
    //add event handler to runSearch button
    $("#runSearch").on("click",searchArticles);
    $("#clearAll").on("click",clearArticles);
    
});

function clearArticles(){
    $('#search-results').empty();
}


// this is where the search will happen
function searchArticles(event){
    event.preventDefault();
    // alert(buildURL());
    let strURL = buildURL();
    $.ajax({
        url:strURL,
        method:'GET'
    }).then(function(data){
        // console.log(data);
        // searchObject=data;
        renderResults(data);
    });
    
}

function renderResults(data) {
    // console.log(data);

    let  searchCount = $("#numRecordsSelect").val();
    //clear old divs
    $('#search-results').empty();
    data.response.docs=data.response.docs.slice(1,parseInt(searchCount)+1);
    data.response.docs.forEach(function(element) {
        const articleDiv = $('<div>');
        articleDiv.text(element.abstract);
        articleDiv.addClass('search-item-div');
        $('#search-results').append(articleDiv);
    });
}

function buildURL(){
    searchTerm=$("#searchTerm").val().trim();
    searchCount = $("#numRecordsSelect").val();
    startYear=$("#startYear").val().trim();
    endYear=$("#endYear").val().trim();

    let returnUrl=`${queryURLBase}${searchTerm}`;

    //user provides no values
    if(startYear === "" &&  endYear === ""){
        returnUrl=`${queryURLBase}${searchTerm}&api-key=${apikey}`;
        return returnUrl;

    }
    //user provides end year only
    if( startYear === "" && endYear !== "")
    {
        returnUrl=`${queryURLBase}${searchTerm}&facet=true&end_date=${endYear}&api-key=${apikey}`;
        return returnUrl;
         
    }
    //user provide start year only
    if( startYear !== "" && endYear === "")
    {
        returnUrl=`${queryURLBase}${searchTerm}&facet=true&begin_date=${startYear}&api-key=${apikey}`;
        return returnUrl;
        
    }
    //user provides both values
    if( startYear !== "" && endYear !== "")
    {
        returnUrl=`${queryURLBase}${searchTerm}&facet=true&begin_date=${startYear}&end_date=${endYear}&api-key=${apikey}`;
        return returnUrl;
        
    }
   
}