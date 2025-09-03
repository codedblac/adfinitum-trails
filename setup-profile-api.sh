#!/bin/bash
set -e

# Paths (adjust if your project structure is different)
AUTH_FILE="lib/auth.ts"

# Ensure the lib directory exists
mkdir -p lib

# If lib/auth.ts doesn't exist, create a minimal one
if [ ! -f "$AUTH_FILE" ]; then
  echo "Creating $AUTH_FILE ..."
  cat <<'EOT' > "$AUTH_FILE"
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function updateProfile(data: any) {
  const token = localStorage.getItem("access")
  const res = await fetch(\`\${API_URL}/accounts/me/\`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${token}\`,
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.detail || "Failed to update profile")
  }

  return res.json()
}
EOT
else
  # If updateProfile not defined, append it
  if ! grep -q "export async function updateProfile" "$AUTH_FILE"; then
    echo "Patching $AUTH_FILE with updateProfile ..."
    cat <<'EOT' >> "$AUTH_FILE"

export async function updateProfile(data: any) {
  const token = localStorage.getItem("access")
  const res = await fetch(\`\${API_URL}/accounts/me/\`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${token}\`,
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.detail || "Failed to update profile")
  }

  return res.json()
}
EOT
  else
    echo "updateProfile() already exists in $AUTH_FILE. Skipping patch."
  fi
fi

echo "✅ setup-profile-api.sh completed successfully!"
