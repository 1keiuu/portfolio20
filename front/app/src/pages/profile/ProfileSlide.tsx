import React from "react";
import "../../styles/profileSlide.scss";
const Fade = require("react-reveal/Fade");

const ProfileSlide: React.FC = () => {
  return (
    <div className="slide profile__slide">
      <Fade bottom>
        <div>
          <img></img>
          <div>
            <p>
              テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
            </p>
            <p>
              テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
            </p>
          </div>
        </div>
        <div>
          <p>
            テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
          </p>
        </div>
      </Fade>
    </div>
  );
};

export default ProfileSlide;
