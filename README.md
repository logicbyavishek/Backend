# Backend Repository

This repository contains the main backend codebase.  
One of the core services (`Day-2`) is maintained as a **Git submodule** because it has its own independent repository and deployment lifecycle.

This structure allows the backend to remain modular, scalable, and deployment-friendly while keeping clear separation of responsibilities.


## Cloning the Repository (Required Steps)

This project uses **Git submodules**, so cloning requires special attention.

### Option 1: Clone with submodules (Recommended)

```bash
git clone --recursive https://github.com/logicbyavishek/Backend.git
````

This will:

* Clone the main `Backend` repository
* Automatically initialize and fetch the `Day-2` submodule

---

### Option 2: Clone first, then initialize submodules

If the repository was cloned without the `--recursive` flag, run the following commands:

```bash
git submodule update --init --recursive
```

---

## Working with the Day-2 Submodule

The `Day-2` directory is a separate Git repository and should be treated as an independent backend service.

### Pull latest changes

```bash
cd Day-2
git checkout main
git pull
```

---

### Making changes in Day-2

```bash
cd Day-2
# make your changes
git status
git commit -m "Your commit message"
git push
```

After pushing changes to the `Day-2` repository, update the parent repository:

```bash
cd ..
git add Day-2
git commit -m "Update Day-2 submodule reference"
git push
```

---

## Important Notes

* Do not delete or manually edit the `.gitmodules` file
* Always push changes to the `Day-2` repository **before** pushing the parent `Backend` repository
* The parent repository tracks only the submodule commit reference, not the internal files
* When switching machines or environments, ensure submodules are initialized

---

## Troubleshooting

If the `Day-2` directory appears empty after cloning:

```bash
git submodule update --init --recursive
```

If submodules are out of sync:

```bash
git submodule sync
git submodule update --init --recursive
```
