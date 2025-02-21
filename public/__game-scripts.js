var Hidden = pc.createScript("hidden");
(Hidden.prototype.initialize = function () {
  console.log("Hidden initialize.");
}),
  (Hidden.prototype.update = function (i) {
    console.log("Hidden update.");
  });
var Hello = pc.createScript("hello");
(Hello.prototype.initialize = function () {
  console.log("Hello initialize.");
}),
  (Hello.prototype.update = function (l) {});
