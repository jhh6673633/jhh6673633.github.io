var current;
$(".gallery img").click(function(e) {
  e.preventDefault();
  $("#myModal").modal("show");
  $("#myModal")
    .find(".modal-body img")
    .attr("src", $(this).attr("src"));
  current = $(this);
});

$("#myModal .modal-footer span")
  .eq(1)
  .click(function(e) {
    e.preventDefault();
    if (
      current
        .parent()
        .next()
        .find("img")[0]
    ) {
      current = current
        .parent()
        .next()
        .find("img");
    }
    $("#myModal")
      .find(".modal-body img")
      .attr("src", current.attr("src"));
  });

  $("#myModal .modal-footer span")
  .eq(0)
  .click(function(e) {
    e.preventDefault();
    if (
      current
        .parent()
        .prev()
        .find("img")[0]
    ) {
      current = current
        .parent()
        .prev()
        .find("img");
    }
    $("#myModal")
      .find(".modal-body img")
      .attr("src", current.attr("src"));
  });
