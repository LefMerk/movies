$( document ).ready(function() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=9198fa6d9a9713bc6b03ee9582525917",
      "method": "GET",
      "headers": {},
      "data": "{}"
    }

    $( ".side" ).each(function( index, value ) {
        $.ajax(settings).done(function (response) {
            //console.log(response);
            $.each(response.results, function( index2, value2 ) {
                $(value).append("<div class='movie' data-id='" + value2.id + "'><span>" + value2.title + "</span><div class='arrow hidden'></div></div>");
            });
        });
    });
    
    $(document).on("click", ".movie:not(.pressed)", function (){
        $(".infos").html();
        
        $(".movie").removeClass("pressed");
        $(".movie").find(".arrow").addClass("hidden");
        $(".on").removeClass("on");
        $(".half").removeClass("half");
        $(".half25").removeClass("half25");
        $(".half75").removeClass("half75");
        
        $(this).toggleClass("pressed");
        $(this).find(".arrow").toggleClass("hidden");
        
        var movieId = $(this).data("id");
        
        showInfos(movieId);
    });
    
    function showInfos(id){
        $.ajax(settings).done(function (response) {
            $.each(response.results, function( index, value ) {
                if(id == value.id){
                    $(".poster").html("<img src='https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + value.poster_path + "'>");
                    $(".infos").html("<span>" + value.overview + "</span>");
                    var rating = (value.vote_average)/2;
                    var fullStars = rating.toString().split(".")[0];
                    var percentHalfstar = rating.toString().split(".")[1];
                    var incr = 1;
                    $( ".star" ).each(function( index2, value2 ) {
                        if(fullStars >= incr){$(this).addClass("on");}
                        else{
                            if(percentHalfstar > 75){$(this).addClass("half75");}
                            else if(percentHalfstar > 25){$(this).addClass("half");}
                            else{$(this).addClass("half25");}
                            return false;
                        }
                        incr++;
                    });
                    $(".rating").show();
                }
            });
        });
    }

});
