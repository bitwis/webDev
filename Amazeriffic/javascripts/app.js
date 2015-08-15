var main = function () {
    var toDoList = [
            {
                "description" : "Get groceries",
                "tags"  : [ "shopping", "chores" ]
            },
            {
                "description" : "Make up some new ToDos",
                "tags"  : [ "writing", "work" ]
            },
            {
                "description" : "Prep for Monday's class",
                "tags"  : [ "work", "teaching" ]
            },
            {
                "description" : "Answer emails",
                "tags"  : [ "work" ]
            },
            {
                "description" : "Take Gracie to the park",
                "tags"  : [ "chores", "pets" ]
            },
            {
                "description" : "Finish writing this book",
                "tags"  : [ "writing", "work" ]
            }
    ];


    var toDos = toDoList.map(function(toDo){
        return toDo.description;
    });

    var tags={};
    var organizedByTag = [];

    toDoList.map(function(toDo){
        toDo.tags.forEach(function(tag){
            if (!(tag in tags)) {
                tags[tag] = [toDo.description];
            } else {
                tags[tag].push(toDo.description);
            }
        });
    });

    for (var key in tags) {
        organizedByTag.push({"name":key,"toDos":tags[key]});
    };


    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                // newest first, so we have to go through
                // the array backwards
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                // oldest first, so we go through the array forwards
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
            } else if ($element.parent().is(":nth-child(3)")) {
                organizedByTag.forEach(function (tag) {
                    var $tagName = $("<h2>").text(tag.name),
                        $content = $("<ul>");


                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });

                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });

            } else if ($element.parent().is(":nth-child(4)")) {
               var $input = $("<input>").addClass("description"),
                    $inputLabel = $("<p>").text("Description: "),
                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p>").text("Tags: "),
                    $button = $("<button>").text("+");

                $button.on("click", function () {
                    var description = $input.val(),
                        tags = $tagInput.val().split(",");
                                 
                    toDoObjects.push({"description":description, "tags":tags});

                    // update toDos
                    toDos = toDoObjects.map(function (toDo) {
                        return toDo.description;
                    });

                    $input.val("");
                    $tagInput.val("");
                });

                $content = $("<div>").append($inputLabel)
                                     .append($input)
                                     .append($tagLabel)
                                     .append($tagInput)
                                     .append($button);
            }

            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);
