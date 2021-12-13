import { Pass, FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass'
import * as THREE from 'three'
import fragmentShader from './outlineFragment.glsl?raw'
import { ShaderMaterial } from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

export class CustomOutlinePass extends Pass {
    camera: THREE.Camera
    fsQuad: FullScreenQuad
    normalMaterial: THREE.MeshNormalMaterial
    normalTarget: THREE.WebGLRenderTarget
    resolution: THREE.Vector2
    scene: THREE.Scene

    constructor(
        resolution: THREE.Vector2,
        scene: THREE.Scene,
        camera: THREE.Camera
    ) {
        super()

        this.camera = camera
        this.resolution = resolution
        this.scene = scene

        // prep for normals rendering
        this.normalTarget = new THREE.WebGLRenderTarget(
            this.resolution.x,
            this.resolution.y,
            {
                stencilBuffer: false,
                format: THREE.RGBFormat,
                minFilter: THREE.NearestFilter,
                magFilter: THREE.NearestFilter,
                generateMipmaps: false,
            }
        )
        this.normalMaterial = new THREE.MeshNormalMaterial()

        // prep for quad
        this.fsQuad = new FullScreenQuad(
            new THREE.ShaderMaterial({
                uniforms: {
                    normalBuffer: { value: null },
                    sceneColorBuffer: { value: null },
                    screenSize: {
                        value: new THREE.Vector4(
                            this.resolution.x,
                            this.resolution.y,
                            1 / this.resolution.x,
                            1 / this.resolution.y
                        ),
                    },
                },
                vertexShader,
                fragmentShader,
            })
        )
    }

    setSize(width: number, height: number) {
        this.normalTarget.setSize(width, height)
        this.resolution.set(width, height)

        ;(
            this.fsQuad.material as THREE.ShaderMaterial
        ).uniforms.screenSize.value.set(
            this.resolution.x,
            this.resolution.y,
            1 / this.resolution.x,
            1 / this.resolution.y
        )
    }

    render(
        renderer: THREE.WebGLRenderer,
        writeBuffer: THREE.WebGLRenderTarget,
        readBuffer: THREE.WebGLRenderTarget
    ) {
        // save current depth buffer
        const depthBufferValue = writeBuffer.depthBuffer
        writeBuffer.depthBuffer = false

        // prep to render to normal buffer
        renderer.setRenderTarget(this.normalTarget)
        // switch to NormalMaterial for everything, then back to original override
        const sceneOverrideMaterial = this.scene.overrideMaterial
        this.scene.overrideMaterial = this.normalMaterial
        renderer.render(this.scene, this.camera)
        this.scene.overrideMaterial = sceneOverrideMaterial

        // update normal buffer
        const shaderMaterial = this.fsQuad.material as ShaderMaterial
        shaderMaterial.uniforms.normalBuffer.value = this.normalTarget.texture
        // shaderMaterial.uniforms.screenSize// save updated buffers to material
        renderer.setRenderTarget(this.renderToScreen ? null : writeBuffer)
        // render
        this.fsQuad.render(renderer)

        // update scene color buffer
        shaderMaterial.uniforms.sceneColorBuffer.value = readBuffer.texture

        // restore depth buffer
        writeBuffer.depthBuffer = depthBufferValue
    }
}
