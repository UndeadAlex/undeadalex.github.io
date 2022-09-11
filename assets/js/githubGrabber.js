const apiUrl = 'https://api.github.com';

function populateProjectDivs(username, includeForkedProjects)
{
    const projectArea = document.getElementById('projectsDiv');
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function ()
    {
        if(xmlHttp.readyState == XMLHttpRequest.DONE && xmlHttp.status == 200)
        {
            const jsonResponse = JSON.parse(xmlHttp.response);

            for(let i in jsonResponse)
            {
                let element = jsonResponse[i];

                // Possible theres a better way of doing this buttttttt ¯\_(ツ)_/¯
                if(!includeForkedProjects && element['fork'])
                    continue;

                // Create Root Div for the repo
                let rootProjectDiv = document.createElement('div');
                rootProjectDiv.className = "project";
                projectArea.appendChild(rootProjectDiv);

                // The repo title
                let title = document.createElement('h3');
                title.innerText = element['name'] + (element['fork'] ? " [Fork]" : "");
                rootProjectDiv.appendChild(title);

                // The repo description
                let desc = document.createElement('p');
                desc.innerText = element['description'];
                rootProjectDiv.appendChild(desc);

                // Create Button Group
                let buttonGroup = document.createElement('div');
                buttonGroup.className = "button__group";
                rootProjectDiv.appendChild(buttonGroup);
                
                // Create the Button that links to the repo URL
                let sourceButton = document.createElement('button');
                sourceButton.className = "btn";
                sourceButton.innerText = "Source";
                sourceButton.onclick = function ()
                { window.open(`${element['html_url']}`); }
                buttonGroup.appendChild(sourceButton);
                

                console.log(`Found Repo: ${element.name}`);
            }
        }
    }

    let repoUrl = apiUrl + `/users/${username}/repos`;

    xmlHttp.open('GET', repoUrl, true);
    xmlHttp.setRequestHeader('Content-type', 'application/json');
    xmlHttp.send();
}

document.onload += populateProjectDivs('dexithezombie', true);