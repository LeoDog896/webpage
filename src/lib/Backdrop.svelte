<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	let map = new THREE.ShaderMaterial({ 
    uniforms: {
      color1: {
        value: new THREE.Color("#c8a8ed")
      },
      color2: {
        value: new THREE.Color("#8dc9f7")
      }
    },
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
    
      varying vec2 vUv;
      
      void main() {
        
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
    `,
    wireframe: false
  });
	let w = 1;
	let h = 1;
	let y = 0;
	const backdrop = new THREE.PlaneGeometry(1, 1, 32, 32);
	// curve backdrop
	for (let i = 0; i < backdrop.attributes.position.array.length; i += 3) {
		const x = backdrop.attributes.position.array[i + 0];
		const sin = Math.sin(x);
		const cos = Math.cos(x);
		backdrop.attributes.position.array[i + 0] = sin;
		backdrop.attributes.position.array[i + 2] = -cos + 1;
		backdrop.attributes.normal.array[i + 0] = -sin;
		backdrop.attributes.normal.array[i + 2] = cos;
	}
</script>

<svelte:window bind:scrollY={y} bind:innerWidth={w} bind:innerHeight={h} />

<SC.Canvas>
  <SC.Mesh
    geometry={backdrop}
    material={map}
    position={[0, 0, -15]}
    scale={25 * Math.max(w / h, 1)}
    receiveShadow
  />
  <SC.PerspectiveCamera
    fov={65}
    zoom={1}
    position={[0, 0 - y * 0.005, 7]}
    target={[0, 0 - y * 0.005, 0]}
  />
</SC.Canvas>