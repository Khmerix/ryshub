extends Node3D

# ============================================================
# BRICKFORGE PRO - Main Controller
# School-ready building game with 50+ block types
# ============================================================

# Block Categories for UI
enum BlockCategory {
	BASIC,      # Cube, Slope, Cylinder, etc.
	ARCHITECTURE,  # Wall, Window, Door, Fence, etc.
	NATURE,     # Tree, Rock, Bush, etc.
	MATERIALS,  # Wood, Stone, Metal, etc.
	SPECIAL     # Glass, Neon, Glow, etc.
}

# All Block Types
enum BlockType {
	# Basic Shapes (0-9)
	CUBE, SLOPE, WEDGE, CYLINDER, SPHERE, 
	ARCH, CORNER, PLATE, STAIR, TUBE,
	# Architecture (10-19)
	WALL, WINDOW, DOOR, FENCE, PILLAR,
	BEAM, BRICK, PANEL, FLOOR, GATE,
	# Nature (20-29)
	TREE_OAK, TREE_PINE, TREE_PALM, ROCK, BOULDER,
	BUSH, SHRUB, FLOWER, CACTUS, MUSHROOM,
	# Materials (30-39)
	WOOD, PLANK, STONE, COBBLESTONE, MARBLE,
	CONCRETE, SAND, DIRT, CLAY, LEAVES,
	# Special FX (40-49)
	METAL, STEEL, GOLD, COPPER, GLASS,
	NEON, GLOW, WATER, LAVA, ICE,
	# More (50+)
	SNOW, FABRIC, GLASS_TINTED
}

# Tool Types
enum Tool {
	BUILD, PAINT, ERASE, SELECT
}

# Block Metadata
const BLOCK_DATA = {
	# Basic
	BlockType.CUBE: {"name": "Cube", "cat": BlockCategory.BASIC, "height": 1.0},
	BlockType.SLOPE: {"name": "Slope", "cat": BlockCategory.BASIC, "height": 1.0},
	BlockType.WEDGE: {"name": "Wedge", "cat": BlockCategory.BASIC, "height": 1.0},
	BlockType.CYLINDER: {"name": "Cylinder", "cat": BlockCategory.BASIC, "height": 1.0},
	BlockType.SPHERE: {"name": "Sphere", "cat": BlockCategory.BASIC, "height": 0.8},
	BlockType.ARCH: {"name": "Arch", "cat": BlockCategory.BASIC, "height": 2.5},
	BlockType.CORNER: {"name": "Corner", "cat": BlockCategory.BASIC, "height": 1.0},
	BlockType.PLATE: {"name": "Plate", "cat": BlockCategory.BASIC, "height": 0.2},
	BlockType.STAIR: {"name": "Stair", "cat": BlockCategory.BASIC, "height": 0.75},
	BlockType.TUBE: {"name": "Tube", "cat": BlockCategory.BASIC, "height": 1.0},
	# Architecture
	BlockType.WALL: {"name": "Wall", "cat": BlockCategory.ARCHITECTURE, "height": 1.5},
	BlockType.WINDOW: {"name": "Window", "cat": BlockCategory.ARCHITECTURE, "height": 1.5},
	BlockType.DOOR: {"name": "Door", "cat": BlockCategory.ARCHITECTURE, "height": 2.2},
	BlockType.FENCE: {"name": "Fence", "cat": BlockCategory.ARCHITECTURE, "height": 1.2},
	BlockType.PILLAR: {"name": "Pillar", "cat": BlockCategory.ARCHITECTURE, "height": 3.0},
	BlockType.BEAM: {"name": "Beam", "cat": BlockCategory.ARCHITECTURE, "height": 0.5},
	BlockType.BRICK: {"name": "Brick", "cat": BlockCategory.ARCHITECTURE, "height": 0.5},
	BlockType.PANEL: {"name": "Panel", "cat": BlockCategory.ARCHITECTURE, "height": 0.2},
	BlockType.FLOOR: {"name": "Floor", "cat": BlockCategory.ARCHITECTURE, "height": 0.1},
	BlockType.GATE: {"name": "Gate", "cat": BlockCategory.ARCHITECTURE, "height": 2.0},
	# Nature
	BlockType.TREE_OAK: {"name": "Oak Tree", "cat": BlockCategory.NATURE, "height": 3.0},
	BlockType.TREE_PINE: {"name": "Pine Tree", "cat": BlockCategory.NATURE, "height": 3.5},
	BlockType.TREE_PALM: {"name": "Palm Tree", "cat": BlockCategory.NATURE, "height": 4.0},
	BlockType.ROCK: {"name": "Rock", "cat": BlockCategory.NATURE, "height": 0.6},
	BlockType.BOULDER: {"name": "Boulder", "cat": BlockCategory.NATURE, "height": 1.2},
	BlockType.BUSH: {"name": "Bush", "cat": BlockCategory.NATURE, "height": 0.6},
	BlockType.SHRUB: {"name": "Shrub", "cat": BlockCategory.NATURE, "height": 0.5},
	BlockType.FLOWER: {"name": "Flower", "cat": BlockCategory.NATURE, "height": 0.4},
	BlockType.CACTUS: {"name": "Cactus", "cat": BlockCategory.NATURE, "height": 1.5},
	BlockType.MUSHROOM: {"name": "Mushroom", "cat": BlockCategory.NATURE, "height": 0.6},
	# Materials
	BlockType.WOOD: {"name": "Wood", "cat": BlockCategory.MATERIALS, "height": 1.0},
	BlockType.PLANK: {"name": "Plank", "cat": BlockCategory.MATERIALS, "height": 0.2},
	BlockType.STONE: {"name": "Stone", "cat": BlockCategory.MATERIALS, "height": 1.0},
	BlockType.COBBLESTONE: {"name": "Cobble", "cat": BlockCategory.MATERIALS, "height": 1.0},
	BlockType.MARBLE: {"name": "Marble", "cat": BlockCategory.MATERIALS, "height": 1.0},
	BlockType.CONCRETE: {"name": "Concrete", "cat": BlockCategory.MATERIALS, "height": 1.0},
	BlockType.SAND: {"name": "Sand", "cat": BlockCategory.MATERIALS, "height": 1.0},
	BlockType.DIRT: {"name": "Dirt", "cat": BlockCategory.MATERIALS, "height": 1.0},
	BlockType.CLAY: {"name": "Clay", "cat": BlockCategory.MATERIALS, "height": 1.0},
	BlockType.LEAVES: {"name": "Leaves", "cat": BlockCategory.MATERIALS, "height": 1.0},
	# Special FX
	BlockType.METAL: {"name": "Metal", "cat": BlockCategory.SPECIAL, "height": 1.0},
	BlockType.STEEL: {"name": "Steel", "cat": BlockCategory.SPECIAL, "height": 1.0},
	BlockType.GOLD: {"name": "Gold", "cat": BlockCategory.SPECIAL, "height": 1.0},
	BlockType.COPPER: {"name": "Copper", "cat": BlockCategory.SPECIAL, "height": 1.0},
	BlockType.GLASS: {"name": "Glass", "cat": BlockCategory.SPECIAL, "height": 1.0},
	BlockType.NEON: {"name": "Neon", "cat": BlockCategory.SPECIAL, "height": 0.5},
	BlockType.GLOW: {"name": "Glow", "cat": BlockCategory.SPECIAL, "height": 0.8},
	BlockType.WATER: {"name": "Water", "cat": BlockCategory.SPECIAL, "height": 0.8},
	BlockType.LAVA: {"name": "Lava", "cat": BlockCategory.SPECIAL, "height": 1.0},
	BlockType.ICE: {"name": "Ice", "cat": BlockCategory.SPECIAL, "height": 1.0},
	BlockType.SNOW: {"name": "Snow", "cat": BlockCategory.SPECIAL, "height": 1.0},
	BlockType.FABRIC: {"name": "Fabric", "cat": BlockCategory.SPECIAL, "height": 0.1},
	BlockType.GLASS_TINTED: {"name": "Dark Glass", "cat": BlockCategory.SPECIAL, "height": 1.0}
}

