export const getAllEvents = async (gitName, repoName) => {
  const data = await fetch(
    `https://api.github.com/repos/${gitName}/${repoName}/issues/events`
  );
  return await data.json();
};
