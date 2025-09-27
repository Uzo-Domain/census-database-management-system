-- =====================================
-- 10_constraints_indexes.sql
-- =====================================
ALTER TABLE household ADD CONSTRAINT chk_date_consistency
CHECK (date_started <= date_completed);

ALTER TABLE household ADD CONSTRAINT chk_status_ab_male
CHECK (total_status_ab_male = occupied_members_male + visitor_members_male);

ALTER TABLE household ADD CONSTRAINT chk_status_ab_female
CHECK (total_status_ab_female = occupied_members_female + visitor_members_female);

CREATE INDEX idx_housing_structure_number ON housing_unit(structure_number);
CREATE INDEX idx_household_number ON household(household_number);
CREATE INDEX idx_person_name ON person(full_name);
CREATE INDEX idx_person_age ON person(age);
CREATE INDEX idx_employment_occupation_code ON employment(occupation_code);

