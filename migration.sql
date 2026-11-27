CREATE TABLE IF NOT EXISTS users (user_id TEXT PRIMARY KEY, username TEXT, first_name TEXT, lang TEXT DEFAULT 'en', can_dm INTEGER DEFAULT 0, first_seen INTEGER, last_seen INTEGER);
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_by TEXT, updated_at INTEGER);
CREATE TABLE IF NOT EXISTS audit_log (id INTEGER PRIMARY KEY AUTOINCREMENT, admin_id TEXT NOT NULL, admin_username TEXT, action TEXT NOT NULL, target_type TEXT, target_id TEXT, details TEXT, created_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_items_created ON items(created_at);
ALTER TABLE items ADD COLUMN approved_at INTEGER;
ALTER TABLE banned ADD COLUMN reason TEXT;
ALTER TABLE banned ADD COLUMN banned_at INTEGER;
ALTER TABLE banned ADD COLUMN banned_by TEXT;
