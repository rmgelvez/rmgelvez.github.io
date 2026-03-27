---
title: Getting Started with Angular Signals
slug: angular-signals-intro
date: 2024-03-20
excerpt: Explore the power of Angular signals for reactive state management in your applications.
---

# Getting Started with Angular Signals

Angular signals represent a new paradigm in reactive programming. They offer fine-grained reactivity with better performance characteristics compared to traditional observables in many scenarios.

## What are Signals?

Signals are reactive primitives that hold a value and notify listeners when that value changes. They provide synchronous access to state and automatic change propagation.

## Key Features

- **Synchronous**: Access and update values synchronously
- **Fine-grained reactivity**: Only dependent computations re-run
- **Better performance**: Reduced change detection cycles
- **Developer experience**: Intuitive API that's easy to reason about

## Usage Example

```typescript
import { signal, computed } from '@angular/core';

const count = signal(0);
const doubled = computed(() => count() * 2);

console.log(count());      // 0
console.log(doubled());    // 0

count.set(5);
console.log(count());      // 5
console.log(doubled());    // 10
```

## When to Use Signals

Use signals for local component state, derived state, and managing reactive data flows. They're particularly useful when you need frequent updates or complex state interdependencies.

Learn more in the [Angular documentation](https://angular.io/guide/signals).
