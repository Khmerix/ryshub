extends Camera3D

# Camera control state
var is_dragging = false
var is_panning = false
var last_mouse_pos = Vector2()

# Spherical coordinates for orbit
var distance = 30.0
var theta = 0.785398  # PI/4 - horizontal angle
var phi = 0.785398    # PI/4 - vertical angle

# Target point to look at
var target = Vector3.ZERO

# Camera limits
var min_distance = 5.0
var max_distance = 100.0
var min_phi = 0.1
var max_phi = PI / 2 - 0.1

# Auto-rotate
var auto_rotate = false
var auto_rotate_speed = 0.001

func _ready():
	update_position()

func _input(event):
	if event is InputEventMouseButton:
		match event.button_index:
			MOUSE_BUTTON_MIDDLE:
				if event.pressed:
					is_dragging = true
					last_mouse_pos = event.position
				else:
					is_dragging = false
			
			MOUSE_BUTTON_RIGHT:
				if event.pressed:
					is_panning = true
					last_mouse_pos = event.position
				else:
					is_panning = false
			
			MOUSE_BUTTON_WHEEL_UP:
				distance = max(min_distance, distance - 2.0)
				update_position()
			
			MOUSE_BUTTON_WHEEL_DOWN:
				distance = min(max_distance, distance + 2.0)
				update_position()
	
	elif event is InputEventMouseMotion:
		if is_dragging:
			var delta = event.position - last_mouse_pos
			theta -= delta.x * 0.01
			phi -= delta.y * 0.01
			phi = clamp(phi, min_phi, max_phi)
			last_mouse_pos = event.position
			update_position()
		
		elif is_panning:
			var delta = event.position - last_mouse_pos
			var right = transform.basis.x
			var up = transform.basis.y
			target -= right * delta.x * 0.05 * (distance / 30.0)
			target -= up * delta.y * 0.05 * (distance / 30.0)
			last_mouse_pos = event.position
			update_position()
	
	elif event is InputEventKey:
		if event.pressed and event.keycode == KEY_A:
			auto_rotate = !auto_rotate

func _process(delta):
	if auto_rotate:
		theta += auto_rotate_speed
		update_position()

func update_position():
	# Calculate position using spherical coordinates
	position.x = target.x + distance * sin(phi) * cos(theta)
	position.y = target.y + distance * cos(phi)
	position.z = target.z + distance * sin(phi) * sin(theta)
	look_at(target)

func reset():
	target = Vector3.ZERO
	distance = 30.0
	theta = 0.785398
	phi = 0.785398
	update_position()

func focus_on(point: Vector3):
	target = point
	update_position()

func set_distance(dist: float):
	distance = clamp(dist, min_distance, max_distance)
	update_position()
