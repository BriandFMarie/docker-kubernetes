
$(document).ready(function() {
    /**
     * Cette fonction ajoute les résultats
     */
    $(".results").each(function () {
        $.ajax({
            url: "/api/v1/vote",
            success: function (data) {
                let cat = data.cat,
                    dog = data.dog;
                $(".result.cat").height(cat);
                $(".result.dog").height(dog);
                $(".result.cat>.nbr").html($(".result.cat").height());
                $(".result.dog>.nbr").html($(".result.dog").height());
            }
        })
    });
    $(".result").each(function () {
        $(this).attr("data-height", 150);//$(this).height());
        $(this).height(0);
    });
    /**
     * Cette fonction gere le click sur un choix (chien/chat)
     */
    $(".choice>i").on("click", function () {
        var currentStep = $(this).parents(".container").attr("data-step"),
            urlToPing = $(this).parents(".choice").attr("data-voteurl");
        $.ajax({
            type: "GET",
            url: urlToPing
        });
        displayStep(parseInt(currentStep) + 1);
    });
    function doTransitionOnResult()
    {
        $(".result").each(function () {
            $(this).height($(this).attr("data-height"));
            $(this).find("span.nbr").html(parseInt($(this).attr("data-height")) / 2);
        })
    }
    /**
     * Cette fonction gère l'affichage d'une step
     */
    function displayStep(step) {
        $(".container").each(function () {
            $(this).css({left: (parseInt($(this).attr("data-step")) * 100) + "%"})
        });
        let oldMargin =(parseInt($(this).attr("data-step")) * 100) + "%";
        $('.container[data-step="' + step + '"]').css({left: 0, "z-index": 10}).attr("data-old", oldMargin);
        doTransitionOnResult();
    }

    /**
     * Cette fonction gère un click sur un bouton return
     */
    $("a.return:not(.red)").on("click", function (event) {
        event.preventDefault();
        displayStep(parseInt($(this).attr("data-return")));
        $(".result").each(function () {
            $(this).height(0);
        });
    });
    $("a.return.red").on("click", function (event) {
        event.preventDefault();
        displayStep(parseInt($(this).attr("data-return")));
    });

    /**
     * Cette fonction gère le systeme de page du site
     */
    $(".container").each(function () {
        let currentStep = $(this).attr("data-step"),
            currentMarginLeft = parseInt(currentStep) * 100;
        $(this).css("left", currentMarginLeft + "%");
    });
});