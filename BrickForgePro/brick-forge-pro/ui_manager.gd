extends CanvasLayer

# UI Manager for BrickForge Pro
# Handles all UI interactions and button connections

@onready var main = get_parent()

# Block buttons by category
var block_buttons := {}
var current_tab := "blocks"
var current_size_btn: Button = null

func _ready():
	connect_buttons()
	create_block_buttons()
	create_color_buttons()
	update_tool_buttons(main.Tool.BUILD)
	# Select medium size by default
	var size1_btn = get_node_or_null("BottomBar/Controls/SizeSection/Size1")
	if size1_btn:
		select_size_button(size1_btn)
	# Set initial toggle button states
	var grid_btn = get_node_or_null("BottomBar/Controls/ToggleSection/GridBtn")
	var snap_btn = get_node_or_null("BottomBar/Controls/ToggleSection/SnapBtn")
	if grid_btn:
		update_toggle_button(grid_btn, main.show_grid)
	if snap_btn:
		update_toggle_button(snap_btn, main.snap_to_grid)

func connect_buttons():
	# Tool buttons
	$TopBar/ToolContainer/BuildBtn.pressed.connect(func(): main.set_tool(main.Tool.BUILD); update_tool_buttons(main.Tool.BUILD))
	$TopBar/ToolContainer/PaintBtn.pressed.connect(func(): main.set_tool(main.Tool.PAINT); update_tool_buttons(main.Tool.PAINT))
	$TopBar/ToolContainer/EraseBtn.pressed.connect(func(): main.set_tool(main.Tool.ERASE); update_tool_buttons(main.Tool.ERASE))
	$TopBar/ToolContainer/SelectBtn.pressed.connect(func(): main.set_tool(main.Tool.SELECT); update_tool_buttons(main.Tool.SELECT))
	
	# Size buttons
	$BottomBar/Controls/SizeSection/Size05.pressed.connect(func(): set_size(0.5, $BottomBar/Controls/SizeSection/Size05))
	$BottomBar/Controls/SizeSection/Size1.pressed.connect(func(): set_size(1.0, $BottomBar/Controls/SizeSection/Size1))
	$BottomBar/Controls/SizeSection/Size2.pressed.connect(func(): set_size(2.0, $BottomBar/Controls/SizeSection/Size2))
	$BottomBar/Controls/SizeSection/Size4.pressed.connect(func(): set_size(4.0, $BottomBar/Controls/SizeSection/Size4))
	
	# Toggle buttons
	$BottomBar/Controls/ToggleSection/GridBtn.pressed.connect(toggle_grid)
	$BottomBar/Controls/ToggleSection/SnapBtn.pressed.connect(toggle_snap)
	
	# Action buttons
	$BottomBar/Controls/ActionSection/RotateBtn.pressed.connect(main.rotate_ghost)
	$BottomBar/Controls/ActionSection/UndoBtn.pressed.connect(main.undo)
	$BottomBar/Controls/ActionSection/RedoBtn.pressed.connect(main.redo)
	
	# Environment dropdown
	$BottomBar/Controls/EnvSection/EnvDropdown.item_selected.connect(on_env_selected)
	
	# File buttons
	$BottomBar/Controls/FileSection/SaveBtn.pressed.connect(on_save)
	$BottomBar/Controls/FileSection/LoadBtn.pressed.connect(on_load)
	$BottomBar/Controls/FileSection/ClearBtn.pressed.connect(on_clear)
	$BottomBar/Controls/FileSection/HelpBtn.pressed.connect(on_help)
	
	# Tab buttons
	$BlockPanel/TabContainer/Tabs/TabBlocks.pressed.connect(func(): switch_tab("blocks"))
	$BlockPanel/TabContainer/Tabs/TabArch.pressed.connect(func(): switch_tab("arch"))
	$BlockPanel/TabContainer/Tabs/TabNature.pressed.connect(func(): switch_tab("nature"))
	$BlockPanel/TabContainer/Tabs/TabMat.pressed.connect(func(): switch_tab("mat"))
	$BlockPanel/TabContainer/Tabs/TabSpecial.pressed.connect(func(): switch_tab("special"))
	
	# Help close button
	$HelpPanel/VBox/CloseBtn.pressed.connect(func(): $HelpPanel.visible = false)

