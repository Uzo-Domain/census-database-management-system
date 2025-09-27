# Database Connection Guide - Census Management System

This document shows exactly where the user interface is connected to the database through an API (connection string) to access the database, as required by the project specifications.

## 🎯 Project Requirements Fulfillment

### ✅ Requirement 1: User Interface Connected to Database via API
**Status: FULLY IMPLEMENTED**

The React frontend user interface is connected to the Oracle database through a Node.js/Express API server using connection strings.

### ✅ Requirement 2: CRUD Operation Buttons
**Status: FULLY IMPLEMENTED**

All four required buttons are implemented:
- **Insert Record** - Uses stored procedures
- **Retrieve Record** - Uses cursors
- **Update Record** - Uses stored procedures  
- **Delete Record** - Uses stored procedures

### ✅ Requirement 3: Frontend Script Implementation
**Status: FULLY IMPLEMENTED**

All CRUD operations are implemented in the frontend script with proper error handling and validation.

### ✅ Requirement 4: Database Backend Implementation
**Status: FULLY IMPLEMENTED**

- **Insert Record**: Using stored procedures ✅
- **Retrieve Record**: Using cursors ✅
- **Update Record**: Using stored procedures ✅
- **Delete Record**: Using stored procedures ✅

### ✅ Requirement 5: JOIN Statements
**Status: FULLY IMPLEMENTED**

Complex queries with JOIN statements are implemented for retrieving records from multiple tables.

### ✅ Requirement 6: Triggers for User Activity Logging
**Status: FULLY IMPLEMENTED**

Comprehensive triggers log all user activities into a log table.

---

## 🔗 API Connection String Locations

### 1. Primary Database Connection String

**File:** `census-backend/database/connection.js`

```javascript
// Database connection configuration
const dbConfig = {
  user: process.env.DB_USER || 'census_user',
  password: process.env.DB_PASSWORD || 'census_password',
  connectString: `${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '1521'}/${process.env.DB_SERVICE || 'XE'}`,
  poolMin: 2,
  poolMax: 10,
  poolIncrement: 1
};
```

**This is the main connection string that connects the API to the Oracle database.**

### 2. Environment Configuration

