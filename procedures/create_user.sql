DROP FUNCTION IF EXISTS inr.create_user;

CREATE OR REPLACE FUNCTION inr.create_user (
  userSuper BOOLEAN,
  userGroupId INTEGER,
  userPassword VARCHAR(500),
  userActive BOOLEAN,
  userCreatedBy INTEGER,
  userName VARCHAR(200),
  userEmail VARCHAR(200),
  userRg VARCHAR(200),
  userCpf VARCHAR(200),
  userCellphone VARCHAR(200),
  userAddress JSONB
) RETURNS INTEGER
AS $$
DECLARE
  user_id INTEGER;
  address_id INTEGER;
BEGIN

  INSERT INTO inr."User" (
    super,
    "groupId",
    password,
    "needChange",
    active,
    connected,
    "createdById",
    "createdAt"
  ) VALUES (
    userSuper,
    userGroupId,
    userPassword,
    true,
    userActive,
    true,
    userCreatedBy,
    now()
  ) RETURNING id INTO user_id;

  CASE WHEN (userAddress IS NOT NULL) THEN
    INSERT INTO inr."Address"(
      cep, 
      street, 
      "streetNumber", 
      neighborhood, 
      "cityIbge", 
      observation, 
      "createdById", 
      "createdAt" 
    ) VALUES (
      userAddress->>'cep',
      userAddress->>'street',
      userAddress->>'streetNumber',
      userAddress->>'neighborhood',
      CAST(userAddress->>'cityIbge' as INT),
      userAddress->>'observation',
      userCreatedBy,
      now()
    ) RETURNING id INTO address_id;    
    
    INSERT INTO inr."Profile" (
      name,
      email,
      rg,
      cpf,
      cellphone,      
      "addressId",
      "userId"
    ) VALUES (
      userName,
      userEmail,
      userRg,
      userCpf,
      userCellphone,
      address_id,
      user_id
    );
  ELSE
    INSERT INTO inr."Profile" (
      name,
      email,
      rg,
      cpf,
      cellphone,
      "userId"
    ) VALUES (
      userName,
      userEmail,
      userRg,
      userCpf,
      userCellphone,
      user_id
    );
  END CASE;
  RETURN user_id;
COMMIT;
END;
$$ LANGUAGE plpgsql;