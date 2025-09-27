A full-stack web application for managing census data . This system provides a complete database-driven solution with a React frontend, Node.js/Express backend API, and Oracle database integration.

##  Software Architecture
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SYSTEM ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    HTTP/REST API    ┌─────────────────┐              │
│  │   React         │ ◄──────────────────► │   Node.js       │              │
│  │   Frontend      │                     │   Express API   │              │
│  │                 │                     │                 │              │
│  │ • CRUD Buttons  │                     │ • API Routes    │              │
│  │ • Dynamic Forms │                     │ • Middleware    │              │
│  │ • Data Tables   │                     │ • Services      │              │
│  │ • Validation    │                     │ • Error Handler │              │
│  └─────────────────┘                     └─────────────────┘              │
│           │                                        │                       │
│           │                                        │ Oracle Client         │
│           │                                        ▼                       │
│           │                              ┌─────────────────┐              │
│           │                              │   Oracle        │              │
│           │                              │   Database      │              │
│           │                              │                 │              │
│           │                              │ • Tables        │              │
│           │                              │ • Procedures    │              │
│           │                              │ • Cursors       │              │
│           │                              │ • Triggers      │              │
│           │                              │ • Constraints   │              │
│           │                              └─────────────────┘              │
│           │                                                                │
│           └─────────────────── Direct API Calls ───────────────────────────┘
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- React 19.1.0 with React Router 7.7.0
- Tailwind CSS for styling
- Vite for build tooling
- TypeScript support

**Backend:**
- Node.js with Express.js framework
- Oracle Database integration via `oracledb` client
- RESTful API architecture
- Security middleware (Helmet, CORS, Rate Limiting)

**Database:**
- Oracle Database (XE/Standard/Enterprise)
- 18 normalized tables
- Stored procedures for all CRUD operations
- Cursors for data retrieval
- Triggers for audit logging
- Complex JOIN queries

## Features:
### Database Schema Support
The system supports 18 census database tables organized by category:

**Geographic Entities:** Region, District, Sub District, Enumeration Area, Locality  
**Personnel:** Enumerator, Supervisor  
**Housing:** Housing Unit  
**Household:** Household  
**Population:** Person, Absent Member, Emigrant, Mortality Record  
**Employment:** Employment  
**Disability:** Disability  
**Agriculture:** Agricultural Activity, Crop Farming, Livestock Farming

### CRUD Operations
- **Insert Record**: Add new records using stored procedures
- **Retrieve Records**: View all records using database cursors
- **Update Record**: Edit existing records with form validation
- **Delete Record**: Remove records with confirmation dialogs

### Advanced Database Features
- **Stored Procedures**: All INSERT, UPDATE, DELETE operations
- **Cursors**: All SELECT operations for efficient data retrieval
- **JOIN Statements**: Complex queries across multiple tables
- **Triggers**: Comprehensive audit trail logging
- **Data Validation**: Client and server-side validation

### User Interface Features
- **Dynamic Forms**: Auto-generated forms based on database schema
- **Responsive Design**: Works on desktop and mobile devices
- **Category Navigation**: Organized sidebar with logical entity grouping
- **Real-time Validation**: Immediate feedback on form inputs
- **Loading States**: Visual feedback during operations
- **Error Handling**: User-friendly error messages

## Project Structure:
```
404CensusProject/
├── 404 DATABASE PROJECT/           # Database schema and scripts
│   ├── schema_modules/
│   │   ├── Tables.sql
│   │   └── Constraints.sql
│   └── scripts/
│       ├── create_all.sql
│       ├── insert_sample_data.sql
│       └── Triggers.sql
├── census-backend/                 # Node.js/Express API server
│   ├── database/
│   │   ├── connection.js          # Oracle DB connection
│   │   └── cursors.sql
│   ├── routes/
│   │   └── api.js                 # REST API endpoints
│   ├── services/
│   │   └── databaseService.js     # Database operations
│   ├── config.env                 # Environment configuration
│   └── server.js                  # Express server setup
├── census-frontend/                # React application
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx      # Main dashboard
│   │   │   ├── Sidebar.jsx        # Navigation
│   │   │   ├── CRUDButtons.jsx    # Operation buttons
│   │   │   ├── RecordTable.jsx    # Data display
│   │   │   ├── RecordForm.jsx     # Dynamic forms
│   │   │   └── api.js             # API integration
│   │   └── routes/
│   └── package.json
└── DATABASE_CONNECTION_GUIDE.md    # Connection documentation
```

## API Endpoints

| Operation | Method | Endpoint | Database Feature |
|-----------|--------|----------|------------------|
| Insert Record | POST | `/api/{table_name}` | Stored Procedure |
| Retrieve Records | GET | `/api/{table_name}` | Cursor |
| Update Record | PUT | `/api/{table_name}/{id}` | Stored Procedure |
| Delete Record | DELETE | `/api/{table_name}/{id}` | Stored Procedure |
| Complex Queries | POST | `/api/query/complex` | JOIN Statements |
| Health Check | GET | `/health` | System Status |

## Installation & Setup:
### Prerequisites
- Node.js (v16 or higher)
- Oracle Database (XE, Standard, or Enterprise)
- Oracle Instant Client

### Backend Setup
```bash
cd census-backend
npm install
```

Configure database connection in `config.env`:
```env
DB_HOST=localhost
DB_PORT=1521
DB_SERVICE=XE
DB_USER=census_user
DB_PASSWORD=census_password
```

Start the backend server:
```bash
npm start
```

### Frontend Setup
```bash
cd census-frontend
npm install
npm run dev
```

### Database Setup
1. Create Oracle database user with appropriate permissions
2. Run database scripts in order:
   - `Tables.sql`
   - `Constraints.sql`
   - `insert_sample_data.sql`
   - `Triggers.sql`

## Security Features
- **Helmet.js**: Security headers protection
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: API request throttling
- **Input Validation**: Comprehensive data validation
- **SQL Injection Protection**: Parameterized queries
- **Error Handling**: Secure error responses

## Testing

1. Start both backend (`npm start`) and frontend (`npm run dev`)
2. Navigate to `http://localhost:5173`
3. Select entities from the sidebar
4. Test all CRUD operations:
   - Insert new records
   - Retrieve and view data
   - Edit existing records
   - Delete records with confirmation



## Contact:
Github: Uzo-Domain
LinkedIn: Uzoma Oduah (www.linkedin.com/in/uzoma-oduah-13474a198)


*This Census Management System showcases modern web development practices and database integration techniques suitable for enterprise-level applications.*
