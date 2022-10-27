<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	let map = { 
    uniforms: {
      color1: {
        value: new THREE.Color("#c8a8ed")
      },
      color2: {
        value: new THREE.Color("#8dc9f7")
      }
    }
  }
	let w = 1;
	let h = 1;
	let y = 0;
</script>

<svelte:window bind:scrollY={y} bind:innerWidth={w} bind:innerHeight={h} />

<SC.Canvas alpha antialias>

  <SC.Mesh 
    geometry={new THREE.BoxGeometry()}
    position={[6, 0, 0]}
    rotation={[50, 0, 50]}
    material={new THREE.MeshStandardMaterial({ color: 0xff3e00 })}
  />
  <SC.PerspectiveCamera
    fov={65}
    zoom={1}
    position={[0, 0 - y * 0.005, 7]}
    target={[0, 0 - y * 0.005, 0]}
  />
  <SC.OrbitControls enableZoom={false} />
</SC.Canvas>