# State
var materials := {}
var current_block_type := BlockType.CUBE
var current_color := Color(0.8, 0.2, 0.2)
var current_tool := Tool.BUILD
var block_size := 1.0
var snap_to_grid := true
var show_grid := true
var ghost_rotation := 0.0

# Objects
var ghost_block: Node3D = null
var selection_box: MeshInstance3D = null
var sun: DirectionalLight3D
var ambient: DirectionalLight3D

# Tracking
var blocks: Array[Node3D] = []
var selected_block: Node3D = null
var history: Array[Dictionary] = []
var history_index := -1
const MAX_HISTORY := 50

# Environment
var current_environment := "earth"
const ENVIRONMENTS = {
	"earth": {"sky": Color(0.53, 0.81, 0.92), "ground": Color(0.29, 0.49, 0.35), 
			  "sun": Color(1.0, 0.96, 0.88), "sun_energy": 1.2, "ambient": 0.4},
	"mars": {"sky": Color(1.0, 0.42, 0.29), "ground": Color(0.76, 0.27, 0.05),
			 "sun": Color(1.0, 0.87, 0.67), "sun_energy": 0.8, "ambient": 0.3},
	"moon": {"sky": Color(0.04, 0.04, 0.1), "ground": Color(0.4, 0.4, 0.4),
			 "sun": Color(1.0, 1.0, 1.0), "sun_energy": 1.4, "ambient": 0.2},
	"desert": {"sky": Color(0.53, 0.81, 0.92), "ground": Color(0.9, 0.76, 0.53),
			   "sun": Color(1.0, 0.97, 0.86), "sun_energy": 1.5, "ambient": 0.5},
	"jungle": {"sky": Color(0.4, 0.7, 0.9), "ground": Color(0.15, 0.35, 0.15),
			   "sun": Color(0.9, 1.0, 0.8), "sun_energy": 1.0, "ambient": 0.4},
	"island": {"sky": Color(0.0, 0.75, 1.0), "ground": Color(0.94, 0.9, 0.55),
			   "sun": Color(1.0, 1.0, 0.94), "sun_energy": 1.3, "ambient": 0.5},
	"arctic": {"sky": Color(0.75, 0.84, 0.89), "ground": Color(1.0, 1.0, 1.0),
			   "sun": Color(0.94, 0.97, 1.0), "sun_energy": 1.0, "ambient": 0.6},
	"volcanic": {"sky": Color(0.18, 0.09, 0.06), "ground": Color(0.1, 0.04, 0.04),
				 "sun": Color(1.0, 0.27, 0.0), "sun_energy": 0.6, "ambient": 0.3}
}

# Colors
const COLOR_PALETTE: Array[Color] = [
	Color(0.8, 0.0, 0.0), Color(1.0, 0.27, 0.0), Color(1.0, 0.53, 0.0),
	Color(1.0, 0.8, 0.0), Color(0.53, 0.8, 0.0), Color(0.0, 0.53, 0.0),
	Color(0.0, 0.8, 0.53), Color(0.0, 0.53, 0.8), Color(0.0, 0.27, 0.8),
	Color(0.0, 0.0, 0.8), Color(0.27, 0.0, 0.8), Color(0.53, 0.0, 0.8),
	Color(0.8, 0.0, 0.8), Color(1.0, 0.0, 0.53), Color(1.0, 1.0, 1.0),
	Color(0.8, 0.8, 0.8), Color(0.53, 0.53, 0.53), Color(0.27, 0.27, 0.27),
	Color(0.0, 0.0, 0.0), Color(0.55, 0.27, 0.07), Color(0.82, 0.41, 0.12),
	Color(1.0, 0.84, 0.0), Color(0.75, 0.75, 0.75), Color(0.4, 0.2, 0.1)
]

