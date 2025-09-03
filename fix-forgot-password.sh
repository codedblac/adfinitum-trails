#!/bin/bash
set -e

FILE="lib/auth.ts"

echo "í´ Checking for duplicate forgotPassword function in $FILE..."

awk '
  BEGIN {found=0}
  /export async function forgotPassword/ {
    if (found==1) {skip=1}
    else {found=1; skip=0}
  }
  /}/ {if (skip==1) {skip=0; next}}
  skip==0 {print}
' "$FILE" > "${FILE}.tmp" && mv "${FILE}.tmp" "$FILE"

echo "âœ… Duplicate forgotPassword function removed from $FILE"
