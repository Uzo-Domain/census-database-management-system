# Census Management System - Backend API

A comprehensive Node.js/Express backend API that connects the React frontend to the Oracle database, implementing all required database features including stored procedures, cursors, JOIN statements, and triggers.

## 🎯 Project Requirements Implementation

This backend fully implements all the specified requirements:

### 1. ✅ User Interface Connected to Database via API
- **Frontend**: React-based user interface in `census-frontend/`
- **Backend**: Node.js/Express API server
- **Connection**: RESTful API endpoints connecting frontend to Oracle database
- **Connection String**: Configured in `config.env` and `database/connection.js`

### 2. ✅ CRUD Operation Buttons
- **Insert Record**: `POST /api/{table_name}` - Uses stored procedures
- **Retrieve Record**: `GET /api/{table_name}` - Uses cursors  
- **Update Record**: `PUT /api/{table_name}/{id}` - Uses stored procedures
- **Delete Record**: `DELETE /api/{table_name}/{id}` - Uses stored procedures

### 3. ✅ Frontend Script Implementation
- All CRUD operations implemented in `census-frontend/app/dashboard/api.js`
- Connected to backend API endpoints
- Real-time form validation and error handling

### 4. ✅ Database Backend Implementation
- **Insert Record**: Using stored procedures (`database/stored-procedures.sql`)
- **Retrieve Record**: Using cursors (`database/cursors.sql`)
- **Update Record**: Using stored procedures (`database/stored-procedures.sql`)
- **Delete Record**: Using stored procedures (`database/stored-procedures.sql`)

### 5. ✅ JOIN Statements
- Complex queries implemented in `database/cursors.sql`
- Multi-table joins for comprehensive data retrieval
- Examples: `GET_HOUSEHOLD_DETAILS`, `GET_CENSUS_SUMMARY_BY_REGION`

### 6. ✅ Triggers for User Activity Logging
- Comprehensive audit trail in `database/triggers.sql`
- Logs all INSERT, UPDATE, DELETE operations
- Tracks old and new values for complete audit history

## 🏗️ Architecture Overview

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐    Oracle    ┌─────────────────┐
│   React         │ ◄──────────────► │   Node.js       │ ◄──────────► │   Oracle        │
│   Frontend      │                 │   Express API   │              │   Database      │
│                 │                 │                 │              │                 │
│ • CRUD Buttons  │                 │ • Stored Procs  │              │ • Tables        │
│ • Forms         │                 │ • Cursors       │              │ • Procedures    │
│ • Validation    │                 │ • JOIN Queries  │              │ • Triggers      │
│ • Error Handling│                 │ • Triggers      │              │ • Constraints   │
└─────────────────┘                 └─────────────────┘              └─────────────────┘
```

## 🔗 API Connection to Database

### Connection String Configuration
```javascript
// database/connection.js
const dbConfig = {
  user: process.env.DB_USER || 'census_user',
  password: process.env.DB_PASSWORD || 'census_password',
  connectString: `${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '1521'}/${process.env.DB_SERVICE || 'XE'}`,
  poolMin: 2,
  poolMax: 10,
  poolIncrement: 1
};
```

### Environment Variables
```env
# config.env
DB_HOST=localhost
DB_PORT=1521
DB_SERVICE=XE
DB_USER=census_user
DB_PASSWORD=census_password
```

## 📊 Database Features Implementation

### Stored Procedures
All CRUD operations use stored procedures as required:

```sql
-- Example: INSERT_REGION procedure
CREATE OR REPLACE PROCEDURE INSERT_REGION(
  p_region_name IN VARCHAR2,
  p_region_code IN VARCHAR2,
  p_region_id OUT NUMBER
) AS
BEGIN
  INSERT INTO region (region_name, region_code)
  VALUES (p_region_name, p_region_code)
  RETURNING region_id INTO p_region_id;
  COMMIT;
END;
```

### Cursors
All data retrieval operations use cursors as required:

```sql
-- Example: GET_ALL_REGIONS cursor
CREATE OR REPLACE FUNCTION GET_ALL_REGIONS
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT region_id, region_name, region_code
    FROM region
    ORDER BY region_name;
  RETURN v_cursor;