# ============================================================
# INITIALIZATION
# ============================================================
func _ready():
	setup_materials()
	setup_lights()
	setup_ground()
	setup_grid()
	create_ghost_block()
	create_selection_box()
	update_environment()
	print("BrickForge Pro ready!")

func setup_materials():
	# Create base materials
	var mat_list = {
		"wood": [Color(0.55, 0.27, 0.07), 0.9, 0.0],
		"wood_dark": [Color(0.29, 0.22, 0.16), 0.9, 0.0],
		"stone": [Color(0.53, 0.53, 0.53), 0.7, 0.0],
		"stone_dark": [Color(0.33, 0.33, 0.33), 0.8, 0.0],
		"sand": [Color(0.96, 0.89, 0.74), 1.0, 0.0],
		"sandstone": [Color(0.83, 0.65, 0.46), 0.8, 0.0],
		"dirt": [Color(0.55, 0.4, 0.25), 1.0, 0.0],
		"clay": [Color(0.71, 0.42, 0.31), 0.9, 0.0],
		"concrete": [Color(0.62, 0.62, 0.62), 0.9, 0.0],
		"steel": [Color(0.44, 0.5, 0.56), 0.3, 0.8],
		"metal": [Color(0.4, 0.4, 0.4), 0.2, 0.9],
		"gold": [Color(1.0, 0.84, 0.0), 0.1, 1.0],
		"copper": [Color(0.72, 0.45, 0.2), 0.3, 0.7],
		"leaf": [Color(0.13, 0.55, 0.13), 0.8, 0.0],
		"leaf_dark": [Color(0.06, 0.32, 0.13), 0.8, 0.0],
		"ice": [Color(0.65, 0.95, 0.95), 0.1, 0.0],
		"snow": [Color(1.0, 0.98, 0.94), 1.0, 0.0],
		"glass": [Color(0.67, 0.8, 1.0), 0.05, 0.0],
		"water": [Color(0.0, 0.4, 1.0), 0.1, 0.0],
		"neon": [Color.MAGENTA, 0.5, 0.0],
		"lava": [Color(1.0, 0.27, 0.0), 0.8, 0.0],
		"obsidian": [Color(0.1, 0.04, 0.18), 0.1, 0.3],
		"marble": [Color(0.95, 0.95, 0.95), 0.2, 0.0],
		"brick": [Color(0.63, 0.32, 0.18), 0.8, 0.0],
		"fabric": [Color(0.6, 0.4, 0.6), 1.0, 0.0]
	}
	
	for mat_name in mat_list:
		var data = mat_list[mat_name]
		var mat = StandardMaterial3D.new()
		mat.albedo_color = data[0]
		mat.roughness = data[1]
		mat.metallic = data[2]
		
		# Special properties
		if mat_name in ["ice", "glass"]:
			mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
			mat.albedo_color.a = 0.4 if mat_name == "glass" else 0.6
		elif mat_name == "water":
			mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
			mat.albedo_color.a = 0.6
		elif mat_name in ["neon", "lava"]:
			mat.emission_enabled = true
			mat.emission = data[0]
			mat.emission_energy = 2.0 if mat_name == "neon" else 1.5
		elif mat_name == "obsidian":
			mat.roughness = 0.1
		
		materials[mat_name] = mat

func setup_lights():
	sun = DirectionalLight3D.new()
	sun.name = "Sun"
	sun.position = Vector3(30, 50, 20)
	sun.rotation = Vector3(-0.8, 0.5, 0)
	sun.shadow_enabled = true
	sun.shadow_bias = 0.001
	sun.light_color = Color(1.0, 0.96, 0.88)
	sun.light_energy = 1.2
	add_child(sun)
	
	ambient = DirectionalLight3D.new()
	ambient.name = "Ambient"
	ambient.position = Vector3(-20, 20, -20)
	ambient.light_color = Color(0.6, 0.7, 0.9)
	ambient.light_energy = 0.4
	add_child(ambient)

func setup_ground():
	var ground = MeshInstance3D.new()
	ground.name = "Ground"
	var plane = PlaneMesh.new()
	plane.size = Vector2(120, 120)
	ground.mesh = plane
	var mat = StandardMaterial3D.new()
	mat.albedo_color = Color(0.29, 0.49, 0.35)
	mat.roughness = 0.8
	ground.material_override = mat
	ground.rotation.x = -PI / 2
	ground.receive_shadows = true
	add_child(ground)
	
	# Ground collision (large box below ground)
	var body = StaticBody3D.new()
	var col = CollisionShape3D.new()
	var box = BoxShape3D.new()
	box.size = Vector3(120, 1, 120)
	col.shape = box
	col.position.y = -0.5
	body.add_child(col)
	ground.add_child(body)

func setup_grid():
	var grid = MeshInstance3D.new()
	grid.name = "Grid"
	var mesh = ImmediateMesh.new()
	grid.mesh = mesh
	var mat = StandardMaterial3D.new()
	mat.albedo_color = Color(0.9, 0.9, 0.9)
	mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	grid.material_override = mat
	
	mesh.surface_begin(Mesh.PRIMITIVE_LINES)
	for i in range(-30, 31):
		mesh.surface_add_vertex(Vector3(i, 0.01, -30))
		mesh.surface_add_vertex(Vector3(i, 0.01, 30))
		mesh.surface_add_vertex(Vector3(-30, 0.01, i))
		mesh.surface_add_vertex(Vector3(30, 0.01, i))
	mesh.surface_end()
	
	add_child(grid)
	grid.visible = show_grid

