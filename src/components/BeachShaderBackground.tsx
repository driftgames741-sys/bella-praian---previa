/**
 * BeachShaderBackground
 * 
 * Shader WebGL de alta fidelidade e continuidade harmônica estrita para Mobile e Desktop.
 * - Correção de continuidade das ondas:
 *   1. Eliminação total de descontinuidades temporais: movimento regido por harmônicos analíticos C∞ contínuos
 *   2. Avanço e recuo (swash & backwash) com física sinusoidal assimétrica suave, sem cortes ou saltos
 *   3. Espuma com ciclo de vida natural: crista definida no avanço e dissolução suave no recuo
 *   4. Faixa de areia molhada contínua que revela o brilho na vazante e é coberta suavemente pela nova onda
 *   5. Acumulação monotônica de tempo no loop JS (imune a reinícios por scroll ou re-render React)
 *   6. Preservação estrita de todas as cores, texturas, proporções e performance (DPR <= 1.5)
 */

import React, { useEffect, useRef } from 'react';

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 v_uv;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_mouse_active;
uniform float u_reduced_motion;

// 2D Hash matematicamente estável (Dave Hoskins)
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// 2D Value Noise com interpolação Hermite suave
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// 2-octave FBM para contorno suave do litoral
float fbm2(vec2 p) {
  return 0.65 * noise(p) + 0.35 * noise(p * 2.05 + vec2(1.8, 3.4));
}

