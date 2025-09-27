-- =====================================
-- STORED PROCEDURES FOR CENSUS DATABASE
-- =====================================

-- =====================================
-- REGION TABLE PROCEDURES
-- =====================================

-- Insert Region using stored procedure
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
/

-- Update Region using stored procedure
CREATE OR REPLACE PROCEDURE UPDATE_REGION(
  p_region_id IN NUMBER,
  p_region_name IN VARCHAR2,
  p_region_code IN VARCHAR2
) AS
BEGIN
  UPDATE region 
  SET region_name = p_region_name, region_code = p_region_code
  WHERE region_id = p_region_id;
  COMMIT;
END;
/

-- Delete Region using stored procedure
CREATE OR REPLACE PROCEDURE DELETE_REGION(
  p_region_id IN NUMBER
) AS
BEGIN
  DELETE FROM region WHERE region_id = p_region_id;
  COMMIT;
END;
/

-- =====================================
-- DISTRICT TABLE PROCEDURES
-- =====================================

-- Insert District using stored procedure
CREATE OR REPLACE PROCEDURE INSERT_DISTRICT(
  p_district_name IN VARCHAR2,
  p_district_type IN VARCHAR2,
  p_region_id IN NUMBER,
  p_district_id OUT NUMBER
) AS
BEGIN
  INSERT INTO district (district_name, district_type, region_id)
  VALUES (p_district_name, p_district_type, p_region_id)
  RETURNING district_id INTO p_district_id;
  COMMIT;
END;
/

-- Update District using stored procedure
CREATE OR REPLACE PROCEDURE UPDATE_DISTRICT(
  p_district_id IN NUMBER,
  p_district_name IN VARCHAR2,
  p_district_type IN VARCHAR2,
  p_region_id IN NUMBER
) AS
BEGIN
  UPDATE district 
  SET district_name = p_district_name, district_type = p_district_type, region_id = p_region_id
  WHERE district_id = p_district_id;
  COMMIT;
END;
/

-- Delete District using stored procedure
CREATE OR REPLACE PROCEDURE DELETE_DISTRICT(
  p_district_id IN NUMBER
) AS
BEGIN
  DELETE FROM district WHERE district_id = p_district_id;
  COMMIT;
END;
/

-- =====================================
-- ENUMERATOR TABLE PROCEDURES
-- =====================================

-- Insert Enumerator using stored procedure
CREATE OR REPLACE PROCEDURE INSERT_ENUMERATOR(
  p_enumerator_name IN VARCHAR2,
  p_phone_number IN VARCHAR2,
  p_signature IN VARCHAR2,
  p_employee_id IN VARCHAR2,
  p_enumerator_id OUT NUMBER
) AS
BEGIN
  INSERT INTO enumerator (enumerator_name, phone_number, signature, employee_id)
  VALUES (p_enumerator_name, p_phone_number, p_signature, p_employee_id)
  RETURNING enumerator_id INTO p_enumerator_id;
  COMMIT;
END;
/

-- Update Enumerator using stored procedure
CREATE OR REPLACE PROCEDURE UPDATE_ENUMERATOR(
  p_enumerator_id IN NUMBER,
  p_enumerator_name IN VARCHAR2,
  p_phone_number IN VARCHAR2,
  p_signature IN VARCHAR2,
  p_employee_id IN VARCHAR2
) AS
BEGIN
  UPDATE enumerator 
  SET enumerator_name = p_enumerator_name, phone_number = p_phone_number, 
      signature = p_signature, employee_id = p_employee_id
  WHERE enumerator_id = p_enumerator_id;
  COMMIT;
END;
/

-- Delete Enumerator using stored procedure
CREATE OR REPLACE PROCEDURE DELETE_ENUMERATOR(
  p_enumerator_id IN NUMBER
) AS
BEGIN
  DELETE FROM enumerator WHERE enumerator_id = p_enumerator_id;
  COMMIT;
END;
/

-- =====================================
-- SUPERVISOR TABLE PROCEDURES
-- =====================================

-- Insert Supervisor using stored procedure
CREATE OR REPLACE PROCEDURE INSERT_SUPERVISOR(
  p_supervisor_name IN VARCHAR2,
  p_phone_number IN VARCHAR2,
  p_signature IN VARCHAR2,
  p_employee_id IN VARCHAR2,
  p_supervisor_id OUT NUMBER
) AS
BEGIN
  INSERT INTO supervisor (supervisor_name, phone_number, signature, employee_id)
  VALUES (p_supervisor_name, p_phone_number, p_signature, p_employee_id)
  RETURNING supervisor_id INTO p_supervisor_id;
  COMMIT;
END;
/

-- Update Supervisor using stored procedure
CREATE OR REPLACE PROCEDURE UPDATE_SUPERVISOR(
  p_supervisor_id IN NUMBER,
  p_supervisor_name IN VARCHAR2,
  p_phone_number IN VARCHAR2,
  p_signature IN VARCHAR2,
  p_employee_id IN VARCHAR2
) AS
BEGIN
  UPDATE supervisor 
  SET supervisor_name = p_supervisor_name, phone_number = p_phone_number, 
      signature = p_signature, employee_id = p_employee_id
  WHERE supervisor_id = p_supervisor_id;
  COMMIT;
END;
/

-- Delete Supervisor using stored procedure
CREATE OR REPLACE PROCEDURE DELETE_SUPERVISOR(
  p_supervisor_id IN NUMBER
) AS
BEGIN
  DELETE FROM supervisor WHERE supervisor_id = p_supervisor_id;
  COMMIT;