func create_ghost_block():
	if ghost_block:
		ghost_block.queue_free()
	ghost_block = create_block_mesh(current_block_type, true)
	ghost_block.visible = false
	add_child(ghost_block)

func create_selection_box():
	selection_box = MeshInstance3D.new()
	selection_box.name = "SelectionBox"
	var box = BoxMesh.new()
	box.size = Vector3(1.05, 1.05, 1.05)
	selection_box.mesh = box
	var mat = StandardMaterial3D.new()
	mat.albedo_color = Color(0, 1, 1, 0.3)
	mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	selection_box.material_override = mat
	selection_box.visible = false
	add_child(selection_box)

# ============================================================
# BLOCK CREATION
# ============================================================
func create_block_mesh(type: BlockType, is_ghost: bool = false) -> Node3D:
	var root = Node3D.new()
	var mat = get_material_for_type(type)
	var data = BLOCK_DATA.get(type, {"height": 1.0})
	var _h = data.height * block_size
	
	if is_ghost:
		mat = create_ghost_material(mat)
	
	match type:
		# Basic shapes
		BlockType.CUBE, BlockType.WOOD, BlockType.STONE, BlockType.CONCRETE, \
		BlockType.SAND, BlockType.DIRT, BlockType.CLAY, BlockType.LEAVES, \
		BlockType.METAL, BlockType.STEEL, BlockType.GOLD, BlockType.COPPER, \
		BlockType.SNOW, BlockType.COBBLESTONE, BlockType.MARBLE:
			add_mesh_box(root, Vector3(block_size, block_size, block_size), 
						 Vector3(0, block_size/2, 0), mat, is_ghost)
			add_collision_box(root, Vector3(block_size, block_size, block_size), 
							  Vector3(0, block_size/2, 0), is_ghost)
		
		BlockType.SLOPE:
			add_mesh_prism(root, Vector3(block_size, block_size, block_size * 1.4),
						   Vector3(0, block_size/2, 0), mat, is_ghost)
			add_collision_box(root, Vector3(block_size, block_size, block_size),
							  Vector3(0, block_size/2, 0), is_ghost)
		
		BlockType.WEDGE:
			add_mesh_cylinder(root, 0.0, block_size * 0.7, block_size,
							  Vector3(0, block_size/2, 0), 3, mat, is_ghost)
			add_collision_box(root, Vector3(block_size, block_size, block_size),
							  Vector3(0, block_size/2, 0), is_ghost)
		
		BlockType.CYLINDER:
			add_mesh_cylinder(root, block_size * 0.35, block_size * 0.35, block_size,
							  Vector3(0, block_size/2, 0), 16, mat, is_ghost)
			add_collision_cylinder(root, block_size * 0.35, block_size,
								   Vector3(0, block_size/2, 0), is_ghost)
		
		BlockType.SPHERE:
			add_mesh_sphere(root, block_size * 0.4,
							Vector3(0, block_size * 0.4, 0), mat, is_ghost)
			add_collision_box(root, Vector3(block_size * 0.8, block_size * 0.8, block_size * 0.8),
							  Vector3(0, block_size * 0.4, 0), is_ghost)
		
		BlockType.PLATE, BlockType.PLANK, BlockType.PANEL:
			add_mesh_box(root, Vector3(block_size, block_size * 0.2, block_size),
						 Vector3(0, block_size * 0.1, 0), mat, is_ghost)
			add_collision_box(root, Vector3(block_size, block_size * 0.2, block_size),
							  Vector3(0, block_size * 0.1, 0), is_ghost)
		
		BlockType.FLOOR:
			add_mesh_box(root, Vector3(block_size, block_size * 0.1, block_size),
						 Vector3(0, block_size * 0.05, 0), mat, is_ghost)
			add_collision_box(root, Vector3(block_size, block_size * 0.1, block_size),
							  Vector3(0, block_size * 0.05, 0), is_ghost)
		
		BlockType.BEAM:
			add_mesh_box(root, Vector3(block_size * 0.2, block_size * 0.2, block_size),
						 Vector3(0, block_size * 0.1, 0), mat, is_ghost)
			add_collision_box(root, Vector3(block_size * 0.2, block_size * 0.2, block_size),
							  Vector3(0, block_size * 0.1, 0), is_ghost)
		
		BlockType.BRICK:
			add_mesh_box(root, Vector3(block_size * 0.9, block_size * 0.5, block_size * 0.5),
						 Vector3(0, block_size * 0.25, 0), mat, is_ghost)
			add_collision_box(root, Vector3(block_size * 0.9, block_size * 0.5, block_size * 0.5),
							  Vector3(0, block_size * 0.25, 0), is_ghost)
		
		# Architecture
		BlockType.WALL:
			add_mesh_box(root, Vector3(block_size, block_size * 1.5, block_size * 0.3),
						 Vector3(0, block_size * 0.75, 0), mat, is_ghost)
			add_collision_box(root, Vector3(block_size, block_size * 1.5, block_size * 0.3),
							  Vector3(0, block_size * 0.75, 0), is_ghost)
		
		BlockType.WINDOW:
			# Frame
			add_mesh_box(root, Vector3(block_size, block_size * 1.5, block_size * 0.2),
						 Vector3(0, block_size * 0.75, 0), materials["wood"], is_ghost)
			# Glass
			add_mesh_box(root, Vector3(block_size * 0.8, block_size * 1.2, block_size * 0.05),
						 Vector3(0, block_size * 0.75, block_size * 0.05), materials["glass"], is_ghost)
			add_collision_box(root, Vector3(block_size, block_size * 1.5, block_size * 0.2),
							  Vector3(0, block_size * 0.75, 0), is_ghost)
		
		BlockType.DOOR:
			# Frame
			add_mesh_box(root, Vector3(block_size * 1.1, block_size * 2.2, block_size * 0.3),
						 Vector3(0, block_size * 1.1, 0), materials["stone_dark"], is_ghost)
			# Door
			add_mesh_box(root, Vector3(block_size * 0.9, block_size * 2.0, block_size * 0.1),
						 Vector3(0, block_size, block_size * 0.1), materials["wood"], is_ghost)
			add_collision_box(root, Vector3(block_size * 1.1, block_size * 2.2, block_size * 0.3),
							  Vector3(0, block_size * 1.1, 0), is_ghost)
		
		BlockType.FENCE:
			for i in range(2):
				add_mesh_box(root, Vector3(block_size * 0.1, block_size * 1.2, block_size * 0.1),
							 Vector3((i - 0.5) * block_size * 0.8, block_size * 0.6, 0), 
							 materials["wood"], is_ghost)
			for i in range(3):
				add_mesh_box(root, Vector3(block_size, block_size * 0.08, block_size * 0.05),
							 Vector3(0, block_size * (0.3 + i * 0.3), 0),
							 materials["wood"], is_ghost)
			add_collision_box(root, Vector3(block_size, block_size * 1.2, block_size * 0.1),
							  Vector3(0, block_size * 0.6, 0), is_ghost)
		
		BlockType.PILLAR:
			# Base
			add_mesh_box(root, Vector3(block_size * 0.8, block_size * 0.2, block_size * 0.8),
						 Vector3(0, block_size * 0.1, 0), mat, is_ghost)
			# Shaft
			add_mesh_cylinder(root, block_size * 0.25, block_size * 0.3, block_size * 2.6,
							  Vector3(0, block_size * 1.5, 0), 12, mat, is_ghost)
			# Capital
			add_mesh_box(root, Vector3(block_size * 0.7, block_size * 0.2, block_size * 0.7),
						 Vector3(0, block_size * 2.9, 0), mat, is_ghost)
			add_collision_box(root, Vector3(block_size * 0.8, block_size * 3.0, block_size * 0.8),
							  Vector3(0, block_size * 1.5, 0), is_ghost)
		
		# Nature
		BlockType.TREE_OAK:
			# Trunk
			add_mesh_cylinder(root, block_size * 0.15, block_size * 0.25, block_size * 2,
							  Vector3(0, block_size, 0), 8, materials["wood"], is_ghost)
			# Leaves
			add_mesh_sphere(root, block_size * 0.8, Vector3(0, block_size * 2.3, 0),
							materials["leaf"], is_ghost)
			add_collision_box(root, Vector3(block_size * 0.6, block_size * 3.0, block_size * 0.6),
							  Vector3(0, block_size * 1.5, 0), is_ghost)
		
		BlockType.TREE_PINE:
			# Trunk
			add_mesh_cylinder(root, block_size * 0.12, block_size * 0.2, block_size * 3,
							  Vector3(0, block_size * 1.5, 0), 8, materials["wood_dark"], is_ghost)
			# Leaves (stacked cones)
			for i in range(4):
				add_mesh_cone(root, (0.9 - i * 0.15) * block_size, block_size * 1.2,
							  Vector3(0, block_size * (3 - 0.3 - i * 0.7), 0),
							  materials["leaf_dark"], is_ghost)
			add_collision_box(root, Vector3(block_size, block_size * 3.5, block_size),
							  Vector3(0, block_size * 1.75, 0), is_ghost)
		
		BlockType.ROCK, BlockType.BOULDER:
			add_mesh_sphere(root, block_size * 0.4 * (1.5 if type == BlockType.BOULDER else 1.0),
							Vector3(0, block_size * 0.4, 0), materials["stone_dark"], is_ghost)
			add_collision_box(root, Vector3(block_size * 0.8, block_size * 0.8, block_size * 0.8),
							  Vector3(0, block_size * 0.4, 0), is_ghost)
		
		BlockType.BUSH, BlockType.SHRUB:
			add_mesh_sphere(root, block_size * 0.4, Vector3(0, block_size * 0.4, 0),
							materials["leaf"], is_ghost)
			add_collision_box(root, Vector3(block_size * 0.8, block_size * 0.8, block_size * 0.8),
							  Vector3(0, block_size * 0.4, 0), is_ghost)
		
		# Special
		BlockType.GLASS, BlockType.GLASS_TINTED, BlockType.ICE:
			add_mesh_box(root, Vector3(block_size, block_size, block_size),
						 Vector3(0, block_size/2, 0), mat, is_ghost)
			add_collision_box(root, Vector3(block_size, block_size, block_size),
							  Vector3(0, block_size/2, 0), is_ghost)
		
		BlockType.NEON:
			add_mesh_box(root, Vector3(block_size * 0.1, block_size * 0.05, block_size),
						 Vector3(0, block_size * 0.025, 0), mat, is_ghost)
			if not is_ghost:
				var light = OmniLight3D.new()
				light.light_color = Color.MAGENTA
				light.light_energy = 2.0
				light.omni_range = 10 * block_size
				light.position.y = block_size * 0.05
				root.add_child(light)
			add_collision_box(root, Vector3(block_size * 0.1, block_size * 0.05, block_size),
							  Vector3(0, block_size * 0.025, 0), is_ghost)
		
		BlockType.GLOW:
			add_mesh_box(root, Vector3(block_size * 0.6, block_size * 0.8, block_size * 0.6),
						 Vector3(0, block_size * 0.4, 0), mat, is_ghost)
			if not is_ghost:
				var light = OmniLight3D.new()
				light.light_color = Color(1.0, 0.67, 0.0)
				light.light_energy = 2.0
				light.omni_range = 8 * block_size
				light.position.y = block_size * 0.4
				root.add_child(light)
			add_collision_box(root, Vector3(block_size * 0.6, block_size * 0.8, block_size * 0.6),
							  Vector3(0, block_size * 0.4, 0), is_ghost)
		
		BlockType.WATER:
			add_mesh_box(root, Vector3(block_size, block_size * 0.8, block_size),
						 Vector3(0, block_size * 0.4, 0), mat, is_ghost)
			add_collision_box(root, Vector3(block_size, block_size * 0.8, block_size),
							  Vector3(0, block_size * 0.4, 0), is_ghost)
		
		BlockType.LAVA:
			add_mesh_box(root, Vector3(block_size, block_size, block_size),
						 Vector3(0, block_size/2, 0), mat, is_ghost)
			if not is_ghost:
				var light = OmniLight3D.new()
				light.light_color = Color(1.0, 0.27, 0.0)
				light.light_energy = 3.0
				light.omni_range = 15 * block_size
				light.position.y = block_size * 0.5
				root.add_child(light)
			add_collision_box(root, Vector3(block_size, block_size, block_size),
							  Vector3(0, block_size/2, 0), is_ghost)
		
		_:
			# Default cube
			add_mesh_box(root, Vector3(block_size, block_size, block_size),
						 Vector3(0, block_size/2, 0), mat, is_ghost)
			add_collision_box(root, Vector3(block_size, block_size, block_size),
							  Vector3(0, block_size/2, 0), is_ghost)
	
	root.set_meta("type", type)
	root.set_meta("size", block_size)
	return root

