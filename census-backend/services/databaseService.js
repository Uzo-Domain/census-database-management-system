const { getConnection, closeConnection, oracledb } = require('../database/connection');

class DatabaseService {
  // =====================================
  // REGION OPERATIONS
  // =====================================

  // Insert region using stored procedure
  async insertRegion(regionData) {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `BEGIN 
           INSERT_REGION(:region_name, :region_code, :region_id);
         END;`,
        {
          region_name: regionData.region_name,
          region_code: regionData.region_code,
          region_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        }
      );

      return { success: true, region_id: result.outBinds.region_id[0] };
    } catch (error) {
      console.error('Error inserting region:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Update region using stored procedure
  async updateRegion(regionId, regionData) {
    let connection;
    try {
      connection = await getConnection();
      
      await connection.execute(
        `BEGIN 
           UPDATE_REGION(:region_id, :region_name, :region_code);
         END;`,
        {
          region_id: regionId,
          region_name: regionData.region_name,
          region_code: regionData.region_code
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Error updating region:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Delete region using stored procedure
  async deleteRegion(regionId) {
    let connection;
    try {
      connection = await getConnection();
      
      await connection.execute(
        `BEGIN 
           DELETE_REGION(:region_id);
         END;`,
        { region_id: regionId }
      );

      return { success: true };
    } catch (error) {
      console.error('Error deleting region:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Get all regions using cursor
  async getAllRegions() {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `SELECT GET_ALL_REGIONS() FROM DUAL`
      );

      const cursor = result.rows[0][0];
      const regions = [];
      let row;
      
      while ((row = await cursor.getRow())) {
        regions.push({
          region_id: row[0],
          region_name: row[1],
          region_code: row[2]
        });
      }
      
      await cursor.close();
      return regions;
    } catch (error) {
      console.error('Error getting regions:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // =====================================
  // DISTRICT OPERATIONS
  // =====================================

  // Insert district using stored procedure
  async insertDistrict(districtData) {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `BEGIN 
           INSERT_DISTRICT(:district_name, :district_type, :region_id, :district_id);
         END;`,
        {
          district_name: districtData.district_name,
          district_type: districtData.district_type,
          region_id: districtData.region_id,
          district_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        }
      );

      return { success: true, district_id: result.outBinds.district_id[0] };
    } catch (error) {
      console.error('Error inserting district:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Update district using stored procedure
  async updateDistrict(districtId, districtData) {
    let connection;
    try {
      connection = await getConnection();
      
      await connection.execute(
        `BEGIN 
           UPDATE_DISTRICT(:district_id, :district_name, :district_type, :region_id);
         END;`,
        {
          district_id: districtId,
          district_name: districtData.district_name,
          district_type: districtData.district_type,
          region_id: districtData.region_id
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Error updating district:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Delete district using stored procedure
  async deleteDistrict(districtId) {
    let connection;
    try {
      connection = await getConnection();
      
      await connection.execute(
        `BEGIN 
           DELETE_DISTRICT(:district_id);
         END;`,
        { district_id: districtId }
      );

      return { success: true };
    } catch (error) {
      console.error('Error deleting district:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Get all districts using cursor
  async getAllDistricts() {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `SELECT GET_ALL_DISTRICTS() FROM DUAL`
      );

      const cursor = result.rows[0][0];
      const districts = [];
      let row;
      
      while ((row = await cursor.getRow())) {
        districts.push({
          district_id: row[0],
          district_name: row[1],
          district_type: row[2],
          region_id: row[3],
          region_name: row[4]
        });
      }
      
      await cursor.close();
      return districts;
    } catch (error) {
      console.error('Error getting districts:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // =====================================
  // ENUMERATOR OPERATIONS
  // =====================================

  // Insert enumerator using stored procedure
  async insertEnumerator(enumeratorData) {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `BEGIN 
           INSERT_ENUMERATOR(:enumerator_name, :phone_number, :signature, :employee_id, :enumerator_id);
         END;`,
        {
          enumerator_name: enumeratorData.enumerator_name,
          phone_number: enumeratorData.phone_number,
          signature: enumeratorData.signature,
          employee_id: enumeratorData.employee_id,
          enumerator_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        }
      );

      return { success: true, enumerator_id: result.outBinds.enumerator_id[0] };
    } catch (error) {
      console.error('Error inserting enumerator:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Update enumerator using stored procedure
  async updateEnumerator(enumeratorId, enumeratorData) {
    let connection;
    try {
      connection = await getConnection();
      
      await connection.execute(
        `BEGIN 
           UPDATE_ENUMERATOR(:enumerator_id, :enumerator_name, :phone_number, :signature, :employee_id);
         END;`,
        {
          enumerator_id: enumeratorId,
          enumerator_name: enumeratorData.enumerator_name,
          phone_number: enumeratorData.phone_number,
          signature: enumeratorData.signature,
          employee_id: enumeratorData.employee_id
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Error updating enumerator:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Delete enumerator using stored procedure
  async deleteEnumerator(enumeratorId) {
    let connection;
    try {
      connection = await getConnection();
      
      await connection.execute(
        `BEGIN 
           DELETE_ENUMERATOR(:enumerator_id);
         END;`,
        { enumerator_id: enumeratorId }
      );

      return { success: true };
    } catch (error) {
      console.error('Error deleting enumerator:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Get all enumerators using cursor
  async getAllEnumerators() {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `SELECT GET_ALL_ENUMERATORS() FROM DUAL`
      );

      const cursor = result.rows[0][0];
      const enumerators = [];
      let row;
      
      while ((row = await cursor.getRow())) {
        enumerators.push({
          enumerator_id: row[0],
          enumerator_name: row[1],
          phone_number: row[2],
          signature: row[3],
          employee_id: row[4]
        });
      }
      
      await cursor.close();
      return enumerators;
    } catch (error) {
      console.error('Error getting enumerators:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // =====================================
  // SUPERVISOR OPERATIONS
  // =====================================

  // Insert supervisor using stored procedure
  async insertSupervisor(supervisorData) {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `BEGIN 
           INSERT_SUPERVISOR(:supervisor_name, :phone_number, :signature, :employee_id, :supervisor_id);
         END;`,
        {
          supervisor_name: supervisorData.supervisor_name,
          phone_number: supervisorData.phone_number,
          signature: supervisorData.signature,
          employee_id: supervisorData.employee_id,
          supervisor_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        }
      );

      return { success: true, supervisor_id: result.outBinds.supervisor_id[0] };
    } catch (error) {
      console.error('Error inserting supervisor:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Update supervisor using stored procedure
  async updateSupervisor(supervisorId, supervisorData) {
    let connection;
    try {
      connection = await getConnection();
      
      await connection.execute(
        `BEGIN 
           UPDATE_SUPERVISOR(:supervisor_id, :supervisor_name, :phone_number, :signature, :employee_id);
         END;`,
        {
          supervisor_id: supervisorId,
          supervisor_name: supervisorData.supervisor_name,
          phone_number: supervisorData.phone_number,
          signature: supervisorData.signature,
          employee_id: supervisorData.employee_id
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Error updating supervisor:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Delete supervisor using stored procedure
  async deleteSupervisor(supervisorId) {
    let connection;
    try {
      connection = await getConnection();
      
      await connection.execute(
        `BEGIN 
           DELETE_SUPERVISOR(:supervisor_id);
         END;`,
        { supervisor_id: supervisorId }
      );

      return { success: true };
    } catch (error) {
      console.error('Error deleting supervisor:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Get all supervisors using cursor
  async getAllSupervisors() {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `SELECT GET_ALL_SUPERVISORS() FROM DUAL`
      );

      const cursor = result.rows[0][0];
      const supervisors = [];
      let row;
      
      while ((row = await cursor.getRow())) {
        supervisors.push({
          supervisor_id: row[0],
          supervisor_name: row[1],
          phone_number: row[2],
          signature: row[3],
          employee_id: row[4]
        });
      }
      
      await cursor.close();
      return supervisors;
    } catch (error) {
      console.error('Error getting supervisors:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // =====================================
  // HOUSEHOLD OPERATIONS
  // =====================================

  // Insert household using stored procedure
  async insertHousehold(householdData) {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `BEGIN 
           INSERT_HOUSEHOLD(:household_number, :questionnaire_id, :contact_phone1, 
                           :occupied_members_male, :occupied_members_female,
                           :has_fixed_phone, :has_computer, :engages_agriculture,
                           :housing_unit_id, :enumerator_id, :supervisor_id, :household_id);
         END;`,
        {
          household_number: householdData.household_number,
          questionnaire_id: householdData.questionnaire_id,
          contact_phone1: householdData.contact_phone1,
          occupied_members_male: householdData.occupied_members_male,
          occupied_members_female: householdData.occupied_members_female,
          has_fixed_phone: householdData.has_fixed_phone,
          has_computer: householdData.has_computer,
          engages_agriculture: householdData.engages_agriculture,
          housing_unit_id: householdData.housing_unit_id,
          enumerator_id: householdData.enumerator_id,
          supervisor_id: householdData.supervisor_id,
          household_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        }
      );

      return { success: true, household_id: result.outBinds.household_id[0] };
    } catch (error) {
      console.error('Error inserting household:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Update household using stored procedure
  async updateHousehold(householdId, householdData) {
    let connection;
    try {
      connection = await getConnection();
      
      await connection.execute(
        `BEGIN 
           UPDATE_HOUSEHOLD(:household_id, :household_number, :questionnaire_id, :contact_phone1, 
                           :occupied_members_male, :occupied_members_female,
                           :has_fixed_phone, :has_computer, :engages_agriculture,
                           :housing_unit_id, :enumerator_id, :supervisor_id);
         END;`,
        {
          household_id: householdId,
          household_number: householdData.household_number,
          questionnaire_id: householdData.questionnaire_id,
          contact_phone1: householdData.contact_phone1,
          occupied_members_male: householdData.occupied_members_male,
          occupied_members_female: householdData.occupied_members_female,
          has_fixed_phone: householdData.has_fixed_phone,
          has_computer: householdData.has_computer,
          engages_agriculture: householdData.engages_agriculture,
          housing_unit_id: householdData.housing_unit_id,
          enumerator_id: householdData.enumerator_id,
          supervisor_id: householdData.supervisor_id
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Error updating household:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Delete household using stored procedure
  async deleteHousehold(householdId) {
    let connection;
    try {
      connection = await getConnection();
      
      await connection.execute(
        `BEGIN 
           DELETE_HOUSEHOLD(:household_id);
         END;`,
        { household_id: householdId }
      );

      return { success: true };
    } catch (error) {
      console.error('Error deleting household:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Get all households using cursor
  async getAllHouseholds() {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `SELECT GET_ALL_HOUSEHOLDS() FROM DUAL`
      );

      const cursor = result.rows[0][0];
      const households = [];
      let row;
      
      while ((row = await cursor.getRow())) {
        households.push({
          household_id: row[0],
          household_number: row[1],
          questionnaire_id: row[2],
          contact_phone1: row[3],
          occupied_members_male: row[4],
          occupied_members_female: row[5],
          has_fixed_phone: row[6],
          has_computer: row[7],
          engages_agriculture: row[8],
          housing_unit_id: row[9],
          enumerator_id: row[10],
          supervisor_id: row[11],
          enumerator_name: row[12],
          supervisor_name: row[13]
        });
      }
      
      await cursor.close();
      return households;
    } catch (error) {
      console.error('Error getting households:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // =====================================
  // PERSON OPERATIONS
  // =====================================

  // Insert person using stored procedure
  async insertPerson(personData) {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `BEGIN 
           INSERT_PERSON(:person_line_number, :full_name, :relationship_to_head, :sex, :age,
                        :marital_status, :owns_mobile_phone, :uses_internet, :household_id, :person_id);
         END;`,
        {
          person_line_number: personData.person_line_number,
          full_name: personData.full_name,
          relationship_to_head: personData.relationship_to_head,
          sex: personData.sex,
          age: personData.age,
          marital_status: personData.marital_status,
          owns_mobile_phone: personData.owns_mobile_phone,
          uses_internet: personData.uses_internet,
          household_id: personData.household_id,
          person_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
        }
      );

      return { success: true, person_id: result.outBinds.person_id[0] };
    } catch (error) {
      console.error('Error inserting person:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Update person using stored procedure
  async updatePerson(personId, personData) {
    let connection;
    try {
      connection = await getConnection();
      
      await connection.execute(
        `BEGIN 
           UPDATE_PERSON(:person_id, :person_line_number, :full_name, :relationship_to_head, :sex, :age,
                        :marital_status, :owns_mobile_phone, :uses_internet, :household_id);
         END;`,
        {
          person_id: personId,
          person_line_number: personData.person_line_number,
          full_name: personData.full_name,
          relationship_to_head: personData.relationship_to_head,
          sex: personData.sex,
          age: personData.age,
          marital_status: personData.marital_status,
          owns_mobile_phone: personData.owns_mobile_phone,
          uses_internet: personData.uses_internet,
          household_id: personData.household_id
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Error updating person:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Delete person using stored procedure
  async deletePerson(personId) {
    let connection;
    try {
      connection = await getConnection();
      
      await connection.execute(
        `BEGIN 
           DELETE_PERSON(:person_id);
         END;`,
        { person_id: personId }
      );

      return { success: true };
    } catch (error) {
      console.error('Error deleting person:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Get all persons using cursor
  async getAllPersons() {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `SELECT GET_ALL_PERSONS() FROM DUAL`
      );

      const cursor = result.rows[0][0];
      const persons = [];
      let row;
      
      while ((row = await cursor.getRow())) {
        persons.push({
          person_id: row[0],
          person_line_number: row[1],
          full_name: row[2],
          relationship_to_head: row[3],
          sex: row[4],
          age: row[5],
          marital_status: row[6],
          owns_mobile_phone: row[7],
          uses_internet: row[8],
          household_id: row[9],
          household_number: row[10]
        });
      }
      
      await cursor.close();
      return persons;
    } catch (error) {
      console.error('Error getting persons:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // =====================================
  // COMPLEX QUERIES (JOIN STATEMENTS)
  // =====================================

  // Get census summary by region using cursor
  async getCensusSummaryByRegion() {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `SELECT GET_CENSUS_SUMMARY_BY_REGION() FROM DUAL`
      );

      const cursor = result.rows[0][0];
      const summary = [];
      let row;
      
      while ((row = await cursor.getRow())) {
        summary.push({
          region_name: row[0],
          total_districts: row[1],
          total_households: row[2],
          total_persons: row[3],
          total_males: row[4],
          total_females: row[5],
          average_age: row[6]
        });
      }
      
      await cursor.close();
      return summary;
    } catch (error) {
      console.error('Error getting census summary:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }

  // Get household details with all related information using cursor
  async getHouseholdDetails(householdId) {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `SELECT GET_HOUSEHOLD_DETAILS(:household_id) FROM DUAL`,
        { household_id: householdId }
      );

      const cursor = result.rows[0][0];
      const details = [];
      let row;
      
      while ((row = await cursor.getRow())) {
        details.push({
          household_id: row[0],
          household_number: row[1],
          questionnaire_id: row[2],
          contact_phone1: row[3],
          occupied_members_male: row[4],
          occupied_members_female: row[5],
          has_fixed_phone: row[6],
          has_computer: row[7],
          engages_agriculture: row[8],
          enumerator_name: row[9],
          enumerator_phone: row[10],
          supervisor_name: row[11],
          supervisor_phone: row[12],
          structure_number: row[13],
          detailed_address: row[14],
          locality_name: row[15],
          ea_code: row[16],
          sub_district_name: row[17],
          district_name: row[18],
          region_name: row[19]
        });
      }
      
      await cursor.close();
      return details;
    } catch (error) {
      console.error('Error getting household details:', error);
      throw error;
    } finally {
      await closeConnection(connection);
    }
  }
}

module.exports = new DatabaseService(); 