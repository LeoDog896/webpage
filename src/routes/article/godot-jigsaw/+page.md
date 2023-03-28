---
title: making a jigsaw puzzle in godot
description: a guide on how to make a jigsaw puzzle in godot
emojis: 🧩 📘 📖
date: 2023-02-18
slug: godot-jigsaw
---

This problem confused me for a bit, but luckily, godot makes splitting a puzzle piece pretty simple.

> note: for simplicity, I'll be using rectangular pegs, but the same principles apply to any shape. If you want to make a PR to the example project demonstrating a different shape, I'd be happy to merge it.

You can find the entire project [here (LeoDog896/godot-jigsaw)](https://github.com/LeoDog896/godot-jigsaw).

I'll be using this silly ferret image:

![ferret yawning on a blue blanket](/godot-jigsaw/ferret.jpg)

## layout

We'll have two scenes for the library, and one for demonstration:

- `Main.tscn`
- `puzzle/`
  - `Puzzle.tscn` - this will split the image into various instances of PuzzlePiece.tscn
  - `PuzzlePiece.tscn` - the actual puzzle piece

Godot's [Polygon2D](https://docs.godotengine.org/en/stable/classes/class_polygon2d.html) has a [texture](https://docs.godotengine.org/en/stable/classes/class_polygon2d.html#class-polygon2d-property-texture) property that is usually used for UV mapping, but we can use it to split the image into pieces.

## representing hinges

GDScript has the concept of [Enums](https://docs.godotengine.org/en/stable/getting_started/scripting/gdscript/gdscript_basics.html#enums), which are basically constants. We'll use them to represent the different states of a hinge:

```gdscript
enum HingeState {
	EXTENDED = 0,
	CONTRACTED = 1,
	NONE = 2
}
```

## generating the piece orientation

we'll attatch a script to the `Puzzle.tscn` scene, allowing it to take in a Texture and the number of rows and columns to split the image into multiple pieces.

we can pass down the context info to the puzzle pieces, so that the puzzle pieces themselves can be created independently.

```gdscript
extends Node2D

export (Texture) var texture

export (int) var rows = 0
export (int) var cols = 0

var puzzle_piece := preload("res://puzzle/PuzzlePiece.tscn")

func _ready():
	for n in rows * cols:
		var piece := puzzle_piece.instance()

		# we need to pass down context info to the puzzle piece
		# from the parent to keep it isolated
		piece.rows = rows
		piece.cols = cols

		piece.row = n / cols
		piece.col = n % cols

		piece.texture = texture

		var image_size := Vector2(texture.get_width(), texture.get_height())

		piece.piece_scale = image_size / Vector2(cols, rows) * scale

		piece.position = (piece.piece_scale * 2 * Vector2(piece.col, piece.row)) - (image_size * scale)

		add_child(piece)
```

we also need to track the neighbors of the puzzle pieces so we can generate the hinges for the piece, so we can make a `pieces` array and add it to the scene at the end:

```gdscript
extends Node2D

export (Texture) var texture

export (int) var rows = 0
export (int) var cols = 0

var puzzle_piece := preload("res://puzzle/PuzzlePiece.tscn")

func _reverse_hinge(hinge: int) -> int:
	return 0 if hinge == 1 else 1

func _ready():
	var pieces: Array = []

	for n in rows * cols:
		var piece := puzzle_piece.instance()

		# we need to pass down context info to the puzzle piece
		# from the parent to keep it isolated
		piece.rows = rows
		piece.cols = cols

		piece.row = n / cols
		piece.col = n % cols

		piece.texture = texture

		var neighbors := {
			top = null if piece.row == 0 else pieces[n - cols],
			left = null if piece.col == 0 else pieces[n - 1],
		}

		var image_size := Vector2(texture.get_width(), texture.get_height())

		piece.piece_scale = image_size / Vector2(cols, rows) * scale

		# we don't use a dictionary here since different values gives better editing in the editor UI
		piece.top_hinge = 2 if neighbors.top == null else _reverse_hinge(neighbors.top.bottom_hinge)
		piece.left_hinge = 2 if neighbors.left == null else _reverse_hinge(neighbors.left.right_hinge)
		piece.right_hinge = 2 if piece.col == cols - 1 else randi() % 2
		piece.bottom_hinge = 2 if piece.row == rows - 1 else randi() % 2

		piece.position = (piece.piece_scale * 2 * Vector2(piece.col, piece.row)) - (image_size * scale)

		pieces.append(piece)

	for piece in pieces:
		add_child(piece)
```

## the pieces themselves

We'll make a new scene, `puzzle/PuzzlePiece.tscn`, that is a Polygon2D (so we can use the texture property) with a script attached to it.

from our earlier script above, lets first capture our exported variables. Instead of using a dictionary for the hinges, we'll use an enum, so we can use the editor UI to easily set the values instead of dealing with dictionary editing.

```gdscript
extends Polygon2D

enum HingeState {
	EXTENDED = 0,
	CONTRACTED = 1,
	NONE = 2
}

export (int) var rows
export (int) var cols

export (int) var row
export (int) var col

export (Texture) var texture

export(HingeState) var top_hinge = HingeState.NONE
export(HingeState) var left_hinge = HingeState.NONE
export(HingeState) var right_hinge = HingeState.NONE
export(HingeState) var bottom_hinge = HingeState.NONE
```

next, we can begin generating the hinge. I'll be using rectangular hinges, but this can be adapted for any hinge:

```gdscript
func hinge(type: int, direction: Vector2) -> PoolVector2Array:
	# this is technically a "right hinge", so we can rotate it to be whatever hinge we want

	var angle := direction.angle()
	var pool = PoolVector2Array()

	# because puzzle pieces can be oriented differently we need to swap width and height depending on the direction
	var current_scale := piece_scale if direction.y == 0 else Vector2(piece_scale.y, piece_scale.x)
	pool.append(current_scale.rotated(angle))

	# since our puzzle piece is around (0, 0), we can use current_scale / 4 to define the hinge boundaries
	if type != HingeState.NONE:
		pool.append_array([
			Vector2(current_scale.x, current_scale.y / 4).rotated(angle),
			Vector2(current_scale.x + current_scale.x / 2 * sign(type - 0.5), current_scale.y / 4).rotated(angle),
			Vector2(current_scale.x + current_scale.x / 2 * sign(type - 0.5), -current_scale.y / 4).rotated(angle),
			Vector2(current_scale.x, -current_scale.y / 4).rotated(angle),
		])

	return pool
```

we can then use this function to generate the hinges for each side of the puzzle piece:

```gdscript
func _ready() -> void:
	polygon = (
		hinge(right_hinge, Vector2.RIGHT)
		+ hinge(top_hinge, Vector2.UP)
		+ hinge(left_hinge, Vector2.LEFT)
		+ hinge(bottom_hinge, Vector2.DOWN)
	)
```

and finally, we can map each vertex to a UV coordinate so we can use the texture:

```gdscript
func _ready() -> void:
	...

	# we keep track of our own UV array since we can't append to it directly (the getter returns a clone)
	var local_uv := []

	var image_width: int = texture.get_width() / cols
	var image_height: int = texture.get_height() / rows

	for vertex in polygon:
		var normalized_vertex: Vector2 = (vertex / (piece_scale)) * (Vector2(image_width, image_height) / 2)
		local_uv.append(
			normalized_vertex
			+ Vector2(
				image_width / 2 + (image_width * col),
				image_height / 2 + (image_height * row)
			)
		)

	uv = local_uv
```

all in all, we get this final code:

```gdscript
extends Polygon2D

enum HingeState {
	EXTENDED = 0,
	CONTRACTED = 1,
	NONE = 2
}

export (int) var rows
export (int) var cols

export (int) var row
export (int) var col

export(HingeState) var top_hinge = HingeState.NONE
export(HingeState) var left_hinge = HingeState.NONE
export(HingeState) var right_hinge = HingeState.NONE
export(HingeState) var bottom_hinge = HingeState.NONE

export var piece_scale: Vector2

func hinge(type: int, direction: Vector2) -> PoolVector2Array:
	# this is technically a "right hinge", so we can rotate it to be whatever hinge we want

	var angle := direction.angle()
	var pool = PoolVector2Array()

	# because puzzle pieces can be oriented differently we need to swap width and height depending on the direction
	var current_scale := piece_scale if direction.y == 0 else Vector2(piece_scale.y, piece_scale.x)
	pool.append(current_scale.rotated(angle))

	# since our puzzle piece is around (0, 0), we can use current_scale / 4 to define the hinge boundaries
	if type != HingeState.NONE:
		pool.append_array([
			Vector2(current_scale.x, current_scale.y / 4).rotated(angle),
			Vector2(current_scale.x + current_scale.x / 2 * sign(type - 0.5), current_scale.y / 4).rotated(angle),
			Vector2(current_scale.x + current_scale.x / 2 * sign(type - 0.5), -current_scale.y / 4).rotated(angle),
			Vector2(current_scale.x, -current_scale.y / 4).rotated(angle),
		])

	return pool

func _ready() -> void:
	polygon = (
		hinge(right_hinge, Vector2.RIGHT)
		+ hinge(top_hinge, Vector2.UP)
		+ hinge(left_hinge, Vector2.LEFT)
		+ hinge(bottom_hinge, Vector2.DOWN)
	)

	# we keep track of our own UV array since we can't append to it directly (the getter returns a clone)
	var local_uv := []

	var image_width: int = texture.get_width() / cols
	var image_height: int = texture.get_height() / rows

	for vertex in polygon:
		var normalized_vertex: Vector2 = (vertex / (piece_scale)) * (Vector2(image_width, image_height) / 2)
		local_uv.append(
			normalized_vertex
			+ Vector2(
				image_width / 2 + (image_width * col),
				image_height / 2 + (image_height * row)
			)
		)

	uv = local_uv
```

and there you have it! To demonstrate, I've changed the `piece.position = ` setter to multiply by 3 so you can see each individual jigsaw piece:

![The final puzzle picture split into different pieces.](/godot-jigsaw/final-picture.png)

## failed attempts

At first, I tried using an [AtlasTexture](https://docs.godotengine.org/en/stable/classes/class_atlastexture.html?highlight=AtlasTexture), but that only splits images into squares, not into arbitrary shapes.

I also tried using a [Sprite](https://docs.godotengine.org/en/stable/classes/class_sprite.html) with a [Polygon2D](https://docs.godotengine.org/en/stable/classes/class_polygon2d.html) as a mask, but the solution for that is so convoluted that I attempted to find a better way before that happened.

When I was testing out the main solution, I made the inadvertent assumption that the origin `(0, 0)` for the texture was on the bottom left:

![Deformed ferret puzzle](/godot-jigsaw/failed-row-col.png)

### hell in non-square images

my original code for another game project involved only square images - when I went to adapt it to non-square images, I quickly realized I was using width and height interchangeably, _everywhere_, so I spent (give or take) 2 hours trying to figure out why the puzzle pieces were all over the place.
