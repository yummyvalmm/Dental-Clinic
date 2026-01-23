# MCP Integration Guide for Dental Clinic Project

## What is MCP?

**Model Context Protocol (MCP)** is an open protocol that enables AI assistants to securely connect to external data sources and tools. For this project, MCP provides:

- **Direct Firebase Access**: Query and manage Firestore data without manual console navigation
- **Smart Code Navigation**: Find components, analyze dependencies, and search patterns instantly
- **Enhanced Development**: Send test notifications, manage FCM tokens, and debug faster

## Available MCP Servers

### 1. Firebase MCP Server

Provides direct access to your Firebase project for development tasks.

**Available Tools:**

- `firestore_read_collection` - Read all documents from a collection
- `firestore_read_document` - Read a specific document
- `firestore_write_document` - Write or update a document
- `firestore_delete_document` - Delete a document
- `firestore_query` - Query with filters (where clauses)
- `fcm_send_notification` - Send push notification to a specific token
- `fcm_broadcast_notification` - Send notification to all registered tokens

**Available Resources:**

- `firebase://collections` - List all Firestore collections
- `firebase://fcm-tokens` - View all registered FCM device tokens

**Example Use Cases:**

```bash
# Query all FCM tokens
Tool: firestore_read_collection
Args: { "collection": "user_push_tokens", "limit": 100 }

# Send test notification
Tool: fcm_send_notification
Args: {
  "token": "your-fcm-token",
  "title": "Test Notification",
  "body": "This is a test from MCP!"
}

# Broadcast to all users
Tool: fcm_broadcast_notification
Args: {
  "title": "Appointment Reminder",
  "body": "Don't forget your appointment tomorrow!"
}

# Query specific appointments
Tool: firestore_query
Args: {
  "collection": "appointments",
  "field": "status",
  "operator": "==",
  "value": "pending"
}
```

### 2. Filesystem MCP Server

Provides enhanced project navigation and code analysis.

**Available Tools:**

- `find_components` - Find all React components with metadata
- `search_code` - Search for patterns in the codebase
- `analyze_component` - Analyze a component's dependencies and structure
- `list_files` - List files in a directory with filters
- `get_project_structure` - Get project directory tree

**Available Resources:**

- `project://structure` - Complete project directory structure
- `project://components` - All React components in the project

**Example Use Cases:**

```bash
# Find all components
Tool: find_components
Args: {}

# Search for Firebase usage
Tool: search_code
Args: {
  "pattern": "firebase",
  "extensions": [".js", ".jsx"]
}

# Analyze a specific component
Tool: analyze_component
Args: {
  "componentPath": "src/components/ui/NotificationCenter.jsx"
}

# List all pages
Tool: list_files
Args: {
  "directory": "src/pages",
  "extensions": [".jsx"]
}
```

## Setup Instructions

### 1. Configure Your AI Assistant

Add the MCP servers to your AI assistant's configuration. The exact method depends on your tool:

**For Claude Desktop:**

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "firebase-dental": {
      "command": "node",
      "args": ["/Users/macbookair/Documents/Dental/.mcp/servers/firebase-server.js"]
    },
    "filesystem-dental": {
      "command": "node",
      "args": ["/Users/macbookair/Documents/Dental/.mcp/servers/filesystem-server.js"]
    }
  }
}
```

**For Other AI Tools:**

Refer to your tool's MCP configuration documentation and use the server paths:
- Firebase: `/Users/macbookair/Documents/Dental/.mcp/servers/firebase-server.js`
- Filesystem: `/Users/macbookair/Documents/Dental/.mcp/servers/filesystem-server.js`

### 2. Verify Installation

After configuring, restart your AI assistant and verify the servers are connected:

1. Check available tools - you should see all Firebase and filesystem tools listed
2. Check available resources - you should see `firebase://` and `project://` resources
3. Test a simple query like reading the FCM tokens collection

## Common Workflows

### Debugging Push Notifications

```bash
# 1. Check all registered tokens
Resource: firebase://fcm-tokens

# 2. Send test notification to a specific token
Tool: fcm_send_notification
Args: { "token": "...", "title": "Test", "body": "Testing!" }

# 3. Broadcast to all users
Tool: fcm_broadcast_notification
Args: { "title": "Announcement", "body": "New feature available!" }
```

### Finding and Analyzing Components

```bash
# 1. Find all components
Tool: find_components

# 2. Analyze a specific component
Tool: analyze_component
Args: { "componentPath": "src/components/features/BookingWizard.jsx" }

# 3. Search for hook usage
Tool: search_code
Args: { "pattern": "useState" }
```

### Managing Firestore Data

```bash
# 1. List all collections
Resource: firebase://collections

# 2. Read appointments
Tool: firestore_read_collection
Args: { "collection": "appointments" }

# 3. Query pending appointments
Tool: firestore_query
Args: {
  "collection": "appointments",
  "field": "status",
  "operator": "==",
  "value": "pending"
}

# 4. Update an appointment
Tool: firestore_write_document
Args: {
  "collection": "appointments",
  "documentId": "appt123",
  "data": { "status": "confirmed" }
}
```

## Benefits for Development

### Before MCP:
- Open Firebase Console → Navigate to Firestore → Find collection → View data
- Search through files manually to find components
- Write custom scripts to test notifications
- Switch between multiple tools and windows

### With MCP:
- Query Firestore directly from your AI assistant
- Ask "Find all components that use Firebase"
- Send test notifications with a simple command
- All context available in one place

## Troubleshooting

### Server Won't Start

**Error:** `Cannot find module '@modelcontextprotocol/sdk'`

**Solution:**
```bash
cd /Users/macbookair/Documents/Dental
npm install
```

### Firebase Authentication Error

**Error:** `Error initializing Firebase Admin`

**Solution:** Verify `service-account.json` exists and has correct permissions:
```bash
ls -la /Users/macbookair/Documents/Dental/service-account.json
```

### No Tools Showing Up

**Solution:**
1. Restart your AI assistant completely
2. Verify the server paths in your MCP configuration are absolute paths
3. Check server logs in `.mcp/logs/` for errors

## Security Notes

- MCP servers run locally on your machine
- Firebase credentials are read from `service-account.json` (never committed to git)
- All operations use Firebase Admin SDK with full project access
- Only use MCP servers in development, never in production

## Next Steps

1. Configure your AI assistant with the MCP servers
2. Test the connection by listing FCM tokens
3. Try sending a test notification
4. Explore component analysis tools
5. Integrate MCP into your daily development workflow

For more information about MCP, visit: https://modelcontextprotocol.io
