var geocoder = L.mapbox.geocoder('examples.map-vyofok3q');
var map = L.mapbox.map('map', 'examples.map-vyofok3q');

map.dragging.disable();
map.scrollWheelZoom.disable();
map.touchZoom.disable();

geocoder.query('Asheville, NC', showMap);

function showMap(err, data) {
     map.fitBounds(data.lbounds);
}

(function($) {
	$("#menu-close").click(function(e) {
	    e.preventDefault();
	    $("#sidebar-wrapper").toggleClass("active");
	});


	$("#menu-toggle").click(function(e) {
	    e.preventDefault();
	    $("#sidebar-wrapper").toggleClass("active");
	});

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    function populateGithubUsers(username_list){
        // console.log(github_userlist);
        for(index in username_list){
            github_username = username_list[index];

            $.getJSON('https://api.github.com/users/'+github_username, function(data){
                target_user_elm = $(".team-container h3[data-github-user='" + data.login + "']");

                target_user_elm.prev('img').attr('src', data.avatar_url+'&size=200');
            });  
        }  
    }

    $(document).ready(function(){
        github_userlist = [];

        $(".team-container h3[data-github-user]").each(function(){
            user_h3 = $(this);

            github_username = $(this).attr('data-github-user');
            github_userlist.push(github_username);
        });

        populateGithubUsers(github_userlist);
    });
})(jQuery);