func create_block_buttons():
	# Define block layout for each tab
	var tab_blocks = {
		"blocks": [
			main.BlockType.CUBE, main.BlockType.SLOPE, main.BlockType.WEDGE, 
			main.BlockType.CYLINDER, main.BlockType.SPHERE, main.BlockType.ARCH,
			main.BlockType.CORNER, main.BlockType.PLATE, main.BlockType.STAIR,
			main.BlockType.TUBE
		],
		"arch": [
			main.BlockType.WALL, main.BlockType.WINDOW, main.BlockType.DOOR,
			main.BlockType.FENCE, main.BlockType.PILLAR, main.BlockType.BEAM,
			main.BlockType.BRICK, main.BlockType.PANEL, main.BlockType.FLOOR,
			main.BlockType.GATE
		],
		"nature": [
			main.BlockType.TREE_OAK, main.BlockType.TREE_PINE, main.BlockType.TREE_PALM,
			main.BlockType.ROCK, main.BlockType.BOULDER, main.BlockType.BUSH,
			main.BlockType.SHRUB, main.BlockType.FLOWER, main.BlockType.CACTUS,
			main.BlockType.MUSHROOM
		],
		"mat": [
			main.BlockType.WOOD, main.BlockType.PLANK, main.BlockType.STONE,
			main.BlockType.COBBLESTONE, main.BlockType.MARBLE, main.BlockType.CONCRETE,
			main.BlockType.SAND, main.BlockType.DIRT, main.BlockType.CLAY,
			main.BlockType.LEAVES
		],
		"special": [
			main.BlockType.METAL, main.BlockType.STEEL, main.BlockType.GOLD,
			main.BlockType.COPPER, main.BlockType.GLASS, main.BlockType.GLASS_TINTED,
			main.BlockType.NEON, main.BlockType.GLOW, main.BlockType.WATER,
			main.BlockType.LAVA, main.BlockType.ICE, main.BlockType.SNOW
		]
	}
	
	# Create buttons for each tab
	for tab_name in tab_blocks:
		var container = get_node_or_null("BlockPanel/TabContainer/BlockPages/Page" + tab_name.capitalize() + "/Grid")
		if not container:
			continue
		
		block_buttons[tab_name] = []
		for block_type in tab_blocks[tab_name]:
			var data = main.BLOCK_DATA.get(block_type, {"name": "Unknown"})
			var btn = create_block_button(block_type, data.name)
			container.add_child(btn)
			block_buttons[tab_name].append(btn)

func create_block_button(type: int, label: String) -> Button:
	var btn = Button.new()
	btn.custom_minimum_size = Vector2(54, 54)
	btn.tooltip_text = label
	btn.text = label.substr(0, 2) if label.length() > 2 else label
	btn.add_theme_font_size_override("font_size", 9)
	
	# Style
	var style_normal = StyleBoxFlat.new()
	style_normal.bg_color = Color(0.2, 0.25, 0.3, 1)
	style_normal.corner_radius_top_left = 6
	style_normal.corner_radius_top_right = 6
	style_normal.corner_radius_bottom_left = 6
	style_normal.corner_radius_bottom_right = 6
	btn.add_theme_stylebox_override("normal", style_normal)
	
	var style_hover = StyleBoxFlat.new()
	style_hover.bg_color = Color(0.3, 0.4, 0.5, 1)
	style_hover.corner_radius_top_left = 6
	style_hover.corner_radius_top_right = 6
	style_hover.corner_radius_bottom_left = 6
	style_hover.corner_radius_bottom_right = 6
	btn.add_theme_stylebox_override("hover", style_hover)
	
	var style_pressed = StyleBoxFlat.new()
	style_pressed.bg_color = Color(0.0, 0.7, 1.0, 1)
	style_pressed.corner_radius_top_left = 6
	style_pressed.corner_radius_top_right = 6
	style_pressed.corner_radius_bottom_left = 6
	style_pressed.corner_radius_bottom_right = 6
	btn.add_theme_stylebox_override("pressed", style_pressed)
	
	btn.pressed.connect(func(): on_block_selected(type, btn))
	return btn

func create_color_buttons():
	var container = $ColorPanel/ColorGrid
	if not container:
		return
	
	for color in main.COLOR_PALETTE:
		var btn = Button.new()
		btn.custom_minimum_size = Vector2(24, 24)
		btn.tooltip_text = "#" + color.to_html(false)
		
		var style = StyleBoxFlat.new()
		style.bg_color = color
		style.corner_radius_top_left = 4
		style.corner_radius_top_right = 4
		style.corner_radius_bottom_left = 4
		style.corner_radius_bottom_right = 4
		btn.add_theme_stylebox_override("normal", style)
		
		var style_hover = StyleBoxFlat.new()
		style_hover.bg_color = color.lightened(0.2)
		style_hover.corner_radius_top_left = 4
		style_hover.corner_radius_top_right = 4
		style_hover.corner_radius_bottom_left = 4
		style_hover.corner_radius_bottom_right = 4
		btn.add_theme_stylebox_override("hover", style_hover)
		
		btn.pressed.connect(func(): main.set_color(color))
		container.add_child(btn)

