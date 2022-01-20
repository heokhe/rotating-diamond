import * as three from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'

export class PillarLamp extends three.Object3D {
  constructor(color) {
    super()

    const pillar = new three.Mesh(new three.BoxGeometry(1, 5, 1.5), new three.MeshBasicMaterial({
      color: 'black'
    }))
    this.pillar = pillar

    const lamp = new three.RectAreaLight(color, 1, 1, 4.5);
    lamp.power = 250
    lamp.rotateY(-Math.PI / 2)
    pillar.add(lamp)
    this.lamp = lamp

    const rect = new RectAreaLightHelper(lamp, color)
    lamp.add(rect)
    lamp.position.set(0.51, 0, 0)
    this.rect = rect

    this.add(pillar)
  }

  setColor(color) {
    this.lamp.color.set(color)
    this.rect.color = color
  }
}
