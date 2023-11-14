# Matrix Class in TypeScript

## Overview

This TypeScript class, `Matrix`, provides functionality for working with matrices. Matrices are mathematical structures commonly used in linear algebra. This class includes methods for matrix creation, manipulation, and various matrix operations.

## Class Methods

### 1. **create**

```typescript
Matrix.create(height: number, width: number, formula: (i: number, j: number) => number): Matrix
```

Creates a matrix with the specified dimensions using a custom formula.

### 2. fromObject

```typescript
Matrix.fromObject(obj: any): Matrix
```

Creates a matrix from an object. The object must have a `data` property that is a two-dimensional array of numbers.

### 3. fromArray

```typescript
Matrix.fromArray(arr: number[][]): Matrix
```

Creates a matrix from a two-dimensional array of numbers.

### 4. squared

```typescript
Matrix.squared(size: number, formula: (i: number, j: number) => number): Matrix
```

Creates a square matrix with the specified size using a custom formula.

### 5. identity

```typescript
Matrix.identity(size: number): Matrix
```

Creates an identity matrix with the specified size.

### 6. zeros

```typescript
Matrix.zeros(height: number, width: number): Matrix
```

Creates a matrix with the specified dimensions filled with zeros.

### 7. triangle

```typescript
Matrix.triangle(size: number, upper: boolean = false): Matrix
```

Creates a triangular matrix with the specified size. If `upper` is `true`, the matrix will be upper triangular. Otherwise, it will be lower triangular.

### 8. get height

```typescript
Matrix.height: number
```

Returns the height of the matrix.

### 9. get width

```typescript
Matrix.width: number
```

Returns the width of the matrix.

### 10. get

```typescript
Matrix.get(i: number, j: number): number
```

Returns the value at the specified row and column.

### 11. set

```typescript
Matrix.set(i: number, j: number, value: number): void
```

Sets the value at the specified row and column.

## 12. isSquared

```typescript
Matrix.isSquared(): boolean
```

Returns `true` if the matrix is square, `false` otherwise.

### 13. isIdentity

```typescript
Matrix.isIdentity(): boolean
```

Returns `true` if the matrix is an identity matrix, `false` otherwise.

### 14. isZero

```typescript
Matrix.isZero(): boolean
```

Returns `true` if the matrix is a zero matrix, `false` otherwise.

### 15. isTriangular

```typescript
Matrix.isTriangular(upper: boolean = false): boolean
```

Returns `true` if the matrix is triangular. If `upper` is `true`, the matrix will be checked for upper triangularity. Otherwise, it will be checked for lower triangularity.

### 16. isInvertible

```typescript
Matrix.isInvertible(): boolean
```

Returns `true` if the matrix is invertible, `false` otherwise.

### 17. minor

```typescript
Matrix.minor(i: number, j: number): number
```

Returns the minor of the matrix at the specified row and column.

### 18. cofactor

```typescript
Matrix.cofactor(i: number, j: number): number
```

Returns the cofactor of the matrix at the specified row and column.

### 19. determinant

```typescript
Matrix.determinant(): number
```

Returns the determinant of the matrix.

### 20. transpose

```typescript
Matrix.transpose(): Matrix
```

Returns the transpose of the matrix.

### 21. add

```typescript
Matrix.add(matrix: Matrix): Matrix
```

Returns the sum of the matrix and the specified matrix.

### 22. subtract

```typescript
Matrix.subtract(matrix: Matrix): Matrix
```

Returns the difference of the matrix and the specified matrix.

### 23. multiply

```typescript
Matrix.multiply(matrix: Matrix): Matrix
```

Returns the product of the matrix and the specified matrix.

### 24. scalarMultiply

```typescript
Matrix.scalarMultiply(scalar: number): Matrix
```

Returns the product of the matrix and the specified scalar.

### 25. inverse

```typescript
Matrix.inverse(): Matrix
```

Returns the inverse of the matrix.

### 26. power

```typescript
Matrix.power(exponent: number): Matrix
```

Returns the matrix raised to the specified power.

### 27. equals

```typescript
Matrix.equals(matrix: Matrix): boolean
```

Returns `true` if the matrix is equal to the specified matrix, `false` otherwise.

### 28. toString

```typescript
Matrix.toString(): string
```

Returns a string representation of the matrix.

### 29. toArray

```typescript
Matrix.toArray(): number[][]
```

Returns a two-dimensional array representation of the matrix.

### 30. toObject

```typescript
Matrix.toObject(): any
```

Returns an object representation of the matrix.

## Example Usage

```typescript
import { Matrix } from "./Matrix";

const matrix = Matrix.create(3, 3, (i, j) => i + j);
console.log(matrix.toString());
```

## Formula

The Formula class is used to create custom formulas for matrix creation. It is used as follows:

```typescript
import { Formula } from "./Formula";

const matrix = Matrix.create(3, 3, (i, j) =>
	new Formula("i² + 5j", { i, j }).evaluate()
);

console.log(matrix.toString());
```
