## Architecture
### Storage Structure
```
src/db/
└── items/
├── 1.json
├── 2.json
├── 3.json
└── ...
```
### Key Components
- **DbFileUtils**: Core utility class managing all database operations
- **JSON Files**: Each entity stored as individual JSON file with ID-based naming
- **Auto-creation**: Database directories created automatically on server startup