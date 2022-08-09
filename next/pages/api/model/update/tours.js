import dbConnect from "../../../../lib/dbConnect";
import Model from "../../../../models/model";

import withProtectModel from "../../../../middleware/withProtectModel";

const handler = async (req, res) => {
  await dbConnect();

  try {
    const _id = req.user._id;

    if (req.body.id) {
      await Model.findByIdAndUpdate(
        _id,
        { $pull: { tours: { tourId: req.body.id } } },
        { new: true }
      )
        .then((result) => {
          res.status(200).json("Successfully Updated");
        })
        .catch((err) => {
          res.status(500).json("Internal db error");
        });
    } else {
      await Model.findByIdAndUpdate(_id, {
        $push: {
          tours: req.body,
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
