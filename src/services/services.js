import { useEffect } from "react";

function Services() {

  useEffect(() => {

    let contributor = [];
    let topFive = [];
    const fetchRepos = async () => {
      let repository = [];
      const response = await fetch("https://api.github.com/orgs/maplelabs/repos")
      const data = await response.json()
      repository = data.filter((repo) =>
        repo.fork === false
      );

      repository = ([...repository].sort((a, b) => new Date(b.pushed_at) > new Date(a.pushed_at) ? 1 : -1))

      if (repository.length > 0) {
        let repos = await Promise.all(repository.map(async (repo) => {
          const data = await fetchContributors(repo.name)
          repo['contributors'] = data
          repo['top_contributors'] = [...data].sort((a, b) => b.contributions - a.contributions).slice(0, 3);
          return repo
        }))
        localStorage.setItem('repos', JSON.stringify(repos));

        repos.map((repo) => { contributor.push(...repo.contributors) })

      }

      const combinedContributors = contributor.reduce((obj, item) => {
        obj[item.id] ? (obj[item.id].contributions = (obj[item.id].contributions + item.contributions), obj[item.id]._repo.push(...item._repo)) : (obj[item.id] = { ...item });
        return obj;
      }, {});

      contributor = [...Object.values(combinedContributors)].sort((a, b) => b.contributions - a.contributions).slice(0, 5);

      if (contributor.length === 5) {
        contributor.map(async (data) => {
          const name2 = await getUserName(data)
          topFive.push({ ...data, name: name2 })
          localStorage.setItem('topFive', JSON.stringify(topFive))
        })

      }   
    }
    fetchRepos();
  }, []);


 
  async function fetchContributors(repository) {
    const response = await fetch(
      "https://api.github.com/repos/maplelabs/" + repository + "/contributors"
    )
    const data = await response.json()
    data.forEach(i => i._repo = [repository])
    return data;
  }
  const getUserName = async (user) => {
    const response = await fetch(user.url)
    const data = await response.json()
    return data.name
  }

}

export default Services;
