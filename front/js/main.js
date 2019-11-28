$(document).ready(function() {
    var multiple = 4;
    function animateResult()
    {
        $("span.nbr").each(function () {
            console.log("HERE");
            if (parseInt($(this).html()) < parseInt($(this).attr("data-percent")))
                $(this).html(parseInt($(this).html()) + 1);
        })
    }

    /**
     * Cette fonction ajoute les résultats
     */
    function getResult() {
        $(".results").each(function() {
            $.ajax({
                url: "http://localhost:3000/api/v1/vote",
                success: function(data) {
                    let cat = data.result[0].voteCats,
                        dog = data.result[0].voteDogs,
                        total = cat + dog;
                    $(".total").each(function() {
                        $(this).html(total + " votants")
                    })
                    heightDog = Math.round((dog / (cat + dog) * 100) * multiple);
                    heightCat = ((100 * multiple) - heightDog > 100) ? (100 * multiple) - heightDog - 1 : (100 * multiple) - heightDog;
                    $(".result.cat").each(function() {
                        $(this).attr("data-height", heightCat).find("span.nbr").attr("data-percent", Math.ceil((heightCat / multiple)));
                    })
                    $(".result.dog").each(function() {
                        $(this).attr("data-height", heightDog).find("span.nbr").attr("data-percent", Math.ceil((heightDog / multiple)));
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
            $(this).find("span.nbr").html("0");
        });
        setInterval(animateResult, 30);
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