# Helper functions for mesh creation
func add_mesh_box(parent: Node3D, size: Vector3, pos: Vector3, mat: Material, is_ghost: bool):
	var mesh = MeshInstance3D.new()
	var box = BoxMesh.new()
	box.size = size
	mesh.mesh = box
	mesh.material_override = mat
	mesh.position = pos
	if not is_ghost:
		mesh.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	parent.add_child(mesh)

func add_mesh_cylinder(parent: Node3D, top_r: float, bot_r: float, h: float, 
					   pos: Vector3, sides: int, mat: Material, is_ghost: bool):
	var mesh = MeshInstance3D.new()
	var cyl = CylinderMesh.new()
	cyl.top_radius = top_r
	cyl.bottom_radius = bot_r
	cyl.height = h
	cyl.radial_segments = sides
	mesh.mesh = cyl
	mesh.material_override = mat
	mesh.position = pos
	if not is_ghost:
		mesh.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	parent.add_child(mesh)

func add_mesh_sphere(parent: Node3D, radius: float, pos: Vector3, mat: Material, is_ghost: bool):
	var mesh = MeshInstance3D.new()
	var sphere = SphereMesh.new()
	sphere.radius = radius
	sphere.height = radius * 2
	mesh.mesh = sphere
	mesh.material_override = mat
	mesh.position = pos
	if not is_ghost:
		mesh.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	parent.add_child(mesh)

