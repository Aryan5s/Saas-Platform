const {Member , Community , Role , User} = require('../models/index');

const createMember = async (req  , res) => {
try {
    const {community , role , user} = req.body;

    const comm = await Community.findOne({where : {id : community}});

    if(!comm) return res.status(400).json({
        "status": false,
        "errors": [
          {
            "param": "community",
            "message": "Community not found.",
            "code": "RESOURCE_NOT_FOUND"
          }
        ]
      })

      const userToAdd = await User.findOne({where : {id : user}});

      if(!userToAdd) return res.status(400).json({
        "status": false,
        "errors": [
          {
            "param": "user",
            "message": "User not found.",
            "code": "RESOURCE_NOT_FOUND"
          }
        ]
      })


    const memberRole = await Role.findOne({where : {id : role}});

    if(!memberRole) return res.status(400).json({
        "status": false,
        "errors": [
          {
            "param": "role",
            "message": "Role not found.",
            "code": "RESOURCE_NOT_FOUND"
          }
        ]
      })

      const existingMember = await Member.findOne({where : {community , user}});
      if(existingMember) return res.status(400).json({
        "status": false,
        "errors": [
          {
            "message": "User is already added in the community.",
            "code": "RESOURCE_EXISTS"
          }
        ]
      })

      const currUser = req.user.id; // signed in user
      if(comm.owner !== currUser) return res.status(400).json({
        "status": false,
        "errors": [
          {
            "message": "You are not authorized to perform this action.",
            "code": "NOT_ALLOWED_ACCESS"
          }
        ]
      }) 

      const memberDetails = {
       community,
       role,
       user
      }

      const newMember = await Member.create(memberDetails);
      return res.status(200).json({
        "status": true,
        "content": {
          "data": {
            "id": newMember.id,
            "community": newMember.community,
            "user": newMember.user,
            "role": newMember.role,
            "created_at": newMember.created_at
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

const deleteMember = async (req , res) => {
try {
    const member = await Member.findOne({where : {id : req.params.id}});

    if(!member) return res.status(400).json({
        "status": false,
        "errors": [
          {
            "message": "Member not found.",
            "code": "RESOURCE_NOT_FOUND"
          }
        ]
      })

      const userId = req.user.id
      const adminRole = await Role.findOne({ name: "Community Admin" });
      const moderatorRole = await Role.findOne({ name: "Community Moderator" });
  
      const requesterRole = await Member.findOne({
        community: member.community,
        user: userId,
        role: { $in: [adminRole.id, moderatorRole.id] },
      });
  
      if (!requesterRole) {
        return res.status(403).json({
          status: false,
          error: "NOT_ALLOWED_ACCESS",
        });
      }
  
      await Member.deleteOne({ id: id });
  
      return res.status(201).json({ status : true});
} catch (error) {
 return res.status(500).json({
    "status" : false,
    "error" : error.message
 })   
}
}
module.exports = {
    createMember ,
    deleteMember
}