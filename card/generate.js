console.clear();

import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import {
  random,
  map,
  spline,
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.0";
import tinycolor from "https://cdn.skypack.dev/tinycolor2@1.4.2";
import "https://cdn.skypack.dev/@svgdotjs/svg.filter.js";
import { gsap } from "https://cdn.skypack.dev/gsap@3.6.0";

window.SVG = SVG;

const svg = SVG(".canvas");
const { width, height } = svg.viewbox();

function wave(start, end, gradient) {
  const numSteps = random(4, 8, true);
  const randomRange = random(32, 64);

  const points = [];

  for (let i = 0; i <= numSteps; i++) {
    const step = map(i, 0, numSteps, 0, 1);

    let x = lerp(start.x, end.x, step);
    let y = lerp(start.y, end.y, step);

    if (i !== 0 && i !== numSteps) {
      x += random(-randomRange, randomRange);
      y += random(-randomRange, randomRange);
    }

    points.push({ x, y });
  }

  const pathData =
    spline(points, 1, false) + `L ${end.x} ${height} L ${start.x} ${height} Z`;

  svg.path(pathData).attr("fill", gradient);
}

function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}

function generate() {
  const numWaves = 7;
  const base = tinycolor(`hsl(${random(0, 360)}, 65%, 55%)`);
  const colors = base.analogous(6);

  svg.rect(width, height).fill(random(colors).clone().darken(40).toString());

  for (let i = 0; i < numWaves; i++) {
    const randomOffset = random(-50, 50);
    const originY = map(i, 0, numWaves, -height / 2, height / 3) + randomOffset;
    const endY = map(i, 0, numWaves, 0, 1000) + randomOffset;

    const color = random(colors).clone();

    if (i < 3) {
      color.darken(50).desaturate(10);
    }

    const gradientOffset = map(i, 0, numWaves, 0.1, 1);

    let gradient = svg.gradient("linear", function (add) {
      add.stop(0, color.clone().lighten(30).toHexString());
      add.stop(gradientOffset, color.clone().spin(60).toHexString());
    });

    gradient.from(0.5, 0).to(0, 1);

    wave({ x: 0, y: originY }, { x: width, y: endY }, gradient);
  }
}

generate();

gsap.fromTo(".main", { opacity: 0 }, { opacity: 1, duration: 1 });

gsap.fromTo(
  ".card",
  {
    opacity: 0,
    y: 24,
  },
  {
    opacity: 1,
    y: 0,
    ease: "back.out(3)",
    delay: 0.5,
  }
);

gsap.fromTo(
  "a",
  {
    opacity: 0,
    y: 12,
  },
  {
    opacity: 1,
    y: 0,
    stagger: 0.125,
    delay: 1,
    ease: "back.out(3)",
  }
);

gsap.fromTo(
  ".nickname",
  {
    opacity: 0,
    y: 12,
  },
  {
    opacity: 1,
    y: 0,
    ease: "back.out(3)",
    delay: 1,
  }
);

gsap.fromTo(
  ".role",
  {
    opacity: 0,
    y: 12,
  },
  {
    opacity: 1,
    y: 0,
    ease: "back.out(3)",
    delay: 1.5,
  }
);
gsap.fromTo(
  ".div2",
  {
    opacity: 0,
    y: 12,
  },
  {
    opacity: 1,
    y: 0,
    ease: "back.out(3)",
    delay: 2,
  }
);
