## Architecture
### Storage Structure
```
Firebase Firestore Database
├── accounts/ (collection)
│   ├── document1
│   ├── document2
│   └── ...
└── items/ (collection)
    ├── document1
    ├── document2
    └── ...
```

### Key Components
- **FirestoreConfig**: Centralized Firebase configuration and initialization
- **FirebaseService**: Service for account operations (accounts collection)
- **ItemsFirebaseService**: Service for item operations (items collection)
- **Cloud Storage**: All data stored in Firebase Firestore cloud database
- **Real-time Sync**: Automatic synchronization across all connected clients

### Database Collections

#### Accounts Collection
- **Purpose**: User account management
- **Fields**: username, password (hashed), createdAt, updatedAt
- **Operations**: Create, verify username existence

#### Items Collection  
- **Purpose**: Game items catalog
- **Fields**: id, name, description, typeId, createdAt, updatedAt
- **Operations**: Create, Read, Update, Delete, List all