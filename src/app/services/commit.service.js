export const getAllCommits = async (gitName, repoName) => {
  const data = await fetch(
    `https://api.github.com/repos/${gitName}/${repoName}/commits`
  );
  return await data.json();
};
