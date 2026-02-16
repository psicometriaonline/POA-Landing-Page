#!/bin/bash
set -e
shopt -s nullglob

INPUT_DIR="${1:-attached_assets}"
OUTPUT_DIR="${INPUT_DIR}/optimized"

if ! command -v cwebp &> /dev/null; then
  echo "Error: cwebp not found. Install with: nix-env -iA nixpkgs.libwebp"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

count=0
for img in "$INPUT_DIR"/*.png "$INPUT_DIR"/*.jpg "$INPUT_DIR"/*.jpeg "$INPUT_DIR"/*.PNG "$INPUT_DIR"/*.JPG "$INPUT_DIR"/*.JPEG; do
  [ -f "$img" ] || continue

  filename=$(basename "$img")
  name="${filename%.*}"
  output="$OUTPUT_DIR/${name}.webp"

  if [ -f "$output" ]; then
    echo "Skip (exists): $output"
    continue
  fi

  echo "Converting: $filename -> ${name}.webp"
  cwebp -q 75 -resize 800 0 "$img" -o "$output" 2>/dev/null
  count=$((count + 1))
done

if [ $count -eq 0 ]; then
  echo "No new images to convert."
else
  echo "Done! Converted $count images to WebP in $OUTPUT_DIR"
fi

echo ""
echo "Original sizes:"
du -sh "$INPUT_DIR"/*.png "$INPUT_DIR"/*.jpg "$INPUT_DIR"/*.jpeg "$INPUT_DIR"/*.PNG "$INPUT_DIR"/*.JPG "$INPUT_DIR"/*.JPEG 2>/dev/null | head -20 || echo "  (none)"
echo ""
echo "Optimized sizes:"
du -sh "$OUTPUT_DIR"/*.webp 2>/dev/null | head -20 || echo "  (none)"
