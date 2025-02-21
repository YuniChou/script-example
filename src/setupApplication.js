const setupApplication = () => {
  const canvas = document.getElementById("application-canvas");
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("No canvas found");
  }

  const app = new pc.Application(canvas, {
    keyboard: new pc.Keyboard(window),
    mouse: new pc.Mouse(canvas),
    touch: pc.platform.touch ? new pc.TouchDevice(canvas) : null,
  });

  // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
  app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);

  // Ensure canvas is resized when window changes size
  const resize = () => app.resizeCanvas();
  window.addEventListener("resize", resize);

  app.on("destroy", () => {
    window.removeEventListener("resize", resize);
  });

  return app;
};

export default setupApplication;
