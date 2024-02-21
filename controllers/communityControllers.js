// Access token of signed in user eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzE2NTcxNTQ5NjA4MTIyMTE3MiJ9LCJpYXQiOjE3MDg0NDczODcsImV4cCI6MTcwODgwNzM4N30.rOeF5iyOQviPNARHnYc71_WnD9-Orsnt9Lb5tKY5EcA
 // signed in user id - 7165922649872570607
const {User , Community, Member, Role} = require('../models/index');
const { use } = require('../routers/userRoutes');
const {vaildateName, validateName} = require('../utils/validator')

const createCommunity = async (req , res) => {
    try {
        const {name} = req.body;
        const tempName = name

        if(name.length < 2 || !validateName(name)){
            return res.status(400).json({
                "status": false,
                "errors": [
                  {
                    "param": "name",
                    "message": "Name should be at least 2 characters or should follow the criteria",
                    "code": "INVALID_INPUT"
                  }
                ]
            })
        }

// signed in user token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzE2NTkyMjY0OTg3MjU3MDYwNyJ9LCJpYXQiOjE3MDg0ODkyNDEsImV4cCI6MTcwODg0OTI0MX0.glHTcGLta4b416Ix5HDZsIndXXvnriahp3hdHvRP3IU

        const owner = req.user.id; // signed in user
        const slug = tempName.charAt(0).toLowerCase() + tempName.slice(1);

        const communityDetails = {
            name,
            owner,
            slug
        }

        const newCommunity = await Community.create(communityDetails);

        return res.status(200).json({
            "status": true,
            "content": {
              "data": {
                "id": newCommunity.id,
                "name": newCommunity.name,
                "slug": newCommunity.slug,
                "owner": newCommunity.owner,
                "created_at": newCommunity.created_at,
                "updated_at": newCommunity.updated_at
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

const getAllCommunities = async (req , res) => {
try {
    const page = 1; // can be taken as query parameter or in req.body from the frontend
    const limit = 10; // Number of documents per page

    const offset = (page - 1) * limit;

    // Query roles with pagination
    const communities = await Community.findAndCountAll({
      limit: limit,
      offset: offset
    });

    const totalPages = Math.ceil(communities.count / limit);

    // // const dummy = communities.rows;
    // // const ownerId = []
    
    // // dummy.map(item => ownerId.push(item.owner));
    // // console.log(ownerId)

    // const ownerName = [];
    // ownerId.map(async id => await ownerName.push(User.findOne({where : {id}})))
    
    // console.log(ownerName)

    const expandedCommunities = await Promise.all(
        communities.rows.map(async (community) => {
            // console.log(community.owner)

          const ownerId = await User.findOne({where : {id : community.owner}});
  
        //   console.log(ownerId)
          return {
            id: community.id,
            name: community.name,
            slug: community.slug,
            owner: {
              id: ownerId.id,
              name: ownerId.name,
            },
            created_at: community.created_at,
            updated_at: community.updated_at,
          };
        })
      );
  
    return res.status(200).json({
        status: true,
        content: {
          meta: {
            total: communities.count,
            pages: totalPages,
            page: page
          },
          data: expandedCommunities
        }
      });

} catch (error) {
    return res.status(500).json({
        "status" : false,
        "error" : error.message
    })
}
}

const getCommunityMembers = async (req , res) => {
  try {

    const community = await Community.findOne({where : {id : req.params.id}});

    if(!community) return res.status(200).json({
      "status": false,
      "errors": [
        {
          "param": "community",
          "message": "Community not found.",
          "code": "RESOURCE_NOT_FOUND"
        }
      ]
    })

    const page = 1; // can be taken as query parameter or in req.body from the frontend
    const limit = 10; // Number of documents per page

    const offset = (page - 1) * limit;

    // Query roles with pagination
    const members = await Member.findAll({
      where : {community : req.params.id},
      limit: limit,
      offset: offset
    });

    // console.log(roles)

    // Calculate total number of pages
    const totalPages = Math.ceil(members.length / limit);

    const expandedMembers = await Promise.all(
      members.map(async (member) => {
          const user = await User.findOne({where : {id : member.user}});
          const role = await Role.findOne({where : {id : member.role}});

          return {
            id: member.id,
            community: member.community,
            user: {
              id: user.id,
              name: user.name,
            },
            role: {
              id: role.id,
              name: role.name,
            },
            created_at: member.created_at,
          }
      })
    )

    return res.status(200).json({
      "status": true,
      "content": {
        "meta": {
          "total": members.length,
          "pages": totalPages,
          "page": page
        },
        "data": expandedMembers
      }
    })
  } catch (error) {
    return res.status(500).json({
        "status" : false,
        "error" : error.message
    })
  }  
}

const getOwnedCommunities = async (req , res) => {
   try {
    const page = 1; // can be taken as query parameter or in req.body from the frontend
    const limit = 10; // Number of documents per page

    const offset = (page - 1) * limit;

    const userId = req.user.id;
    // Query roles with pagination
    const communities = await Community.findAll({where : {owner : userId},
    limit : limit,
    offset : offset
})
    // console.log(roles)

    // Calculate total number of pages
    const totalPages = Math.ceil(communities.length / limit);
    
    return res.status(200).json({
        "status": true,
        "content": {
          "meta": {
            "total": communities.length,
            "pages": totalPages,
            "page": 1
          },
          "data": communities
        }
      })
   } catch (error) {
    return res.status(500).json({
        "status" : false,
        "error" : error.message
    })
   } 
}

const getMyCommunities = async (req , res) => {
    try {
      const page = 1; // can be taken as query parameter or in req.body from the frontend
      const limit = 10; // Number of documents per page
  
      const offset = (page - 1) * limit;

      console.log(Member);
      const userId = req.user.id
      
      const members = await Member.find({ user: userId })
      .skip(offset)
      .limit(limit)
      .exec();

      const totalPages = Math.ceil(members.length / limit);

      const expandedCommunities = await Promise.findAll(
        members.map(async (member) => {
          const community = await Community.findOne({where : {id : member.community, owner : member.user}});

          if(community){
            const owner = await User.fineOne({where : {id : community.owner}});

          return {
              "id": community.id,
              "name": community.name,
              "slug": community.slug,
              "owner": {
                "id": community.owner,
                "name": owner.name
              },
              "created_at": community.created_at,
              "updated_at": community.updated_at
            
          }
        }
      })
      )
      return res.status(200).json({
        "status": true,
        "content": {
          "meta": {
            "total": users.length,
            "pages": totalPages,
            "page": page
          },
          "data": expandedCommunities
        }
      })
    } catch (error) {
       return res.status(500).json({
        "status" : false,
        "error" : error.message
       }) 
    }
}



module.exports = {createCommunity , getAllCommunities , getCommunityMembers , getOwnedCommunities, getMyCommunities}