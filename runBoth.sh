#!/bin/bash
# Script file to run both programs

echo "Running First Program"

node reformat.js

echo "Finished"

echo "Now Running second program"

node data-analysis.js

echo "Finished"
