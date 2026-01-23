#!/usr/bin/env node

/**
 * Firebase MCP Server
 * 
 * Provides MCP tools for Firebase operations including:
 * - Firestore CRUD operations
 * - FCM token management
 * - Push notification testing
 * - Authentication management
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    ListResourcesRequestSchema,
    ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Firebase Admin
const serviceAccountPath = join(__dirname, '../../service-account.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const messaging = admin.messaging();

// Create MCP server
const server = new Server(
    {
        name: 'firebase-dental-server',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
            resources: {},
        },
    }
);

// Tool: Read Firestore Collection
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'firestore_read_collection',
                description: 'Read all documents from a Firestore collection',
                inputSchema: {
                    type: 'object',
                    properties: {
                        collection: {
                            type: 'string',
                            description: 'Collection name (e.g., "user_push_tokens", "appointments")',
                        },
                        limit: {
                            type: 'number',
                            description: 'Maximum number of documents to return (default: 100)',
                        },
                    },
                    required: ['collection'],
                },
            },
            {
                name: 'firestore_read_document',
                description: 'Read a specific document from Firestore',
                inputSchema: {
                    type: 'object',
                    properties: {
                        collection: {
                            type: 'string',
                            description: 'Collection name',
                        },
                        documentId: {
                            type: 'string',
                            description: 'Document ID',
                        },
                    },
                    required: ['collection', 'documentId'],
                },
            },
            {
                name: 'firestore_write_document',
                description: 'Write or update a document in Firestore',
                inputSchema: {
                    type: 'object',
                    properties: {
                        collection: {
                            type: 'string',
                            description: 'Collection name',
                        },
                        documentId: {
                            type: 'string',
                            description: 'Document ID',
                        },
                        data: {
                            type: 'object',
                            description: 'Document data as JSON object',
                        },
                        merge: {
                            type: 'boolean',
                            description: 'Merge with existing document (default: true)',
                        },
                    },
                    required: ['collection', 'documentId', 'data'],
                },
            },
            {
                name: 'firestore_delete_document',
                description: 'Delete a document from Firestore',
                inputSchema: {
                    type: 'object',
                    properties: {
                        collection: {
                            type: 'string',
                            description: 'Collection name',
                        },
                        documentId: {
                            type: 'string',
                            description: 'Document ID',
                        },
                    },
                    required: ['collection', 'documentId'],
                },
            },
            {
                name: 'fcm_send_notification',
                description: 'Send a push notification via Firebase Cloud Messaging',
                inputSchema: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string',
                            description: 'FCM device token',
                        },
                        title: {
                            type: 'string',
                            description: 'Notification title',
                        },
                        body: {
                            type: 'string',
                            description: 'Notification body text',
                        },
                        data: {
                            type: 'object',
                            description: 'Additional data payload (optional)',
                        },
                    },
                    required: ['token', 'title', 'body'],
                },
            },
            {
                name: 'fcm_broadcast_notification',
                description: 'Send notification to all registered FCM tokens',
                inputSchema: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Notification title',
                        },
                        body: {
                            type: 'string',
                            description: 'Notification body text',
                        },
                        data: {
                            type: 'object',
                            description: 'Additional data payload (optional)',
                        },
                    },
                    required: ['title', 'body'],
                },
            },
            {
                name: 'firestore_query',
                description: 'Query Firestore with filters',
                inputSchema: {
                    type: 'object',
                    properties: {
                        collection: {
                            type: 'string',
                            description: 'Collection name',
                        },
                        field: {
                            type: 'string',
                            description: 'Field to filter on',
                        },
                        operator: {
                            type: 'string',
                            description: 'Comparison operator (==, !=, <, <=, >, >=, in, array-contains)',
                        },
                        value: {
                            description: 'Value to compare against',
                        },
                        limit: {
                            type: 'number',
                            description: 'Maximum number of results',
                        },
                    },
                    required: ['collection', 'field', 'operator', 'value'],
                },
            },
        ],
    };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        switch (name) {
            case 'firestore_read_collection': {
                const { collection, limit = 100 } = args;
                const snapshot = await db.collection(collection).limit(limit).get();
                const documents = [];
                snapshot.forEach((doc) => {
                    documents.push({ id: doc.id, ...doc.data() });
                });
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({ collection, count: documents.length, documents }, null, 2),
                        },
                    ],
                };
            }

            case 'firestore_read_document': {
                const { collection, documentId } = args;
                const doc = await db.collection(collection).doc(documentId).get();
                if (!doc.exists) {
                    return {
                        content: [{ type: 'text', text: `Document ${documentId} not found in ${collection}` }],
                        isError: true,
                    };
                }
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({ id: doc.id, ...doc.data() }, null, 2),
                        },
                    ],
                };
            }

            case 'firestore_write_document': {
                const { collection, documentId, data, merge = true } = args;
                await db.collection(collection).doc(documentId).set(data, { merge });
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Successfully wrote document ${documentId} to ${collection}`,
                        },
                    ],
                };
            }

            case 'firestore_delete_document': {
                const { collection, documentId } = args;
                await db.collection(collection).doc(documentId).delete();
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Successfully deleted document ${documentId} from ${collection}`,
                        },
                    ],
                };
            }

            case 'fcm_send_notification': {
                const { token, title, body, data = {} } = args;
                const message = {
                    notification: { title, body },
                    data,
                    token,
                };
                const response = await messaging.send(message);
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({ success: true, messageId: response }, null, 2),
                        },
                    ],
                };
            }

            case 'fcm_broadcast_notification': {
                const { title, body, data = {} } = args;
                const tokensSnapshot = await db.collection('user_push_tokens').get();
                const tokens = [];
                tokensSnapshot.forEach((doc) => {
                    tokens.push(doc.data().token);
                });

                if (tokens.length === 0) {
                    return {
                        content: [{ type: 'text', text: 'No FCM tokens found in database' }],
                    };
                }

                const message = {
                    notification: { title, body },
                    data,
                };

                const results = await Promise.allSettled(
                    tokens.map((token) => messaging.send({ ...message, token }))
                );

                const successful = results.filter((r) => r.status === 'fulfilled').length;
                const failed = results.filter((r) => r.status === 'rejected').length;

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(
                                {
                                    totalTokens: tokens.length,
                                    successful,
                                    failed,
                                    results: results.map((r, i) => ({
                                        token: tokens[i].substring(0, 20) + '...',
                                        status: r.status,
                                        messageId: r.status === 'fulfilled' ? r.value : undefined,
                                        error: r.status === 'rejected' ? r.reason.message : undefined,
                                    })),
                                },
                                null,
                                2
                            ),
                        },
                    ],
                };
            }

            case 'firestore_query': {
                const { collection, field, operator, value, limit = 100 } = args;
                const snapshot = await db
                    .collection(collection)
                    .where(field, operator, value)
                    .limit(limit)
                    .get();
                const documents = [];
                snapshot.forEach((doc) => {
                    documents.push({ id: doc.id, ...doc.data() });
                });
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(
                                { collection, query: { field, operator, value }, count: documents.length, documents },
                                null,
                                2
                            ),
                        },
                    ],
                };
            }

            default:
                return {
                    content: [{ type: 'text', text: `Unknown tool: ${name}` }],
                    isError: true,
                };
        }
    } catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: `Error executing ${name}: ${error.message}\n${error.stack}`,
                },
            ],
            isError: true,
        };
    }
});

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
        resources: [
            {
                uri: 'firebase://collections',
                name: 'Firestore Collections',
                description: 'List of all Firestore collections in the project',
                mimeType: 'application/json',
            },
            {
                uri: 'firebase://fcm-tokens',
                name: 'FCM Tokens',
                description: 'All registered FCM device tokens',
                mimeType: 'application/json',
            },
        ],
    };
});

// Read resources
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;

    try {
        if (uri === 'firebase://collections') {
            const collections = await db.listCollections();
            const collectionNames = collections.map((col) => col.id);
            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify({ collections: collectionNames }, null, 2),
                    },
                ],
            };
        }

        if (uri === 'firebase://fcm-tokens') {
            const snapshot = await db.collection('user_push_tokens').get();
            const tokens = [];
            snapshot.forEach((doc) => {
                tokens.push(doc.data());
            });
            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify({ count: tokens.length, tokens }, null, 2),
                    },
                ],
            };
        }

        return {
            contents: [
                {
                    uri,
                    mimeType: 'text/plain',
                    text: `Unknown resource: ${uri}`,
                },
            ],
        };
    } catch (error) {
        return {
            contents: [
                {
                    uri,
                    mimeType: 'text/plain',
                    text: `Error reading resource: ${error.message}`,
                },
            ],
        };
    }
});

// Start server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Firebase MCP Server running on stdio');
}

main().catch((error) => {
    console.error('Server error:', error);
    process.exit(1);
});
