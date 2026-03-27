---
title: Angular State Management Library
slug: angular-state-lib
date: 2024-02-28
excerpt: A lightweight, signal-based state management library designed for Angular applications with minimal boilerplate.
---

# Angular State Management Library

A minimal, efficient state management solution leveraging Angular signals for fine-grained reactivity.

## Overview

This library provides a simple yet powerful API for managing application state with signals, reducing boilerplate while maintaining excellent TypeScript support.

## Key Features

### Simple API

```typescript
// Create store
const store = createStore({
  count: 0,
  todos: []
});

// Use in components
store.count$; // Observable
store.count(); // Signal value
```

### Derived State

Automatically computed derived values with dependency tracking.

### Performance Optimized

Signals enable fine-grained reactivity, updating only what's necessary.

## Installation

```bash
npm install @myorg/signal-store
```

## Usage

```typescript
const userStore = createStore({
  user: null,
  loading: false,
  error: null
});

// Update state
userStore.setUser(user);

// Subscribe to changes
userStore.user$.subscribe(user => {
  console.log('User updated:', user);
});
```

## Status

Currently used in production on several Angular applications with hundreds of monthly users.

[View on GitHub](https://github.com)
