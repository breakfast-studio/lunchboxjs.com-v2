export default /* glsl */ `
float firstLayer = step(0.5, gl_FragColor.r);
float secondLayer = step(0.2, gl_FragColor.r);

vec3 final = gl_FragColor.rgb;

// main hatch
vec2 hatchUv = fract(vUv * 70.);
vec3 hatch = vec3(max(step(0.1, hatchUv.y), 0.7));
final = mix(hatch, vec3(1.), firstLayer);

// secondary hatch for darker areas
vec2 rotUv = fract(rotateUV(vUv, 1.5707, vec2(0.5)) * 350.);
vec3 rotHatch = vec3(max(step(0.15, rotUv.y), 0.7));
final = mix(rotHatch * final, final, secondLayer);

gl_FragColor.rgb = final;
`
