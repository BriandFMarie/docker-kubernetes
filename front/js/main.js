
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
                $(".result.cat>.nbr").html(cat);
                $(".result.dog>.nbr").html(dog);
            }
        })
    });
    /**
     * Cette fonction gère l'affichage d'une step
     */
    function displayStep(step, currentStep) {
        $(".container").each(function () {
            $(this).css({left: (parseInt($(this).attr("data-step")) * 100) + "%"})
        });
        let oldMargin =(parseInt($(this).attr("data-step")) * 100) + "%";
        $('.container[data-step="' + step + '"]').css({left: 0, "z-index": 10}).attr("data-old", oldMargin);
    }

    /**
     * Cette fonction gère un click sur un bouton return
     */
    $("a.return").on("click", function (event) {
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
    })
});