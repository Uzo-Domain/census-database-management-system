-- =====================================
-- CURSORS FOR CENSUS DATABASE
-- =====================================

-- =====================================
-- REGION CURSORS
-- =====================================

-- Get all regions using cursor
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
/

-- Get region by ID using cursor
CREATE OR REPLACE FUNCTION GET_REGION_BY_ID(
  p_region_id IN NUMBER
)
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT region_id, region_name, region_code
    FROM region
    WHERE region_id = p_region_id;
  RETURN v_cursor;
END;
/

-- =====================================
-- DISTRICT CURSORS
-- =====================================

-- Get all districts using cursor
CREATE OR REPLACE FUNCTION GET_ALL_DISTRICTS
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT d.district_id, d.district_name, d.district_type, 
           d.region_id, r.region_name
    FROM district d
    LEFT JOIN region r ON d.region_id = r.region_id
    ORDER BY d.district_name;
  RETURN v_cursor;
END;
/

-- Get districts by region using cursor
CREATE OR REPLACE FUNCTION GET_DISTRICTS_BY_REGION(
  p_region_id IN NUMBER
)
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT d.district_id, d.district_name, d.district_type, 
           d.region_id, r.region_name
    FROM district d
    LEFT JOIN region r ON d.region_id = r.region_id
    WHERE d.region_id = p_region_id
    ORDER BY d.district_name;
  RETURN v_cursor;
END;
/

-- =====================================
-- ENUMERATOR CURSORS
-- =====================================

-- Get all enumerators using cursor
CREATE OR REPLACE FUNCTION GET_ALL_ENUMERATORS
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT enumerator_id, enumerator_name, phone_number, signature, employee_id
    FROM enumerator
    ORDER BY enumerator_name;
  RETURN v_cursor;
END;
/

-- Get enumerator by ID using cursor
CREATE OR REPLACE FUNCTION GET_ENUMERATOR_BY_ID(
  p_enumerator_id IN NUMBER
)
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT enumerator_id, enumerator_name, phone_number, signature, employee_id
    FROM enumerator
    WHERE enumerator_id = p_enumerator_id;
  RETURN v_cursor;
END;
/

-- =====================================
-- SUPERVISOR CURSORS
-- =====================================

-- Get all supervisors using cursor
CREATE OR REPLACE FUNCTION GET_ALL_SUPERVISORS
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT supervisor_id, supervisor_name, phone_number, signature, employee_id
    FROM supervisor
    ORDER BY supervisor_name;
  RETURN v_cursor;
END;
/

-- Get supervisor by ID using cursor
CREATE OR REPLACE FUNCTION GET_SUPERVISOR_BY_ID(
  p_supervisor_id IN NUMBER
)
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT supervisor_id, supervisor_name, phone_number, signature, employee_id
    FROM supervisor
    WHERE supervisor_id = p_supervisor_id;
  RETURN v_cursor;
END;
/

-- =====================================
-- HOUSEHOLD CURSORS
-- =====================================

-- Get all households using cursor
CREATE OR REPLACE FUNCTION GET_ALL_HOUSEHOLDS
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT h.household_id, h.household_number, h.questionnaire_id, 
           h.contact_phone1, h.occupied_members_male, h.occupied_members_female,
           h.has_fixed_phone, h.has_computer, h.engages_agriculture,
           h.housing_unit_id, h.enumerator_id, h.supervisor_id,
           e.enumerator_name, s.supervisor_name
    FROM household h
    LEFT JOIN enumerator e ON h.enumerator_id = e.enumerator_id
    LEFT JOIN supervisor s ON h.supervisor_id = s.supervisor_id
    ORDER BY h.household_number;
  RETURN v_cursor;
END;
/

-- Get household by ID using cursor
CREATE OR REPLACE FUNCTION GET_HOUSEHOLD_BY_ID(
  p_household_id IN NUMBER
)
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT h.household_id, h.household_number, h.questionnaire_id, 
           h.contact_phone1, h.occupied_members_male, h.occupied_members_female,
           h.has_fixed_phone, h.has_computer, h.engages_agriculture,
           h.housing_unit_id, h.enumerator_id, h.supervisor_id,
           e.enumerator_name, s.supervisor_name
    FROM household h
    LEFT JOIN enumerator e ON h.enumerator_id = e.enumerator_id
    LEFT JOIN supervisor s ON h.supervisor_id = s.supervisor_id
    WHERE h.household_id = p_household_id;
  RETURN v_cursor;
END;
/

-- =====================================
-- PERSON CURSORS
-- =====================================

-- Get all persons using cursor
CREATE OR REPLACE FUNCTION GET_ALL_PERSONS
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT p.person_id, p.person_line_number, p.full_name, 
           p.relationship_to_head, p.sex, p.age, p.marital_status,
           p.owns_mobile_phone, p.uses_internet, p.household_id,
           h.household_number
    FROM person p
    LEFT JOIN household h ON p.household_id = h.household_id
    ORDER BY p.full_name;
  RETURN v_cursor;
END;
/

-- Get persons by household using cursor
CREATE OR REPLACE FUNCTION GET_PERSONS_BY_HOUSEHOLD(
  p_household_id IN NUMBER
)
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT p.person_id, p.person_line_number, p.full_name, 
           p.relationship_to_head, p.sex, p.age, p.marital_status,
           p.owns_mobile_phone, p.uses_internet, p.household_id,
           h.household_number
    FROM person p
    LEFT JOIN household h ON p.household_id = h.household_id
    WHERE p.household_id = p_household_id
    ORDER BY p.person_line_number;
  RETURN v_cursor;
END;
/

-- =====================================
-- COMPLEX QUERY CURSORS (JOIN STATEMENTS)
-- =====================================

-- Get household details with all related information using cursor
CREATE OR REPLACE FUNCTION GET_HOUSEHOLD_DETAILS(
  p_household_id IN NUMBER
)
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT 
      h.household_id, h.household_number, h.questionnaire_id,
      h.contact_phone1, h.occupied_members_male, h.occupied_members_female,
      h.has_fixed_phone, h.has_computer, h.engages_agriculture,
      e.enumerator_name, e.phone_number as enumerator_phone,
      s.supervisor_name, s.phone_number as supervisor_phone,
      hu.structure_number, hu.detailed_address,
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
/

-- Get census summary by region using cursor
CREATE OR REPLACE FUNCTION GET_CENSUS_SUMMARY_BY_REGION
RETURN SYS_REFCURSOR AS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT 
      r.region_name,
      COUNT(DISTINCT d.district_id) as total_districts,
      COUNT(DISTINCT h.household_id) as total_households,
      COUNT(p.person_id) as total_persons,
      SUM(CASE WHEN p.sex = 'M' THEN 1 ELSE 0 END) as total_males,
      SUM(CASE WHEN p.sex = 'F' THEN 1 ELSE 0 END) as total_females,
      AVG(p.age) as average_age
    FROM region r
    LEFT JOIN district d ON r.region_id = d.region_id
    LEFT JOIN sub_district sd ON d.district_id = sd.district_id
    LEFT JOIN enumeration_area ea ON sd.sub_district_id = ea.sub_district_id
    LEFT JOIN locality l ON ea.ea_id = l.ea_id
    LEFT JOIN housing_unit hu ON l.locality_id = hu.locality_id
    LEFT JOIN household h ON hu.housing_unit_id = h.housing_unit_id
    LEFT JOIN person p ON h.household_id = p.household_id
    GROUP BY r.region_id, r.region_name
    ORDER BY r.region_name;
  RETURN v_cursor;
END;
/ 