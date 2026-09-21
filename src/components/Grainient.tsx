"use client";

import { useEffect, useRef } from "react";

type GrainientProps = {
  color1?: string;
  color2?: string;
  color3?: string;
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
  className?: string;
};

const VERT = `
attribute vec2 p;
varying vec2 v_uv;
void main() {
  v_uv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform float u_balance;
uniform float u_soft;
uniform float u_angle;
uniform float u_rotAmt;
uniform float u_warpStr;
uniform float u_warpFreq;
uniform float u_warpSpd;
uniform float u_warpAmp;
uniform float u_noiseScale;
uniform float u_grainAmt;
uniform float u_grainScale;
uniform float u_grainAnim;
uniform float u_contrast;
uniform float u_gamma;
uniform float u_saturation;
uniform vec2 u_center;
uniform float u_zoom;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}
void main() {
  vec2 frag = v_uv * u_res;
  vec2 uv = (v_uv - 0.5) * vec2(u_res.x / u_res.y, 1.0);
  uv = (uv - u_center) * u_zoom;

  float ra = u_time * 0.02 * (u_rotAmt / 100.0);
  mat2 R = mat2(cos(ra), -sin(ra), sin(ra), cos(ra));
  vec2 ruv = R * uv;

  float t = u_time * u_warpSpd;
  vec2 w = vec2(
    fbm(ruv * u_warpFreq + vec2(0.0, t)),
    fbm(ruv * u_warpFreq + vec2(5.2, 1.3 + t))
  );
  vec2 wuv = ruv + u_warpStr * (w - 0.5) * (u_warpAmp / 50.0);

  float ba = radians(u_angle);
  float d = dot(wuv, vec2(cos(ba), sin(ba)));
  float m1 = u_balance - 0.25;
  float m2 = u_balance + 0.25;
  vec3 col = mix(u_c1, u_c2, smoothstep(m1 - u_soft, m1 + u_soft, d));
  col = mix(col, u_c3, smoothstep(m2 - u_soft, m2 + u_soft, d));

  float n = fbm(wuv * u_noiseScale + 3.7);
  col *= 0.92 + 0.16 * n;

  vec2 gp = floor(frag / u_grainScale);
  float seed = u_grainAnim > 0.5 ? floor(u_time * 24.0) : 0.0;
  float g = hash(gp + seed);
  col += (g - 0.5) * u_grainAmt;

  col = (col - 0.5) * u_contrast + 0.5;
  col = pow(max(col, vec3(0.0)), vec3(1.0 / max(u_gamma, 0.001)));
  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(luma), col, u_saturation);

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const v = parseInt(h.slice(0, 6), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

export default function Grainient({
  color1 = "#000000",
  color2 = "#032f36",
  color3 = "#098094",
  timeSpeed = 2.5,
  colorBalance = 0.0,
  warpStrength = 1.0,
  warpFrequency = 5.0,
  warpSpeed = 2.0,
  warpAmplitude = 50.0,
  blendAngle = 0.0,
  blendSoftness = 0.05,
  rotationAmount = 500.0,
  noiseScale = 2.0,
  grainAmount = 0.1,
  grainScale = 2.0,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1.0,
  saturation = 1.0,
  centerX = 0.0,
  centerY = 0.0,
  zoom = 1.3,
  className,
}: GrainientProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    }) as WebGLRenderingContext | null;
    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      canvas.style.display = "none";
      return;
    }
    const prog = gl.createProgram();
    if (!prog) {
      canvas.style.display = "none";
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.style.display = "none";
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = U("u_res");
    const uTime = U("u_time");
    const set3 = (name: string, v: [number, number, number]) =>
      gl.uniform3f(U(name) as WebGLUniformLocation, v[0], v[1], v[2]);
    const set1 = (name: string, v: number) =>
      gl.uniform1f(U(name) as WebGLUniformLocation, v);

    set3("u_c1", hexToRgb(color1));
    set3("u_c2", hexToRgb(color2));
    set3("u_c3", hexToRgb(color3));
    set1("u_balance", colorBalance);
    set1("u_soft", blendSoftness);
    set1("u_angle", blendAngle);
    set1("u_rotAmt", rotationAmount);
    set1("u_warpStr", warpStrength);
    set1("u_warpFreq", warpFrequency);
    set1("u_warpSpd", warpSpeed);
    set1("u_warpAmp", warpAmplitude);
    set1("u_noiseScale", noiseScale);
    set1("u_grainAmt", grainAmount);
    set1("u_grainScale", grainScale);
    set1("u_grainAnim", grainAnimated ? 1 : 0);
    set1("u_contrast", contrast);
    set1("u_gamma", gamma);
    set1("u_saturation", saturation);
    gl.uniform2f(U("u_center") as WebGLUniformLocation, centerX, centerY);
    set1("u_zoom", zoom);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const t0 = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      const w = Math.max(1, Math.floor((parent?.clientWidth || window.innerWidth) / 1));
      const h = Math.max(1, Math.floor((parent?.clientHeight || window.innerHeight) / 1));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const bw = Math.floor(w * dpr);
      const bh = Math.floor(h * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const frame = () => {
      resize();
      const t = ((performance.now() - t0) / 1000) * timeSpeed;
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    color1, color2, color3, timeSpeed, colorBalance, warpStrength,
    warpFrequency, warpSpeed, warpAmplitude, blendAngle, blendSoftness,
    rotationAmount, noiseScale, grainAmount, grainScale, grainAnimated,
    contrast, gamma, saturation, centerX, centerY, zoom,
  ]);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