func add_mesh_cone(parent: Node3D, radius: float, h: float, pos: Vector3, mat: Material, is_ghost: bool):
	var mesh = MeshInstance3D.new()
	var cone = CylinderMesh.new()
	cone.top_radius = 0
	cone.bottom_radius = radius
	cone.height = h
	mesh.mesh = cone
	mesh.material_override = mat
	mesh.position = pos
	if not is_ghost:
		mesh.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	parent.add_child(mesh)

func add_mesh_prism(parent: Node3D, size: Vector3, pos: Vector3, mat: Material, is_ghost: bool):
	var mesh = MeshInstance3D.new()
	var prism = PrismMesh.new()
	prism.size = size
	mesh.mesh = prism
	mesh.material_override = mat
	mesh.position = pos
	if not is_ghost:
		mesh.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
	parent.add_child(mesh)

func add_collision_box(parent: Node3D, size: Vector3, pos: Vector3, is_ghost: bool):
	if is_ghost:
		return
	var body = StaticBody3D.new()
	var col = CollisionShape3D.new()
	var box = BoxShape3D.new()
	box.size = size
	col.shape = box
	col.position = pos
	body.add_child(col)
	parent.add_child(body)

func add_collision_cylinder(parent: Node3D, radius: float, h: float, pos: Vector3, is_ghost: bool):
	if is_ghost:
		return
	var body = StaticBody3D.new()
	var col = CollisionShape3D.new()
	var cyl = CylinderShape3D.new()
	cyl.radius = radius
	cyl.height = h
	col.shape = cyl
	col.position = pos
	body.add_child(col)
	parent.add_child(body)

func create_ghost_material(base_mat: Material) -> Material:
	var mat = base_mat.duplicate()
	if mat is StandardMaterial3D:
		mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
		mat.albedo_color.a = 0.3
		mat.emission_enabled = true
		mat.emission = Color.CYAN
		mat.emission_energy = 0.5
	return mat

