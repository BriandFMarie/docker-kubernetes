$(document).ready(function() {
    /**
     * Cette fonction ajoute les résultats
     */
    function getResult() {
        $(".results").each(function() {
            $.ajax({
                url: "http://localhost:3000/api/v1/vote",
                success: function(data) {
                    let cat = data.result[0].voteCats,
                        dog = data.result[0].voteDogs;
                    heightDog = Math.round((dog / (cat + dog) * 100) * 2);
                    heightCat = (200 - heightDog > 100) ? 200 - heightDog - 1 : 200 - heightDog;
                    $(".result.cat").each(function() {
                        $(this).attr("data-height", heightCat).find("span.nbr").html(Math.ceil((heightCat / 2)) + "%");
                    })
                    $(".result.dog").each(function() {
                        $(this).attr("data-height", heightDog).find("span.nbr").html(Math.ceil((heightDog / 2)) + "%");
                    })

                }
            })
        });

    }
    /**
     * Cette fonction gere le click sur un choix (chien/chat)
     */
    $(".choice>i").on("click", function() {
        var currentStep = $(this).parents(".container").attr("data-step"),
            urlToPing = $(this).parents(".choice").attr("data-voteurl");
        $.ajax({
            type: "PUT",
            url: urlToPing
        });
        displayStep(parseInt(currentStep) + 1);
    });

    function doTransitionOnResult() {
        $(".result").each(function() {
            $(this).height($(this).attr("data-height"));
            $(this).find("span.nbr").html(parseInt($(this).attr("data-height")) / 2);
        })
    }
    /**
     * Cette fonction gère l'affichage d'une step
     */
    function displayStep(step) {
        getResult();
        $(".container").each(function() {
            $(this).css({ left: (parseInt($(this).attr("data-step")) * 100) + "%" })
        });
        let oldMargin = (parseInt($(this).attr("data-step")) * 100) + "%";
        $('.container[data-step="' + step + '"]').css({ left: 0, "z-index": 10 }).attr("data-old", oldMargin);
        doTransitionOnResult();
    }

    /**
     * Cette fonction gère un click sur un bouton return
     */
    $("a.return:not(.red)").on("click", function(event) {
        event.preventDefault();
        displayStep(parseInt($(this).attr("data-return")));
    });
    $("a.return.red").on("click", function(event) {
        event.preventDefault();
        displayStep(parseInt($(this).attr("data-return")));
    });

    /**
     * Cette fonction gère le systeme de page du site
     */
    $(".container").each(function() {
        let currentStep = $(this).attr("data-step"),
            currentMarginLeft = parseInt(currentStep) * 100;
        $(this).css("left", currentMarginLeft + "%");
    });
});