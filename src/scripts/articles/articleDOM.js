//This module was created by Brendan Abernethy
import { API, dbResponseData } from "../databaseCalls.js"
import { activeSession } from "../users/loginCalls.js"

const articleLog = document.querySelector(".articleOutput")
//function to render articles to DOM
const renderArticle = () => {
    //fetch call to get most recent data
    API.getData("http://localhost:3000", "articles", "user")
    .then(() => {
        //loop to iterate through database response
        dbResponseData.forEach(res => {
            if (res.userId === activeSession.id) {
                articleLog.innerHTML += 
                `
                <div id="article__${res.id}" class="userArticle">
                    <div class="article__header">
                        <div class="nameDate">
                            <div class="article__user">
                                ${res.user.username}
                            </div>
                            <div class="article__date">
                            ${res.date}
                            </div>
                        </div>    
                        <div class="article__deleteButton">
                            <button id="deleteArticleBtn__${res.id}" class="deleteBtn" type="button">&times;</button>
                        </div>
                    </div>
                    <div class="articleTitle">
                        <h3>
                            <a href="${res.url}" alt="${res.title}" target="_blank">${res.title} </a>
                        </h3>
                    </div>
                    <div class="article__description">
                        <p>${res.description}</p>
                    </div>
                </div>
                `
            }
            else if (res.userId !== activeSession.id) {
                articleLog.innerHTML += 
                `
                <div id="article__${res.id}" class="friendArticle">
                    <div class="article__header">
                        <div class="nameDate">
                            <div class="article__user">
                            ${res.user.username}
                            </div>
                            <div class="article__date">
                                ${res.date}
                            </div>
                        </div>
                    </div>
                    <div class="articleTitle">
                        <h3>
                            <a href="${res.url}" alt="${res.title}" target="_blank">${res.title} </a>
                        </h3>
                    </div>
                    <div class="article__description">
                        <p>${res.description}</p>
                    </div>
                </div>
                `
            }
        })
    })
}
export default renderArticle