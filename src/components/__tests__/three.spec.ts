import { describe, expect, it } from 'vitest'
import * as THREE from 'three'

describe('Three.js integration', () => {
  describe('Scene', () => {
    it('creates an empty scene', () => {
      const scene = new THREE.Scene()
      expect(scene.children.length).toBe(0)
    })

    it('adds and removes objects', () => {
      const scene = new THREE.Scene()
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
      )
      scene.add(mesh)
      expect(scene.children.length).toBe(1)
      scene.remove(mesh)
      expect(scene.children.length).toBe(0)
    })
  })

  describe('Geometries', () => {
    it('TorusKnotGeometry has correct parameters', () => {
      const geo = new THREE.TorusKnotGeometry(1.5, 0.4, 128, 32)
      expect(geo.type).toBe('TorusKnotGeometry')
      expect(geo.getAttribute('position')).toBeDefined()
    })

    it('IcosahedronGeometry creates valid geometry', () => {
      const geo = new THREE.IcosahedronGeometry(0.5, 0)
      expect(geo.type).toBe('IcosahedronGeometry')
    })

    it('PlaneGeometry creates subdivided grid', () => {
      const geo = new THREE.PlaneGeometry(10, 10, 20, 20)
      const posAttr = geo.getAttribute('position')
      // (20+1) * (20+1) = 441 vertices
      expect(posAttr.count).toBe(441)
    })

    it('BufferGeometry supports custom attributes', () => {
      const geo = new THREE.BufferGeometry()
      const positions = new Float32Array(30 * 3)
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      expect(geo.getAttribute('position').count).toBe(30)
    })
  })

  describe('Materials', () => {
    it('MeshStandardMaterial has PBR properties', () => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        metalness: 0.7,
        roughness: 0.2,
      })
      expect(mat.metalness).toBe(0.7)
      expect(mat.roughness).toBe(0.2)
    })

    it('PointsMaterial supports vertex colors', () => {
      const mat = new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      })
      expect(mat.vertexColors).toBe(true)
      expect(mat.opacity).toBe(0.8)
    })
  })

  describe('Camera', () => {
    it('PerspectiveCamera computes projection', () => {
      const cam = new THREE.PerspectiveCamera(60, 16 / 9, 0.1, 100)
      cam.updateProjectionMatrix()
      expect(cam.aspect).toBe(16 / 9)
      expect(cam.fov).toBe(60)
    })
  })

  describe('Lights', () => {
    it('PointLight has position and intensity', () => {
      const light = new THREE.PointLight(0x6366f1, 2, 30)
      light.position.set(5, 5, 5)
      expect(light.intensity).toBe(2)
      expect(light.position.x).toBe(5)
    })

    it('AmbientLight provides uniform illumination', () => {
      const light = new THREE.AmbientLight(0x404060, 0.6)
      expect(light.intensity).toBe(0.6)
    })
  })

  describe('Math utilities', () => {
    it('spherical to cartesian conversion', () => {
      const r = 10
      const theta = Math.PI / 4
      const phi = Math.PI / 3
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.cos(phi)
      const z = r * Math.sin(phi) * Math.sin(theta)
      // Verify distance from origin equals radius
      const dist = Math.sqrt(x * x + y * y + z * z)
      expect(dist).toBeCloseTo(r, 5)
    })

    it('orbit animation formula', () => {
      const t = 1.5
      const speed = 0.5
      const orbit = 0
      const radius = 3.5
      const x = Math.cos(t * speed + orbit) * radius
      const z = Math.sin(t * speed + orbit) * radius
      // Point should be on circle of given radius
      const dist = Math.sqrt(x * x + z * z)
      expect(dist).toBeCloseTo(radius, 5)
    })
  })
})
