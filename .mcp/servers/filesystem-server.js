#!/usr/bin/env node

/**
 * Filesystem MCP Server
 * 
 * Provides MCP tools for enhanced project navigation:
 * - Component search and analysis
 * - Dependency tracking
 * - Code pattern search
 * - Project structure insights
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    ListResourcesRequestSchema,
    ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '../..');

// Create MCP server
const server = new Server(
    {
        name: 'filesystem-dental-server',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
            resources: {},
        },
    }
);

// Helper: Recursively find files
function findFiles(dir, extensions = [], maxDepth = 10, currentDepth = 0) {
    if (currentDepth > maxDepth) return [];

    const files = [];
    const items = readdirSync(dir);

    for (const item of items) {
        const fullPath = join(dir, item);

        // Skip node_modules, .git, dist, etc.
        if (item === 'node_modules' || item === '.git' || item === 'dist' || item.startsWith('.')) {
            continue;
        }

        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
            files.push(...findFiles(fullPath, extensions, maxDepth, currentDepth + 1));
        } else if (stat.isFile()) {
            const ext = extname(item);
            if (extensions.length === 0 || extensions.includes(ext)) {
                files.push(fullPath);
            }
        }
    }

    return files;
}

// Helper: Find React components
function findComponents() {
    const componentFiles = findFiles(join(PROJECT_ROOT, 'src'), ['.jsx', '.js']);
    const components = [];

    for (const file of componentFiles) {
        const content = readFileSync(file, 'utf8');
        const relativePath = relative(PROJECT_ROOT, file);

        // Check if it's a React component
        if (content.includes('export default') || content.includes('export const') || content.includes('export function')) {
            const isComponent = content.includes('return (') && (content.includes('React') || content.includes('jsx') || content.includes('<'));

            if (isComponent) {
                // Extract component name
                const defaultMatch = content.match(/export default (?:function\s+)?(\w+)/);
                const namedMatch = content.match(/export (?:const|function)\s+(\w+)/);
                const name = defaultMatch?.[1] || namedMatch?.[1] || 'Unknown';

                // Extract imports
                const imports = [];
                const importRegex = /import\s+.*?\s+from\s+['"](.+?)['"]/g;
                let match;
                while ((match = importRegex.exec(content)) !== null) {
                    imports.push(match[1]);
                }

                components.push({
                    name,
                    path: relativePath,
                    fullPath: file,
                    imports,
                    lines: content.split('\n').length,
                });
            }
        }
    }

    return components;
}

// Helper: Search code patterns
function searchPattern(pattern, extensions = ['.js', '.jsx']) {
    const files = findFiles(join(PROJECT_ROOT, 'src'), extensions);
    const results = [];

    for (const file of files) {
        const content = readFileSync(file, 'utf8');
        const lines = content.split('\n');
        const relativePath = relative(PROJECT_ROOT, file);

        lines.forEach((line, index) => {
            if (line.includes(pattern)) {
                results.push({
                    file: relativePath,
                    line: index + 1,
                    content: line.trim(),
                });
            }
        });
    }

    return results;
}

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'find_components',
                description: 'Find all React components in the project with metadata',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
            {
                name: 'search_code',
                description: 'Search for a pattern in the codebase',
                inputSchema: {
                    type: 'object',
                    properties: {
                        pattern: {
                            type: 'string',
                            description: 'Text pattern to search for',
                        },
                        extensions: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'File extensions to search (default: [".js", ".jsx"])',
                        },
                    },
                    required: ['pattern'],
                },
            },
            {
                name: 'analyze_component',
                description: 'Analyze a specific component file for dependencies and structure',
                inputSchema: {
                    type: 'object',
                    properties: {
                        componentPath: {
                            type: 'string',
                            description: 'Relative path to component file (e.g., "src/components/ui/Button.jsx")',
                        },
                    },
                    required: ['componentPath'],
                },
            },
            {
                name: 'list_files',
                description: 'List all files in a directory with optional extension filter',
                inputSchema: {
                    type: 'object',
                    properties: {
                        directory: {
                            type: 'string',
                            description: 'Directory path relative to project root (e.g., "src/components")',
                        },
                        extensions: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'File extensions to filter (e.g., [".jsx", ".js"])',
                        },
                    },
                    required: ['directory'],
                },
            },
            {
                name: 'get_project_structure',
                description: 'Get an overview of the project directory structure',
                inputSchema: {
                    type: 'object',
                    properties: {
                        maxDepth: {
                            type: 'number',
                            description: 'Maximum depth to traverse (default: 3)',
                        },
                    },
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
            case 'find_components': {
                const components = findComponents();
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({ count: components.length, components }, null, 2),
                        },
                    ],
                };
            }

            case 'search_code': {
                const { pattern, extensions = ['.js', '.jsx'] } = args;
                const results = searchPattern(pattern, extensions);
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({ pattern, matchCount: results.length, results }, null, 2),
                        },
                    ],
                };
            }

            case 'analyze_component': {
                const { componentPath } = args;
                const fullPath = join(PROJECT_ROOT, componentPath);
                const content = readFileSync(fullPath, 'utf8');

                // Extract imports
                const imports = [];
                const importRegex = /import\s+.*?\s+from\s+['"](.+?)['"]/g;
                let match;
                while ((match = importRegex.exec(content)) !== null) {
                    imports.push(match[1]);
                }

                // Extract exports
                const exports = [];
                const exportRegex = /export\s+(?:default\s+)?(?:const|function|class)?\s*(\w+)/g;
                while ((match = exportRegex.exec(content)) !== null) {
                    exports.push(match[1]);
                }

                // Count hooks usage
                const hooks = {
                    useState: (content.match(/useState/g) || []).length,
                    useEffect: (content.match(/useEffect/g) || []).length,
                    useContext: (content.match(/useContext/g) || []).length,
                    useCallback: (content.match(/useCallback/g) || []).length,
                    useMemo: (content.match(/useMemo/g) || []).length,
                    custom: (content.match(/use[A-Z]\w+/g) || []).filter(h => !['useState', 'useEffect', 'useContext', 'useCallback', 'useMemo'].includes(h)),
                };

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                path: componentPath,
                                lines: content.split('\n').length,
                                imports,
                                exports,
                                hooks,
                            }, null, 2),
                        },
                    ],
                };
            }

            case 'list_files': {
                const { directory, extensions = [] } = args;
                const fullPath = join(PROJECT_ROOT, directory);
                const files = findFiles(fullPath, extensions, 5);
                const relativeFiles = files.map(f => relative(PROJECT_ROOT, f));

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({ directory, count: relativeFiles.length, files: relativeFiles }, null, 2),
                        },
                    ],
                };
            }

            case 'get_project_structure': {
                const { maxDepth = 3 } = args;

                function buildTree(dir, depth = 0) {
                    if (depth > maxDepth) return null;

                    const items = readdirSync(dir);
                    const tree = {};

                    for (const item of items) {
                        if (item === 'node_modules' || item === '.git' || item === 'dist') continue;

                        const fullPath = join(dir, item);
                        const stat = statSync(fullPath);

                        if (stat.isDirectory()) {
                            const subtree = buildTree(fullPath, depth + 1);
                            if (subtree) tree[item] = subtree;
                        } else {
                            tree[item] = 'file';
                        }
                    }

                    return tree;
                }

                const structure = buildTree(PROJECT_ROOT);

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({ projectRoot: PROJECT_ROOT, structure }, null, 2),
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

// List resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
        resources: [
            {
                uri: 'project://structure',
                name: 'Project Structure',
                description: 'Complete project directory structure',
                mimeType: 'application/json',
            },
            {
                uri: 'project://components',
                name: 'React Components',
                description: 'All React components in the project',
                mimeType: 'application/json',
            },
        ],
    };
});

// Read resources
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;

    try {
        if (uri === 'project://structure') {
            function buildTree(dir, depth = 0) {
                if (depth > 3) return null;

                const items = readdirSync(dir);
                const tree = {};

                for (const item of items) {
                    if (item === 'node_modules' || item === '.git' || item === 'dist') continue;

                    const fullPath = join(dir, item);
                    const stat = statSync(fullPath);

                    if (stat.isDirectory()) {
                        const subtree = buildTree(fullPath, depth + 1);
                        if (subtree) tree[item] = subtree;
                    } else {
                        tree[item] = 'file';
                    }
                }

                return tree;
            }

            const structure = buildTree(PROJECT_ROOT);

            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify({ projectRoot: PROJECT_ROOT, structure }, null, 2),
                    },
                ],
            };
        }

        if (uri === 'project://components') {
            const components = findComponents();
            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify({ count: components.length, components }, null, 2),
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
    console.error('Filesystem MCP Server running on stdio');
}

main().catch((error) => {
    console.error('Server error:', error);
    process.exit(1);
});
