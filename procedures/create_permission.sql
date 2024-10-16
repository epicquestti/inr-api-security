DROP FUNCTION IF EXISTS inr.create_permission;

CREATE OR REPLACE FUNCTION inr.create_permission (
  permissionUserId INTEGER,
  permissionFeatureId INTEGER,
  permissionCreatedBy INTEGER,
  actions INTEGER[]
) RETURNS INTEGER
AS $$
DECLARE
  actionId INTEGER;
BEGIN
  FOREACH actionId IN ARRAY actions LOOP
    INSERT INTO inr."Permission" (
      "actionId",
      "featureId",
      "userId",
      "createdById",
      "createdAt"
    ) VALUES (
      actionId,
      permissionFeatureId,
      permissionUserId,
      permissionCreatedBy,
      now()
    );
  END LOOP;
  RETURN 1;
END;
$$ LANGUAGE plpgsql;