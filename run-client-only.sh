#!/bin/bash

# This script runs only the front-end part of the application
echo "Starting client-only application..."
cd "$(dirname "$0")"

# Use the alternative Vite config for client-only mode
npx vite --config client-vite.config.js