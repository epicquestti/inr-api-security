import express from "express"
import wrapper from "../lib/wrapper"
import GroupRepository from "../cases/repositories/Group"
import GroupService from "../cases/services/Group"
import GroupController from "../cases/controllers/Group"
import { FeatureRepository } from "../cases/repositories/Feature"

const groupRoute = express.Router()
const groupRepository = new GroupRepository()
const featureRepository = new FeatureRepository()
const groupService = new GroupService(groupRepository, featureRepository)
const groupController = new GroupController(groupService)

groupRoute.post(
  "/new",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await groupController.create({
          name: req.body.name,
          canonical: req.body.canonical,
          active: req.body.active,
          createdById: +req.user.id,
          features: req.body.features,
          super: req.body.super,
          color: req.body.color
        })
      )
    },
    settings: {
      level: "full",
      action: "write",
      featureCode: "group",
      groupCode: ["admin"]
    }
  })
)

groupRoute.post(
  "/",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await groupController.search({
          active: req.body.active,
          name: req.body.name,
          canonical: req.body.canonical,
          super: req.body.super,
          limit: req.body.limit,
          offset: req.body.offset
        })
      )
    },
    settings: {
      level: "full",
      action: "read",
      featureCode: "group",
      groupCode: ["admin"]
    }
  })
)

groupRoute.get(
  "/:id",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await groupController.getById({
          id: +req.params.id
        })
      )
    },
    settings: {
      level: "full",
      action: "read",
      featureCode: "group",
      groupCode: ["admin"]
    }
  })
)

groupRoute.put(
  "/:id/update",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await groupController.update({
          id: +req.params.id,
          name: req.body.name,
          canonical: req.body.canonical,
          updatedBy: +req.user.id,
          active: req.body.active,
          features: req.body.features,
          super: req.body.super,
          color: req.body.color
        })
      )
    },
    settings: {
      level: "full",
      action: "write",
      featureCode: "group",
      groupCode: ["admin"]
    }
  })
)

groupRoute.delete(
  "/:id/delete",
  wrapper({
    handle: async (req, res) => {
      res.status(200).json(
        await groupController.delete({
          id: +req.params.id,
          deletedBy: +req.user.id
        })
      )
    },
    settings: {
      level: "full",
      action: "write",
      featureCode: "group",
      groupCode: ["admin"]
    }
  })
)

export default groupRoute