END;
/

-- =====================================
-- HOUSEHOLD TABLE PROCEDURES
-- =====================================

-- Insert Household using stored procedure
CREATE OR REPLACE PROCEDURE INSERT_HOUSEHOLD(
  p_household_number IN VARCHAR2,
  p_questionnaire_id IN VARCHAR2,
  p_contact_phone1 IN VARCHAR2,
  p_occupied_members_male IN NUMBER,
  p_occupied_members_female IN NUMBER,
  p_has_fixed_phone IN CHAR,
  p_has_computer IN CHAR,
  p_engages_agriculture IN CHAR,
  p_housing_unit_id IN NUMBER,
  p_enumerator_id IN NUMBER,
  p_supervisor_id IN NUMBER,
  p_household_id OUT NUMBER
) AS
BEGIN
  INSERT INTO household (
    household_number, questionnaire_id, contact_phone1, 
    occupied_members_male, occupied_members_female,
    has_fixed_phone, has_computer, engages_agriculture,
    housing_unit_id, enumerator_id, supervisor_id
  )
  VALUES (
    p_household_number, p_questionnaire_id, p_contact_phone1,
    p_occupied_members_male, p_occupied_members_female,
    p_has_fixed_phone, p_has_computer, p_engages_agriculture,
    p_housing_unit_id, p_enumerator_id, p_supervisor_id
  )
  RETURNING household_id INTO p_household_id;
  COMMIT;
END;
/

-- Update Household using stored procedure
CREATE OR REPLACE PROCEDURE UPDATE_HOUSEHOLD(
  p_household_id IN NUMBER,
  p_household_number IN VARCHAR2,
  p_questionnaire_id IN VARCHAR2,
  p_contact_phone1 IN VARCHAR2,
  p_occupied_members_male IN NUMBER,
  p_occupied_members_female IN NUMBER,
  p_has_fixed_phone IN CHAR,
  p_has_computer IN CHAR,
  p_engages_agriculture IN CHAR,
  p_housing_unit_id IN NUMBER,
  p_enumerator_id IN NUMBER,
  p_supervisor_id IN NUMBER
) AS
BEGIN
  UPDATE household 
  SET household_number = p_household_number, questionnaire_id = p_questionnaire_id,
      contact_phone1 = p_contact_phone1, occupied_members_male = p_occupied_members_male,
      occupied_members_female = p_occupied_members_female, has_fixed_phone = p_has_fixed_phone,
      has_computer = p_has_computer, engages_agriculture = p_engages_agriculture,
      housing_unit_id = p_housing_unit_id, enumerator_id = p_enumerator_id,
      supervisor_id = p_supervisor_id
  WHERE household_id = p_household_id;
  COMMIT;
END;
/

-- Delete Household using stored procedure
CREATE OR REPLACE PROCEDURE DELETE_HOUSEHOLD(
  p_household_id IN NUMBER
) AS
BEGIN
  DELETE FROM household WHERE household_id = p_household_id;
  COMMIT;
END;
/

-- =====================================
-- PERSON TABLE PROCEDURES
-- =====================================

-- Insert Person using stored procedure
CREATE OR REPLACE PROCEDURE INSERT_PERSON(
  p_person_line_number IN VARCHAR2,
  p_full_name IN VARCHAR2,
  p_relationship_to_head IN VARCHAR2,
  p_sex IN CHAR,
  p_age IN NUMBER,
  p_marital_status IN VARCHAR2,
  p_owns_mobile_phone IN CHAR,
  p_uses_internet IN CHAR,
  p_household_id IN NUMBER,
  p_person_id OUT NUMBER
) AS
BEGIN
  INSERT INTO person (
    person_line_number, full_name, relationship_to_head, sex, age,
    marital_status, owns_mobile_phone, uses_internet, household_id
  )
  VALUES (
    p_person_line_number, p_full_name, p_relationship_to_head, p_sex, p_age,
    p_marital_status, p_owns_mobile_phone, p_uses_internet, p_household_id
  )
  RETURNING person_id INTO p_person_id;
  COMMIT;
END;
/

-- Update Person using stored procedure
CREATE OR REPLACE PROCEDURE UPDATE_PERSON(
  p_person_id IN NUMBER,
  p_person_line_number IN VARCHAR2,
  p_full_name IN VARCHAR2,
  p_relationship_to_head IN VARCHAR2,
  p_sex IN CHAR,
  p_age IN NUMBER,
  p_marital_status IN VARCHAR2,
  p_owns_mobile_phone IN CHAR,
  p_uses_internet IN CHAR,
  p_household_id IN NUMBER
) AS
BEGIN
  UPDATE person 
  SET person_line_number = p_person_line_number, full_name = p_full_name,
      relationship_to_head = p_relationship_to_head, sex = p_sex, age = p_age,
      marital_status = p_marital_status, owns_mobile_phone = p_owns_mobile_phone,
      uses_internet = p_uses_internet, household_id = p_household_id
  WHERE person_id = p_person_id;
  COMMIT;
END;
/

-- Delete Person using stored procedure
CREATE OR REPLACE PROCEDURE DELETE_PERSON(
  p_person_id IN NUMBER
) AS
BEGIN
  DELETE FROM person WHERE person_id = p_person_id;
  COMMIT;
END;
/ 