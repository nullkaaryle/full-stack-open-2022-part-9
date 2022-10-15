import React from "react";
import { Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { withStyles } from "@mui/styles";

type BarProps = {
  rating: number;
  showText: boolean;
};

const style = {
  iconFilled: { color: "#ff6d75" },
  iconHover: { color: "#ff3d47" }
};

const StyledRating = withStyles(style)(Rating);

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HealthRatingBar = ({ rating, showText }: BarProps) => {
  return (
    <div className="health-bar">
      <StyledRating
        readOnly
        value={4 - rating}
        max={4}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteIcon fontSize="inherit" />}

      />

      {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
    </div>
  );
};

export default HealthRatingBar;