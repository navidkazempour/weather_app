$(function() {
  
  var selected_city;

  $('#city').on('keyup', function(){


    var query = $('#city').val();
    if (query == '') {
      return false
    }

    $.ajax({
      type: "GET",
      url: "http://autocomplete.wunderground.com/aq?query=" + query,
      dataType: "jsonp",
      jsonp: 'cb',
      success: function(cities){
        var city = cities.RESULTS;
        var table = $('#result').find('tbody').empty();
        for(var i=0;i<city.length;i++) { 
          var tr = $('<tr>').appendTo(table);
          var row = $('<td>').appendTo(tr).text(city[i].name).addClass('city').data('zmw',city[i].zmw);
        }

        $('#result').unbind();
        $('#result').on('click', '.city', function(){
          var zmw = $(this).data('zmw');
          table.empty();
          $("#city").val($(this).text());

          $.ajax({
            type: "GET",
            url: "http://api.wunderground.com/api/e2f9c2dbb9390c00/conditions/q/zmw:"+zmw+".json",
            dataType: "json",
            success: function(data){
              $('#current').empty();
              $('#current').append($("<img src="+data.current_observation.icon_url+">"));
              $('#current').append($('<p>').text(data.current_observation.weather));
              $('#current').append($('<p>').text("Wind: "+data.current_observation.wind_string));
            }
          }); // ajax
        }); // #result selector
      }
    }); // ajax
  });
}); // document