END;
```

### JOIN Statements
Complex queries with multiple table joins:

```sql
-- Example: GET_HOUSEHOLD_DETAILS with JOIN statements
CREATE OR REPLACE FUNCTION GET_HOUSEHOLD_DETAILS(
  p_household_id IN NUMBER
)
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT 
      h.household_id, h.household_number, h.questionnaire_id,
      e.enumerator_name, s.supervisor_name,
      l.locality_name, ea.ea_code,
      sd.sub_district_name, d.district_name, r.region_name
    FROM household h
    LEFT JOIN enumerator e ON h.enumerator_id = e.enumerator_id
    LEFT JOIN supervisor s ON h.supervisor_id = s.supervisor_id
    LEFT JOIN housing_unit hu ON h.housing_unit_id = hu.housing_unit_id
    LEFT JOIN locality l ON hu.locality_id = l.locality_id
    LEFT JOIN enumeration_area ea ON l.ea_id = ea.ea_id
    LEFT JOIN sub_district sd ON ea.sub_district_id = sd.sub_district_id
    LEFT JOIN district d ON sd.district_id = d.district_id
    LEFT JOIN region r ON d.region_id = r.region_id
    WHERE h.household_id = p_household_id;
  RETURN v_cursor;
END;
```

### Triggers
Comprehensive user activity logging:

```sql
-- Example: region_audit_trigger
CREATE OR REPLACE TRIGGER region_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON region
FOR EACH ROW
DECLARE
  v_operation VARCHAR2(10);
  v_old_values CLOB;
  v_new_values CLOB;
BEGIN
  IF INSERTING THEN
    v_operation := 'INSERT';
    v_new_values := '{"region_id":' || :NEW.region_id || 
                   ',"region_name":"' || :NEW.region_name || 
                   '","region_code":"' || :NEW.region_code || '"}';
  ELSIF UPDATING THEN
    v_operation := 'UPDATE';
    -- Log old and new values
  ELSIF DELETING THEN
    v_operation := 'DELETE';
    -- Log old values
  END IF;

  INSERT INTO user_activity_log (log_id, table_name, operation, record_id, old_values, new_values)
  VALUES (log_seq.NEXTVAL, 'REGION', v_operation, 
          CASE WHEN INSERTING THEN :NEW.region_id ELSE :OLD.region_id END,
          v_old_values, v_new_values);
END;
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Oracle Database (XE, Standard, or Enterprise)
- Oracle Instant Client

### Installation Steps

1. **Install Dependencies**
   ```bash
   cd census-backend
   npm install
   ```

2. **Configure Database Connection**
   ```bash
   # Edit config.env with your Oracle database details
   DB_HOST=localhost
   DB_PORT=1521
   DB_SERVICE=XE
   DB_USER=census_user
   DB_PASSWORD=census_password
   ```

3. **Set Up Database Schema**
   ```bash
   # Run the database scripts in order:
   # 1. Tables and constraints
   # 2. Stored procedures
   # 3. Cursors
   # 4. Triggers
   ```

4. **Start the Server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## 📡 API Endpoints

### Basic CRUD Operations

#### Region Management
```
GET    /api/region           # Get all regions (uses cursor)
POST   /api/region           # Create region (uses stored procedure)
PUT    /api/region/:id       # Update region (uses stored procedure)
DELETE /api/region/:id       # Delete region (uses stored procedure)
```

#### District Management
```
GET    /api/district         # Get all districts (uses cursor)
POST   /api/district         # Create district (uses stored procedure)
PUT    /api/district/:id     # Update district (uses stored procedure)
DELETE /api/district/:id     # Delete district (uses stored procedure)
```

#### Enumerator Management
```
GET    /api/enumerator       # Get all enumerators (uses cursor)
POST   /api/enumerator       # Create enumerator (uses stored procedure)
PUT    /api/enumerator/:id   # Update enumerator (uses stored procedure)
DELETE /api/enumerator/:id   # Delete enumerator (uses stored procedure)
```

