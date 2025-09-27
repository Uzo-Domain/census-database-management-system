INSERT INTO region (region_name, region_code) VALUES ('Greater Accra', '01');
INSERT INTO region (region_name, region_code) VALUES ('Ashanti', '02');

-- Sample District
INSERT INTO district (district_name, district_type, region_id) 
VALUES ('Accra Metropolis', 'Metropolitan', 1);

-- Sample Sub-District
INSERT INTO sub_district (sub_district_name, district_id)
VALUES ('Ablekuma', 1);

-- Sample Enumeration Area
INSERT INTO enumeration_area (ea_code, ea_type, sub_district_id)
VALUES ('EA001', 'Urban', 1);

-- Sample Locality
INSERT INTO locality (locality_name, locality_code, ea_id)
VALUES ('Mamprobi', 'LOC001', 1);

-- Sample Enumerator and Supervisor
INSERT INTO enumerator (enumerator_name, phone_number, signature, employee_id)
VALUES ('John Doe', '0240000001', 'signature1.png', 'EMP001');

INSERT INTO supervisor (supervisor_name, phone_number, signature, employee_id)
VALUES ('Jane Smith', '0240000002', 'signature2.png', 'SUP001');

-- Sample Housing Unit
INSERT INTO housing_unit (
    structure_number, detailed_address, dwelling_type, outer_wall_material,
    roof_material, floor_material, ownership_type, tenure_arrangement,
    total_rooms, sleeping_rooms, shared_sleeping_room, households_sharing,
    lighting_source, drinking_water_source, domestic_water_source,
    cooking_fuel, cooking_space_type, bathing_facility, toilet_facility,
    shared_toilet, households_using_toilet, solid_waste_disposal, liquid_waste_disposal, locality_id
) VALUES (
    'A10', '123 Palm Street, Mamprobi', '01', '03', '02', '04', '01', '02',
    4, 2, 'N', 1, '01', '02', '02', '01', '01', '03', '02', '01', 1, '02', '01', 1
);

-- Sample Household
INSERT INTO household (
    household_number, questionnaire_id, nis_ecg_vra_number, contact_phone1,
    contact_phone2, date_started, date_completed, total_visits, form_number,
    residence_type, occupied_members_male, occupied_members_female,
    visitor_members_male, visitor_members_female, absent_members_male,
    absent_members_female, total_status_ab_male, total_status_ab_female,
    has_fixed_phone, has_computer, has_deaths_past_12_months, engages_agriculture,
    male_farmers, female_farmers, housing_unit_id, enumerator_id, supervisor_id
) VALUES (
    '001', 'QST001', '1234567890', '0241234567', '0201234567',
    TO_DATE('2025-07-01', 'YYYY-MM-DD'), TO_DATE('2025-07-03', 'YYYY-MM-DD'),
    1, 'F001', '1', 2, 2, 0, 0, 1, 1, 2, 2,
    'Y', 'Y', 'N', 'Y', 1, 1, 1, 1, 1
);

-- Sample Person
INSERT INTO person (
    person_line_number, full_name, relationship_to_head, sex, member_status,
    date_of_birth, age, nationality, ethnicity, born_in_current_location,
    birthplace_region_country, lived_here_since_birth, years_in_current_location,
    religion, marital_status, literacy_languages, ever_attended_school,
    highest_education_level, highest_grade_completed, owns_mobile_phone,
    uses_internet, children_ever_born_male, children_ever_born_female,
    children_surviving_male, children_surviving_female,
    children_born_past_12_months_male, children_born_past_12_months_female,
    household_id
) VALUES (
    '01', 'Akosua Mensah', '01', 'F', 'A',
    TO_DATE('1990-06-15', 'YYYY-MM-DD'), 35, '01', '001', 'Y',
    '01', 'Y', 35, '01', '02', '01', '01', '04', 12,
    'Y', 'Y', 1, 1, 1, 1, 0, 0, 1
);

COMMIT;
