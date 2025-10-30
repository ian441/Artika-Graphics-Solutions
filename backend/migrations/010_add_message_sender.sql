-- Add sender_id and message_type to messages table for admin-client communication
ALTER TABLE messages ADD COLUMN sender_id INTEGER REFERENCES users(id);
ALTER TABLE messages ADD COLUMN message_type VARCHAR(20) DEFAULT 'user_to_admin' CHECK (message_type IN ('admin_to_user', 'user_to_admin'));

-- Update existing messages to have message_type as 'user_to_admin'
UPDATE messages SET message_type = 'user_to_admin' WHERE message_type IS NULL;

-- Make message_type NOT NULL after setting defaults
ALTER TABLE messages ALTER COLUMN message_type SET NOT NULL;

-- Add index for better query performance
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_type ON messages(message_type);
CREATE INDEX idx_messages_user_type ON messages(user_id, message_type);
