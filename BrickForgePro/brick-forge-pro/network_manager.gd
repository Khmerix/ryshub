extends Node

# WebSocket client
var socket = WebSocketPeer.new()
var connected = false
var user_id = ""
var user_name = ""
var user_role = "student"
var current_room = ""

# Signals
signal connection_established
signal connection_closed
signal connection_error
signal room_joined(room_data)
signal room_left
signal block_placed(block_data)
signal block_deleted(block_id)
signal user_joined(user_data)
signal user_left(user_id)
signal chat_message(message)
signal cursor_update(user_id, position)

func _ready():
	set_process(false)

func connect_to_server(url: String = "ws://localhost:5000"):
	var err = socket.connect_to_url(url)
	if err != OK:
		emit_signal("connection_error")
		return false
	
	set_process(true)
	return true

func _process(delta):
	socket.poll()
	
	var state = socket.get_ready_state()
	
	match state:
		WebSocketPeer.STATE_OPEN:
			if not connected:
				connected = true
				emit_signal("connection_established")
			
			# Process incoming messages
			while socket.get_available_packet_count() > 0:
				var packet = socket.get_packet()
				var message = JSON.parse_string(packet.get_string_from_utf8())
				if message:
					_handle_message(message)
		
		WebSocketPeer.STATE_CLOSED:
			if connected:
				connected = false
				emit_signal("connection_closed")
			set_process(false)

func _handle_message(msg):
	match msg.type:
		"joined":
			user_id = msg.userId
		
		"roomJoined":
			current_room = msg.roomId
			emit_signal("room_joined", msg)
		
		"userJoined":
			emit_signal("user_joined", msg.user)
		
		"userLeft":
			emit_signal("user_left", msg.userId)
		
		"blockPlaced":
			emit_signal("block_placed", msg.block)
		
		"blockDeleted":
			emit_signal("block_deleted", msg.blockId)
		
		"chatMessage":
			emit_signal("chat_message", msg.message)
		
		"cursorUpdate":
			emit_signal("cursor_update", msg.userId, msg.position)
		
		"error":
			print("Server error: " + msg.message)

func send_message(data: Dictionary):
	if connected:
		socket.send_text(JSON.stringify(data))

func join(name: String, role: String):
	user_name = name
	user_role = role
	send_message({
		"type": "join",
		"name": name,
		"role": role
	})

func create_room(room_name: String, assignment: Dictionary = {}):
	send_message({
		"type": "createRoom",
		"roomName": room_name,
		"assignment": assignment
	})

func join_room(room_id: String):
	send_message({
		"type": "joinRoom",
		"roomId": room_id
	})

func leave_room():
	send_message({
		"type": "leaveRoom"
	})
	current_room = ""
	emit_signal("room_left")

func send_block_place(block_data: Dictionary):
	send_message({
		"type": "blockPlace",
		"block": block_data
	})

func send_block_delete(block_id: String):
	send_message({
		"type": "blockDelete",
		"blockId": block_id
	})

func send_chat(message: String):
	send_message({
		"type": "chat",
		"content": message
	})

func send_cursor_position(position: Vector3):
	send_message({
		"type": "cursorMove",
		"position": {
			"x": position.x,
			"y": position.y,
			"z": position.z
		}
	})

func disconnect_from_server():
	if connected:
		socket.close()
		connected = false
	set_process(false)