func get_material_for_type(type: BlockType) -> Material:
	match type:
		BlockType.WOOD, BlockType.PLANK:
			return materials["wood"]
		BlockType.STONE, BlockType.COBBLESTONE:
			return materials["stone"]
		BlockType.MARBLE:
			return materials["marble"]
		BlockType.CONCRETE:
			return materials["concrete"]
		BlockType.SAND:
			return materials["sand"]
		BlockType.DIRT:
			return materials["dirt"]
		BlockType.CLAY:
			return materials["clay"]
		BlockType.METAL:
			return materials["metal"]
		BlockType.STEEL:
			return materials["steel"]
		BlockType.GOLD:
			return materials["gold"]
		BlockType.COPPER:
			return materials["copper"]
		BlockType.LEAVES:
			return materials["leaf"]
		BlockType.GLASS, BlockType.GLASS_TINTED:
			return materials["glass"]
		BlockType.ICE:
			return materials["ice"]
		BlockType.SNOW:
			return materials["snow"]
		BlockType.WATER:
			return materials["water"]
		BlockType.NEON:
			return materials["neon"]
		BlockType.LAVA:
			return materials["lava"]
		BlockType.FABRIC:
			return materials["fabric"]
		BlockType.TREE_OAK, BlockType.TREE_PINE, BlockType.WINDOW, BlockType.DOOR, BlockType.FENCE:
			return materials["wood"]
		BlockType.ROCK, BlockType.BOULDER, BlockType.PILLAR:
			return materials["stone"]
		BlockType.BUSH, BlockType.SHRUB:
			return materials["leaf"]
		BlockType.GLOW:
			var mat = StandardMaterial3D.new()
			mat.albedo_color = Color(1.0, 0.67, 0.0)
			mat.emission_enabled = true
			mat.emission = Color(1.0, 0.53, 0.0)
			mat.emission_energy = 1.0
			return mat
		_:
			var mat = materials["brick"].duplicate()
			mat.albedo_color = current_color
			return mat

# ============================================================
# INPUT & GAMEPLAY
# ============================================================
func _input(event):
	if event is InputEventMouseButton:
		if event.button_index == MOUSE_BUTTON_LEFT and event.pressed:
			match current_tool:
				Tool.BUILD:
					place_block()
				Tool.ERASE:
					erase_block()
				Tool.PAINT:
					paint_block()
				Tool.SELECT:
					select_block_at_mouse()
		elif event.button_index == MOUSE_BUTTON_RIGHT and event.pressed:
			erase_block()
	
	elif event is InputEventKey:
		if event.pressed:
			match event.keycode:
				KEY_1:
					set_tool(Tool.BUILD)
				KEY_2:
					set_tool(Tool.PAINT)
				KEY_3:
					set_tool(Tool.ERASE)
				KEY_4:
					set_tool(Tool.SELECT)
				KEY_R:
					rotate_ghost()
				KEY_G:
					toggle_grid()
				KEY_X:
					toggle_snap()
				KEY_DELETE:
					delete_selected()
				KEY_Z:
					if event.ctrl_pressed:
						undo()
				KEY_Y:
					if event.ctrl_pressed:
						redo()
				KEY_F1:
					toggle_help()

func _physics_process(_delta):
	update_ghost_position()

func update_ghost_position():
	if current_tool != Tool.BUILD or not ghost_block:
		if ghost_block:
			ghost_block.visible = false
		return
	
	var camera = $Camera3D
	var mouse_pos = get_viewport().get_mouse_position()
	var from = camera.project_ray_origin(mouse_pos)
	var to = from + camera.project_ray_normal(mouse_pos) * 100
	
	var space = get_world_3d().direct_space_state
	var query = PhysicsRayQueryParameters3D.new()
	query.from = from
	query.to = to
	query.collide_with_areas = true
	query.collide_with_bodies = true
	
	var result = space.intersect_ray(query)
	if result:
		var pos = result.position
		var normal = result.normal
		var data = BLOCK_DATA.get(current_block_type, {"height": 1.0})
		var h = data.height * block_size
		
		if snap_to_grid:
			pos.x = round(pos.x)
			pos.z = round(pos.z)
			if normal.y > 0.5:
				pos.y = result.position.y + h / 2
			elif normal.y < -0.5:
				pos.y = max(h / 2, result.position.y - h / 2)
			else:
				pos.y = round(pos.y / (block_size * 0.5)) * (block_size * 0.5)
				pos.y = max(h / 2, pos.y)
		else:
			pos += normal * h / 2
		
		ghost_block.visible = true
		ghost_block.position = pos
		ghost_block.rotation.y = ghost_rotation
	else:
		ghost_block.visible = false

func place_block():
	if not ghost_block or not ghost_block.visible:
		return
	
	var block = create_block_mesh(current_block_type)
	block.position = ghost_block.position
	block.rotation.y = ghost_rotation
	add_child(block)
	blocks.append(block)
	add_history("place", block)
	update_block_count()

func erase_block():
	var block = get_block_at_mouse()
	if block:
		add_history("delete", block)
		blocks.erase(block)
		block.queue_free()
		update_block_count()
		if block == selected_block:
			selected_block = null
			selection_box.visible = false

func paint_block():
	var block = get_block_at_mouse()
	if not block:
		return
	
	var type = block.get_meta("type")
	# Only paint basic blocks
	if type in [BlockType.CUBE, BlockType.SLOPE, BlockType.CYLINDER, 
				BlockType.WEDGE, BlockType.SPHERE]:
		for child in block.get_children():
			if child is MeshInstance3D:
				var mat = child.material_override.duplicate()
				mat.albedo_color = current_color
				child.material_override = mat

func select_block_at_mouse():
	var block = get_block_at_mouse()
	if block:
		selected_block = block
		selection_box.visible = true
		selection_box.position = block.position
		selection_box.scale = Vector3.ONE * block.get_meta("size")
	else:
		deselect()

