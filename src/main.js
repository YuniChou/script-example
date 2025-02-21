import * as pc from "playcanvas";
import setupApplication from "./setupApplication";

window.pc = pc;
const app = setupApplication();

const sceneUrl = new URL("/public/2175667.json", import.meta.url).href;
const configUrl = new URL("/public/config.json", import.meta.url).href;

/**
 * Condition A
 */
const configUrlHandler = async (url) => {
  let data = await fetch(url).then((res) => res.json());
  const dummyUrl = new URL("/public/dummy__game-scripts.js", import.meta.url)
    .href;

  for (const [, asset] of Object.entries(data.assets)) {
    if (asset.file && asset.file.filename === "__game-scripts.js") {
      // Replace the game script with a dummy one
      asset.file.url = dummyUrl;
    }
  }

  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  return URL.createObjectURL(blob);
};

const finalConfigUrl = await configUrlHandler(configUrl);
app.configure(finalConfigUrl, (error) => {
  if (error) console.error("Error loading config.json: ", error);

  app.preload(async () => {
    app.scenes.loadScene(sceneUrl, async (err) => {
      if (err) console.error("Error loading scene.json: ", error);
      // Froce game script load after scene load
      import("/public/__game-scripts.js");
      app.start();
    });
  });
});

/**
 * Condition B
 */
// app.configure(configUrl, (error) => {
//   if (error) console.error("Error loading config.json: ", error);
//   app.scenes.loadScene(sceneUrl, async (err) => {
//     if (err) console.error("Error loading scene.json: ", error);
//     app.start();
//   });
// });
