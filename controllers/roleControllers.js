const Role = require('../models/roleModel');

const createRole = async (req , res) => {
try {
   const {name} = req.body;
   
   if(name.length < 2) return res.status(200).json({
    "status": false,
    "errors": [
      {
        "param": "name",
        "message": "Name should be at least 2 characters.",
        "code": "INVALID_INPUT"
      }
    ]
  })
  const existingRole =  await Role.findOne({ where: { name } });
  if(existingRole) return res.status(400).json({
    "status": false,
     "errors" : [
        {
            "param" : "name",
            "messgae" : "This Role already exists",
            "code" : 'INVALID_INPUT'
        }
     ]
  })

  const newRole = await Role.create({name});
  return res.status(200).json({
    "status": true,
    "content": {
      "data": {
        "id": newRole.id,
        "name": newRole.name,
        "created_at": newRole.created_at,
        "updated_at": newRole.updated_at
      }
    }
  })
} catch (error) {
    return res.status(500).json({
        "status" : false,
        "error" : error.message
    })
}
}

const getRoles = async (req , res) => {
    try {
    const page = 1; // can be taken as query parameter or in req.body from the frontend
    const limit = 10; // Number of documents per page

    const offset = (page - 1) * limit;

    // Query roles with pagination
    const roles = await Role.findAndCountAll({
      limit: limit,
      offset: offset
    });

    // console.log(roles)

    // Calculate total number of pages
    const totalPages = Math.ceil(roles.count / limit);

    res.status(200).json({
      status: true,
      content: {
        meta: {
          total: roles.count,
          pages: totalPages,
          page: page
        },
        data: roles.rows
      }
    });
    } catch (error) {
        return res.status(500).json({
            "status" : false,
            "error" : error.message
        })
    }
}

module.exports = {
    createRole ,
    getRoles
}