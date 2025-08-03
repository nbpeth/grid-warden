const { Pool } = require("pg");
const uuid = require("uuid");

const DB_CONNECTION_STRING = process.env.DATABASE_URL;

const dbConnectionProperties = {
  connectionString: DB_CONNECTION_STRING,
  ...(process.env.ENV === "production"
    ? { ssl: { rejectUnauthorized: false } }
    : { ssl: false }),
};

let pool;
try {
  console.log("opening up db connection pool");
  pool = new Pool({
    ...dbConnectionProperties,
  });
} catch (err) {
  console.error("could not connect to db!", err);
  throw err;
}

const executeQuery = async ({ query, values }) => {
  try {
    const client = await pool.connect();

    const result = await client.query(query, values);
    client.release();

    return result.rows;
  } catch (err) {
    console.error(err.stack);
  }
};

const listUserMatrices = async () => {
  const query =
    "select id, username, matrix_name, updated_date from user_matrices order by updated_date desc;";

  const result = await executeQuery({ query });

  return result;
};

const getMatrixById = async (id) => {
  const query = "select * from user_matrices where id=$1;";

  const result = await executeQuery({ query, values: [id] });

  return result;
};

const deleteMatrixById = async (id) => {
  const query = "delete from user_matrices where id=$1;";

  const result = await executeQuery({ query, values: [id] });

  return result;
};

const saveUserMatrix = async ({ userName, projectName, data, colorPalette }) => {
  const query =
    "insert into user_matrices (username, matrix_name, matrix_data, color_palette, updated_date) values ($1, $2, $3, $4, NOW()) RETURNING *;";

  const result = await executeQuery({
    query,
    values: [userName, projectName, JSON.stringify(data), JSON.stringify(colorPalette)],
  });

  return result;
};

const saveUpdateUserMatrix = async ({ userName, projectName, data, id }) => {
  const query =
    "update user_matrices set username=$1, matrix_name=$2, matrix_data=$3, updated_date=NOW() where id=$4  RETURNING *;";

  const result = await executeQuery({
    query,
    values: [userName, projectName, JSON.stringify(data), id],
  });

  return result;
};

module.exports = {
  deleteMatrixById,
  getMatrixById,
  listUserMatrices,
  saveUserMatrix,
  saveUpdateUserMatrix,
};
