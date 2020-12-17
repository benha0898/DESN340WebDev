function heroCarouselAutoplay() {
    setTimeout(heroCarouselAutoplay, 3000);
    $('#hero-carousel').carousel('next');
}
function storyCarouselAutoplay() {
    setTimeout(storyCarouselAutoplay, 3000);
    $('#story-carousel').carousel('next');
}

function videoAutoplay(video) {
    var tolerancePixel = 40;

    // Get browser's current top and bottom
    var scrollTop = $(window).scrollTop() + tolerancePixel;
    var scrollBottom = scrollTop + $(window).height() - tolerancePixel;

    // Get video's current top and bottom position
    video.each(function(index, el) {
        var videoTopY = $(this).parent().offset().top;
        var videoBottomY = $(this).parent().height() + videoTopY;
    
        if ((scrollTop < videoTopY && scrollBottom > videoBottomY) || (scrollTop > videoTopY && scrollBottom < videoBottomY)) {
            $(this).get(0).play();
            $(this).siblings(".playpause").fadeOut();
        } else {
            $(this).get(0).pause();
            $(this).siblings(".playpause").fadeIn();
        }
    });
}

$(document).ready(function() {
    $('.sidenav').sidenav();

    $('#hero-carousel').carousel({
        indicators: false,
        numVisible: 3,
        onCycleTo: (el) => {
            var activeIndex = $(el).index();
            var items = $("#hero-carousel > a");
            //console.log("Active:", activeIndex, "Total:", items.length);
            var previousIndex = (activeIndex == 0) ? items.length - 1 : activeIndex - 1;
            // console.log("Hide item at index", previousIndex);
            // console.log("--------------------");
            for (var i = 0; i < items.length; i++) {
                if (i != previousIndex && $(items[i]).hasClass("hide")) {
                    $(items[i]).removeClass("hide");
                }
                if (i == previousIndex && !$(items[i]).hasClass("hide")) {
                    $(items[i]).addClass("hide");
                }
                // console.log(`Index ${i} hidden: ${$(items[i]).hasClass('hide')}`);
            }
            // console.log("--------------------");
        },
    });
    heroCarouselAutoplay();
    $('#story-carousel').carousel();
    storyCarouselAutoplay();

    var video = $("#my-video");
    $(document).on("scroll", () => videoAutoplay(video));
});