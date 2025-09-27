-- =====================================
-- 11_triggers.sql (Conditional Logic)
-- =====================================

-- Example trigger: Ensure fertility-related fields only filled for females aged 12+
CREATE OR REPLACE TRIGGER trg_check_fertility_fields
BEFORE INSERT OR UPDATE ON person
FOR EACH ROW
BEGIN
    IF :NEW.sex = 'F' AND :NEW.age < 12 THEN
        IF :NEW.children_ever_born_male IS NOT NULL OR :NEW.children_ever_born_female IS NOT NULL THEN
            RAISE_APPLICATION_ERROR(-20001, 'Fertility data only allowed for females aged 12 and above.');
        END IF;
    END IF;
END;
/


-- Example trigger: Ensure maternal death info applies to females aged 12–54
CREATE OR REPLACE TRIGGER trg_check_maternal_death
BEFORE INSERT OR UPDATE ON mortality_record
FOR EACH ROW
BEGIN
    IF :NEW.sex = 'F' AND :NEW.maternal_death = 'Y' THEN
        IF :NEW.age_at_death < 12 OR :NEW.age_at_death > 54 THEN
            RAISE_APPLICATION_ERROR(-20002, 'Maternal death should be within age range 12–54.');
        END IF;
    END IF;
END;
/

-- Example trigger: Prevent zero farm size when crop type is filled
CREATE OR REPLACE TRIGGER trg_crop_size_check
BEFORE INSERT OR UPDATE ON crop_farming
FOR EACH ROW
BEGIN
    IF :NEW.crop_type IS NOT NULL AND (:NEW.farm_size IS NULL OR :NEW.farm_size <= 0) THEN
        RAISE_APPLICATION_ERROR(-20003, 'Farm size must be positive when crop is specified.');
    END IF;
END;
/
