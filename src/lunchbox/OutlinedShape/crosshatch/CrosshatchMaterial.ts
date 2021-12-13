import { extendMaterial } from './ExtendMaterial'
import { MeshStandardMaterial } from 'three'
import crosshatch from './crosshatch'

export const CrosshatchMaterial = extendMaterial(MeshStandardMaterial as any, {
    header: '#define USE_UV',
    fragment: {
        '#include <clipping_planes_pars_fragment>': `vec2 rotateUV(vec2 uv, float rotation, vec2 mid)
    {
        return vec2(
          cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
          cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
        );
    }
    `,
        '#include <dithering_fragment>': crosshatch,
    },
})
