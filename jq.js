$(".h1").html("wow i used jquery know😂");
$("#h2").css("color", "yellow");
$("h3").css("fontSize", "50px");
$("button").on("mouseover", () => {
  $("#h2").html("wow you clicked😂...");
  $("#h2").css("color", "green");
});
$("button").on("mouseleave", () => {
  $("#h2").html("wow mouse enter😂...");
  $("#h2").css("color", "red");
});
$("button").click(function () {
  alert("wow you worked today very well😉");
});
