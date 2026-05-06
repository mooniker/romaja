# Recommendations for Cross-Ecosystem Compatibility

The `romaja` library is already in good shape for cross-ecosystem use (zero runtime deps, ESM + UMD bundle). These changes will maximize compatibility across Node.js, browsers, TypeScript, and bundlers.

## 1. Add `types` field to exports (critical for TypeScript users)

The `exports` map is missing type declarations. TypeScript and bundlers use this field to resolve types:

```json
"exports": {
  ".": {
    "types": "./src/index.d.ts",
    "import": "./src/index.js",
    "require": "./dist/romaja.cjs"
  }
}
```

## 2. Build a proper ESM bundle for `dist/`

Currently `import` points directly to `src/`, which means consumers get unbuilt source. Point to a built ESM file instead:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/romaja.js",
    "require": "./dist/romaja.cjs"
  }
}
```

Then configure webpack (or add a second build step) to produce both ESM and CJS outputs in `dist/`.

## 3. Add `browser` field (for bundlers)

Helps bundlers like webpack and browserify resolve the correct entry point for browser builds:

```json
"browser": "./dist/romaja.cjs"
```

## 4. Consider an IIFE bundle for direct `<script>` tag usage

The UMD bundle already supports this via `globalObject: 'this'`, but a separate `dist/romaja.iife.js` with a more explicit browser entry point could be useful for users who want to drop a single script tag into an HTML file without any module system.

## 5. Add `sideEffects: false`

Enables tree-shaking in bundlers like webpack and Rollup:

```json
"sideEffects": false
```

## 6. Publish type declarations properly

- If `index.d.ts` stays in `src/`, ensure it is included in `files` or `publishConfig`
- Better: copy it to `dist/` during build so consumers have a stable, predictable path

## 7. Consider dropping the `module` field

The `module` field is a legacy non-standard convention. The `exports` field is the modern standard and `module` is redundant with it. Keeping both can cause resolution inconsistencies in some tooling.
