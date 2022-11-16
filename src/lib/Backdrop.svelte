<script lang="ts">
	import { onMount } from "svelte";

  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D
  let width = 640;
  let height = 640

  interface Point {
    x: number;
    y: number
  }

  let circles: Point[] = []

  function drawCircle(x: number, y: number, radius: number, context: CanvasRenderingContext2D) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }

  function render() {
    context.globalAlpha = 0.5
    context.fillStyle = "rgba(100, 100, 100, 0.1);"
    for (const { x, y } of circles) {
      drawCircle(x, y, 20, context)
    }
    requestAnimationFrame(render)
  }

  onMount(() => {
    canvas.width = window.innerWidth
    canvas.height = canvas.clientHeight
    width = canvas.width;
    height = canvas.height;
    context = canvas.getContext("2d")!
    circles = Array(20).fill(0).map(() => ({ 
      x: Math.random() * width + 100,
      y: Math.random() * height + 100
    }))
    render()
  })
</script>
<canvas bind:this={canvas}/>
<style>
  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(#c8a83d, #8dc9f7);
  }
</style>