void main() {
  vec2 uv = v_uv;

  // Aspect ratio com proteção contra divisão por zero
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);

  // Coordenadas isotrópicas
  vec2 uvIso = vec2(uv.x * aspect, uv.y);

  // Interação sutil com o cursor no desktop
  vec2 mouseOffset = vec2(0.0);
  if (u_mouse_active > 0.01) {
    vec2 toMouse = (uv - u_mouse) * vec2(aspect, 1.0);
    float distToMouse = length(toMouse);
    float ripple = sin(distToMouse * 26.0 - u_time * 3.5) * exp(-min(distToMouse * 7.5, 20.0));
    vec2 dir = toMouse / max(distToMouse, 0.001);
    mouseOffset = dir * ripple * 0.010 * u_mouse_active;
  }

  vec2 p = uv + mouseOffset;
  vec2 pIso = vec2(p.x * aspect, p.y);

  // Controle de velocidade com suporte a prefers-reduced-motion
  float speed = mix(0.70, 0.15, u_reduced_motion);
  float t = u_time * speed;

  // Eixo da praia: mar entrando suavemente pela lateral esquerda
  float shoreAxis = p.x * 0.85 + (1.0 - p.y) * 0.18;

  // Variação orgânica do contorno do litoral
  vec2 warpCoord = vec2(p.y * 2.8 + t * 0.015, p.x * 1.4);
  float coastlineWarp = fbm2(warpCoord) * 0.14 + fbm2(warpCoord * 2.1 - t * 0.02) * 0.05;

  // =========================================================================
  // FÍSICA DAS ONDAS CONTÍNUA (C∞ HARMÔNICA - ZERO CORTES OU SALTOS)
  // Ciclo natural completo de aproximadamente 9.2 segundos
  // =========================================================================
  float wavePeriod = 9.2;
  float omega = 6.28318530718 / wavePeriod; // 2 * PI / T
  float theta = t * omega;

  // Deformação de fase para assimetria natural de praia:
  // O avanço (swash) acelera suavemente, atinge o ápice, desacelera suavemente e
  // o recuo (backwash) drena de forma mais calma e estendida.
  float thetaWarped = theta - 0.34 * sin(theta);

  // Posição vertical da onda (surge): 0.0 no ponto mais baixo até 1.0 no ápice da maré
  // Derivada suave zero no início, zero no ápice e zero no retorno: C∞ contínua sem quebras!
  float surge = 0.5 - 0.5 * cos(thetaWarped);

  // Velocidade instantânea da onda:
  // waveVelocity > 0: onda avançando sobre a areia (swash)
  // waveVelocity < 0: onda recuando em direção ao mar (backwash)
  float waveVelocity = sin(thetaWarped);

  // Variação de amplitude entre séries de ondas (superposição harmônica contínua)
  float setVariation = sin(t * 0.16) * 0.028 + cos(t * 0.09) * 0.018;
  float waveAmplitude = 0.125 + setVariation;

  // Posição base e linha d'água instantânea contínua
  float baseShore = 0.32;
  float waterEdge = baseShore + surge * waveAmplitude + coastlineWarp;

  // Alcance máximo do ciclo atual (marca onde a areia molhada permanece)
  float maxWaterReach = baseShore + waveAmplitude + coastlineWarp + 0.038;

  // Distância até a linha d'água instantânea
  float distToWater = shoreAxis - waterEdge;

  // Textura fina e uniforme da areia
  vec2 sandCoord = pIso * 48.0;
  float sandTexture = (noise(sandCoord) - 0.5) * 0.04;

  // Cores da areia
  vec3 drySandColor = vec3(0.94, 0.88, 0.78) + sandTexture;
  vec3 wetSandColor = vec3(0.74, 0.64, 0.52) + sandTexture * 0.5;

  // Brilho especular suave na areia molhada
  float glistenSin = clamp(sin(pIso.x * 18.0 + pIso.y * 28.0 + t * 0.12), 0.0, 1.0);
  float glisten = glistenSin * glistenSin;
  glisten = glisten * glisten;
  glisten = glisten * glisten * 0.08;
  wetSandColor += vec3(glisten);

  // Transição contínua e natural de areia molhada
  // À medida que a onda recua, a areia entre waterEdge e maxWaterReach permanece molhada
  float wetRange = max(maxWaterReach - waterEdge, 0.001);
  float wetProgress = clamp((shoreAxis - waterEdge) / (wetRange + 0.04), 0.0, 1.0);
  float wetFactor = smoothstep(1.0, 0.0, wetProgress);
  vec3 sandColor = mix(drySandColor, wetSandColor, wetFactor);

  // Região da Água (cálculo contínuo sem branching)
  float depth = clamp(-distToWater * 2.6, 0.0, 1.0);
  float waterMask = smoothstep(0.005, -0.005, distToWater);

  vec3 shallowAqua = vec3(0.42, 0.82, 0.83);
  vec3 deepCerulean = vec3(0.14, 0.50, 0.63);
  vec3 waterColor = mix(shallowAqua, deepCerulean, smoothstep(0.05, 0.72, depth));

  // Caustics solares sutis na água
  vec2 causticCoord = pIso * 18.0;
  float c1 = noise(causticCoord + vec2(t * 0.07, -t * 0.05));
  float c2 = noise(causticCoord * 1.5 - vec2(t * 0.06, t * 0.08));
  float caustics = smoothstep(0.50, 0.78, c1 * 0.6 + c2 * 0.4) * 0.11 * (1.0 - depth * 0.4);
  waterColor += vec3(caustics);

  // Reflexo de luz solar discreto
  float shimmerSin = clamp(sin(pIso.x * 12.0 + pIso.y * 18.0 + t * 0.22), 0.0, 1.0);
  float shimmer = shimmerSin * shimmerSin;
  shimmer = shimmer * shimmer;
  shimmer = shimmer * shimmer * 0.07 * depth;
  waterColor += vec3(shimmer);

  // Transparência suave da água no raso
  float waterOpacity = mix(0.45, 0.90, smoothstep(0.0, 0.42, depth));
  vec3 oceanSurface = mix(sandColor, waterColor, waterMask * waterOpacity);

  // =========================================================================
  // ESPUMA ORGÂNICA COM CICLO DE VIDA CONTÍNUO
  // =========================================================================
  float edgeDist = abs(distToWater);

  // 1. Lábio de espuma na frente da onda:
  // Mais nítido e vigoroso enquanto a água avança (swash), e amacia suavemente no recuo
  float swashIntensity = smoothstep(-0.20, 0.40, waveVelocity);
  float foamLip = smoothstep(0.024, 0.001, edgeDist) * (0.45 + 0.55 * swashIntensity);

  // 2. Textura rendada celular contínua
  vec2 foamCoord = pIso * 28.0;
  float foamN1 = noise(foamCoord + vec2(-t * 0.13, t * 0.05));
  float foamN2 = noise(foamCoord * 1.9 + vec2(t * 0.08, -t * 0.10));
  float foamTexture = smoothstep(0.36, 0.72, foamN1 * 0.65 + foamN2 * 0.35);

  // 3. Rendado de espuma que flutua na lâmina d'água logo atrás da crista
  float inWaterTrail = smoothstep(-0.09, 0.0, distToWater) * (1.0 - smoothstep(0.0, 0.008, distToWater));
  float foamTrail = inWaterTrail * foamTexture * 0.70;

  // 4. Espuma residual deixada na areia durante o recuo (backwash):
  // Controlada harmoniosamente por waveVelocity < 0: surge no início da vazante,
  // dissolve progressivamente e atinge zero de forma suave ao final do recuo.
  float backwashEnvelope = smoothstep(0.0, 0.70, -waveVelocity);
  float recedeSandBand = smoothstep(0.0, 0.004, distToWater) * (1.0 - smoothstep(0.004, 0.042, distToWater));
  float residualFoam = backwashEnvelope * recedeSandBand * foamTexture * 0.58;

  // Total de espuma integrado e perolado
  float totalFoam = clamp(foamLip * (0.60 + foamTexture * 0.40) + foamTrail + residualFoam, 0.0, 1.0);
  vec3 foamColor = vec3(0.98, 0.99, 1.0);
  vec3 finalColor = mix(oceanSurface, foamColor, totalFoam * 0.92);

  // Vinheta sutil e luminosidade natural
  vec2 vigCoord = (uv - 0.5) * vec2(min(aspect, 1.0 / max(aspect, 0.01)), 1.0);
  float vignette = smoothstep(1.5, 0.35, length(vigCoord));
  finalColor *= mix(0.97, 1.02, vignette);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export const BeachShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let positionBuffer: WebGLBuffer | null = null;
    let vertexShader: WebGLShader | null = null;
    let fragmentShader: WebGLShader | null = null;
    let animationFrameId = 0;
    let isContextLost = false;

    // Uniforms
    let uResolution: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uMouse: WebGLUniformLocation | null = null;
    let uMouseActive: WebGLUniformLocation | null = null;
    let uReducedMotion: WebGLUniformLocation | null = null;

    // Preferências de movimento reduzido
    const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion = mediaQueryMotion.matches ? 1.0 : 0.0;
    const onMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches ? 1.0 : 0.0;
    };
    mediaQueryMotion.addEventListener('change', onMotionChange);

    // Acumulação monotônica estrita de tempo:
    // Nunca reinicia o tempo quando a página rola ou a aba volta a ficar visível
    let lastTimestamp = performance.now();
    let accumulatedTime = 0;
    let isVisible = true;
    let isPageActive = !document.hidden;

    // Coordenadas do mouse
    let mouseX = 0.5;
    let mouseY = 0.5;
    let mouseActive = 0.0;
    let targetMouseActive = 0.0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMouseActive = 1.0;
    };

    const handleMouseLeave = () => {
      targetMouseActive = 0.0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Inicialização do contexto WebGL
    function initWebGL(): boolean {
      if (!canvas) return false;

      gl =
        canvas.getContext('webgl', {
          alpha: false,
          depth: false,
          stencil: false,
          antialias: false,
          powerPreference: 'low-power',
          preserveDrawingBuffer: false,
        }) ||
        (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

      if (!gl) {
        console.warn('WebGL não disponível. O fundo permanecerá com a cor natural de areia.');
        return false;
      }

      function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
        const shader = glCtx.createShader(type);
        if (!shader) return null;
        glCtx.shaderSource(shader, source);
        glCtx.compileShader(shader);
        if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
          console.error('Erro de compilação de shader:', glCtx.getShaderInfoLog(shader));
          glCtx.deleteShader(shader);
          return null;
        }
        return shader;
      }

      vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
      fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
      if (!vertexShader || !fragmentShader) return false;

      program = gl.createProgram();
      if (!program) return false;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Erro ao linkar programa WebGL:', gl.getProgramInfoLog(program));
        return false;
      }

      gl.useProgram(program);

      // Fullscreen Quad Buffer
      positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      const positions = new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

      const positionLocation = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      // Uniform Locations
      uResolution = gl.getUniformLocation(program, 'u_resolution');
      uTime = gl.getUniformLocation(program, 'u_time');
      uMouse = gl.getUniformLocation(program, 'u_mouse');
      uMouseActive = gl.getUniformLocation(program, 'u_mouse_active');
      uReducedMotion = gl.getUniformLocation(program, 'u_reduced_motion');

      resize();
      return true;
    }

    // Dimensionamento do Canvas com threshold para evitar jitter de scroll
    const resize = () => {
      if (!canvas || !gl || isContextLost) return;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = container.getBoundingClientRect();
      const targetWidth = Math.max(1, Math.floor(rect.width * dpr));
      const targetHeight = Math.max(1, Math.floor(rect.height * dpr));

      if (Math.abs(canvas.width - targetWidth) > 2 || Math.abs(canvas.height - targetHeight) > 2) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        gl.viewport(0, 0, targetWidth, targetHeight);
      }
    };

    // Loop de renderização contínuo
    const render = (timestamp: number) => {
      if (!isVisible || !isPageActive || isContextLost || !gl || !program) {
        animationFrameId = 0;
        return;
      }

      // Delta contínuo limitado (previne saltos se houver congelamento breve do browser)
      const delta = Math.min((timestamp - lastTimestamp) * 0.001, 0.1);
      lastTimestamp = timestamp;
      accumulatedTime += delta;

      mouseActive += (targetMouseActive - mouseActive) * 0.08;

      gl.useProgram(program);
      if (uResolution) gl.uniform2f(uResolution, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, accumulatedTime);
      if (uMouse) gl.uniform2f(uMouse, mouseX, mouseY);
      if (uMouseActive) gl.uniform1f(uMouseActive, mouseActive);
      if (uReducedMotion) gl.uniform1f(uReducedMotion, isReducedMotion);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!animationFrameId && isVisible && isPageActive && !isContextLost) {
        lastTimestamp = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const initialized = initWebGL();
    if (initialized) {
      startLoop();
    }

    // Tratamento de Perda e Restauração de Contexto
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      isContextLost = true;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    const handleContextRestored = () => {
      isContextLost = false;
      const success = initWebGL();
      if (success) {
        startLoop();
      }
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    // ResizeObserver observando o container
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    window.addEventListener('orientationchange', resize);
    window.addEventListener('resize', resize, { passive: true });

    // IntersectionObserver para pausar fora do viewport
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible && isPageActive) {
          startLoop();
        } else if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(container);

    // Page Visibility API (pausa na troca de abas)
    const handleVisibilityChange = () => {
      isPageActive = !document.hidden;
      if (isPageActive && isVisible) {
        startLoop();
      } else if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Limpeza completa de recursos ao desmontar
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('orientationchange', resize);
      window.removeEventListener('resize', resize);
      mediaQueryMotion.removeEventListener('change', onMotionChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (gl) {
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
        if (vertexShader) gl.deleteShader(vertexShader);
        if (fragmentShader) gl.deleteShader(fragmentShader);
        if (program) gl.deleteProgram(program);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden select-none bg-[#f4ece1]"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          touchAction: 'none',
        }}
      />
      {/* Gradiente sutil superior e inferior para harmonização e contraste da interface */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdfaf7]/35 via-transparent to-[#f7efe6]/50 pointer-events-none" />
    </div>
  );
};
