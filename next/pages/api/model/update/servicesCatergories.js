import dbConnect from "../../../../lib/dbConnect";
import Model from "../../../../models/model";

import withProtectModel from "../../../../middleware/withProtectModel";

const handler = async (req, res) => {
  await dbConnect();

  try {
    const _id = req.user._id;

    if (req.body.categories) {
        console.log(req.body.categories)
      await Model.findByIdAndUpdate(_id, {
        $set: {
          categories: req.body.categories,
        },
      })
        .then((result) => {
          res.status(200).json("Successfully Updated");
        })
        .catch((err) => {
          res.status(500).json("Internal db error");
        });
    } else if (req.body.services) {
        console.log(req.body.services)
      await Model.findByIdAndUpdate(_id, {
        $set: {
          services: req.body.services,
        },
      })
        .then((result) => {
          res.status(200).json("Successfully Updated");
        })
        .catch((err) => {
          res.status(500).json("Internal db error");
        });
    }
  } catch (error) {
    res.status(500).json("Internal server errors");
  }
};

export default withProtectModel(handler);