**File:** `census-backend/config.env`

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=1521
DB_SERVICE=XE
DB_USER=census_user
DB_PASSWORD=census_password
```

**This file contains the database connection parameters used by the connection string.**

### 3. Frontend to Backend API Connection

**File:** `census-frontend/app/dashboard/api.js`

```javascript
// API Base URL - connects to the backend server
const API_BASE_URL = 'http://localhost:3000/api';
```

**This connects the frontend user interface to the backend API server.**

---

## 🏗️ Complete Connection Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CONNECTION FLOW                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    HTTP/REST API    ┌─────────────────┐              │
│  │   React         │ ◄──────────────────► │   Node.js       │              │
│  │   Frontend      │                     │   Express API   │              │
│  │                 │                     │                 │              │
│  │ • CRUD Buttons  │                     │ • API Routes    │              │
│  │ • Forms         │                     │ • Middleware    │              │
│  │ • Validation    │                     │ • Services      │              │
│  └─────────────────┘                     └─────────────────┘              │
│           │                                        │                       │
│           │                                        │                       │
│           │                                        ▼                       │
│           │                              ┌─────────────────┐              │
│           │                              │   Database      │              │
│           │                              │   Service       │              │
│           │                              │                 │              │
│           │                              │ • Stored Procs  │              │
│           │                              │ • Cursors       │              │
│           │                              │ • JOIN Queries  │              │
│           │                              │ • Triggers      │              │
│           │                              └─────────────────┘              │
│           │                                        │                       │
│           │                                        ▼                       │
│           │                              ┌─────────────────┐              │
│           │                              │   Oracle        │              │
│           │                              │   Database      │              │
│           │                              │                 │              │
│           │                              │ • Tables        │              │
│           │                              │ • Procedures    │              │
│           │                              │ • Functions     │              │
│           │                              │ • Triggers      │              │
│           └──────────────────────────────┴─────────────────┴──────────────┘
│                                                                             │
│  CONNECTION STRING: localhost:1521/XE                                      │
│  USER: census_user                                                         │
│  PASSWORD: census_password                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📍 Exact File Locations

### Database Connection Files

1. **Main Connection String:**
   ```
   census-backend/database/connection.js
   ```

2. **Environment Configuration:**
   ```
   census-backend/config.env
   ```

3. **Frontend API Connection:**
   ```
   census-frontend/app/dashboard/api.js
   ```

### API Implementation Files

4. **Database Service Layer:**
   ```
   census-backend/services/databaseService.js
   ```

5. **API Routes:**
   ```
   census-backend/routes/api.js
   ```

6. **Server Configuration:**
   ```
   census-backend/server.js
   ```

---

## 🔧 Database Features Implementation

### Stored Procedures Location
**File:** `census-backend/database/stored-procedures.sql`

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

### Cursors Location
**File:** `census-backend/database/cursors.sql`

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

### JOIN Statements Location
**File:** `census-backend/database/cursors.sql`

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

### Triggers Location
**File:** `census-backend/database/triggers.sql`

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
                   ',"region_code":"' || :NEW.region_code || '"}';
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

---

## 🚀 How to Test the Connection

### 1. Start the Backend Server
```bash
cd census-backend
npm start
```

### 2. Start the Frontend Application
```bash
cd census-frontend
npm run dev
```

### 3. Test CRUD Operations
1. Navigate to `http://localhost:5173`
2. Select "Region" from the sidebar
3. Click "Insert Record" to add a new region
4. Click "Retrieve Records" to view all regions
5. Click edit/delete buttons to test update/delete operations

### 4. Verify Database Connection
- Check the backend console for database connection messages
- Verify data is persisted in the Oracle database
- Check the user activity log table for audit trails

---

## 📊 API Endpoints Summary

| Operation | HTTP Method | Endpoint | Database Feature |
|-----------|-------------|----------|------------------|
| Insert Record | POST | `/api/{table_name}` | Stored Procedure |
| Retrieve Records | GET | `/api/{table_name}` | Cursor |
| Update Record | PUT | `/api/{table_name}/{id}` | Stored Procedure |
| Delete Record | DELETE | `/api/{table_name}/{id}` | Stored Procedure |
| Complex Queries | POST | `/api/query/complex` | JOIN Statements |

---

## ✅ Verification Checklist

- [x] **User Interface**: React frontend with CRUD buttons
- [x] **API Connection**: Node.js/Express backend server
- [x] **Database Connection**: Oracle database with connection string
- [x] **Insert Operations**: Using stored procedures
- [x] **Retrieve Operations**: Using cursors
- [x] **Update Operations**: Using stored procedures
- [x] **Delete Operations**: Using stored procedures
- [x] **JOIN Statements**: Complex queries across multiple tables
- [x] **Triggers**: User activity logging
- [x] **Error Handling**: Comprehensive error management
- [x] **Data Validation**: Client and server-side validation

---

## 🎯 Conclusion

The Census Management System is **FULLY FUNCTIONAL** and meets all project requirements:

1. ✅ **User interface connected to database via API** - Implemented in `census-backend/database/connection.js`
2. ✅ **CRUD operation buttons** - Implemented in `census-frontend/app/dashboard/`
3. ✅ **Frontend script implementation** - Implemented in `census-frontend/app/dashboard/api.js`
4. ✅ **Database backend implementation** - Implemented in `census-backend/services/databaseService.js`
5. ✅ **JOIN statements** - Implemented in `census-backend/database/cursors.sql`
6. ✅ **Triggers for user activity logging** - Implemented in `census-backend/database/triggers.sql`

**The interface is connected to the database through the API connection string located in `census-backend/database/connection.js` and configured in `census-backend/config.env`.** 