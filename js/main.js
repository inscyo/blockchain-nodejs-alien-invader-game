window.onload = function () {
  var mobileMenuBtn = document.querySelector(".mobile-menu-toggle");
  var mobileMenu = document.querySelector(".mobile-menu");
  mobileMenuBtn.addEventListener("click", function () {
    var displayed = mobileMenu.style;
    displayed.left =
      displayed.left === "calc((50vw - 150px) - 12px)"
        ? "-500px"
        : "calc(100vw / 2 - 300px / 2 - 12px)";
  });
  var pageQuestionBtn = document.querySelectorAll(".page-question-details");
  pageQuestionBtn.forEach(function (element) {
    element.addEventListener("click", function () {
      var parent = this.parentNode;
      var notice = parent.childNodes[3].style;
      notice.display = notice.display === "block" ? "none" : "block";
    });
  });

  //   var chart = new CanvasJS.Chart("chartContainer", {
  //     backgroundColor: "transparent",
  //     animationEnabled: true,
  //     title: {
  //       text: "",
  //     },
  //     data: [
  //       {
  //         type: "pie",
  //         startAngle: 240,
  //         yValueFormatString: '##0.00"%"',
  //         indexLabel: "{label} {y}",
  //         dataPoints: [
  //           { y: 35, label: "Play to Earn", indexLabelFontColor: "#fff" },
  //           { y: 13, label: "Liquidity", indexLabelFontColor: "#fff" },
  //           { y: 5, label: "Team", indexLabelFontColor: "#fff" },
  //           { y: 5, label: "Adviser", indexLabelFontColor: "#fff" },
  //           { y: 6, label: "Private Sale", indexLabelFontColor: "#fff" },
  //           { y: 3, label: "Public Sale", indexLabelFontColor: "#fff" },
  //           { y: 10, label: "Staking", indexLabelFontColor: "#fff" },
  //           { y: 10, label: "Marketing", indexLabelFontColor: "#fff" },
  //           { y: 13, label: "Airdrop/Events", indexLabelFontColor: "#fff" },
  //         ],
  //       },
  //     ],
  //   });
  //   chart.render();
};
