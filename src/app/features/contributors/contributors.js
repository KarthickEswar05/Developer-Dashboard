import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getContributors } from "../../services/contributors.service";
import "./contributors.css";

function Contributors() {
  const [contributors, setContributors] = useState([]);
  const { repoName, gitName } = useSelector((state) => state.repoInfo);

  useEffect(() => {
    getEventsAndFilterData(repoName);
  }, [repoName]);

  const getEventsAndFilterData = async (repoName) => {
    const data = await getContributors(gitName, repoName);
    setContributors(data);
    console.log(data);
  };

  return (
    <React.Fragment>
      <div>
        <ul class="list-group">
          {contributors.map((element) => {
            return (
              <li class="list-group-item row flex-align">
                <div class="img-thumbnail col-6">
                  <img src={element?.avatar_url} alt="..." />
                </div>
                <div class="col-6">
                  <label
                    class="form-check-label stretched-link"
                    for="firstCheckboxStretched"
                  >
                    {element?.login}
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Contributors;
