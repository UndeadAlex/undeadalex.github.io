const apiUrl = 'https://api.github.com';
const projectArea = document.getElementById('projectsDiv');

var repos = [];
class Repo
{
    constructor(name, description, isFork, repourl, homepage, forkUrl)
    {
        this.name = name;
        this.description = description;
        this.isFork = isFork;
        this.repourl = repourl;
        this.homepage = homepage;
        this.forkUrl = forkUrl;
    }
}

function isEmpty(val){
    return (val === undefined || val == null || val.length <= 0);
}

// Big Booty, creates all the html elements for the repos.
function populateProjectGrid()
{
    for(let i in repos)
    {
        let repo = repos[i];

        if(repo.name === "undeadalex.github.io" || repo.name === "undeadalex")
            continue;

        let projectDiv = document.createElement('div');
        projectDiv.className = "project";
        projectArea.appendChild(projectDiv);

        let repoTitle = document.createElement('h3');
        repoTitle.className = "project__title";
        repoTitle.innerText = `${repo.name}` + (repo.isFork ? " [Fork]" : "");
        projectDiv.appendChild(repoTitle);

        let repoDescription = document.createElement('p');
        repoDescription.className = "project__desc";
        repoDescription.innerText = repo.description;
        projectDiv.appendChild(repoDescription);

        let buttonGroup = document.createElement('div');
        buttonGroup.className = "button__group";
        projectDiv.appendChild(buttonGroup);

        // Create the Button that links to the repo URL
        let sourceButton = document.createElement('button');
        sourceButton.className = "btn";
        sourceButton.innerText = "Source";
        sourceButton.onclick = function ()
        { window.open(`${repo.repourl}`); }
        buttonGroup.appendChild(sourceButton);

        if(!isEmpty(repo.homepage))
        {
            // Create the Button that links to the repo URL
            let homepageButton = document.createElement('button');
            homepageButton.className = "btn";
            homepageButton.innerText = "Homepage";
            homepageButton.onclick = function ()
            { window.open(`${repo.homepage}`); }
            buttonGroup.appendChild(homepageButton);
        }

        // if(repo.isFork)
        // {
        //     // Create the Button that links to the fork URL
        //     let forkButton = document.createElement('button');
        //     forkButton.className = "btn";
        //     forkButton.innerText = "Original";
        //     forkButton.onclick = function ()
        //     { window.open(`${repo.forkUrl}`); }
        //     buttonGroup.appendChild(forkButton);
        // }
    }
}

// Gathers all the repos then calls the populate function.
function getReposFromUsername(username, includeForks)
{
    const xmlHttp = new XMLHttpRequest();
    const url = `${apiUrl}/users/${username}/repos`;

    xmlHttp.open('GET', url);
    xmlHttp.send();

    xmlHttp.onload = function ()
    {
        const jsonResponse = JSON.parse(xmlHttp.response);

        // Log inital GET request.
        console.log(jsonResponse)

        for(let i in jsonResponse)
        {
            let repo = jsonResponse[i];

            if(!includeForks && repo.fork)
            {
                continue;
            }


            let originalRepo = "";

            // if(repo.fork)
            // {
            //     originalRepo = getForkUrl(username, repo.name);
            //     console.log(originalRepo);
            // }

            repos.push(new Repo(repo.name, repo.description, repo.fork, repo.html_url, repo.homepage, originalRepo))
        }

        console.log(repos);

        populateProjectGrid();
    };
}

// It gets the fork url... im bad at comments.
// function getForkUrl(username, repoName)
// {
//     const xmlHttp = new XMLHttpRequest();
//     const url = `${apiUrl}/repos/${username}/${repoName}`;

//     xmlHttp.open('GET', url);
//     xmlHttp.send();

//     let returnUrl = "Gamers";
//     xmlHttp.onload = function()
//     {
//         let jsonObj = JSON.parse(xmlHttp.responseText);
//         return jsonObj['parent'].html_url;
//     }

// }

document.onload += getReposFromUsername("undeadalex", false);
