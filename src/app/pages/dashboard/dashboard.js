import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepos } from "../../redux/reposReducer";
import { fetchPulls } from "../../redux/pullsReducer";
import { fetchDeploys } from "../../redux/deploysReducer";
import { updateRepoName, updateGitName } from "../../redux/repoInfoReducer";
import "./dashboard.css";
import CommitChart from "../../features/commitChart/commitChart";
import EventChart from "../../features/eventChart/eventChart";
import Contributors from "../../features/contributors/contributors";
import axios from "axios";

function Dashboard() {
  const dispatch = useDispatch();
  const { repoList, status, error } = useSelector((state) => {
    console.log(state);
    return state.repos;
  });
  const { repoName, gitName } = useSelector((state) => state.repoInfo);
  const { pullList } = useSelector((state) => state.pullList);
  const { deployList } = useSelector((state) => state.deployList);
  const [repos, setRepos] = useState(repoList);
  const [deploys, setDeploys] = useState(deployList);
  const [tab, setTab] = useState(1);
  const [selectedRepo, setSelectedRepo] = useState(repoList[0]);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  if (!username) {
    navigate("/login");
  }
  dispatch(updateGitName(username));

  useEffect(() => {
    const repo = repoList[0];
    setRepos(repoList);
    setSelectedRepo(repo);
    dispatch(updateRepoName(repo?.name));
  }, [dispatch, repoList]);

  useEffect(() => {
    setDeploys(deployList)
    let dList= JSON.parse(JSON.stringify(deployList));
    dList.forEach(async e=>{
      const response = await axios.get(`https://api.github.com/repos/${username}/${selectedRepo.name}/deployments/${e.id}/statuses`);
      if(response.data){
        e.status = response.data && response.data.length>0 ? response.data[0].state : "Not Available";
      }
      console.log(dList,"dList")
      setDeploys(dList);
    })
  }, [deployList]);

  useEffect(() => {
    dispatch(fetchRepos(username));
  }, [dispatch, username]);

  useEffect(() => {
    if (selectedRepo) {
      console.log(selectedRepo.name, "selectedRepo");
      dispatch(fetchPulls({ username: username, reponame: selectedRepo.name }));
      dispatch(fetchDeploys({ username: username, reponame: selectedRepo.name }));
    }
  }, [selectedRepo]);

  const repoSearch = (e) => {
    if (!e.target.value || e.target.value.trim === "") {
      setRepos(repoList);
    } else {
      const result = repoList.filter((repo) => {
        return (
          repo.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
        );
      });
      setRepos(result);
    }
  };

  const selectRepo = (e, repo) => {
    e.preventDefault();
    setSelectedRepo(repo);
    dispatch(updateRepoName(repo?.name));
  };

  return (
    <React.Fragment>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
        <div className="bg-white dark:bg-gray-900 dark:border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex">
          <div className="h-16 text-blue-500 flex items-center justify-center">
            <svg
              className="w-9"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 54 33"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4">
            <button className="h-10 w-12 dark:bg-gray-700 dark:text-white rounded-md flex items-center justify-center bg-blue-100 text-blue-500">
              <svg
                viewBox="0 0 24 24"
                className="h-5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-hidden h-full flex flex-col">
          <div className="h-16 lg:flex w-full border-b border-gray-200 dark:border-gray-800 hidden px-10">
            {/* <div className="flex h-full text-gray-600 dark:text-gray-400">
              <a
                href="#"
                className="cursor-pointer h-full border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white inline-flex mr-8 items-center"
              >
                Repos
              </a>
            </div> */}
            <div className="ml-auto flex items-center">
              <button className="flex items-center">
                <span className="relative flex-shrink-0">
                  <img
                    className="w-7 h-7 rounded-full"
                    src="https://avatars.githubusercontent.com/u/69639?v=4"
                    alt="profile"
                  />
                  <span className="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-gray-900"></span>
                </span>
                <span className="ml-2">{username}</span>
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 ml-1 flex-shrink-0"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-grow flex overflow-x-hidden">
            <div className="xl:w-72 md:w-22 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-2">
              <div className="text-xs text-gray-400 tracking-wider">
                REPOSITORIES
              </div>
              <div className="relative mt-2">
                <input
                  type="text"
                  onChange={repoSearch}
                  className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
                  placeholder="Search"
                />
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <div className="space-y-4 mt-3">
                {repos && repos.length > 0
                  ? repos.map((repo) => {
                    return (
                      <button
                        className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow"
                        key={repo.id}
                        onClick={(e) => {
                          selectRepo(e, repo);
                        }}
                      >
                        <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
                          <img
                            src={repo.owner.avatar_url}
                            className="w-7 h-7 mr-2 rounded-full"
                            alt="profile"
                          />
                          {repo.name}
                        </div>
                        <div className="flex items-center w-full">
                          <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md">
                            Issues : {repo.open_issues}
                          </div>
                          <div className="ml-auto text-xs text-gray-500">
                            Last Push :{" "}
                            {new Date(repo.pushed_at).toLocaleDateString()}
                          </div>
                        </div>
                      </button>
                    );
                  })
                  : "No Repo's Found"}
              </div>
            </div>
            <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
              <div className="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
                <div className="flex w-full items-center">
                  <div className="flex items-center text-3xl text-gray-900 dark:text-white">
                    <img
                      src={selectedRepo?.owner?.avatar_url}
                      className="w-12 mr-4 rounded-full"
                      alt="profile"
                    />
                    {selectedRepo?.full_name}
                  </div>
                  <div className="ml-auto sm:flex hidden items-center justify-end">
                    <div className="text-right">
                      <div className="text-xs text-gray-400 dark:text-gray-400">
                        Pull Requests Pending:
                      </div>
                      <div className="text-gray-900 text-lg dark:text-white">
                        {pullList.length}
                      </div>
                    </div>
                    <button className="w-8 h-8 ml-4 text-gray-400 shadow dark:text-gray-400 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:mt-7 mt-4">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setTab(1);
                    }}
                    className={
                      tab == 1
                        ? "px-3 border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white pb-1.5"
                        : "px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5"
                    }
                  >
                    Commits
                  </a>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setTab(2);
                    }}
                    className={
                      tab == 2
                        ? "px-3 border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white pb-1.5"
                        : "px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5"
                    }
                  >
                    Deployments
                  </a>
                </div>
              </div>
              {tab === 1 ? (
                <div>
                  {selectedRepo && (
                    <div className="chart-outer-div">
                      <div className="row chart-row">
                        <div className="col-6 chart-border">
                          <CommitChart />
                        </div>
                        <div className="col-6 chart-border">
                          <EventChart />
                        </div>
                      </div>
                      <div className="row chart-row">
                        <div className="col-6 chart-border">
                          <Contributors />
                        </div>
                        <div className="col-6 chart-border">
                          <Contributors />
                        </div>
                      </div>
                    </div>
                  )}{" "}
                </div>
              ) : (
                <div className="sm:p-7 p-4">
                  <div className="flex w-full items-center mb-7">
                    <button className="inline-flex mr-3 items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 mr-2 text-gray-400 dark:text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      Last 30 days
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 ml-1.5 text-gray-400 dark:text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    <button className="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
                      Filter by
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 ml-1.5 text-gray-400 dark:text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-gray-400">
                        <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                          Environment
                        </th>
                        <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                          Created By
                        </th>
                        <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">
                          Created On
                        </th>
                        <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                          Description
                        </th>
                        <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-gray-100">
                      {deploys && deploys.length > 0
                        ? deploys.map((data) => {
                          return (<tr key={data.id}>
                            <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                              <div className="flex items-center">
                                {data.environment}
                              </div>
                            </td>
                            <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                              <div className="flex items-center">
                                <img src={data.creator?.avatar_url} className="img-logo" />
                                {data.creator?.login}
                              </div>
                            </td>
                            <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
                              {new Date(data.created_at).toLocaleDateString()}
                            </td>
                            <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                              {data.description}
                            </td>
                            <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-green-500">
                              {data.status}
                            </td>
                          </tr>)
                        }) : "No Data Found"}
                    </tbody>
                  </table>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