#### Supervisor Management
```
GET    /api/supervisor       # Get all supervisors (uses cursor)
POST   /api/supervisor       # Create supervisor (uses stored procedure)
PUT    /api/supervisor/:id   # Update supervisor (uses stored procedure)
DELETE /api/supervisor/:id   # Delete supervisor (uses stored procedure)
```

#### Household Management
```
GET    /api/household        # Get all households (uses cursor)
POST   /api/household        # Create household (uses stored procedure)
PUT    /api/household/:id    # Update household (uses stored procedure)
DELETE /api/household/:id    # Delete household (uses stored procedure)
```

#### Person Management
```
GET    /api/person           # Get all persons (uses cursor)
POST   /api/person           # Create person (uses stored procedure)
PUT    /api/person/:id       # Update person (uses stored procedure)
DELETE /api/person/:id       # Delete person (uses stored procedure)
```

### Complex Queries (JOIN Statements)
```
POST   /api/query/complex    # Execute complex queries with joins
```

**Available Query Types:**
- `census_summary_by_region` - Summary statistics by region
- `household_details` - Complete household information with all related data

### Health Check
```
GET    /health               # API health check
```

## 🔧 Database Service Layer

The `services/databaseService.js` file contains all database operations:

- **Stored Procedure Calls**: All INSERT, UPDATE, DELETE operations
- **Cursor Operations**: All SELECT operations with cursor handling
- **Complex Queries**: JOIN statements for multi-table operations
- **Error Handling**: Comprehensive error management and logging

## 📝 User Activity Logging

All database operations are logged to the `user_activity_log` table:

```sql
CREATE TABLE user_activity_log (
  log_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  table_name VARCHAR2(50) NOT NULL,
  operation VARCHAR2(10) NOT NULL,
  record_id NUMBER,
  old_values CLOB,
  new_values CLOB,
  user_id VARCHAR2(50) DEFAULT 'SYSTEM',
  timestamp TIMESTAMP DEFAULT SYSTIMESTAMP,
  ip_address VARCHAR2(45)
);
```

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: API request throttling
- **Input Validation**: Request data validation
- **Error Handling**: Secure error responses

## 🧪 Testing the System

1. **Start Backend Server**
   ```bash
   cd census-backend
   npm start
   ```

2. **Start Frontend Application**
   ```bash
   cd census-frontend
   npm run dev
   ```

3. **Test CRUD Operations**
   - Navigate to the frontend application
   - Select different entities from the sidebar
   - Test Insert, Retrieve, Update, Delete operations
   - Verify data persistence in the database

4. **Verify Database Features**
   - Check stored procedures execution
   - Verify cursor operations
   - Test JOIN statement queries
   - Review user activity logs

## 📊 Database Schema Support

The backend supports all 18 database tables:

**Geographic Entities:**
- Region, District, Sub District, Enumeration Area, Locality

**Personnel:**
- Enumerator, Supervisor

**Housing:**
- Housing Unit

**Household:**
- Household

**Population:**
- Person, Absent Member, Emigrant, Mortality Record

**Employment:**
- Employment

**Disability:**
- Disability

**Agriculture:**
- Agricultural Activity, Crop Farming, Livestock Farming

## 🎯 Connection String Location

The interface is connected to the database through the API connection string located in:

**Primary Location:**
```javascript
// census-backend/database/connection.js
const dbConfig = {
  user: process.env.DB_USER || 'census_user',
  password: process.env.DB_PASSWORD || 'census_password',
  connectString: `${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '1521'}/${process.env.DB_SERVICE || 'XE'}`,
  poolMin: 2,
  poolMax: 10,
  poolIncrement: 1
};
```

**Configuration File:**
```env
# census-backend/config.env
DB_HOST=localhost
DB_PORT=1521
DB_SERVICE=XE
DB_USER=census_user
DB_PASSWORD=census_password
```

**Frontend Connection:**
```javascript
// census-frontend/app/dashboard/api.js
const API_BASE_URL = 'http://localhost:3000/api';
```

## 📞 Support

For questions or issues with the backend implementation, please refer to the code comments or create an issue in the project repository.

## 📄 License

This project is part of the Census Management System for Project 2025. 