func switch_tab(tab_name: String):
	current_tab = tab_name
	
	# Hide all pages
	for child in $BlockPanel/TabContainer/BlockPages.get_children():
		child.visible = false
	
	# Show selected page - map tab names to page names
	var page_names = {
		"blocks": "PageBlocks",
		"arch": "PageArch", 
		"nature": "PageNature",
		"mat": "PageMat",
		"special": "PageSpecial"
	}
	var page_node = get_node_or_null("BlockPanel/TabContainer/BlockPages/" + page_names.get(tab_name, "PageBlocks"))
	if page_node:
		page_node.visible = true
	
	# Update tab button styles
	var tabs = {
		"blocks": $BlockPanel/TabContainer/Tabs/TabBlocks,
		"arch": $BlockPanel/TabContainer/Tabs/TabArch,
		"nature": $BlockPanel/TabContainer/Tabs/TabNature,
		"mat": $BlockPanel/TabContainer/Tabs/TabMat,
		"special": $BlockPanel/TabContainer/Tabs/TabSpecial
	}
	
	var active_style = StyleBoxFlat.new()
	active_style.bg_color = Color(0.0, 0.7, 1.0, 1)
	active_style.corner_radius_top_left = 8
	active_style.corner_radius_top_right = 8
	
	var inactive_style = StyleBoxFlat.new()
	inactive_style.bg_color = Color(0.15, 0.18, 0.22, 1)
	inactive_style.corner_radius_top_left = 8
	inactive_style.corner_radius_top_right = 8
	
	for name in tabs:
		if tabs[name]:
			tabs[name].add_theme_stylebox_override("normal", active_style if name == tab_name else inactive_style)

func on_block_selected(type: int, btn: Button):
	main.set_block_type(type)
	
	# Highlight selected button
	for tab in block_buttons.values():
		for b in tab:
			b.modulate = Color.WHITE
	btn.modulate = Color(0.5, 1.0, 1.0)

func set_size(size: float, btn: Button):
	main.set_size(size)
	select_size_button(btn)

func select_size_button(btn: Button):
	if current_size_btn and is_instance_valid(current_size_btn):
		var old_style = StyleBoxFlat.new()
		old_style.bg_color = Color(0.2, 0.25, 0.3, 1)
		old_style.corner_radius_top_left = 4
		old_style.corner_radius_top_right = 4
		old_style.corner_radius_bottom_left = 4
		old_style.corner_radius_bottom_right = 4
		current_size_btn.add_theme_stylebox_override("normal", old_style)
	
	current_size_btn = btn
	if btn and is_instance_valid(btn):
		var new_style = StyleBoxFlat.new()
		new_style.bg_color = Color(0.0, 0.7, 1.0, 1)
		new_style.corner_radius_top_left = 4
		new_style.corner_radius_top_right = 4
		new_style.corner_radius_bottom_left = 4
		new_style.corner_radius_bottom_right = 4
		btn.add_theme_stylebox_override("normal", new_style)

func toggle_grid():
	main.toggle_grid()
	update_toggle_button($BottomBar/Controls/ToggleSection/GridBtn, main.show_grid)

func toggle_snap():
	main.toggle_snap()
	update_toggle_button($BottomBar/Controls/ToggleSection/SnapBtn, main.snap_to_grid)

func update_toggle_button(btn: Button, active: bool):
	var style = StyleBoxFlat.new()
	style.bg_color = Color(0.0, 0.7, 1.0, 1) if active else Color(0.2, 0.25, 0.3, 1)
	style.corner_radius_top_left = 4
	style.corner_radius_top_right = 4
	style.corner_radius_bottom_left = 4
	style.corner_radius_bottom_right = 4
	btn.add_theme_stylebox_override("normal", style)

func update_tool_buttons(current_tool):
	var tools = [main.Tool.BUILD, main.Tool.PAINT, main.Tool.ERASE, main.Tool.SELECT]
	var buttons = [
		$TopBar/ToolContainer/BuildBtn,
		$TopBar/ToolContainer/PaintBtn,
		$TopBar/ToolContainer/EraseBtn,
		$TopBar/ToolContainer/SelectBtn
	]
	
	for i in range(tools.size()):
		if buttons[i]:
			buttons[i].modulate = Color(0.4, 0.9, 1.0) if tools[i] == current_tool else Color.WHITE

func on_env_selected(index: int):
	var envs = ["earth", "mars", "moon", "desert", "jungle", "island", "arctic", "volcanic"]
	if index < envs.size():
		main.set_environment(envs[index])

func on_save():
	main.save_build()

func on_load():
	main.load_build()

func on_clear():
	var dialog = ConfirmationDialog.new()
	dialog.title = "Clear All?"
	dialog.dialog_text = "Are you sure you want to delete all blocks?"
	dialog.confirmed.connect(main.clear_all)
	add_child(dialog)
	dialog.popup_centered()

func on_help():
	$HelpPanel.visible = !$HelpPanel.visible

func update_block_count(count: int):
	$TopBar/Stats.text = "Blocks: " + str(count)
