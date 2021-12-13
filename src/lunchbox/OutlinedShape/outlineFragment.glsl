varying vec2 vUv;
uniform sampler2D normalBuffer;
uniform sampler2D sceneColorBuffer;
uniform vec4 screenSize;

vec4 outlineColor = vec4(0., 0., 0., 1.);
float normalMultiplier = 0.1;
float normalBias = 0.5;

vec3 getPixelNormal(int x, int y){
    return texture2D(normalBuffer, vUv + screenSize.zw * vec2(x, y)).rgb;
}

void main(){
    vec4 sceneColor = texture2D(sceneColorBuffer, vUv);

    // Get the difference between normals of neighboring pixels and current
    vec3 normal = texture2D(normalBuffer, vUv).rgb;
    float normalDiff = 0.0;
    normalDiff += distance(normal, getPixelNormal(1, 0));
    normalDiff += distance(normal, getPixelNormal(-1, 0));
    normalDiff += distance(normal, getPixelNormal(0, 1));
    normalDiff += distance(normal, getPixelNormal(0, -1));
    normalDiff += distance(normal, getPixelNormal(1, 1));
    normalDiff += distance(normal, getPixelNormal(-1, 1));
    normalDiff += distance(normal, getPixelNormal(1, -1));
    normalDiff += distance(normal, getPixelNormal(-1, -1));
    normalDiff *= normalMultiplier;
    normalDiff = clamp(normalDiff, 0., 1.);
    // standard
    // pow(normalDiff, normalBias)
    // step method
    normalDiff = step(0.2, pow(normalDiff, normalBias));

    float outline = normalDiff;

    gl_FragColor = mix(sceneColor, outlineColor, outline);//vec4(vec3(normalDiff), 1.);//normal;
}