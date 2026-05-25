export const getContributors = async (gitName, repoName) => {
  const data = await fetch(
    `https://api.github.com/repos/${gitName}/${repoName}/contributors`
  );
  return await data.json();
};
