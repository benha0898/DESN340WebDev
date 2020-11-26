function autoplay() {
    setTimeout(function () {$('#hero-carousel').carousel('next'); autoplay();}, 3000);
}

$(document).ready(function() {
    $('#hero-carousel').carousel({
        indicators: true,
        numVisible: 3,
        onCycleTo: (el) => {
            var activeIndex = $(el).index();
            var items = $("#hero-carousel > a");
            console.log(activeIndex, items.length);
            var previousIndex = (activeIndex == 0) ? items.length - 1 : activeIndex - 1;
            console.log("Hide item at index", previousIndex);
            for (var i = 0; i < items.length; i++) {
                if (i != previousIndex && $(items[i]).hasClass("hide")) {
                    console.log(`Show index ${i}!`);
                    $(items[i]).removeClass("hide");
                }
                if (i == previousIndex && !$(items[i]).hasClass("hide")) {
                    console.log(`Hide index ${i}!`);
                    $(items[i]).addClass("hide");
                }
            }
        },
    });
    $('#story-carousel').carousel();
    autoplay();
});