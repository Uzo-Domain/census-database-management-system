const express = require('express');
const router = express.Router();
const databaseService = require('../services/databaseService');

// =====================================
// REGION ROUTES
// =====================================

// GET /api/region - Retrieve all regions using cursor
router.get('/region', async (req, res) => {
  try {
    const regions = await databaseService.getAllRegions();
    res.json(regions);
  } catch (error) {
    console.error('Error retrieving regions:', error);
    res.status(500).json({ error: 'Failed to retrieve regions' });
  }
});

// POST /api/region - Insert region using stored procedure
router.post('/region', async (req, res) => {
  try {
    const result = await databaseService.insertRegion(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error inserting region:', error);
    res.status(500).json({ error: 'Failed to insert region' });
  }
});

// PUT /api/region/:id - Update region using stored procedure
router.put('/region/:id', async (req, res) => {
  try {
    const result = await databaseService.updateRegion(parseInt(req.params.id), req.body);
    res.json(result);
  } catch (error) {
    console.error('Error updating region:', error);
    res.status(500).json({ error: 'Failed to update region' });
  }
});

// DELETE /api/region/:id - Delete region using stored procedure
router.delete('/region/:id', async (req, res) => {
  try {
    const result = await databaseService.deleteRegion(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    console.error('Error deleting region:', error);
    res.status(500).json({ error: 'Failed to delete region' });
  }
});

// =====================================
// DISTRICT ROUTES
// =====================================

// GET /api/district - Retrieve all districts using cursor
router.get('/district', async (req, res) => {
  try {
    const districts = await databaseService.getAllDistricts();
    res.json(districts);
  } catch (error) {
    console.error('Error retrieving districts:', error);
    res.status(500).json({ error: 'Failed to retrieve districts' });
  }
});

// POST /api/district - Insert district using stored procedure
router.post('/district', async (req, res) => {
  try {
    const result = await databaseService.insertDistrict(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error inserting district:', error);
    res.status(500).json({ error: 'Failed to insert district' });
  }
});

// PUT /api/district/:id - Update district using stored procedure
router.put('/district/:id', async (req, res) => {
  try {
    const result = await databaseService.updateDistrict(parseInt(req.params.id), req.body);
    res.json(result);
  } catch (error) {
    console.error('Error updating district:', error);
    res.status(500).json({ error: 'Failed to update district' });
  }
});

// DELETE /api/district/:id - Delete district using stored procedure
router.delete('/district/:id', async (req, res) => {
  try {
    const result = await databaseService.deleteDistrict(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    console.error('Error deleting district:', error);
    res.status(500).json({ error: 'Failed to delete district' });
  }
});

// =====================================
// ENUMERATOR ROUTES
// =====================================

// GET /api/enumerator - Retrieve all enumerators using cursor
router.get('/enumerator', async (req, res) => {
  try {
    const enumerators = await databaseService.getAllEnumerators();
    res.json(enumerators);
  } catch (error) {
    console.error('Error retrieving enumerators:', error);
    res.status(500).json({ error: 'Failed to retrieve enumerators' });
  }
});

// POST /api/enumerator - Insert enumerator using stored procedure
router.post('/enumerator', async (req, res) => {
  try {
    const result = await databaseService.insertEnumerator(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error inserting enumerator:', error);
    res.status(500).json({ error: 'Failed to insert enumerator' });
  }
});

// PUT /api/enumerator/:id - Update enumerator using stored procedure
router.put('/enumerator/:id', async (req, res) => {
  try {
    const result = await databaseService.updateEnumerator(parseInt(req.params.id), req.body);
    res.json(result);
  } catch (error) {
    console.error('Error updating enumerator:', error);
    res.status(500).json({ error: 'Failed to update enumerator' });
  }
});

// DELETE /api/enumerator/:id - Delete enumerator using stored procedure
router.delete('/enumerator/:id', async (req, res) => {
  try {
    const result = await databaseService.deleteEnumerator(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    console.error('Error deleting enumerator:', error);
    res.status(500).json({ error: 'Failed to delete enumerator' });
  }
});

// =====================================
// SUPERVISOR ROUTES
// =====================================

// GET /api/supervisor - Retrieve all supervisors using cursor
router.get('/supervisor', async (req, res) => {
  try {
    const supervisors = await databaseService.getAllSupervisors();
    res.json(supervisors);
  } catch (error) {
    console.error('Error retrieving supervisors:', error);
    res.status(500).json({ error: 'Failed to retrieve supervisors' });
  }
});

// POST /api/supervisor - Insert supervisor using stored procedure
router.post('/supervisor', async (req, res) => {
  try {
    const result = await databaseService.insertSupervisor(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error inserting supervisor:', error);
    res.status(500).json({ error: 'Failed to insert supervisor' });
  }
});

// PUT /api/supervisor/:id - Update supervisor using stored procedure
router.put('/supervisor/:id', async (req, res) => {
  try {
    const result = await databaseService.updateSupervisor(parseInt(req.params.id), req.body);
    res.json(result);
  } catch (error) {
    console.error('Error updating supervisor:', error);
    res.status(500).json({ error: 'Failed to update supervisor' });
  }
});

// DELETE /api/supervisor/:id - Delete supervisor using stored procedure
router.delete('/supervisor/:id', async (req, res) => {
  try {
    const result = await databaseService.deleteSupervisor(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    console.error('Error deleting supervisor:', error);
    res.status(500).json({ error: 'Failed to delete supervisor' });
  }
});

// =====================================
// HOUSEHOLD ROUTES
// =====================================

// GET /api/household - Retrieve all households using cursor
router.get('/household', async (req, res) => {
  try {
    const households = await databaseService.getAllHouseholds();
    res.json(households);
  } catch (error) {
    console.error('Error retrieving households:', error);
    res.status(500).json({ error: 'Failed to retrieve households' });
  }
});

// POST /api/household - Insert household using stored procedure
router.post('/household', async (req, res) => {
  try {
    const result = await databaseService.insertHousehold(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error inserting household:', error);
    res.status(500).json({ error: 'Failed to insert household' });
  }
});

// PUT /api/household/:id - Update household using stored procedure
router.put('/household/:id', async (req, res) => {
  try {
    const result = await databaseService.updateHousehold(parseInt(req.params.id), req.body);
    res.json(result);
  } catch (error) {
    console.error('Error updating household:', error);
    res.status(500).json({ error: 'Failed to update household' });
  }
});

// DELETE /api/household/:id - Delete household using stored procedure
router.delete('/household/:id', async (req, res) => {
  try {
    const result = await databaseService.deleteHousehold(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    console.error('Error deleting household:', error);
    res.status(500).json({ error: 'Failed to delete household' });
  }
});

// =====================================
// PERSON ROUTES
// =====================================

// GET /api/person - Retrieve all persons using cursor
router.get('/person', async (req, res) => {
  try {
    const persons = await databaseService.getAllPersons();
    res.json(persons);
  } catch (error) {
    console.error('Error retrieving persons:', error);
    res.status(500).json({ error: 'Failed to retrieve persons' });
  }
});

// POST /api/person - Insert person using stored procedure
router.post('/person', async (req, res) => {
  try {
    const result = await databaseService.insertPerson(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error inserting person:', error);
    res.status(500).json({ error: 'Failed to insert person' });
  }
});

// PUT /api/person/:id - Update person using stored procedure
router.put('/person/:id', async (req, res) => {
  try {
    const result = await databaseService.updatePerson(parseInt(req.params.id), req.body);
    res.json(result);
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ error: 'Failed to update person' });
  }
});

// DELETE /api/person/:id - Delete person using stored procedure
router.delete('/person/:id', async (req, res) => {
  try {
    const result = await databaseService.deletePerson(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Failed to delete person' });
  }
});

// =====================================
// COMPLEX QUERY ROUTES (JOIN STATEMENTS)
// =====================================

// GET /api/query/complex - Execute complex queries with joins
router.post('/query/complex', async (req, res) => {
  try {
    const { queryType, params } = req.body;
    
    let result;
    switch (queryType) {
      case 'census_summary_by_region':
        result = await databaseService.getCensusSummaryByRegion();
        break;
      case 'household_details':
        result = await databaseService.getHouseholdDetails(params.household_id);
        break;
      default:
        return res.status(400).json({ error: 'Invalid query type' });
    }
    
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error executing complex query:', error);
    res.status(500).json({ error: 'Failed to execute complex query' });
  }
});

// =====================================
// GENERIC TABLE ROUTES (for other tables)
// =====================================

// Generic route handler for other tables
const genericTableHandler = (tableName) => {
  return {
    // GET - Retrieve all records
    get: async (req, res) => {
      try {
        // For now, return empty array for tables not yet implemented
        res.json([]);
      } catch (error) {
        console.error(`Error retrieving ${tableName}:`, error);
        res.status(500).json({ error: `Failed to retrieve ${tableName}` });
      }
    },
    
    // POST - Insert record
    post: async (req, res) => {
      try {
        res.status(501).json({ error: `${tableName} operations not yet implemented` });
      } catch (error) {
        console.error(`Error inserting ${tableName}:`, error);
        res.status(500).json({ error: `Failed to insert ${tableName}` });
      }
    },
    
    // PUT - Update record
    put: async (req, res) => {
      try {
        res.status(501).json({ error: `${tableName} operations not yet implemented` });
      } catch (error) {
        console.error(`Error updating ${tableName}:`, error);
        res.status(500).json({ error: `Failed to update ${tableName}` });
      }
    },
    
    // DELETE - Delete record
    delete: async (req, res) => {
      try {
        res.status(501).json({ error: `${tableName} operations not yet implemented` });
      } catch (error) {
        console.error(`Error deleting ${tableName}:`, error);
        res.status(500).json({ error: `Failed to delete ${tableName}` });
      }
    }
  };
};

// Add routes for other tables
const otherTables = [
  'sub_district', 'enumeration_area', 'locality', 'housing_unit',
  'absent_member', 'emigrant', 'mortality_record', 'employment',
  'disability', 'agricultural_activity', 'crop_farming', 'livestock_farming'
];

otherTables.forEach(tableName => {
  const handler = genericTableHandler(tableName);
  
  router.get(`/${tableName}`, handler.get);
  router.post(`/${tableName}`, handler.post);
  router.put(`/${tableName}/:id`, handler.put);
  router.delete(`/${tableName}/:id`, handler.delete);
});

module.exports = router; 