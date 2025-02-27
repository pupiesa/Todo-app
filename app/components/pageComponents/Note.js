import React, { useState } from "react";
import styled from "styled-components";

const Card = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const data = props.data;
  const [content, setContent] = useState(data.content);
  const [description, setDescription] = useState(data.description);

  const handleBlur = () => {
    if (content.trim() === "") {
      setContent(props.data.content);
    } else {
      props.handleUpdate(props.data.$id, content);
    }
    setIsEditing(false);
  };

  const handleEditClick = () => {
    if (content.trim() === "") {
      setContent(props.data.content);
    }
    setIsEditing(true);
  };

  if (data) {
    return (
      <StyledWrapper
        key={data.$id}
        id={data.$id}
        className={`col-span-4 ${props.className}`}
      >
        <div className="task w-full col-span-4" draggable="true">
          <div className="tags">
            {/* edit header handling */}
            {isEditing ? (
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleBlur();
                  }
                }}
                autoFocus
              />
            ) : (
              <p className="tag" onClick={handleEditClick}>
                {content}
              </p>
            )}

            <div className="dropdown">
              <button className="options">
                <svg
                  xmlSpace="preserve"
                  viewBox="0 0 41.915 41.916"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                  id="Capa_1"
                  version="1.1"
                  fill="#000000"
                >
                  <g strokeWidth={0} id="SVGRepo_bgCarrier" />
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    id="SVGRepo_tracerCarrier"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585 C8.705,15.371,11.214,17.874,11.214,20.956z" />{" "}
                        <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585 C24.056,15.371,26.564,17.874,26.564,20.956z" />{" "}
                        <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585 C39.406,15.371,41.915,17.874,41.915,20.956z" />{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </button>
              <div className="dropdown-content">
                <button onClick={() => props.handleDelete(data.$id)}>
                  Delete Note
                </button>
                <button>Link 2</button>
                <button>Link 3</button>
              </div>
            </div>
          </div>
          {/* description edit handling */}
          {isEditingDesc ? (
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => {
                if (description.trim() === "") {
                  setDescription(props.data.description);
                } else {
                  props.handleUpdate(props.data.$id, description);
                }
                setIsEditingDesc(false);
              }}
              autoFocus
            />
          ) : (
            <p className="text-balance" onClick={() => setIsEditingDesc(true)}>
              {data.description}
            </p>
          )}
          <div className="stats">
            <div></div>
          </div>
        </div>
      </StyledWrapper>
    );
  }
};

const StyledWrapper = styled.div`
  .task {
    position: relative;
    color: #2e2e2f;
    cursor: move;
    background-color: #fff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
    margin-bottom: 1rem;
    border: 3px dashed transparent;
  }
  .task p {
    word-wrap: break-word;
  }
  .task:hover {
    box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
    border-color: rgba(162, 179, 207, 0.2) !important;
  }

  .task p {
    font-size: 15px;
    margin: 1.2rem 0;
  }

  .tag {
    border-radius: 100px;
    padding: 4px 13px;
    font-size: 12px;
    color: #ffffff;
    background-color: #1389eb;
  }

  .tags {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .options {
    background: transparent;
    border: 0;
    color: #c4cad3;
    font-size: 17px;
  }

  .options svg {
    fill: #9fa4aa;
    width: 20px;
  }

  .stats {
    position: relative;
    width: 100%;
    color: #9fa4aa;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .stats div {
    margin-right: 1rem;
    height: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .stats svg {
    margin-right: 5px;
    height: 100%;
    stroke: #9fa4aa;
  }

  .viewer span {
    height: 30px;
    width: 30px;
    background-color: rgb(28, 117, 219);
    margin-right: -10px;
    border-radius: 50%;
    border: 1px solid #fff;
    display: grid;
    align-items: center;
    text-align: center;
    font-weight: bold;
    color: #fff;
    padding: 2px;
  }

  .viewer span svg {
    stroke: #fff;
  }
  .dropdown {
    position: relative;
    display: inline-block;
    float: right;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    position: absolute;
    right: 0;
  }

  .dropdown-content button {
    width: 100%;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content button:hover {
    background-color: #ddd;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
`;

export default Card;
