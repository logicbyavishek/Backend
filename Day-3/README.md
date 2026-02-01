
# REST API – Core Concepts & Best Practices

This repository/document provides a concise yet complete overview of **RESTful APIs**, covering architectural principles, HTTP methods, status codes, best practices, and common interview-oriented explanations.

It is intended for:
- Backend developers
- Full-stack developers
- API designers
- Interview and revision preparation

---

## What is REST?

**REST (Representational State Transfer)** is an architectural style for designing networked applications.  
It relies on **stateless, client–server communication over HTTP**, using standard methods and status codes.

RESTful APIs are built around **resources**, which represent data entities such as users, products, or documents.

---

## Core REST Concepts

### 1. Resources
- Anything accessible via the API is a **resource**
- Each resource has a unique **URI**
- Example:
```

/users
/products/123

```

### 2. Representations
- Resources are exchanged using formats such as:
- JSON (most common)
- XML

### 3. Stateless Communication
- Each request contains all required information
- Server does **not** store client session state

### 4. HTTP Methods
- Standard HTTP verbs define actions on resources

### 5. HTTP Status Codes
- Server responses use status codes to indicate request outcomes

---

## HTTP Methods

| Method | Purpose | Idempotent |
|------|--------|------------|
| GET | Retrieve a resource or list of resources | Yes |
| POST | Create a new resource | No |
| PUT | Replace an existing resource | Yes |
| PATCH | Partially update a resource | Yes |
| DELETE | Remove a resource | Yes |

### Important Notes
- **Idempotent**: Same request → same result (PUT, PATCH, DELETE, GET)
- **Safe methods**: Do not modify data (GET, HEAD, OPTIONS)

---

## HTTP Status Code Categories

| Range | Meaning |
|------|--------|
| 1xx | Informational |
| 2xx | Success |
| 3xx | Redirection |
| 4xx | Client Error |
| 5xx | Server Error |

---

## Common HTTP Status Codes

### Success (2xx)
- **200 OK** – Successful request
- **201 Created** – Resource created
- **204 No Content** – Success, no response body

### Redirection (3xx)
- **301 Moved Permanently** – Resource moved permanently
- **302 Found** – Temporary redirect
- **304 Not Modified** – Cached resource still valid

### Client Errors (4xx)
- **400 Bad Request** – Invalid request data
- **401 Unauthorized** – Authentication required
- **403 Forbidden** – Permission denied
- **404 Not Found** – Resource does not exist
- **405 Method Not Allowed** – Unsupported HTTP method
- **409 Conflict** – Resource state conflict
- **422 Unprocessable Entity** – Semantic validation failure

### Server Errors (5xx)
- **500 Internal Server Error** – Generic server failure
- **501 Not Implemented** – Feature not supported
- **503 Service Unavailable** – Server overloaded or down

---

## RESTful API Design Best Practices

- Use **nouns**, not verbs, for resources  
```

/users ✔
/getUsers ✖

````
- Use **plural** resource names
- Follow correct **HTTP method semantics**
- Return **appropriate status codes**
- Keep APIs **stateless**
- Maintain **consistency and predictability**

---

## Error Handling Guidelines

- Always return meaningful HTTP status codes
- Include descriptive error messages in the response body
- Log server-side errors for debugging

Example:
```json
{
"error": "Invalid email address"
}
````

---

## Interview-Oriented Notes

### PUT vs PATCH

* **PUT** → replaces entire resource
* **PATCH** → updates specific fields only

### Idempotent Methods

* GET, PUT, PATCH, DELETE → idempotent
* POST → not idempotent

### Safe Methods

* GET, HEAD, OPTIONS

---

## Summary

REST APIs provide a standardized, scalable, and predictable way to design web services.
Understanding HTTP methods, status codes, and best practices is essential for building robust backend systems and performing well in technical interviews.

---