func get_block_at_mouse() -> Node3D:
	var camera = $Camera3D
	var mouse_pos = get_viewport().get_mouse_position()
	var from = camera.project_ray_origin(mouse_pos)
	var to = from + camera.project_ray_normal(mouse_pos) * 100
	
	var space = get_world_3d().direct_space_state
	var query = PhysicsRayQueryParameters3D.new()
	query.from = from
	query.to = to
	
	var result = space.intersect_ray(query)
	if result and result.collider:
		var block = result.collider.get_parent()
		if block in blocks:
			return block
	return null

func deselect():
	selected_block = null
	selection_box.visible = false

func delete_selected():
	if selected_block:
		add_history("delete", selected_block)
		blocks.erase(selected_block)
		selected_block.queue_free()
		selected_block = null
		selection_box.visible = false
		update_block_count()

func rotate_ghost():
	ghost_rotation += PI / 2
	if ghost_rotation >= 2 * PI:
		ghost_rotation = 0

# ============================================================
# HISTORY (UNDO/REDO)
# ============================================================
func add_history(action: String, block: Node3D):
	if history_index < history.size() - 1:
		history = history.slice(0, history_index + 1)
	
	history.append({
		"action": action,
		"block": block,
		"position": block.position,
		"rotation": block.rotation,
		"type": block.get_meta("type"),
		"size": block.get_meta("size")
	})
	
	if history.size() > MAX_HISTORY:
		history.pop_front()
	else:
		history_index += 1

func undo():
	if history_index < 0:
		return
	
	var action = history[history_index]
	match action.action:
		"place":
			blocks.erase(action.block)
			action.block.queue_free()
		"delete":
			var block = create_block_mesh(action.type)
			block.position = action.position
			block.rotation = action.rotation
			add_child(block)
			blocks.append(block)
			action.block = block
	
	history_index -= 1
	update_block_count()

func redo():
	if history_index >= history.size() - 1:
		return
	
	history_index += 1
	var action = history[history_index]
	match action.action:
		"place":
			var block = create_block_mesh(action.type)
			block.position = action.position
			block.rotation = action.rotation
			add_child(block)
			blocks.append(block)
			action.block = block
		"delete":
			blocks.erase(action.block)
			action.block.queue_free()
	
	update_block_count()

# ============================================================
# SETTINGS & ENVIRONMENT
# ============================================================
func set_tool(tool: Tool):
	current_tool = tool
	if ghost_block:
		ghost_block.visible = (tool == Tool.BUILD)
	deselect()

func set_block_type(type: BlockType):
	current_block_type = type
	create_ghost_block()
	if current_tool != Tool.BUILD:
		set_tool(Tool.BUILD)

func set_color(color: Color):
	current_color = color
	create_ghost_block()

func set_size(size: float):
	block_size = size
	create_ghost_block()

func toggle_grid():
	show_grid = !show_grid
	var grid = get_node_or_null("Grid")
	if grid:
		grid.visible = show_grid

func toggle_snap():
	snap_to_grid = !snap_to_grid

func set_environment(env_name: String):
	current_environment = env_name
	update_environment()

func update_environment():
	var env = ENVIRONMENTS.get(current_environment, ENVIRONMENTS["earth"])
	
	var world_env = get_node_or_null("WorldEnvironment")
	if world_env and world_env.environment:
		world_env.environment.background_color = env.sky
		world_env.environment.ambient_light_color = env.sky
		world_env.environment.ambient_light_energy = env.ambient
	
	if sun:
		sun.light_color = env.sun
		sun.light_energy = env.sun_energy
	if ambient:
		ambient.light_energy = env.ambient * 0.5
	
	var ground = get_node_or_null("Ground")
	if ground:
		var mat = ground.material_override
		if mat:
			mat.albedo_color = env.ground

func clear_all():
	for block in blocks:
		block.queue_free()
	blocks.clear()
	selected_block = null
	selection_box.visible = false
	history.clear()
	history_index = -1
	update_block_count()

func update_block_count():
	var ui = $UI
	if ui and ui.has_method("update_block_count"):
		ui.update_block_count(blocks.size())

func toggle_help():
	var help = get_node_or_null("UI/HelpPanel")
	if help:
		help.visible = !help.visible

# ============================================================
# SAVE/LOAD
# ============================================================
func save_build(path: String = "user://build.json"):
	var data = {
		"version": "2.0",
		"environment": current_environment,
		"blocks": []
	}
	for block in blocks:
		data.blocks.append({
			"type": block.get_meta("type"),
			"position": [block.position.x, block.position.y, block.position.z],
			"rotation": block.rotation.y,
			"size": block.get_meta("size")
		})
	
	var file = FileAccess.open(path, FileAccess.WRITE)
	if file:
		file.store_string(JSON.stringify(data))
		file.close()
		print("Saved to ", path)

func load_build(path: String = "user://build.json"):
	var file = FileAccess.open(path, FileAccess.READ)
	if not file:
		return
	
	var json = JSON.new()
	if json.parse(file.get_as_text()) != OK:
		file.close()
		return
	file.close()
	
	var data = json.get_data()
	clear_all()
	
	if data.has("environment"):
		set_environment(data.environment)
	
	if data.has("blocks"):
		for b in data.blocks:
			var type = b.type
			var pos = Vector3(b.position[0], b.position[1], b.position[2])
			var sz = b.size
			block_size = sz
			var block = create_block_mesh(type)
			block.position = pos
			block.rotation.y = b.rotation
			add_child(block)
			blocks.append(block)
	
	block_size = 1.0
	create_ghost_block()
	update_block_count()

func save_screenshot(path: String = "user://screenshot.png"):
	await RenderingServer.frame_post_draw
	var image = get_viewport().get_texture().get_image()
	image.save_png(path)
